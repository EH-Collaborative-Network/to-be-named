import React from "react";
// import MediaItem from "./MediaItem";
import { Link } from "@reach/router";
import * as styles from "./related.module.css";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import TranslatedPhrase from "../TranslationHelpers/translatedPhrase";
import createDateTime from "../Time/createDateTime";
import translateTime from "../Time/translateTime";
import LangContext from "../context/lang";
// import { FundingOpportunity } from "./fundingOpportunity"
const RelatedBlock = ({node, languagePhrases, opps}) => {
if(node){
    let locale = 'en-GB';
    let offset = null;
      
  return(
    <div aria-hidden="true" className={styles.root}>
        <div className="two-column">
        {(node.researchThreads?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"relatedResearchThreads"} translations={languagePhrases}/></h4>
            <ul className={styles.special}>
               {
                   node.researchThreads.map(function(node,index){
                       return(
                           <li key={index}><Link className="blue-button" to={"/research-thread/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </section>
        }
        {(node.partners?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"relatedPartners"} translations={languagePhrases}/></h4>
            <ul className={styles.special}>
               {
                   node.partners.map(function(node,index){
                       return(
                           <li key={index}><Link className="blue-button" to={"/partner/"+node.slug?.current}>{node.name}→</Link></li>
                       )
                   })
                }            
            </ul>
            </section>
        }
        {(node.events?.length > 0) &&
            <LangContext.Consumer>
            {theme => {
               let lang = theme.lang
               
               let sortedEvents = node.events.sort((a,b) => createDateTime(b.startDate?.date, b.startDate?.time, b.timeZone?.offset).getDate() - createDateTime(a.startDate?.date, a.startDate?.time, a.timeZone?.offset).getDate()); 
        
               if(languagePhrases){
                if(lang){
                  languagePhrases.forEach(element => {
                    element = element.node
                    if(element.code == lang){
                      
        
                        locale = element.locale
              
                      
                    }
                  });
                } else {
                  languagePhrases.forEach(element => {
                    element = element.node
                    if(element.name == "English"){
                      locale = element.locale
                    }
                  });
                }
                
        
              }
                return(
            <section>
            <h4><TranslatedPhrase phrase={"relatedEvents"} translations={languagePhrases}/></h4>
            <ul>
               {
                   sortedEvents.map(function(node,index){
                    let start = node.startDate
                    let end = node.endDate || node.startDate;
                    
                    let sd = createDateTime(start.date, start.time, node.timeZone.offset);
                    let ed = createDateTime(end.date, end.time, node.timeZone.offset);
                    let multi = false;
                    let today = new Date();
                    let upcoming = false;
                    let current = false;
                    if((sd.getDate() == today.getDate() || sd.getDate() > today.getDate()) && sd.getFullYear() == today.getFullYear() && sd.getMonth() == today.getMonth()){
                        upcoming = true;
                    }
                    if(((sd.getDate() == today.getDate() || sd.getDate() < today.getDate()) && (ed.getDate() > today.getDate())) && sd.getFullYear() == today.getFullYear() && sd.getMonth() == today.getMonth()){
                        current = true;
                    }
                    if(sd.getDate() != ed.getDate()){
                        multi = true
                    }

                       return(
                           <li className="blue-button" key={index}><Link to={"/event/"+node.slug?.current}>
                           {(multi && upcoming)  &&
                             <sup className={styles.date}>*<TranslatedPhrase phrase={"upcomingEvents"} translations={languagePhrases}/> - {translateTime(sd, locale, offset, true, false, true)} - { translateTime(ed, locale, offset, true, false, true)}</sup>
                           }
                           {(!multi && upcoming) &&
                             <sup className={styles.date}>*<TranslatedPhrase phrase={"upcomingEvents"} translations={languagePhrases}/> - {translateTime(sd, locale, offset, true, false, true)}</sup>
                           }
                           {(!multi && !upcoming && current) &&
                             <sup className={styles.date}>*<TranslatedPhrase phrase={"currentEvents"} translations={languagePhrases}/> - {translateTime(sd, locale, offset, true, false, true)}</sup>
                           }
                           {(!multi && !upcoming && !current) &&
                            <sup className={styles.date}><TranslatedPhrase phrase={"pastEvents"} translations={languagePhrases}/></sup>
                            }
                           <TranslatedTitle translations={node.titles}/>→
                           </Link></li>
                       )
                   })
                }            
            </ul>
            </section>
                )}}
            </LangContext.Consumer>
        }
        {(node.newsItems?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"relatedNews"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.newsItems.map(function(node,index){
                       return(
                           <li key={index}><Link className="blue-button" to={"/news/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </section>
        }
        
        {(node.courses?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"relatedCourses"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.courses.map(function(node,index){
                       return(
                           <li key={index}><Link className="blue-button" to={"/course/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </section>
        }
        {(node.workingGroups?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"relatedWorkingGroups"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.workingGroups.map(function(node,index){
                       return(
                           <li key={index}><Link className="blue-button" to={"/working-group/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </section>
        }
        {(node.projects?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"relatedProjects"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.projects.map(function(node,index){
                       return(
                           <li key={index}><Link className="blue-button" to={"/project/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </section>
        }
        
         {(node.learningResources?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"relatedLearningResources"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.learningResources.map(function(node,index){
                       return(
                           <li key={index}><Link className="blue-button" to={"/learning-resource/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </section>
        }
         {(opps?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"fundingOpportunities"} translations={languagePhrases}/></h4>
            <ul>
            {
                opps.map(function(node,index){
                    return(
                        <li key={index}><Link className="blue-button" to={"/funding/"}><TranslatedTitle translations={node.node.titles}/>→</Link></li>
                    )
                })
            }            
            </ul>
            </section>
        }
        </div>
       
    </div>
  )
}
};

export default RelatedBlock;
