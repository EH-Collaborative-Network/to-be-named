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




  return (
      <>  
      <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedPhrase translations={languagePhrases} phrase={'volume'}/></h1>
          <div className="top-text one-column"><BlockContent blocks={page.bodies} languagePhrases={languagePhrases} globalLanguages={globalLanguages}/></div>
          <br/>
     
          
        </Container>
      </Layout>
      
    </>
  );
};

export default VolumePage;
