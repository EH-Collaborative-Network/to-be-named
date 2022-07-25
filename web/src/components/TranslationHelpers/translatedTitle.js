import React from "react";
import LangContext from "../context/lang";
const TranslatedTitle = ({ translations }) => {
 
  return(
    <LangContext.Consumer>
    { theme => {
      let translation = []


      let lang = theme.lang;
      if(translations){
      

        if(lang){
          translations.forEach(element => {

            if(element.language.code == lang){
              
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
          translations.forEach(element => {
            if(element.language.code == "en"){
              translation = element.text
            }
          });
        }
        
        if(translation.length < 1){
          translations.forEach(element => {
            if(element.language.code == "en"){
              translation = element.text
            }
          });
        }
      }
      return(
        <>{translation}</>
      )
    }}
    </LangContext.Consumer>
  )
};


export default TranslatedTitle;
