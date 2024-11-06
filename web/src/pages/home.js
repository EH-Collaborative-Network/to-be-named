import React, {useState}  from "react";
import { graphql } from "gatsby";
import { useLocation } from '@reach/router';
import BlockContent from "../components/TranslationHelpers/block-content";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Carousel from "../components/Carousel/carousel"
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query HomePageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      credits{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          name
          code
        }
      }
      languages {
        name
        code
      }
      projects{
        id
        slug{
          current
        }
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
          hotspot {
            _key
            _type
            x
            y
            height
            width
          }
          asset {
            _id
          }
        }
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
          peopleAndPartners
          contact
          artworkIndex
          upcomingEvents
          researchThreads
          availableIn
          search
        }
      }
    }
    home: allSanityPage(filter: {slug: {current: {eq: "home"}}}) {
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
  }
`;

const HomePage = props => {
  const { data, errors } = props;
  const page = data && data.home.edges[0]?.node;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  let previewQuery = '*[_id == "drafts.'+ page._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}, media[]{image{asset->, caption},embed,pdf{asset->, caption}}}'
  const location = useLocation();
  let preview = false;
  const [previewData, setPreviewData] = useState(false)

  if(preview && !previewData){
    const fetchData = async () => {
      setPreviewData(await client.fetch(previewQuery).then((data) => {
        return(data[0]);
      }))
    }
    fetchData()
  }
  let media = []

  site.projects?.map(function(project,index){
    let x = {}
    x.embed = null
    x.pdf = null
    x.image = project.mainImage
    media.push(x);
  })

  return (
    <Layout navTranslations={languagePhrases} globalLanguages={globalLanguages} >
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        {/* <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : page.titles}/></h1> */}
        <div className="top-text one-column homepage-special-text"><BlockContent languagePhrases={languagePhrases} blocks={(preview && previewData) ? previewData.bodies : page.bodies} globalLanguages={globalLanguages}/><br></br>
      {media?.length > 0 &&
           <Carousel imageOnly={false} media={(preview && previewData) ? previewData.media : media}/>
        }</div>
        <div className="bottom-text"><br></br><BlockContent languagePhrases={languagePhrases} blocks={(preview && previewData) ? previewData.credits : site.credits} globalLanguages={globalLanguages}/></div>
      </Container>
    </Layout>
  );
};

export default HomePage;
