import sketch from "./sketchMap";
import {ReactP5Wrapper} from "react-p5-wrapper";
import React from "react";
import collage from "./collage.png"
import * as styles from "./map.module.css";
import {Link} from "gatsby";
import TranslatedPhrase from "../TranslationHelpers/translatedPhrase";

const Map = ({phrase, translations}) => {
  

  return (
      <div className={styles.root + " exhibition-map"}>
        <div className={styles.loader} id='loader'><span>loading...</span></div>
       {(typeof window != `undefined`) &&
            <>
            <ReactP5Wrapper sketch={sketch} />
            </>
        }
        <img draggable="false" src={collage}/>
      </div>
  )
};

export default Map;


