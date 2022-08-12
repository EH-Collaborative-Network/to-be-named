import sketch from "./sketchMap";
import sketch2 from "./sketch2";
import sketch3 from "./sketch3";
import sketch4 from "./sketch4";
import genesis from "./genesis.gif";
import ReactP5Wrapper from "react-p5-wrapper";
import React from "react";
import * as styles from "./map.module.css";
import {Link} from "gatsby";
import TranslatedPhrase from "../TranslationHelpers/translatedPhrase";

const Map = ({phrase, translations}) => {
  return (
      <div className={styles.root}>
        {(typeof window != `undefined`) &&
            <>
            <ReactP5Wrapper sketch={sketch} />
            <ReactP5Wrapper sketch={sketch2} />
            <ReactP5Wrapper sketch={sketch3} />
            <ReactP5Wrapper sketch={sketch4} />
            </>
        }
        <img src={genesis}/>
        <div className={styles.enter}>
          <Link to="/home/"><h4><TranslatedPhrase translations={translations} phrase={phrase}/>→</h4></Link>
        </div>
      </div>
  )
};

export default Map;


