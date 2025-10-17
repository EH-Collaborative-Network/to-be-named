import React, { useState } from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import BlockContent from "../components/TranslationHelpers/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Card from "../components/Card/card";
import Layout from "../containers/layout";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import * as cardStyles from "../components/Card/card.module.css";
import { Link } from "@reach/router";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import sanityClient from "@sanity/client";

const client = sanityClient({
    projectId: '46orb7yp',
    dataset: 'production',
    apiVersion: '2022-03-25',
    token: process.env.SANITY_TOKEN,
    useCdn: true,
})

export const query = graphql`
  query PedagogyPageQuery {
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
        }
      }
    }
    ap: allSanityPage(filter: {slug: {current: {eq: "pedagogy"}}}) {
      edges {
        node {
          id
          _id
          titles{
            text
            language{
              code
            }
          }
          bodies{
            _rawText
            language{
              code
            }
          }
        }
      }
    }
    pedagogies: allSanityPedagogy {
      edges {
        node {
          name
          slug {
            current
          }
          titles{
            text
            language{
              code
            }
          }
          mainImage {
            crop {
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
        }
      }
    }
  }
`;

const PedagogyPage = props => {
    const { data, errors } = props;

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
    const pedagogies = (data || {}).pedagogies.edges;
    const ap = (data || {}).ap.edges[0]?.node?.bodies;
    
    let previewQuery = '*[_id == "drafts.' + (data || {}).ap.edges[0]?.node?._id + '"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, _rawText}}'
    const location = useLocation();
    let preview = false;
    const [previewData, setPreviewData] = useState(false)
    
    if (location?.search) {
        preview = queryString.parse(location.search).preview;
    }
    
    if (preview && !previewData) {
        const fetchData = async () => {
            setPreviewData(await client.fetch(previewQuery).then((data) => {
                return (data[0]);
            }))
        }
        fetchData()
    }
    
    const titles = (data || {}).ap.edges[0]?.node?.titles;

    // Create pedagogy cards
    let pedagogyCards = pedagogies.map((node, index) => {
        let image = node.node.mainImage;
        
        let pedagogyLinks = [
            <Link key={index} to={"/pedagogy/" + node.node.slug.current}>
                <TranslatedTitle translations={node.node.titles} />
            </Link>
        ];

        return (
            <Card 
                slug={"/pedagogy/" + node.node.slug.current} 
                image={image} 
                descriptions={pedagogyLinks} 
                titles={node.node.titles} 
                languagePhrases={languagePhrases} 
                globalLanguages={globalLanguages} 
                key={index} 
            />
        );
    });

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
                    <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : titles} /></h1>
                    <div className="top-text people-page one-column">
                        <BlockContent 
                            languagePhrases={languagePhrases} 
                            blocks={(preview && previewData) ? previewData.bodies : ap} 
                            globalLanguages={globalLanguages} 
                        />
                    </div>
                    <br />
                    <div className={cardStyles.cardWrapper}>
                        {pedagogyCards}
                    </div>
                </Container>
            </Layout>
        </>
    );
};

export default PedagogyPage;
