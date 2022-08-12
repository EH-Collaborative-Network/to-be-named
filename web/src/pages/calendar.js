import React, {useState} from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/Container/container";
import BlockContent from "../components/TranslationHelpers/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import { Figure } from "../components/Figure/figure";
import * as styles from "../components/Time/time.module.css";
import { Link } from "@reach/router";
import LangContext from "../components/context/lang";
import TimeZoneList from "../components/Time/timeZoneList";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import DisplayTime from "../components/Time/displayTime";
import createDateTime from "../components/Time/createDateTime";
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import sanityClient from "@sanity/client";
import translateTime from "../components/Time/translateTime";
const client = sanityClient({
  projectId: '46orb7yp',
  dataset: 'production',
  apiVersion: '2022-03-25', // use current UTC date - see "specifying API version"!
  token: 'skyfnkmqWJbwvihHkx2GQByHOktPsJB6ztzSRAfi7mZWaQegg23IaNrgFXjSxrBvL5Tli1zygeDqnUMr8QSXOZLNyjjhab5HTPsgD6QnBBxcNBOUwzGyiI69x7lpMKYhxZ94dpxLwIuVRBB1Hn47wR4rPtCpf17JGCYehmiLgCpMZrX1rzZW', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})
export const query = graphql`
  query CalendarPageQuery {
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
          currentEvents
          researchThreads
          availableIn
          search
          pastEvents
          events
          timezone
        }
      }
    }
    events: allSanityEvent {
      edges {
        node {
          id
          _id
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
          timeZone{
            name
            offset
          }
          startDate{
            date
            time
          }
          endDate{
            date
            time
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

const CalendarPage = props => {
    const { data, errors } = props;
    const [offset, setOffset] = useState(null);
    if (errors) {
      return (
        <Layout>
          <GraphQLErrorList errors={errors} />
        </Layout>
      );
    }
  
    const site = (data || {}).site;
    const globalLanguages = site.languages;
    const events = (data || {}).events.edges
    const languagePhrases = (data || {}).languagePhrases?.edges;
    let upcoming = [];
    let current = [];
    let past = [];
    let today = new Date();
    function handleTime(e){
      let value = e.target.value;
      if(value){
        let value = parseInt(value);
      }
      setOffset(value);
    }

    for(let i = 0; i < events.length; i++){
        let start = events[i].node.startDate
        let end = events[i].node.endDate || events[i].node.startDate
        let sd = createDateTime(start.date, start.time, events[i].node.timeZone.offset);
        let ed = createDateTime(end.date, end.time, events[i].node.timeZone.offset);
        
        
        if(sd.getTime() <= today.getTime() && ed.getTime() >= today.getTime()){
          current.push(events[i]);
        }else if(sd.getTime() <= today.getTime() && ed.getTime() <= today.getTime()){
          past.push(events[i]);
        }else if(sd.getTime() >= today.getTime() && ed.getTime() >= today.getTime()){
          upcoming.push(events[i]);
        }
        
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
            <div className={styles.selectWrapper}>
              <label className={styles.label} for="change-tz">{<TranslatedPhrase translations={languagePhrases} phrase={'timezone'}/>}:</label>
              <select className={styles.select} id="change-tz" onChange={handleTime}>
                <TimeZoneList />
              </select>
            </div>
            <div className="top-text one-column"></div>
            <h1><TranslatedPhrase translations={languagePhrases} phrase={'currentEvents'}/>:</h1>
            <LangContext.Consumer>
            {theme => {
              let lang = theme.lang
              let eventBlocks = current.map(function(event, index){
                let start = event.node.startDate
                let end = event.node.endDate || event.node.startDate
                let sd = createDateTime(start.date, start.time, event.node.timeZone.offset);
                let ed = createDateTime(end.date, end.time, event.node.timeZone.offset);
                let multiday = true;
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
                return(
                  <div className={styles.eventBlock}>
                    <Link to={"/event/"+event.node.slug.current}><h2><TranslatedTitle translations={event.node.titles}/>→</h2></Link>
                    {dateDisplay}
                    <BlockContent blocks={event.node.descriptions} languagePhrases={languagePhrases} globalLanguages={globalLanguages}/>
                    {event.node?.mainImage &&
                        <Figure node={event.node?.mainImage}/>
                    }
                  </div>
                )

              })

              return(
                <div className={styles.eventWrapper}>
                   {eventBlocks}
                </div>
              )
            }}
            </LangContext.Consumer>
            
            <h1><TranslatedPhrase translations={languagePhrases} phrase={'upcomingEvents'}/>:</h1>
            
            <LangContext.Consumer>
            {theme => {
              let lang = theme.lang
              let eventBlocks = upcoming.map(function(event, index){
                let start = event.node.startDate
                let end = event.node.endDate || event.node.startDate
                let sd = createDateTime(start.date, start.time, event.node.timeZone.offset);
                let ed = createDateTime(end.date, end.time, event.node.timeZone.offset);
                let multiday = true;
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
                return(
                  <div className={styles.eventBlock}>
                    <Link to={"/event/"+event.node.slug.current}><h2><TranslatedTitle translations={event.node.titles}/>→</h2></Link>
                    {dateDisplay}
                    <BlockContent blocks={event.node.descriptions} languagePhrases={languagePhrases} globalLanguages={globalLanguages}/>
                    {event.node?.mainImage &&
                        <Figure node={event.node?.mainImage}/>
                    }
                  </div>
                )

              })

              return(
                <div className={styles.eventWrapper}>
                   {eventBlocks}
                </div>
              )
            }}
            </LangContext.Consumer>
            <h1><TranslatedPhrase translations={languagePhrases} phrase={'pastEvents'}/>:</h1>

            <LangContext.Consumer>
            {theme => {
              let lang = theme.lang
              let eventBlocks = past.map(function(event, index){
                let start = event.node.startDate
                let end = event.node.endDate || event.node.startDate
                let sd = createDateTime(start.date, start.time, event.node.timeZone.offset);
                let ed = createDateTime(end.date, end.time, event.node.timeZone.offset);
                let multiday = true;
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
                return(
                  <div className={styles.eventBlock}>
                    <Link to={"/event/"+event.node.slug.current}><h2><TranslatedTitle translations={event.node.titles}/>→</h2></Link>
                    {dateDisplay}
                    <BlockContent blocks={event.node.descriptions} languagePhrases={languagePhrases} globalLanguages={globalLanguages}/>
                    {event.node?.mainImage &&
                        <Figure node={event.node?.mainImage}/>
                    }
                  </div>
                )

              })

              return(
                <div className={styles.eventWrapper}>
                   {eventBlocks}
                </div>
              )
            }}
            </LangContext.Consumer>
            
            <br/>
            
          </Container>
        </Layout>
        
      </>
    );



};

export default CalendarPage;
