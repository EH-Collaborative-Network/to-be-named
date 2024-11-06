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
import Map from "../components/Map/map";
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
          current
          contact
          artworkIndex
          aboutProject
          peopleAndPartners
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
    exhibitions: allSanityExhibition {
      totalCount
      edges {
        node {
              order
              titles{
                text
                language{
                  id
                  name
                  code
                }
              }
              image {
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
              cardDates{
                _rawText(resolveReferences: { maxDepth: 20 })
                language{
                  id
                  name
                  code
                }
              }
              current
              slug {
                current
              }
          
        }
      }
    }
  }
`;

const ExhibitionPage = props => {
  const { data, errors, location } = props;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const exhibitions = (data || {}).exhibitions.edges
  const page = (data || {}).page.edges[0].node
  const languagePhrases = (data || {}).languagePhrases?.edges;
 

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
      }else if(p == "location"){
        let ve = v.split("%20").join(" ") //handle spaces
        setCurrentLocation(ve)
      }
    })
  }
    }, []);



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
/* Create artist cards based on current filters */

  let exhibitionCards = []
  exhibitions.sort((a,b) => a.node.order - b.node.order); // b - a for reverse sort

  exhibitions.map(function(node, index){
    let image;
    let show = false;
    let absolutelynoshow = true;

    let projectLinks = []

    projectLinks.push(<BlockContent blocks={ node.node.cardDates}/>)
    if(node.node.current){
      exhibitionCards.push( <Card languagePhrases={languagePhrases} globalLanguages={globalLanguages} slug={"/exhibition/"+node.node.slug.current} image={node.node.image} descriptions={projectLinks} titles={node.node.titles} languagePhrases={languagePhrases} globalLanguages={globalLanguages} key={index} banner={true} /> )

    }else{
      exhibitionCards.push( <Card slug={"/exhibition/"+node.node.slug.current} image={node.node.image} descriptions={projectLinks} titles={node.node.titles} languagePhrases={languagePhrases} globalLanguages={globalLanguages} key={index}/> )
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
          <Map></Map>
          <br/>
          <div>
          <div className={styles.oneColumn}>

          {exhibitionCards}
          {exhibitionCards.length < 1 &&
            <TranslatedPhrase translations={languagePhrases} phrase={'noResults'}/>
          }
       
          </div>
   
          </div>
          
        </Container>
      </Layout>
      
    </>
  );
};

export default ExhibitionPage;
