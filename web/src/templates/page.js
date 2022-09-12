import React, {useState} from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import BlockContent from "../components/TranslationHelpers/block-content";
import Layout from "../containers/layout";
import { useLocation } from '@reach/router';
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
export const query = graphql`
  query PageTemplateQuery($id: String!) {
    samplePage: sanityPage(id: { eq: $id }) {
      id
      slug {
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
      bodies{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          name
          code
        }
      }
      
    }
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
          search
        }
      }
    }
  }
`;

const PageTemplate = props => {
  const { data, errors } = props;
  const page = data && data.samplePage;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  let previewQuery = '*[_id == "drafts.'+ page._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}, media[]{image{asset->, caption},embed,pdf{asset->, caption}}}'
  const location = useLocation();
  let preview = false;
  const [previewData, setPreviewData] = useState(false)
  if(location?.search){
    preview = queryString.parse(location.search).preview;
  }
  if(preview && !previewData){
    const fetchData = async () => {
      setPreviewData(await client.fetch(previewQuery).then((data) => {
        return(data[0]);
      }))
    }
    fetchData()
  }
  return (
    <Layout navTranslations={languagePhrases} globalLanguages={globalLanguages} >
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : page.titles}/></h1>
        <div className="top-text about one-column"><BlockContent blocks={(preview && previewData) ? previewData.bodies : page.bodies}/></div>
        {/* {media?.length > 0 &&
           <Carousel media={(preview && previewData) ? previewData.media : researchThread.media}/>
        } */}
      </Container>
    </Layout>
  );
};

export default PageTemplate;
