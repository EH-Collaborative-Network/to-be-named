import { useFlexSearch } from 'react-use-flexsearch'
import React from "react";
import { graphql } from "gatsby";
import { useState } from 'react';
import Container from "../components/Container/container";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import BlockContent from "../components/TranslationHelpers/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import { Link } from '@reach/router';
import Layout from "../containers/layout";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle"
import TranslatedPhrase from '../components/TranslationHelpers/translatedPhrase';
import { useEffect } from 'react';
import * as styles from "../components/Search/search.module.css";
import translate from "../components/TranslationHelpers/translate";
import LangContext from '../components/context/lang';

export const query = graphql`
  query SearchPageQuery {
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
                project
                contact
                peopleAndPartners
                artworkIndex
                exhibition
                upcomingEvents
                researchThreads
                availableIn
                search
                results
                noResults
            }
        }
    }
    items: localSearchItems {
        store
        index
    }
  }
`;

const Search = props => {
  const { data, errors } = props;
  const location = useLocation();

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  const store = (data || {}).items?.store
  const index = (data || {}).items?.index
  const [query, setQuery] = useState(null);
  const results = index ? useFlexSearch(query, index, store) : []
  
  useEffect(()=>{
    
  },[])

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  function handleSearch(e){
    let el = e.target;
    let parent = el.closest("div");
    let phrase = parent.querySelector("input").value
    setQuery(phrase)
  }
  function handleEnter(e){
    if(e.key == "Enter"){
      let el = e.target;
      let parent = el.closest("div");
      let phrase = parent.querySelector("input").value
      setQuery(phrase)
    }
  }
  return (
      <>  
      <Layout navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedPhrase phrase={"search"} translations={languagePhrases}/></h1>
          <div className={styles.searchWrapper}>
          <LangContext.Consumer>
            {theme => {
                    return(
                    <input type="text" onKeyDown={handleEnter} placeholder={translate(languagePhrases, "search", theme)} />
                )}}
            </LangContext.Consumer>
            <button onClick={handleSearch}>
              <svg width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0023 11.2C22.0023 16.4901 17.4814 20.9 11.7511 20.9C6.02087 20.9 1.5 16.4901 1.5 11.2C1.5 5.90992 6.02087 1.5 11.7511 1.5C17.4814 1.5 22.0023 5.90992 22.0023 11.2Z" stroke="#333333" stroke-width="3"/>
              <path d="M27.9786 27.9995C28.5976 28.5501 29.5453 28.4943 30.0955 27.8749C30.6456 27.2556 30.5898 26.3071 29.9709 25.7565L27.9786 27.9995ZM17.9062 19.0395L27.9786 27.9995L29.9709 25.7565L19.8985 16.7965L17.9062 19.0395Z" fill="#333333"/>
              </svg>
            </button>
          </div>
          
          <h4><TranslatedPhrase phrase={"results"} translations={languagePhrases} />:</h4>
          {(query?.length > 0 && results.length == 0) &&
            <em id="no-results"><TranslatedPhrase translations={languagePhrases} phrase={"noResults"}/> "{query}"</em>
          }
          <div className={styles.resultsWrapper}>
          {

              results.map(function(node,index){
                let slug = node.slug?.current || "";
                    switch (node.type) {
                      case 'event':
                        slug = "/event/"+slug;
                        break;
                      case 'project':
                        slug = "/project/"+slug;
                        break;
                    case 'exhibition':
                        slug = "/exhibition/"+slug;
                        break;
                      case 'researchThread':
                        slug = "/thread/"+slug;
                        break;
                      default:
                        slug = slug;
                    }
                    return(
                        <div key={index}>
                          <Link to={slug}>
                            
                            <sup><TranslatedPhrase translations={languagePhrases} phrase={node.type}/></sup>
                            <h4>{
                              node.type == "artistAuthor" ? 
                              (<>{node.name}</>)
                              :
                              (<><TranslatedTitle translations={node.titles}/>→</>)
                            }</h4>
                            <div><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={node.descriptions}/></div>
                          </Link>
                        </div>
                    )
                
                
              })
          }
          </div>
        </Container>
      </Layout>
      
    </>
  );
};

export default Search;
