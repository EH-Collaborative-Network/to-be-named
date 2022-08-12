import { Link } from "gatsby";
import React from "react";
import { useState } from 'react';
import logo from '../../assets/logo.png'; 
import logoMobile from '../../assets/mobileLogo.png'; 
import osun from '../../assets/ehcn.png';
import * as styles from "./navigation.module.css";
import LangContext from '../context/lang.js'
import TranslatedPhrase from "../TranslationHelpers/translatedPhrase";
import translate from "../TranslationHelpers/translate";

const Navigation = ({ siteTitle, translations, globalLanguages }) =>{
  let defaultLang = "en";
  function closeHandler(){
    document.getElementById("navigation").style.display = "none"
  }
  function openHandler(){
    document.getElementById("navigation").style.display = "block"
  }
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const [language, setLanguage] = useState(defaultLang);
  return (
    <>
    <div className={styles.mobileHeader}>
      <div className={styles.logo}><Link to="/home/"><img alt={"Logo says 'To Be -- Named.'"} src={logoMobile} /></Link></div>
        <div className={styles.close} onClick={openHandler}>
          <svg viewBox="0 0 75 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="73.4602" height="3.52472" rx="1.76236" transform="matrix(1 0 -0.0253564 0.999678 0.179688 25.8008)" fill="#333333"/>
            <rect width="73.4602" height="3.52472" rx="1.76236" transform="matrix(1 0 -0.0253564 0.999678 0.0898438 0)" fill="#333333"/>
            <rect width="73.4602" height="3.52472" rx="1.76236" transform="matrix(1 0 -0.0253564 0.999678 1.08984 51)" fill="#333333"/>
          </svg>
        </div>
    </div>
    <div id="navigation" className={styles.header}>
      <div className={styles.logo + " " + styles.logoMobile}><Link to="/home/"><img alt={"Logo says 'To Be -- Named.'"} src={logoMobile} /></Link></div>
      <div className={styles.logo + " " + styles.logoDesktop}><Link to="/home/"><img alt={"Logo says 'To Be -- Named.'"} src={logo} /></Link></div>
      <div className={styles.close} onClick={closeHandler}>
        <svg  viewBox="0 0 54 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="73.4602" height="3.45354" rx="1.72677" transform="matrix(0.698084 0.716016 -0.698084 0.716016 2.61719 0.69043)" fill="#333333"/>
        <rect width="73.4602" height="3.52472" rx="1.76236" transform="matrix(0.698084 -0.716016 0.698084 0.716016 0 53.6006)" fill="#333333"/>
        </svg>
      </div>
      <div className={styles.wrapper}>  
      <LangContext.Consumer>
      { theme => {
        return(
          <ul className={styles.menu}>
              <li className={url.includes("about") ? styles.on: ""}><Link to="/about/"><TranslatedPhrase translations={translations} phrase={"about"}/>→</Link></li>
              <li className={url.includes("research") ? styles.on: ""}><Link to="/researchthreads/"><TranslatedPhrase translations={translations} phrase={"researchThreads"}/>→</Link></li>
              <li className={url.includes("exhibition") ? styles.on : ""}><Link to="/exhibition/"><TranslatedPhrase translations={translations} phrase={"exhibition"}/>→</Link></li>
              <li className={url.includes("volume") ? styles.on : ""}><Link to="/volume"><TranslatedPhrase translations={translations} phrase={"volume"}/>→</Link></li>
              <li className={url.includes("calendar") ? styles.on : ""}><Link to="/calendar/"><TranslatedPhrase translations={translations} phrase={"upcomingEvents"}/>→</Link></li>
          </ul>
          )
      }}
    </LangContext.Consumer>
    <LangContext.Consumer>
    {theme => {
      let handler = (event) => {
        let value = event.target.value
        localStorage.setItem("lang", JSON.stringify(value))
        theme.setLang(value)
      }
      function handleSearch(e){
        let el = e.target;
        let parent = el.closest("div");
        let phrase = parent.querySelector("input").value
        let url = "/search?query="+phrase;
        window.location.href = url;
      }
      function handleEnter(e){
        if(e.key == "Enter"){
          let el = e.target;
          let parent = el.closest("div");
          let phrase = parent.querySelector("input").value
          let url = "/search?query="+phrase;
          window.location.href = url;
        }
      }
      return(
        <div>
          <div className={styles.searchWrapper}>
            <input aria-label="search" type="text" onKeyDown={handleEnter} placeholder={translate(translations, "search" ,theme)} />
            <button onClick={handleSearch} className="blue-button" aria-labelledby="nav-search-label">
              <span id="nav-search-label" hidden>Search</span>
              <svg width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0023 11.2C22.0023 16.4901 17.4814 20.9 11.7511 20.9C6.02087 20.9 1.5 16.4901 1.5 11.2C1.5 5.90992 6.02087 1.5 11.7511 1.5C17.4814 1.5 22.0023 5.90992 22.0023 11.2Z" stroke="#333333" stroke-width="3"/>
              <path d="M27.9786 27.9995C28.5976 28.5501 29.5453 28.4943 30.0955 27.8749C30.6456 27.2556 30.5898 26.3071 29.9709 25.7565L27.9786 27.9995ZM17.9062 19.0395L27.9786 27.9995L29.9709 25.7565L19.8985 16.7965L17.9062 19.0395Z" fill="#333333"/>
              </svg>
            </button>
          </div>
          <div className={styles.langWrapper}>
            <svg className={styles.globe} width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.4781 14.8786C28.4781 22.2473 22.2355 28.2571 14.4891 28.2571C6.74262 28.2571 0.5 22.2473 0.5 14.8786C0.5 7.50986 6.74262 1.5 14.4891 1.5C22.2355 1.5 28.4781 7.50986 28.4781 14.8786Z" stroke="#333333"/>
              <line x1="1.95117" y1="20.9238" x2="27.0853" y2="20.9238" stroke="#333333"/>
              <line x1="0.236328" y1="14.9492" x2="28.9188" y2="14.9492" stroke="#333333"/>
              <line x1="1.53711" y1="8.59375" x2="27.44" y2="8.59375" stroke="#333333"/>
              <path d="M14.5785 1.35352C13.0507 1.64322 9.97158 4.83538 9.87695 15.2864" stroke="#333333"/>
              <path d="M14.5785 1.35352C13.0507 1.64322 9.97158 4.83538 9.87695 15.2864" stroke="#333333"/>
              <path d="M14.6081 28.377C13.0707 28.1048 9.97217 25.1055 9.87695 15.286" stroke="#333333"/>
              <path d="M14.6074 28.377C15.9142 28.1048 18.548 25.1055 18.6289 15.286" stroke="#333333"/>
              <path d="M14.6074 1.32617C15.9142 1.61644 18.548 4.81482 18.6289 15.2862" stroke="#333333"/>
              <path d="M14.6375 28.431C12.41 27.9693 7.90669 25.7445 5.7371 21.2609C4.55428 18.8165 4.49513 15.2314 4.55432 15.2858" stroke="#333333"/>
              <path d="M14.6675 1.32511C12.4367 1.81542 7.92709 4.17803 5.75442 8.93933C4.56993 11.5351 4.51069 15.3422 4.56996 15.2845" stroke="#333333"/>
              <path d="M14.6664 28.4304C16.8058 27.9687 21.1309 25.744 23.2146 21.2606C24.3506 18.8164 24.4074 15.2314 24.3506 15.2858" stroke="#333333"/>
              <path d="M14.6664 1.32511C16.8058 1.81542 21.1309 4.17803 23.2146 8.93933C24.3506 11.5351 24.4074 15.3422 24.3506 15.2845" stroke="#333333"/>
            </svg>

            <select aria-label="select language" className={styles.lang} onChange={handler} name="lang" id="lang">
              {/* <option style={{"display":"none"}} selected>Select language</option> */}
            { globalLanguages?.map(function(language, index){
                return(<option key={index} value={language.code} selected={language.code == theme.lang}>{language.name}</option>)
              })}
              
            </select> 
          </div>
        </div>
      )}}
     </LangContext.Consumer>
        <ul className={styles.menu}>
          <li><a className={styles.email} href="mailto:ehcn@opensocietyuniversitynetwork.org">ehcn@opensociety<br/>universitynetwork.org</a></li>
          <li><TranslatedPhrase translations={translations} phrase={"ehcnSupported"}/></li>
          <li><img className={styles.osun} alt="dark green text reads Open Society University Network with red semicircles encircling 'open'" src={osun}/></li>
        </ul>
      </div>
    </div>
    </>
)};

export default Navigation;
