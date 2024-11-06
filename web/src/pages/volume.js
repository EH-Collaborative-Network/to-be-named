import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import BlockContent from "../components/TranslationHelpers/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import * as styles from "../components/Card/card.module.css";
import * as filterStyles from "../components/Search/search.module.css";
import LangContext from "../components/context/lang";
import { Link } from "@reach/router";
import Card from "../components/Card/card"
import sanityClient from "@sanity/client";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import translate from "../components/TranslationHelpers/translate";
const client = sanityClient({
  projectId: '46orb7yp',
  dataset: 'production',
  apiVersion: '2022-03-25', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})
export const query = graphql`
  query VolumePageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      languages {
        name
        code
      }
    }
    languagePhrases: allSanityLanguage {
      edges {
        node {
          name
          code
          about
          aboutProject
          volume
          peopleAndPartners
          contact
          artworkIndex
          exhibition
          upcomingEvents
          researchThreads
          availableIn
          regional
          allLocations
          mediums
          allArtists
          noResults
          studentWork
          traveling
          commissioned
          search
        }
      }
    }
    page: allSanityPage(filter: {slug: {current: {eq: "volume"}}}) {
      edges {
        node {
          id
          _id
          bodies{
            _rawText(resolveReferences: { maxDepth: 20 })
            language{
              id
              name
              code
            }
          }
        }
      }
    }
    projects: allSanityProject{
      edges {
        node {
              titles{
                text
                language{
                  id
                  name
                  code
                }
              }
              artists {
                id
                  _id
                  name
              }
              mainImage {
                crop {
                  _key
                  _type
                  top
                  bottom
                  left
                  right
                }
                asset {
                  _id
                }
                altText
              }
              slug {
                current
              }
              exhibition
              volume
              commissioned
              traveling
              regional
              studentWork
              exhibitions{
                titles{
                  text
                  language{
                    id
                    name
                    code
                  }
                }
                name
              }
              researchThreads{
                titles{
                  text
                  language{
                    id
                    name
                    code
                  }
                }
                name
              }
              descriptions{
                _rawText(resolveReferences: { maxDepth: 20 })
                language{
                  id
                  name
                  code
                }
              }
          
        }
      }
    }
  }
`;

