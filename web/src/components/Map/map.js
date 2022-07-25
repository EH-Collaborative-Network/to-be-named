import sketch from "./sketchMap";
import { ReactP5Wrapper } from "react-p5-wrapper";
import React from "react";
import * as styles from "./map.module.css";
import { Link } from "@reach/router";
import TranslatedPhrase from "../TranslationHelpers/translatedPhrase";
const Map = ({partners,phrase, translations}) => {
  return (
      <div className={styles.root}>
        <ReactP5Wrapper sketch={sketch} />
        <div className={styles.partners}>
          <h4><TranslatedPhrase phrase={phrase} translations={translations}/>:</h4>
          <ul>
          {partners?.map(function(partner, index){
            return(
              <li className="map-link"><Link to={"/partner/"+partner.node.slug.current}>{partner.node.name + "→"}</Link></li>
            )
          })}
          </ul>
        </div>
      </div>
  )
};

export default Map;


