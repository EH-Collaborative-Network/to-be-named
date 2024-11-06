import React, {useState, useEffect, useRef} from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import BlockContent from "../components/TranslationHelpers/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { useLocation } from '@reach/router';
import Feed from "../components/Feed/feed";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: '46orb7yp',
  dataset: 'production',
  apiVersion: '2022-03-25', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

export const query = graphql`
  query ContactPageQuery {
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
          contact
          aboutProject
          artworkIndex
          exhibition
          peopleAndPartners
          upcomingEvents
          researchThreads
          availableIn
          search
        }
      }
    }
    ap: allSanityPage(filter: {slug: {current: {eq: "contact"}}}) {
      edges {
        node {
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

const ContactPage = props => {
  const { data, errors } = props;
  const [feeds, setFeedsData] = useState(null)
  let token = process.env.GATSBY_INSTAGRAM_TOKEN

  useEffect(() => {
    // this is to avoid memory leaks
    
    async function fetchInstagramPost () {
          await fetch('https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&access_token='+ token,{}
          ).then(response => response.json())
          .then(data => {
            setFeedsData(data.data)
          })
          .catch((err) => {
            console.log(err)
          })
        }
        
        // manually call the fecth function 
        fetchInstagramPost();

        return () => {
            // cancel pending fetch request on component unmount
            // abortController.abort(); 
        };
    }, [])
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const ap = (data || {}).ap.edges[0]?.node?.bodies;
  let previewQuery = '*[_id == "drafts.'+ (data || {}).ap.edges[0]?.node?._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}}'
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

 
  
  const titles = (data || {}).ap.edges[0]?.node?.titles;
  const languagePhrases = (data || {}).languagePhrases?.edges;

  

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
          <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : titles}/></h1>
          <div className="top-text one-column"><BlockContent languagePhrases={languagePhrases} blocks={(preview && previewData) ? previewData.bodies : ap} globalLanguages={globalLanguages}/></div>
          <br/>
          <div id='instagram-wrapper'>
          {feeds?.map((feed) => {
                if(feed.media_type != "VIDEO"){
                 return ( <Feed key={feed.id} feed={feed} />)
                }
                
              })}
          </div>
        </Container>
      </Layout>
      
    </>
  );
};

export default ContactPage;