const VolumePage = props => {
  const { data, errors, location } = props;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const projects = (data || {}).projects.edges
  const page = (data || {}).page.edges[0].node
  const languagePhrases = (data || {}).languagePhrases?.edges;
  projects.sort(function (a, b) {
    if (a.node.sortLetter < b.node.sortLetter) {
      return -1;
    }
    if (a.node.sortLetter > b.node.sortLetter) {
      return 1;
    }
    return 0;
  });

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  /* Artist Type = currentFilter, Mediums = currentMediums, Location = currentLocation */
  // let currentFilter = null;
  // let currentMediums = null;
  // let currentLocation = null;
  const [currentFilter, setCurrentFilter] = useState(null);
  const [currentMediums, setCurrentMediums] = useState(null);
  const [currentThreads, setCurrentThreads] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  let params = [];
  /* Set currentFilter, currentMediums, currentLocation based on url params */
    useEffect(() => {

  if(location?.search){
    if(location.search.split("?").length > 1 ){
      params = location.search.split("?")[1].split("&");
    }
    params.forEach((param) => {
      let p = param.split("=")[0];
      let v = param.split("=")[1];
      if(p == "filter"){
        // currentFilter = v
        setCurrentFilter(v)
      }else if(p == "medium" ){
        let ve = v.split("%20").join(" ") //handle spaces
        // currentMediums = ve.split(',')
        setCurrentMediums(ve.split(','))
      }else if(p == "thread" ){
        let ve = v.split("%20").join(" ") //handle spaces
        // currentMediums = ve.split(',')
        setCurrentThreads(ve.split(','))
      }
    })
  }
    }, []);



  /* Figure out possible mediums & locations */

  let mediums = [];
  let locations = [];
  let threads = [];
  let threadCount = [];
  /* loop through all artists and collate different mediums and locations */
  projects.map(function(project, index){
    let exhibition = false;

      if(project.node.volume){
        exhibition = true;
      }
    if(exhibition){
      // project.node.medium.map(function(node, index){
      //     mediums.push(node)
      // })

      project.node.researchThreads?.map(function(node, index){
        if(!threadCount.includes(node.name)){
          threadCount.push(node.name)
          threads.push(node)
        }
      })
      project.node.exhibitions?.map(function(node, index){
          locations.push(node.name) 
      })
    }
  })
  /* flatten arrays */
  locations = [...new Set(locations)];
 // mediums = [...new Set(mediums)];

  threads = [...new Set(threads)];

  /******************************/
  /* event handlers for filters */
  /******************************/
  
  /* Filtering by artist type */
  function handleFilter(e){
    let value = e.target.value;
    if(currentFilter){
      let params = location.href.split("?")[1]
      params = params.split("&");
      let newParams =[]
      params.forEach((node) =>{
        if(node.split("=")[0] == "filter"){
          if(value == "all"){
            node = null
          }else{
           node = "filter="+ value
          } 
        }
        if(node) newParams.push(node)
      })
      newParams = newParams.join("&")
      if(typeof window != `undefined`) window.location.href = location.href.split("?")[0] + "?" + newParams
    } else {
      let newParams;
      if(location.search){
        newParams = location.href + "&filter=" + value
       } else if(location.href[location.href.length -1] == "?"){
        newParams = location.href + "filter=" + value
       } else {
        newParams = location.href + "?filter=" + value
       }
      if(typeof window != `undefined`) window.location.href = newParams
    }
   
  }
/* Filtering by artist location */
  function handleLocation(e){
    let value = e.target.value;
    if(currentLocation){
      let params = location.href.split("?")[1]
      params = params.split("&");
      let newParams =[]
      params.forEach((node) =>{
        if(node.split("=")[0] == "location"){
          let pfilter = node.split("=")[1]
          if(value == "all"){
            node = null
          }else{
           node = "location="+ value
          }
        }
        if(node) newParams.push(node)
      })
      newParams = newParams.join("&")
      if(typeof window != `undefined`) window.location.href = location.href.split("?")[0] + "?" + newParams
    }else {
      let newParams;
      if(location.search){
        newParams = location.href + "&location=" + value
       }else if(location.href[location.href.length -1] == "?"){
        newParams = location.href + "location=" + value
       }else{
        newParams = location.href + "?location=" + value
       }
      if(typeof window != `undefined`) window.location.href = newParams   
    }
  }
/* Filtering by artist medium */
  function handleMedium(e){
    let value = e.target.value;
    if(currentMediums?.includes(value)){ //if deselecting the option
        let params = location.href.split("?")[1]
        params = params.split("&");
        let newParams =[]
        
        params.forEach((node) =>{
          if(node.split("=")[0] == "medium"){
            let mediums = node.split("=")[1]
            mediums = mediums.split("%20").join(" ")
            mediums = mediums.split(',')
            let idx = mediums.indexOf(value);
            if (idx != -1) mediums.splice(idx, 1);
            if(mediums.length == 0){
              node = null
            }else{
             node = "medium="+ mediums.join(",") 
            }
            
            
          }
          if(node) newParams.push(node)
        })
        newParams = newParams.join("&")
        if(typeof window != `undefined`) window.location.href = location.href.split("?")[0] + "?" + newParams
      
    }else if(currentMediums?.length > 0){ //if selecting the option
      let params = location.href.split("?")[1]
      params = params.split("&");
      let newParams =[]
      
      params.forEach((node) =>{
        if(node.split("=")[0] == "medium"){
          let mediums = node.split("=")[1]
          mediums = mediums.split(',')
          mediums.push(value)
          node = "medium="+ mediums.join(",")     
        }
        if(node) newParams.push(node)
      })
      newParams = newParams.join("&")
      if(typeof window != `undefined`) window.location.href = location.href.split("?")[0] + "?" + newParams
    
    }else{
      let newParams
      if(location.search){
        newParams = location.href + "&medium=" + value
      }else if(location.href[location.href.length -1] == "?"){
        newParams = location.href + "medium=" + value
      }else{
        newParams = location.href + "?medium=" + value
      }
      if(typeof window != `undefined`) window.location.href = newParams
    }
  }

  /* Filtering by theme/thread */
  function handleThread(e){
    let value = e.target.value;
    if(currentThreads?.includes(value)){ //if deselecting the option
        let params = location.href.split("?")[1]
        params = params.split("&");
        let newParams =[]
        
        params.forEach((node) =>{
          if(node.split("=")[0] == "thread"){
            let threads = node.split("=")[1]
            threads = threads.split("%20").join(" ")
            threads = threads.split(',')
            let idx = threads.indexOf(value);
            if (idx != -1) threads.splice(idx, 1);
            if(threads.length == 0){
              node = null
            }else{
             node = "thread="+ threads.join(",") 
            }
            
            
          }
          if(node) newParams.push(node)
        })
        newParams = newParams.join("&")
        if(typeof window != `undefined`) window.location.href = location.href.split("?")[0] + "?" + newParams
      
    }else if(currentThreads?.length > 0){ //if selecting the option
      let params = location.href.split("?")[1]
      params = params.split("&");
      let newParams =[]
      
      params.forEach((node) =>{
        if(node.split("=")[0] == "thread"){
          let threads = node.split("=")[1]
          threads = threads.split(',')
          threads.push(value)
          node = "thread="+ threads.join(",")     
        }
        if(node) newParams.push(node)
      })
      newParams = newParams.join("&")
      if(typeof window != `undefined`) window.location.href = location.href.split("?")[0] + "?" + newParams
    
    }else{
      let newParams
      if(location.search){
        newParams = location.href + "&thread=" + value
      }else if(location.href[location.href.length -1] == "?"){
        newParams = location.href + "thread=" + value
      }else{
        newParams = location.href + "?thread=" + value
      }
      if(typeof window != `undefined`) window.location.href = newParams
    }
  }

  /* Create artist cards based on current filters */

  let projectCards = []
  projects.map(function(node, index){
    let image;
    let show = false;
    let absolutelynoshow = true;
    let projectLinks = []


      if(node.node.volume){
        image = node.node.mainImage;
        show = true;
        projectLinks.push(
          <Link key={index} className={styles.blockLink} to={"/project/"+node.node.slug.current}><TranslatedTitle translations={node.titles}/></Link>
        )
      }

    if(show == false){
      absolutelynoshow = false;
    }


    if(((currentFilter == "traveling") && !node.node.traveling) || ((currentFilter == "commissioned") && !node.node.commissioned) || ((currentFilter == "regional") && !node.node.regional) || ((currentFilter == "student") && !node.node.studentWork)){
      show = false
    }
    if(currentThreads?.length > 0){
      let showThread = false;
      node.node.researchThreads?.map(function(node,index){
        if(currentThreads.includes(node.name)){
          showThread = true;
        }
      })
      if(!showThread){
        show = false
      }
    }
    
    if(currentLocation){
      let includesLocation = false;
      node.node.exhibitions?.map(function(node,index){
        if(node.name == currentLocation){
          includesLocation = true;
        }
      })
      if(!includesLocation){
        show = false;
      }
    }  
    
    node.node.artists?.map(function(node,index){
      projectLinks.push(<em>{node.name}</em>)
    })

    
    if(show && absolutelynoshow){   
      if((currentFilter == "regional") && node.node.regional){
        projectLinks.unshift(<em>{node.node.exhibitions?.map(function(node,index){
          return (node.name)
      })}</em>)
      }  
      projectCards.push( <Card slug={"/project/"+node.node.slug.current} image={image} descriptions={projectLinks} titles={node.node.titles} languagePhrases={languagePhrases} globalLanguages={globalLanguages} key={index}/> )
    } 
  })

  return (
      <>  
      <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedPhrase translations={languagePhrases} phrase={'volume'}/></h1>
          <div className="top-text one-column"><BlockContent blocks={page.bodies} languagePhrases={languagePhrases} globalLanguages={globalLanguages}/></div>
          <br/>
          {/* <div className={filterStyles.filterWrapper}>
          <div className={styles.cardWrapper}>

          {projectCards}
          {projectCards.length < 1 &&
            <TranslatedPhrase translations={languagePhrases} phrase={'noResults'}/>
          }
       
          </div>
          <div className={filterStyles.filter}>
          

            <>
            <h4><TranslatedPhrase translations={languagePhrases} phrase={'researchThreads'}/>:</h4>
            {
            threads.map(function(node, index){
                return(
                  <>
                  <input className={filterStyles.checkBox} id={"check-"+index} onChange={handleThread} value={node.name} type="checkbox" checked={(currentThreads?.includes(node.name)) ? true : ''}/>
                    <label className={filterStyles.checkBoxLabel} for={"check-"+index}>
                    <TranslatedTitle translations={node.titles}/> </label>
                  </>
                  )
              })
            }
            </>

          </div>
          </div> */}
          
        </Container>
      </Layout>
      
    </>
  );
};

export default VolumePage;
