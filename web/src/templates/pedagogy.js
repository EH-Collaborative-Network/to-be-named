import React, { useState } from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import BlockContent from "../components/TranslationHelpers/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
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
  query PedagogyTemplateQuery($id: String!) {
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
    pedagogy: sanityPedagogy(id: { eq: $id }) {
      _id
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
      descriptions{
        _rawText
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
`;

const PedagogyTemplate = props => {
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
    const pedagogy = (data || {}).pedagogy;
    const location = useLocation();
    let preview = false;
    const [previewData, setPreviewData] = useState(false)
    
    if (location?.search) {
        preview = queryString.parse(location.search).preview;
    }
    
    if (preview && !previewData) {
        let previewQuery = '*[_id == "drafts.' + pedagogy._id + '"]{ _id, name, titles[]{language->{code}, text}, descriptions[]{language->{code}, _rawText}, mainImage}'
        const fetchData = async () => {
            setPreviewData(await client.fetch(previewQuery).then((data) => {
                return (data[0]);
            }))
        }
        fetchData()
    }
    
    const languagePhrases = (data || {}).languagePhrases?.edges;
    const pedagogyData = (preview && previewData) ? previewData : pedagogy;

    if (!site) {
        throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
        );
    }

    return (
        <>
            <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
                <SEO title={pedagogyData.name} description={site.description} keywords={site.keywords} />
                <Container>
                    <h1><TranslatedTitle translations={pedagogyData.titles} /></h1>
                    <div className="pedagogy-description">
                        <BlockContent 
                            languagePhrases={languagePhrases} 
                            blocks={pedagogyData.descriptions} 
                            globalLanguages={globalLanguages} 
                        />
                    </div>
                </Container>
            </Layout>
        </>
    );
};

export default PedagogyTemplate;
