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
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import { id } from "date-fns/locale";
import Person from "../components/Person/person";
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
          contact
          artworkIndex
          peopleAndPartners
          seeAllArtworks
          upcomingEvents
          researchThreads
          availableIn
          search
        }
      }
    }
    project: sanityProject(id: { eq: $id }) {
      id
      artists {
        id
          _id
          name
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
            caption
          }
          bios{
            _rawText(resolveReferences: { maxDepth: 20 })
            language{
              id
              name
              code
            }
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
      mainLink{
        url
        text
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
          caption
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
      subtitles{
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
  const people = data && data.project?.artists
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
        {people &&
        <div className='top-title'>
          <div>
          {people.map(function(node, index){
                return (
                  <a key={index}><Person person={node}></Person><br></br></a>
                );
            })}
            </div>
            {page.volume ?
                <Link to="/artwork-index" className='breadcrumb'>← <TranslatedPhrase translations={languagePhrases} phrase={'volume'}/></Link>
              : 
                <Link to="/artwork-index" className='breadcrumb'>← <TranslatedPhrase translations={languagePhrases} phrase={'seeAllArtworks'}/></Link>
              }
        </div>
        }
        <h1 className="project-title"><TranslatedTitle translations={(preview && previewData) ? previewData.titles : page.titles}/></h1>
        {(page.subtitles || page.mainLink) &&
        <div className='top-title'>
          {page.subtitles &&
          <TranslatedTitle translations={(preview && previewData) ? previewData.subtitles : page.subtitles}/>
          }
         

          </div>
        }
        <div className="top-text one-column"><BlockContent blocks={(preview && previewData) ? previewData.descriptions : page.descriptions}/> { page.mainLink &&
          <a style={{"text-decoration":"none"}} href={page.mainLink.url}>{page.mainLink.text}</a>
          }</div>
       
       {page.media?.length > 0 &&
           <Masonry media={(preview && previewData) ? previewData.media : page.media}/>
        }
      </Container>
    </Layout>
  );
};

export default ProjectTemplate;
