import React from "react";
import LangContext from "../context/lang";
import ReactHtmlParser from 'react-html-parser';

const TranslatedPhrase = ({ translations, phrase, override }) => {

  return(
    <LangContext.Consumer>
    { theme => {
      let translation = []

      let lang = theme.lang;
      if(phrase == "availableIn" && override){
        lang = override;
      }
      if(translations){
      

        if(lang){
          translations.forEach(element => {
            element = element.node
            if(element.code == lang){
              

                translation = element[phrase]
      
              
            }
          });
        } else {
          translations.forEach(element => {
            element = element.node
            if(element.name == "English"){
              translation = element[phrase]
            }
          });
        }
        
        if(!translation || translation.length < 1){
          translations.forEach(element => {
            element = element.node
            if(element.code == "en"){
              translation = element[phrase]
            }
          });
        }
      }

      return(
        <>{ReactHtmlParser(translation)}</>
      )
    }}
    </LangContext.Consumer>
  )
};


export default TranslatedPhrase;
