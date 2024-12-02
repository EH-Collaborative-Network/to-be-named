import ReactHtmlParser from 'react-html-parser';
import React from "react";
import Popover from '../Popover/popover';
import getWeekdayNames from '../TranslationHelpers/getWeekdayNames';
import getMonthNames from '../TranslationHelpers/getMonthNames';
import TranslatedTitle from '../TranslationHelpers/translatedTitle';
import * as styles from "./time.module.css"
import { Link } from 'gatsby';
import createDateTime from './createDateTime';
import DisplayStartTime from './displayStartTime';
const CreateCalendar = ({globalLanguages, translations, year, month, theme, events, offset = null }) => {
    function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
      let day = date.getDay();
      if (day == 0) day = 7; // make Sunday (0) the last day
      return day - 1;
    }
    let mon = month; 
    let weekdayNames = getWeekdayNames(translations,theme)
    let monthNames = getMonthNames(translations,theme)
    let currentEvents = [];
    //only dealing with events for this month
    events.forEach(function(event){
      if(event.node.startDate && event.node.timeZone){
        let start = event.node.startDate
        let end = event.node.endDate || event.node.startDate
        let sd = createDateTime(start.date, start.time, event.node.timeZone.offset);
        let ed = createDateTime(end.date, end.time, event.node.timeZone.offset);
        if(( sd.getMonth() == mon || ed.getMonth() == mon ) && (sd.getFullYear() == year || ed.getFullYear() == year)){
          currentEvents.push([sd,ed,event.node]);

        }
      }
    })


    let d = new Date(year, mon);
    let od = new Date(year, mon);

    function modalHandler(e){
      let el = e.target.closest("div");
      if(!el.querySelector(".modal").classList.contains("show")){
          el.querySelector(".modal").classList.add('show');
      }
      
    }
    function modalRemove(e){
      let el = e.target.closest("div");
      if(el.querySelector(".modal").classList.contains("show")){
          el.querySelector(".modal").classList.remove('show');
      }
      
    }

    
    
    let daySquares = [];
    let currentRow = 0;
    let prevRow = 0;
    // <td> with actual dates

      while (d.getMonth() == mon) {
        
        //if event falls, place it otherwise just date....
        let dayEvents = [];
        let multiEvents = [];
        currentEvents.forEach(function(event){
           if(event[0].getDate() == d.getDate() || event[1].getDate() == d.getDate()){
             dayEvents.push(event)
           }else if(event[0].getDate() < d.getDate() && event[1].getDate() > d.getDate()){
             multiEvents.push(event);
           }

        })

        let currentDay = d.getDate();
        let dayContent = [];
        dayEvents =  dayEvents.sort((a, b) => a[0] - b[0])
        dayEvents.forEach(function(event){
          if(event[0].getDate() == event[1].getDate()){
            dayContent.push(
              <div>
              <Link onMouseOut={modalRemove} onMouseOver={modalHandler} to={'/event/'+ event[2].slug.current}>
                <TranslatedTitle translations={event[2].titles}/>    
              </Link>
              <Popover globalLanguages={globalLanguages} offset={offset} languagePhrases={translations} event={event[2]}  />
              </div>
            )
          }else{
            dayContent.push(
             <div><Link onMouseOut={modalRemove} onMouseOver={modalHandler} className={styles.multiDay} to={'/event/'+ event[2].slug.current}><TranslatedTitle translations={event[2].titles}/></Link>       
              <Popover globalLanguages={globalLanguages} multi={true} offset={offset} languagePhrases={translations} event={event[2]}  />
             </div>
            )
          }
            
        })
        multiEvents.forEach(function(event,i){

          if((event[1].getDate() - event[0].getDate()) >= 3 && (d.getDate() - event[0].getDate()) == Math.floor((event[1].getDate() - event[0].getDate())/2)){
            dayContent.push(
              <div>
              <Link onMouseOut={modalRemove} onMouseOver={modalHandler} className={styles.multiDay + " " + styles.mid} to={'/event/'+ event[2].slug.current}><TranslatedTitle translations={event[2].titles}/></Link>
              <Popover globalLanguages={globalLanguages} multi={true} offset={offset} languagePhrases={translations} event={event[2]}  />
             </div>
            )
          }else{
            dayContent.push(
              <div>
              <Link onMouseOut={modalRemove} onMouseOver={modalHandler} className={styles.multiDay} to={'/event/'+ event[2].slug.current}><span></span></Link>
              <Popover globalLanguages={globalLanguages} multi={true} offset={offset} languagePhrases={translations} event={event[2]}  />
             </div>
            )
          }
      
        })
        
        let currentWeekDay = getDay(d)

        if(currentWeekDay == 0 || d.getDate() == 1){
          daySquares.push([]);
          prevRow = currentRow;
          currentRow += 1;
        }
     
        
        d.setDate(d.getDate() + 1);
        daySquares[prevRow].push(
          <td>
            <sup>{currentDay}</sup>
            {dayContent}
          </td>
        )
      }
    
    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(od); i++) {
      daySquares[0].unshift(<td></td>);

    }
    // add spaces after last days of month for the last row
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        daySquares[prevRow].push(<td></td>);
      }
    }

    return(
      <div className={styles.calendar}>
        <h4>{monthNames[mon]} - {year}</h4>
        <table>
          <tr>
            <th>
              <h4>{weekdayNames[1]}</h4>
            </th>
            <th>
              <h4>{weekdayNames[2]}</h4>
            </th>
            <th>
              <h4>{weekdayNames[3]}</h4>
            </th>
            <th>
              <h4>{weekdayNames[4]}</h4>
            </th>
            <th>
              <h4>{weekdayNames[5]}</h4>
            </th>
            <th>
              <h4>{weekdayNames[6]}</h4>
            </th>
            <th>
              <h4>{weekdayNames[0]}</h4>
            </th>
          </tr>
          {daySquares.map((row, i) => {
            
            return(
              <tr>
                {row}
              </tr>
            )
          })}
        </table>
      </div>)
  }

 


  export default CreateCalendar