import React, {useState}  from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import BlockContent from "../components/TranslationHelpers/block-content";
import { useLocation } from '@reach/router';
import Masonry from "../components/Masonry/Masonry";
import {Link} from "gatsby";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import { id } from "date-fns/locale";

export const query = graphql`
  query ProjectQuery($id: String!) {
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
    artist: allSanityArtistAuthor(filter: {projects: {elemMatch: {id:{eq: $id}} }}){
      edges{
        node{
          name
          slug{
            current
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
          }
        }
      }
    }
    project: sanityProject(id: { eq: $id }) {
      id
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
      media{
        embed{
          embed
          altText
          caption
        }
        pdf{
          altText
          caption
          asset {
            url
            _id
          }
        }
        image{
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
          altText
        }
      }
      descriptions{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          name
          code
        }
      }
      titles{
        text
        language{
          id
          name
          code
        }
      }
      slug {
        current
      }

      
    }
  }
`;

const ProjectTemplate = props => {
  const { data, errors } = props;
  const page = data && data.project;
  const creator = data && data.artist?.edges[0]?.node
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  let previewQuery = '*[_id == "drafts.'+ page._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}, media[]{image{asset->, caption},embed,pdf{asset->, caption}}}'
  const location = useLocation();
  let preview = false;
  let next = false;
  if(creator?.projects?.length > 1){
  for(let i = 0; i < creator.projects.length; i++){
      if(creator.projects[i].id == page.id){
        if(i == creator.projects.length - 1){
          next = 0;
        }else{
          next = i + 1;
        }
      }
    }
  }
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
        {creator &&
        <div className='top-title'>
          <Link to={"/creator/" + creator.slug.current }>{creator.name}</Link>
          {(next !== false) &&
            <Link to={"/project/" + creator.projects[next].slug.current }><TranslatedTitle translations={creator.projects[next].titles}/>→</Link>
          }
        </div>
        }
        <h1 style={{"marginTop":"0"}}><TranslatedTitle translations={(preview && previewData) ? previewData.titles : page.titles}/></h1>
        <div className="top-text one-column"><BlockContent blocks={(preview && previewData) ? previewData.descriptions : page.descriptions}/></div>
        {page.media?.length > 0 &&
           <Masonry media={(preview && previewData) ? previewData.media : page.media}/>
        }
      </Container>
    </Layout>
  );
};

export default ProjectTemplate;