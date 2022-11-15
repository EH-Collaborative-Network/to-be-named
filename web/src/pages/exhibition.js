import React, {useState, useEffect} from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/Container/container";
import BlockContent from "../components/TranslationHelpers/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
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
  token: 'skyfnkmqWJbwvihHkx2GQByHOktPsJB6ztzSRAfi7mZWaQegg23IaNrgFXjSxrBvL5Tli1zygeDqnUMr8QSXOZLNyjjhab5HTPsgD6QnBBxcNBOUwzGyiI69x7lpMKYhxZ94dpxLwIuVRBB1Hn47wR4rPtCpf17JGCYehmiLgCpMZrX1rzZW', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})
export const query = graphql`
  query ExhibitionPageQuery {
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
          volume
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
    page: allSanityPage(filter: {slug: {current: {eq: "exhibition"}}}) {
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
    creators: allSanityArtistAuthor{
      edges {
        node {
          name
          locations{
            name
          }
          medium
          commissioned
          traveling
          regional
          studentWork
          slug{
            current
          }
          projects {
            id
              _id
              titles{
                text
                language{
                  id
                  name
                  code
                }
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
  }
`;

const ExhibitionPage = props => {
  const { data, errors, location } = props;
  const [filter, setFilter] = useState("all")
  const [artistMediums, setArtistMediums] = useState([])
  let currentFilter = null;
  let currentMediums = null;
  let currentLocation = null;
  const [reset, setReset] = useState(false)
  const [artistLocation, setArtistLocation] = useState("all")
  let mediums = [];
  let locations = [];
  let params = [];
  if(location?.search){
    if(location.search.split("?").length > 1 ){
      params = location.search.split("?")[1].split("&");
    }
    params.forEach((param) => {
      let p = param.split("=")[0];
      let v = param.split("=")[1];
      if(p == "filter" && filter == "all"){
        currentFilter = v
      }else if(p == "medium" && artistMediums.length < 1){
        currentMediums = v.split(',')
      }else if(p == "location" && artistLocation == "all"){
        let ve = v.split("%20").join(" ")
        currentLocation = ve
      }
    })
  }

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const artists = (data || {}).creators.edges
  const page = (data || {}).page.edges[0].node
  const languagePhrases = (data || {}).languagePhrases?.edges;
  artists.map(function(artist, index){
    let exhibition = false;
    artist.node.projects.map(function(project,index){
      if(project.exhibition){
        exhibition = true;
      }
    })
    if(exhibition){
      artist.node.medium.map(function(node, index){
          mediums.push(node)
      })
      artist.node.locations?.map(function(node, index){
          locations.push(node.name) 
      })
    }
  })
  function handleFilter(e){
    let value = e.target.value;
    if(currentFilter){
      let params = location.href.split("?")[1]
      params = params.split("&");
      let newParams =[]
      
      params.forEach((node) =>{
        if(node.split("=")[0] == "filter"){
          let pfilter = node.split("=")[1]
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
    
    }else{
    let newParams;
      if(location.search){
        newParams = location.href + "&filter=" + value
       }else{
        newParams = location.href + "?filter=" + value
       }
  
        if(typeof window != `undefined`) window.location.href = newParams
          }
   
  }
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
       }else{
        newParams = location.href + "?location=" + value
       }
  
        if(typeof window != `undefined`) window.location.href = newParams
      
    }
  }
  function handleMedium(e){
    let value = e.target.value;
    if(artistMediums.includes(value)){
      setReset(false)
      setArtistMediums((prevArtistMediums) => [
        ...prevArtistMediums,
        value,
       ]);
    }else if(currentMediums?.includes(value)){
        let params = location.href.split("?")[1]
        params = params.split("&");
        let newParams =[]
        
        params.forEach((node) =>{
          if(node.split("=")[0] == "medium"){
            let mediums = node.split("=")[1]
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
      
    }else if(currentMediums?.length > 0){
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
     }else{
      newParams = location.href + "?medium=" + value
     }

      if(typeof window != `undefined`) window.location.href = newParams
    
    }

    // } else{
    //   if(artistMediums.length == 1){
    //     setReset(true)
    //   }else{
    //     setReset(false)
    //   }
    //   let newArr = artistMediums
    //   let idx = newArr.indexOf(value);
    //   if (idx != -1){
    //     newArr.splice(idx, 1);
    //   } 
    //   setArtistMediums(newArr)
    // }
    
  }
  locations = [...new Set(locations)];
  mediums = [...new Set(mediums)];
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  let artistCards = []
  artists.map(function(node, index){
    let image;
    let show = false;
    let absolutelynoshow = true;

    let projectLinks = node.node.projects?.map(function(node, index){
      if(node.exhibition){
        image = node.mainImage;
        show = true;
        return(
          <Link key={index} className={styles.blockLink} to={"/project/"+node.slug.current}><TranslatedTitle translations={node.titles}/></Link>
        )
      }
    })
    if(show == false){
      absolutelynoshow = false;
    }
    

      if(artistMediums.length > 0){
        let includesMedium = false;
        node.node.medium?.map(function(node,index){
          if(artistMediums.includes(node)){
            includesMedium = true;
          }
        })
        if(!includesMedium){
          show = false;
        } 
      } else if(currentMediums?.length > 0 ){
        let includesMedium = false;
        node.node.medium?.map(function(node,index){
          if(currentMediums?.includes(node)){
            includesMedium = true;
          }
        })
        if(!includesMedium){
          show = false;
        }
      }else{
        show = true;
      }
      if(reset){
        show = true
      }


    if(((filter == "traveling" || currentFilter == "traveling") && !node.node.traveling) || ((filter == "commissioned" || currentFilter == "commissioned") && !node.node.commissioned) || ((filter == "regional" || currentFilter == "regional") && !node.node.regional) || ((filter == "studentWork" || currentFilter == "student") && !node.node.studentWork)){
      show = false
    }
    if(artistLocation !== "all"){
      let includesLocation = false;
      node.node.locations?.map(function(node,index){
        if(node.name == artistLocation){
          includesLocation = true;
        }
      })
      if(!includesLocation){
        show = false;
      }
    }else if(currentLocation){
      let includesLocation = false;
      node.node.locations?.map(function(node,index){
        if(node.name == currentLocation){
          includesLocation = true;
        }
      })
      if(!includesLocation){
        show = false;
      }
    }

    
    if(show && absolutelynoshow){             
      projectLinks.unshift(<Link to={"/creator/"+node.node.slug.current}><h2>{node.node.name}→</h2></Link> )
      artistCards.push( <Card image={image} descriptions={projectLinks} titles={node.node.titles} languagePhrases={languagePhrases} globalLanguages={globalLanguages} key={index}/> )
    } 
  })

  return (
      <>  
      <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedPhrase translations={languagePhrases} phrase={'exhibition'}/></h1>
          <div className="top-text one-column"><BlockContent blocks={page.bodies} languagePhrases={languagePhrases} globalLanguages={globalLanguages}/></div>
          <br/>
          <div className={filterStyles.filterWrapper}>
          <div className={styles.oneColumn}>

          {artistCards}
          {artistCards.length < 1 &&
            <TranslatedPhrase translations={languagePhrases} phrase={'noResults'}/>
          }
       
          </div>
          <div className={filterStyles.filter}>
          <LangContext.Consumer>
            {theme => {
              return(
              <select className={filterStyles.filterArtist} id="change-tz" onChange={handleFilter}>
                <option value={'all'}>{translate(languagePhrases, 'allArtists', theme)}</option>
                <option value={'traveling'} selected={currentFilter == "traveling" ? true : false}>{translate(languagePhrases, 'traveling', theme)}</option>
                <option value={'commissioned'} selected={currentFilter == "commissioned" ? true : false}>{translate(languagePhrases, 'commissioned', theme)}</option>
                <option value={'regional'} selected={currentFilter == "regional" ? true : false}>{translate(languagePhrases, 'regional', theme)}</option>
                <option value={'studentWork'} selected={currentFilter == "student" ? true : false}>{translate(languagePhrases, 'studentWork', theme)}</option>
              </select>
              )
            }}
            </LangContext.Consumer>
       
            <h4 style={{"marginBottom":"0"}}><TranslatedPhrase translations={languagePhrases} phrase={'mediums'}/>:</h4>
            {mediums.map(function(node, index){
                return(
                  <>
                  <input className={filterStyles.checkBox} id={"check-"+index} onChange={handleMedium} value={node} type="checkbox" checked={(currentMediums?.includes(node) && artistMediums.length < 1) ? true : ''}/>
                    <label className={filterStyles.checkBoxLabel} for={"check-"+index}>
                    {node} </label>
                  </>
                  )
              })
            }
            <LangContext.Consumer>
            {theme => {
              return(
            <select className={filterStyles.filterArtist + " " + filterStyles.filterLocation} id="change-location" onChange={handleLocation}>
              <option value={'all'}>{translate(languagePhrases, 'allLocations', theme)}</option>
              {locations.map(function(node, index){
                return(<option value={node} selected={(currentLocation == node && artistLocation == "all") ? true : false}>{node}</option>)
              })}
            </select>
              )
            }}
            </LangContext.Consumer>
          </div>
          </div>
          
        </Container>
      </Layout>
      
    </>
  );
};

export default ExhibitionPage;
