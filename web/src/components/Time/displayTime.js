import React from "react";
import LangContext from "../context/lang";
import translate from "../TranslationHelpers/translate";
import createDateTime from "./createDateTime"
import translateTime from "./translateTime"
import timeZoneList from "./timeZoneList"


const DisplayTime = ({ event, offset = null, languagePhrases }) => {
  

    
  return(
    <LangContext.Consumer>
    { theme => {
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
      let timeZone = event.timeZone.offset
      let startDate = event.startDate.date
      let startTime = event.startDate.time
      let endDate = event.endDate?.date || event.startDate.date
      let endTime = event.endDate?.time || event.startDate.time
      let start = createDateTime(startDate, startTime, timeZone);
      let end = createDateTime(endDate, endTime, timeZone);
      let onlyTime = false;
      let onlyDate = false;
   
      if(start.getDate() == end.getDate()){
        onlyTime = true;
      }else{
        onlyDate = true;
      }
      let startFormatted = translateTime(start, locale, offset, onlyDate);
      let endFormatted = translateTime(end, locale, offset, onlyDate, onlyTime);
      return(
        <>{startFormatted} - {endFormatted}</>
      )
    }}
    </LangContext.Consumer>
  )
};


export default DisplayTime;
