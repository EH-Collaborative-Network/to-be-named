import ReactHtmlParser from 'react-html-parser';
import React from "react";
import Popover from '../Popover/popover';
import getWeekdayNames from '../TranslationHelpers/getWeekdayNames';
import getMonthNames from '../TranslationHelpers/getMonthNames';
import TranslatedTitle from '../TranslationHelpers/translatedTitle';
import * as styles from "./time.module.css"
import { Link } from 'gatsby';
import translateTime from "./translateTime";
import createDateTime from './createDateTime';
import BlockContent from '../TranslationHelpers/block-content';
import DisplayStartTime from './displayStartTime';
const CreateWeek = ({globalLanguages, translations, year, week, theme, events, offset = null }) => {

    function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
      let day = date.getDay();
      if (day == 0) day = 7; // make Sunday (0) the last day
      return day - 1;
    }

    function getRange(w) {
      let start = new Date(w.valueOf());
      let end = new Date(start.valueOf())
      let mon = new Date(new Date(start.valueOf()).setDate(new Date(start.valueOf()).getDate() + 1));
      let tues = new Date(new Date(start.valueOf()).setDate(new Date(start.valueOf()).getDate() + 2));
      let wed = new Date(new Date(start.valueOf()).setDate(new Date(start.valueOf()).getDate() + 3));
      let thur = new Date(new Date(start.valueOf()).setDate(new Date(start.valueOf()).getDate() + 4));
      let fri = new Date(new Date(start.valueOf()).setDate(new Date(start.valueOf()).getDate() + 5));
      end = new Date(end.setDate(end.getDate() + 6));
      return ([start,mon, tues, wed, thur, fri, end])
    }

    let lang = theme.lang
    let locale = 'en-GB';
    let languagePhrases = translations
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
    let weekdayNames = getWeekdayNames(translations,theme)
    let currentRange = getRange(week);    

    let sunSquares = [];
    let monSquares = [];
    let tuesSquares = [];
    let wedSquares = [];
    let thursSquares = [];
    let friSquares = [];
    let satSquares = [];

    events.forEach(function(event){
      // console.log(event)
      if(event.node.startDate && event.node.timeZone){
        let start = event.node.startDate
        let end = event.node.endDate || event.node.startDate;
        
        let sd = createDateTime(start.date, start.time, event.node.timeZone.offset);
        let ed = createDateTime(end.date, end.time, event.node.timeZone.offset);
        if(sd.getMonth() == week.getMonth() || ed.getMonth() == week.getMonth){
          
          if((sd.getDate() == currentRange[0].getDate() && sd.getMonth() == currentRange[0].getMonth()) && (sd.getFullYear() ==  currentRange[0].getFullYear()) || (ed.getDate() == currentRange[0].getDate() && ed.getMonth() == currentRange[0].getMonth()) && (ed.getFullYear() ==  currentRange[0].getFullYear()) ){
            sunSquares.push([sd,ed,event.node]);
          }
          if((sd.getDate() == currentRange[1].getDate() && sd.getMonth() == currentRange[1].getMonth()) && (sd.getFullYear() ==  currentRange[1].getFullYear()) || (ed.getDate() == currentRange[1].getDate() && ed.getMonth() == currentRange[1].getMonth()) && (ed.getFullYear() ==  currentRange[1].getFullYear()) ){
            monSquares.push([sd,ed,event.node]);
          }
          if((sd.getDate() == currentRange[2].getDate() && sd.getMonth() == currentRange[2].getMonth()) && (sd.getFullYear() ==  currentRange[2].getFullYear()) || (ed.getDate() == currentRange[2].getDate() && ed.getMonth() == currentRange[2].getMonth()) && (ed.getFullYear() ==  currentRange[2].getFullYear()) ){
            tuesSquares.push([sd,ed,event.node]);
          }
          if((sd.getDate() == currentRange[3].getDate() && sd.getMonth() == currentRange[3].getMonth()) && (sd.getFullYear() ==  currentRange[3].getFullYear()) || (ed.getDate() == currentRange[3].getDate() && ed.getMonth() == currentRange[3].getMonth()) && (ed.getFullYear() ==  currentRange[3].getFullYear()) ){
            wedSquares.push([sd,ed,event.node]);
          }
          if((sd.getDate() == currentRange[4].getDate() && sd.getMonth() == currentRange[4].getMonth()) && (sd.getFullYear() ==  currentRange[4].getFullYear()) || (ed.getDate() == currentRange[4].getDate() && ed.getMonth() == currentRange[4].getMonth()) && (ed.getFullYear() ==  currentRange[4].getFullYear()) ){
            thursSquares.push([sd,ed,event.node]);
          }
          if((sd.getDate() == currentRange[5].getDate() && sd.getMonth() == currentRange[5].getMonth()) && (sd.getFullYear() ==  currentRange[5].getFullYear()) || (ed.getDate() == currentRange[5].getDate() && ed.getMonth() == currentRange[5].getMonth()) && (ed.getFullYear() ==  currentRange[5].getFullYear()) ){
            friSquares.push([sd,ed,event.node]);
          }
          if((sd.getDate() == currentRange[6].getDate() && sd.getMonth() == currentRange[6].getMonth()) && (sd.getFullYear() ==  currentRange[6].getFullYear()) || (ed.getDate() == currentRange[6].getDate() && ed.getMonth() == currentRange[6].getMonth()) && (ed.getFullYear() ==  currentRange[6].getFullYear()) ){
            satSquares.push([sd,ed,event.node]);
          }
          if(sd.getDate() < ed.getDate()){

            if(sd.getTime() < currentRange[0].getTime() && (ed.getTime() > currentRange[0].getTime()) ){
              sunSquares.push([sd,ed,event.node]);
            }
            if(sd.getTime() < currentRange[1].getTime() && ed.getTime() > currentRange[1].getTime() ){
              monSquares.push([sd,ed,event.node]);
            }
            if(sd.getTime() < currentRange[2].getTime() && ed.getTime() > currentRange[2].getTime() ){
              tuesSquares.push([sd,ed,event.node]);
            }
            if(sd.getTime() < currentRange[3].getTime() && ed.getTime() > currentRange[3].getTime() ){
              wedSquares.push([sd,ed,event.node]);
            }
            if(sd.getTime() < currentRange[4].getTime() && ed.getTime() > currentRange[4].getTime() ){
              thursSquares.push([sd,ed,event.node]);
            }
            if(sd.getTime() < currentRange[5].getTime() && ed.getTime() > currentRange[5].getTime() ){
              friSquares.push([sd,ed,event.node]);
            }
            
            if(sd.getTime() < currentRange[6].getTime() && ed.getTime() > currentRange[6].getTime() ){
              satSquares.push([sd,ed,event.node]);
            }
          }
        }
      }
    })

    function processDay(arr, d){
      let dayEvents = [];
      let multiEvents = [];

      let day = currentRange[d].getDate();

      let uniqueArr = arr
      
      uniqueArr.forEach(function(event, i){
        
        if(event[0].getDate() == day || event[1].getDate() == day){
          dayEvents.push(event)
        }else if(event[0].getDate() < day && event[1].getDate() > day){
          multiEvents.push(event);
        }
      })




        let dayContent = [];
        dayEvents =  dayEvents.sort((a, b) => a[0] - b[0])
        dayEvents.forEach(function(event){

          if(event[0].getDate() == event[1].getDate()){
            dayContent.push(
              <div>
              <Link to={'/event/'+ event[2].slug.current}>
               <span>{translateTime(event[0], locale, offset, false, true, true)} - { translateTime(event[1], locale, offset, false, true, true)}</span> <br></br> <TranslatedTitle translations={event[2].titles}/>  
               <BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={event[2].locations}/>  
              </Link>
              </div>
            )
          }else{
            dayContent.push(
              <Link className={styles.multiDayWeek} to={'/event/'+ event[2].slug.current}><TranslatedTitle translations={event[2].titles}/><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={event[2].locations}/>  </Link>
            )
          }
            
        })
   
        multiEvents.forEach(function(event,i){
          
          if((event[1].getDate() - event[0].getDate()) >= 3 && (day - event[0].getDate()) == Math.floor((event[1].getDate() - event[0].getDate())/2)){
            dayContent.push(
              <Link className={styles.multiDayWeek + " " + styles.mid} to={'/event/'+ event[2].slug.current}><TranslatedTitle translations={event[2].titles}/><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={event[2].locations}/>  </Link>
            )
          }else{
            dayContent.push(
              <Link className={styles.multiDayWeek} to={'/event/'+ event[2].slug.current}><TranslatedTitle translations={event[2].titles}/><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={event[2].locations}/>  </Link>
            )
          }
      
        })

        return dayContent;


    }

    let d = new Date(year, week);
    let od = new Date(year, week);




    

    return(

      <div className={styles.week}>
        <h4>{translateTime(currentRange[0], locale, offset, true)} - {translateTime(currentRange[6], locale, offset, true)}</h4>
        <div className={styles.dayRow}>
          <h4>{weekdayNames[0]}<br></br>{translateTime(currentRange[0], locale, offset, true, false, true)}</h4>
          <div>
            {processDay(sunSquares, 0)}
          </div>
        </div>
        <div className={styles.dayRow}>
          <h4>{weekdayNames[1]}<br></br>{translateTime(currentRange[1], locale, offset, true, false, true)}</h4>
          <div>
            {processDay(monSquares, 1)}
          </div>
        </div>
        <div className={styles.dayRow}>
          <h4>{weekdayNames[2]}<br></br>{translateTime(currentRange[2], locale, offset, true, false, true)}</h4>
          <div>
            {processDay(tuesSquares, 2)}
          </div>
        </div>
        <div className={styles.dayRow}>
          <h4>{weekdayNames[3]}<br></br>{translateTime(currentRange[3], locale, offset, true, false, true)}</h4>
          <div>
            {processDay(wedSquares, 3)}
          </div>
        </div>
        <div className={styles.dayRow}>
          <h4>{weekdayNames[4]}<br></br>{translateTime(currentRange[4], locale, offset, true, false, true)}</h4>
          <div>
            {processDay(thursSquares, 4)}
          </div>
        </div>
        <div className={styles.dayRow}>
          <h4>{weekdayNames[5]}<br></br>{translateTime(currentRange[5], locale, offset, true, false, true)}</h4>
          <div>
            {processDay(friSquares, 5)}
          </div>
        </div>
        <div className={styles.dayRow}>
          <h4>{weekdayNames[6]}<br></br>{translateTime(currentRange[6], locale, offset, true, false, true)}</h4>
          <div>
            {processDay(satSquares, 6)}
          </div>
        </div>
      </div>
      )
  }

 


  export default CreateWeek