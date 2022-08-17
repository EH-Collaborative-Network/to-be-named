import React, {useState}  from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import BlockContent from "../components/TranslationHelpers/block-content";
import { useLocation } from '@reach/router';
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import * as styles from "../components/Card/card.module.css";
import Card from "../components/Card/card"
import { Link } from "@reach/router";
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";


export const query = graphql`
  query ArtistAuthorQuery($id: String!) {
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
          inExhibition
          inVolume
          upcomingEvents
          researchThreads
          availableIn
          search
        }
      }
    }
    artist: sanityArtistAuthor(id: { eq: $id }) {
      id
      name
      image {
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
      bios{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          name
          code
        }
      }
      locationDisplay{
        text
        language{
          id
          name
          code
        }
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
        exhibition
        volume
      }
      slug {
        current
      }

      
    }
  }
`;

const ArtistAuthorTemplate = props => {
  const { data, errors } = props;
  const page = data && data.artist;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  let exhibitionWorks = [];
  let editionWorks = [];
  const languagePhrases = (data || {}).languagePhrases?.edges;
  let previewQuery = '*[_id == "drafts.'+ page._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}, media[]{image{asset->, caption},embed,pdf{asset->, caption}}}'
  const location = useLocation();
  let preview = false;

  for(let i = 0; i < page.projects.length; i++){
    if(page.projects[i].exhibition){
      exhibitionWorks.push(page.projects[i])
    }else if(page.projects[i].volume){
      editionWorks.push(page.projects[i])
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
        <h1>{page.name}</h1>
        {page.locationDisplay &&
        <div className='top-title'>
          <TranslatedTitle translations={(preview && previewData) ? previewData.locationDisplay : page.locationDisplay}/>
        </div>
        }
        <div className="top-text one-column"><BlockContent blocks={(preview && previewData) ? previewData.bios : page.bios}/></div>
        {(exhibitionWorks.length > 0) &&
        <>
        <h4><TranslatedPhrase translations={languagePhrases} phrase={'inExhibition'}/>:</h4>
        <div className={styles.oneColumn}>
          {exhibitionWorks.map(function(node, index){
            let description = (<Link to={"/project/"+node.slug.current}><h2><TranslatedTitle translations={node.titles}/></h2></Link>)
            return <Card slug={"/project/"+node.slug.current} image={node.mainImage} descriptions={description} languagePhrases={languagePhrases} globalLanguages={globalLanguages}  key={index}/> 
          })}
        </div>
        </>
        }
        {(editionWorks.length > 0) &&
        <>
        <h4><TranslatedPhrase translations={languagePhrases} phrase={'inVolume'}/>:</h4>
        <div className={styles.oneColumn}>
          {editionWorks.map(function(node, index){
            let description = (<Link to={"/project/"+node.slug.current}><h2><TranslatedTitle translations={node.titles}/></h2></Link>)
            return <Card slug={"/project/"+node.slug.current} image={node.mainImage} descriptions={description} languagePhrases={languagePhrases} globalLanguages={globalLanguages}  key={index}/> 
          })}
        </div>
        </>
        }
      </Container>
    </Layout>
  );
};

export default ArtistAuthorTemplate;
