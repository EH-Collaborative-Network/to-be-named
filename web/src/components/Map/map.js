import sketch from "./sketchMap";
import sketch2 from "./sketch2";
import sketch3 from "./sketch3";
import sketch4 from "./sketch4";
import genesis from "./genesis.gif";
import {ReactP5Wrapper} from "react-p5-wrapper";
import React from "react";
import * as styles from "./map.module.css";
import {Link} from "gatsby";
import TranslatedPhrase from "../TranslationHelpers/translatedPhrase";

const Map = ({phrase, translations}) => {
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  let maps = [sketch, sketch2, sketch3, sketch4];
  shuffle(maps)
  return (
      <div className={styles.root}>
        {(typeof window != `undefined`) &&
            <>
            <ReactP5Wrapper sketch={maps[0]} />
            <ReactP5Wrapper sketch={maps[1]} />
            <ReactP5Wrapper sketch={maps[2]} />
            <ReactP5Wrapper sketch={maps[3]} />
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


