import { Link } from "gatsby";
import React from "react";
import { useState } from 'react';
import logo from '../../assets/logo.png'; 
import logoMobile from '../../assets/mobileLogo.png'; 
import ehcn from '../../assets/ehcn.png';
import rv from '../../assets/RVoices_Logo.png';
import coling from '../../assets/coling_logo.webp';
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
  const [aboutOpen, setAboutOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);

  function openAbout(){
    setAboutOpen(!aboutOpen);
  }
  function openResearch(){
    setResearchOpen(!researchOpen);
  }
  return (
    <>
    <div className={styles.mobileHeader + " " + "nav"}>
      <div className={styles.logo + " " + 'logo'}><Link to="/home/"><img alt={"Logo says 'To Be -- Named.'"} src={logoMobile} /></Link></div>
        <div className={styles.close} onClick={openHandler}>
          <svg viewBox="0 0 75 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="73.4602" height="3.52472" rx="1.76236" transform="matrix(1 0 -0.0253564 0.999678 0.179688 25.8008)" fill="#333333"/>
            <rect width="73.4602" height="3.52472" rx="1.76236" transform="matrix(1 0 -0.0253564 0.999678 0.0898438 0)" fill="#333333"/>
            <rect width="73.4602" height="3.52472" rx="1.76236" transform="matrix(1 0 -0.0253564 0.999678 1.08984 51)" fill="#333333"/>
          </svg>
        </div>
    </div>
    <div id="navigation" className={styles.header + " navHeader"}>
      <div className={styles.logo + " " + styles.logoMobile + " " + 'logo'}><Link to="/home/"><img alt={"Logo says 'To Be -- Named.'"} src={logoMobile} /></Link></div>
      <div className={styles.logo + " " + styles.logoDesktop + " " + 'logo'}><Link to="/home/"><img alt={"Logo says 'To Be -- Named.'"} src={logo} /></Link></div>
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
              <li onClick={openAbout} className={(url.includes("about") || url.includes("people-and-partners")|| aboutOpen)  ? styles.on + " " + styles.multinav: styles.multinav}><a><TranslatedPhrase translations={translations} phrase={"about"}/></a>
                <ul>
                  <li className={url.includes("about") ? styles.on: ""}><Link to="/about/"><TranslatedPhrase translations={translations} phrase={"aboutProject"}/></Link></li>
                  <li className={url.includes("people-and-partners") ? styles.on : ""}><Link to="/people-and-partners/"><TranslatedPhrase translations={translations} phrase={"peopleAndPartners"}/></Link></li>
                </ul>
              </li>

     
              {/* <li className={url.includes("artwork-index") ? styles.on: ""}><Link to="/artwork-index/"><TranslatedPhrase translations={translations} phrase={"artworkIndex"}/></Link></li> */}
              <li className={url.includes("exhibition") ? styles.on : ""}><Link to="/exhibition/"><TranslatedPhrase translations={translations} phrase={"exhibition"}/></Link></li>
              <li className={url.includes("volume") ? styles.on : ""}><Link to="/volume"><TranslatedPhrase translations={translations} phrase={"volume"}/></Link></li>
              <li className={url.includes("contact") ? styles.on : ""}><Link to="/contact/"><TranslatedPhrase translations={translations} phrase={"contact"}/></Link></li>
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
      let handleMode = (event) => {
        let value = event.target.value
        localStorage.setItem("darkMode", JSON.stringify(value))
        theme.setMode(value)

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

          <div className={styles.modeWrapper}>
            {
              theme.mode == "dark" ?
              <svg className={styles.moon} width="29" height="29" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.0485 31.4827H17.03C12.3614 31.4075 8.06044 29.7792 4.91565 26.8984C1.79398 24.0364 0.0805374 20.1974 0.0920991 16.085C0.103661 11.9788 1.80092 8.1523 4.8694 5.31115C8.00263 2.40947 12.3105 0.8125 17.0023 0.8125C17.0231 0.8125 17.0416 0.8125 17.0624 0.8125C19.1921 0.818763 21.2385 1.13607 23.1415 1.75607L26.0921 3.1756L23.093 3.53883C16.9722 5.22348 12.847 10.3651 12.8308 16.3376C12.8169 22.0094 16.5583 26.9548 22.3623 28.9359L25.0122 29.631L22.3137 30.7082C20.6396 31.1946 18.8753 31.4555 17.067 31.4848H17.0485V31.4827ZM17.0023 2.69129C12.8771 2.69129 9.09868 4.08577 6.35855 6.62213C3.6693 9.11048 2.18246 12.4735 2.17321 16.0891C2.16165 19.7027 3.66236 23.0741 6.39786 25.5791C9.15418 28.1029 12.9349 29.5329 17.0485 29.6039C17.6613 29.5934 18.2671 29.5538 18.8637 29.4828C13.839 26.7544 10.7335 21.8424 10.7497 16.3313C10.7659 10.5467 14.1812 5.44058 19.5089 2.85829C18.7111 2.74974 17.8925 2.69338 17.0578 2.69129C17.0393 2.69129 17.0231 2.69129 17.0046 2.69129H17.0023Z" fill="#D9D9D9"/>
              </svg>

              :

              <svg className={styles.sun} width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.646 19.1494C33.646 25.931 27.5798 31.584 19.8958 31.584C12.2117 31.584 6.14551 25.931 6.14551 19.1494C6.14551 12.3679 12.2117 6.71484 19.8958 6.71484C27.5798 6.71484 33.646 12.3679 33.646 19.1494Z" stroke="#161830" stroke-width="2"/>
              <line x1="19.3958" y1="3.86523" x2="19.3958" y2="0.611729" stroke="#161830"/>
              <line x1="19.3958" y1="3.58398" x2="19.3958" y2="0.330479" stroke="#161830"/>
              <line x1="19.3958" y1="37.9668" x2="19.3958" y2="34.7133" stroke="#161830"/>
              <line x1="3.39575" y1="19.6484" x2="0.142246" y2="19.6484" stroke="#161830"/>
              <line x1="39.6492" y1="19.6484" x2="36.3957" y2="19.6484" stroke="#161830"/>
              <line x1="7.87496" y1="7.83402" x2="5.57439" y2="5.53345" stroke="#161830"/>
              <line x1="33.51" y1="33.4688" x2="31.2094" y2="31.1682" stroke="#161830"/>
              <line x1="31.2094" y1="7.12692" x2="33.51" y2="4.82634" stroke="#161830"/>
              <line x1="5.57443" y1="32.7617" x2="7.875" y2="30.4611" stroke="#161830"/>
              </svg>

            }

            <select aria-label="select dark mode" className={styles.lang} onChange={handleMode} name="mode" id="mode">
              {/* <option style={{"display":"none"}} selected>Select language</option> */}
              <option key={0} value={"light"} selected={theme.mode == "light"}>light mode</option>)
              <option key={1} value={"dark"} selected={theme.mode == "dark"}>dark mode</option>)

              
            </select> 
          </div>

        </div>
      )}}
     </LangContext.Consumer>
        <ul className={styles.menu}>
          {/* <li><TranslatedPhrase translations={translations} phrase={"ehcnSupported"}/></li> */}
          <li><a href='https://ehcn.bard.edu'><img className={styles.ehcn} alt="A grey H within three green lines suggesting the letter E." src={ehcn}/></a></li>
          {/*<li><a href='https://naturalhistory.si.edu/research/anthropology/programs/recovering-voices'><img className={styles.rv} alt="Recovering is written in gold and Voices is written in orange." src={rv}/></a></li> */}
          <li><a href='https://coling.al.uw.edu.pl/'><img className={styles.coling} alt="COLING is written in black with an orange speech bubble." src={coling}/></a></li>

        </ul>
      </div>
    </div>
    </>
)};

export default Navigation;
