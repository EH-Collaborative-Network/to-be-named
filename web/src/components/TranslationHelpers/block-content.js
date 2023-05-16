import { PortableText } from "@portabletext/react";
import React, { useState } from "react";
import LangContext from '../context/lang.js'
import { Figure } from "../Figure/figure";
import MediaItem from "../MediaItem/mediaItem"
import { Link } from "gatsby";
import TranslatedPhrase from "./translatedPhrase.js";
import * as styles from "./block.module.css";
import Person from "../Person/person"

const serializers = {
  types: {
    figure: Figure
  },
  marks: {
    link: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          style={{ textDecoration: 'underline' }}
        >
          {children}
        </a>
      ) : (
        <a href={href} style={{ textDecoration: 'underline' }}>
          {children}
        </a>
      );
    },
  },
};

const components = {
  marks:{
    internalLink: ({value, children}) => {
      const target = "/" + value?.reference?.slug?.current
      let middle = value?.reference?._type
      if(middle == "newsItem"){
        middle = "news"
      }else if(middle == "learningResource"){
        middle = "learning-resource"
      }else if(middle == "workingGroup"){
        middle = "working-group"
      }else if(middle == "researchThread"){
        middle = "research-thread"
      } 
      middle = "/"+middle;
      if(middle == "/page"){
        middle = ""
      }
      
      return (
        <Link to={middle +target}>
          {children}
        </Link>
      )
    },
    imageLink: ({ value, children }) => {
      
      return (
        <Link className="image-link" to={value?.href}>
          <div className="wrapper"><MediaItem media={value?.image}/></div>
        </Link>
      )
    },
    person: ({ value, children }) => {
      let person = {};
      person.node = value.reference;
      return (
        <a className={styles.blockPerson}><Person blue={true} hideArrow={true} person={person.node} key={""}/></a>
      );
    },
    media: ({ value, children }) => {
      
      if(value) { 
        return (<div className="wrapper"><MediaItem media={value}/></div>)
      } else { return null }
    }
  }
}

const BlockContent = ({ blocks, globalLanguages, languagePhrases }) => {
  const [adhoc, setAdhoc] = useState(null);
  const [status, setStatus] = useState(null);
  const [special, setSpecial] = useState(true);
  let language ='';
  let defaultLangs = [];
  let adhocLangs = [];
  globalLanguages?.map(function(node,index){
    defaultLangs.push(node.code)
  })
  return(
    <LangContext.Consumer>
    { theme => {
      let translation = []
      let lang = theme.lang;
      if(!status){
        setStatus(lang)
      }
      if(blocks){
        let unfilteredLangs = []
        /*Adhoc translations */

        blocks.forEach(element => {
          if(!defaultLangs.includes(element.language.code)){
            unfilteredLangs.push(element)
          }
        })
        unfilteredLangs.forEach(node=>{
          if(!adhocLangs.includes(node)){
            adhocLangs.push(node)
          }
        })
    
        if(lang){
          blocks.forEach(element => {
            if(element.language.code == lang){
              language = element.language.name
              
              if(element._rawText){
                translation = element._rawText
              }else if(element.text){
                translation = element.text
              }else{
                translation = ""
              }
              
            }
            
          });
        } else {
          blocks.forEach(element => {
            if(element.language.name == "English"){
              language = "English"
              translation = element._rawText

            }
            
          });
        }

        if(translation.length < 1){
          setSpecial(true);
          blocks.forEach(element => {
            if(element.language.name == "English"){
              translation = element._rawText
              language = "English"
            }

          });
        } 
      }
    
      function handler(code){
        if(!code){
          setAdhoc(null)
          setStatus(lang)
        }
        if(code == lang){
          setAdhoc(null)
          setStatus(lang)
        }
        
        blocks.map(function(node,index){
      
          if(node.language.code == code){
            setAdhoc(node._rawText)
            setStatus(node.language.code)
          }
        })
      }


      return(
        <>
        <PortableText value={adhoc ? adhoc : translation} components={components} serializers={serializers} />
        { adhocLangs.map(function(node, index){
          if(status != node.language.code){
          return(<div className="blue-button red-color" onClick={()=>handler(node.language.code)}><TranslatedPhrase override={node.language.code} translations={languagePhrases} phrase={"availableIn"}/>{" " + node.language.name+"→"}</div>)
          }
        })
        }
        {((adhocLangs.length > 0) && status != lang && (special && (status !== "en"))) &&
          <div className="blue-button red-color" onClick={()=>handler(lang)}><TranslatedPhrase override={lang} translations={languagePhrases} phrase={"availableIn"}/>{" "+language+"→"}</div>
        }
        </>
      )
    }}
    </LangContext.Consumer>
  )
};

export default BlockContent;
