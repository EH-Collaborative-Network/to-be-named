import sketch from "./sketchMap";
import sketch2 from "./sketch2";
import sketch3 from "./sketch3";
import sketch4 from "./sketch4";
import three from "./real.jpg"
import one from "./LBH1.jpg"
import six from "./genesis.jpg"
import five from "./symphony.jpg"
import four from "./7.jpg"
import two from "./composite.jpg"
import refusal from "./refusal_small.gif";
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
  let maps = [one, five, four, three];
  shuffle(maps)

  return (
      <div className={styles.root}>
        {(typeof window != `undefined`) &&
            <>
            <img className="hidden src" src={maps[0]} />
            <img className="hidden src" src={maps[1]} />
            <img className="hidden src" src={maps[2]} />
            <img className="hidden src" src={maps[4]} />
            <ReactP5Wrapper sketch={sketch2} />
            <ReactP5Wrapper sketch={sketch3} />
            <ReactP5Wrapper sketch={sketch4} />
            <ReactP5Wrapper sketch={sketch} />
            </>
        }
        <img src={refusal}/>
        <div className={styles.enter}>
          <Link to="/home/"><h4><TranslatedPhrase translations={translations} phrase={phrase}/>→</h4></Link>
        </div>
      </div>
  )
};

export default Map;


