import React, {useState}  from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import BlockContent from "../components/TranslationHelpers/block-content";
import { useLocation } from '@reach/router';
import Masonry from "../components/Masonry/masonry";
import {Link} from "gatsby";
import * as styles from "../components/Time/time.module.css"
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import createDateTime from "../components/Time/createDateTime";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import { id } from "date-fns/locale";
import TimeZoneList from "../components/Time/timeZoneList";
import LangContext from "../components/context/lang";
import translateTime from "../components/Time/translateTime";

export const query = graphql`
  query EventQuery($id: String!) {
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
          timezone
          exhibition
          upcomingEvents
          researchThreads
          availableIn
          search
        }
      }
    }
  
    event: sanityEvent(id: { eq: $id }) {
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
      startDate{
        date
        time
      }
      endDate{
        date
        time
      }
      timeZone{
        name
        offset
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

const EventTemplate = props => {
  const { data, errors } = props;
  const page = data && data.event;
  const [offset, setOffset] = useState(null);
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  let previewQuery = '*[_id == "drafts.'+ page._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}, media[]{image{asset->, caption},embed,pdf{asset->, caption}}}'
  const location = useLocation();
  let preview = false;
  let start = page.startDate
  let end = page.endDate || page.startDate
  let sd = createDateTime(start.date, start.time, page.timeZone.offset);
  let ed = createDateTime(end.date, end.time, page.timeZone.offset);
  let multiday = true;
  
  function handleTime(e){
    let value = e.target.value;
    if(value){
      let value = parseInt(value);
    }
    setOffset(value);
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
        <LangContext.Consumer>
            {theme => {
                let lang = theme.lang
                let locale = 'en-GB';
                if(languagePhrases){
                    if(lang){
                    languagePhrases.forEach(element => {
                        element = element.node
                        if(element.code == lang){
                            locale = element.locale
                        }
                    });
                    } else {
                    translations.forEach(element => {
                        element = element.node
                        if(element.name == "English"){
                        locale = element.locale
                        }
                    });
                    }
                }
                let dateDisplay;
                if(sd.getDate() == ed.getDate()){
                    multiday = false;
                }
                if(!multiday){
                    dateDisplay = <p>{translateTime(sd, locale, offset, false, false, true)} - { translateTime(ed, locale, offset, false, true, true)}</p>
                }else{
                    dateDisplay = <p>{translateTime(sd, locale, offset, false, false, true)} - { translateTime(ed, locale, offset, false, false, true)}</p>
                }
                    return(<span className="top-title">{dateDisplay}</span>)
            }}
        </LangContext.Consumer>
        <div className={styles.selectWrapper}>
              <label className={styles.label} for="change-tz">{<TranslatedPhrase translations={languagePhrases} phrase={'timezone'}/>}:</label>
              <select className={styles.select} id="change-tz" onChange={handleTime}>
                <TimeZoneList />
              </select>
            </div>
        <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : page.titles}/></h1>
        <div className="top-text one-column"><BlockContent blocks={(preview && previewData) ? previewData.descriptions : page.descriptions}/></div>
        {page.media?.length > 0 &&
           <Masonry media={(preview && previewData) ? previewData.media : page.media}/>
        }
      </Container>
    </Layout>
  );
};

export default EventTemplate;
