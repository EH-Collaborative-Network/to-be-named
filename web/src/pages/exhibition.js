import React, {useState} from "react";
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
  const { data, errors } = props;
  const [filter, setFilter] = useState("all")
  const [artistMediums, setArtistMediums] = useState([])
  const [reset, setReset] = useState(false)
  const [artistLocation, setArtistLocation] = useState("all")
  let mediums = [];
  let locations = [];
  
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
    setFilter(value);
  }
  function handleLocation(e){
    let value = e.target.value;
    setArtistLocation(value);
  }
  function handleMedium(e){
    let value = e.target.value;
    if(e.target.checked){
      setReset(false)
      setArtistMediums((prevArtistMediums) => [
        ...prevArtistMediums,
        value,
       ]);
    }else{
      if(artistMediums.length == 1){
        setReset(true)
      }else{
        setReset(false)
      }
      let newArr = artistMediums
      let idx = newArr.indexOf(value);
      if (idx != -1){
        newArr.splice(idx, 1);
      } 
      setArtistMediums(newArr)
    }
    
  }
  locations = [...new Set(locations)];
  mediums = [...new Set(mediums)];
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }


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
          {artists.map(function(node, index){
              let image;
              let show = false;
              let absolutelynoshow = true;
        
              let projectLinks = node.node.projects?.map(function(node, index){
                if(node.exhibition){
                  image = node.mainImage;
                  show = true;
                  return(
                    <Link className={styles.blockLink} to={"/project/"+node.slug.current}><TranslatedTitle translations={node.titles}/></Link>
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
                } else{
                  show = true;
                }
                if(reset){
                  console.log(reset)
                  show = true
                }
      

              if((filter == "traveling" && !node.node.traveling) || (filter == "commissioned" && !node.node.commissioned) || (filter == "regional" && !node.node.regional)){
                show = false
              }
              if(artistLocation !== "all"){
                let includesLocation = false;
                node.node.locations?.map(function(node,index){
                  if(node.name == artistLocation){
                    includesLocation == true;
                  }
                })
                if(!includesLocation){
                  show == false;
                }
              }
              
              if(show && absolutelynoshow){             
                projectLinks.unshift(<Link to={"/creator/"+node.node.slug.current}><h2>{node.node.name}→</h2></Link> )
                return <Card image={image} descriptions={projectLinks} titles={node.node.titles} languagePhrases={languagePhrases} globalLanguages={globalLanguages} key={index}/> 
              }
            })}
          </div>
          <div className={filterStyles.filter}>
          <LangContext.Consumer>
            {theme => {
              return(
              <select className={filterStyles.filterArtist} id="change-tz" onChange={handleFilter}>
                <option value={'all'}>{translate(languagePhrases, 'allArtists', theme)}</option>
                <option value={'traveling'}>{translate(languagePhrases, 'traveling', theme)}</option>
                <option value={'commissioned'}>{translate(languagePhrases, 'commissioned', theme)}</option>
                <option value={'regional'}>{translate(languagePhrases, 'regional', theme)}</option>
              </select>
              )
            }}
            </LangContext.Consumer>
       
            <h4 style={{"marginBottom":"0"}}><TranslatedPhrase translations={languagePhrases} phrase={'mediums'}/>:</h4>
            {mediums.map(function(node, index){
                return(
                  <>
                  <input className={filterStyles.checkBox} id={"check-"+index} onChange={handleMedium} value={node} type="checkbox"/>
                    <label className={filterStyles.checkBoxLabel} for={"check-"+index}>
                    {node}</label>
                  </>
                  )
              })
            }
            <LangContext.Consumer>
            {theme => {
              return(
            <select className={filterStyles.filterArtist + " " + filterStyles.filterLocation} id="change-tz" onChange={handleLocation}>
              <option value={'all'}>{translate(languagePhrases, 'allLocations', theme)}</option>
              {locations.map(function(node, index){
                return(<option value={node}>{node}</option>)
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
