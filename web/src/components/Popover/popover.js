import React from "react";
import "../../styles/layout.css";
import * as styles from "./popover.module.css";
import BlockContent from "../TranslationHelpers/block-content";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import DisplayTime from "../Time/displayTime"
const Popover = ({ event,languagePhrases, globalLanguages, offset, multiday }) =>{
    function handler(e){
        let el = e.target
        if(!el.classList.contains(".modal")){
            el = e.target.closest(".modal")
        }
        el.classList.remove("show");
    }
    console.log(event, "hi")
   
    return(
        <div onMouseOut={handler} className={styles.modal + " " + "modal"}>
            <div className={styles.inner}>
                    <h4><TranslatedTitle translations={event.titles}/></h4>
                    {!multiday &&
                        <DisplayTime event={event} offset={offset} languagePhrases={languagePhrases}/>
                    }
                    <BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={event.locations}/>
                    {/* <BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={event.descriptions}/> */}
            </div>
        </div>
    );
  }
  
  
  export default Popover;
  