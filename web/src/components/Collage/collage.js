import sketch from "./sketchMap";
import sketch2 from "./sketch2";
import sketch3 from "./sketch3";
import sketch4 from "./sketch4";
import three from "./real.jpg"
import one from "./LBH1.jpg"
import five from "./symphony.jpg"
import four from "./7.jpg"
import refusal from "./refusal_small.gif";
import {ReactP5Wrapper} from "react-p5-wrapper";
import React from "react";
import * as styles from "./collage.module.css";
import {Link} from "gatsby";
import TranslatedPhrase from "../TranslationHelpers/translatedPhrase";

const Collage = ({phrase, translations}) => {
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
        <div className={styles.loader} id='loader'><span>loading...</span></div>
        <div className={styles.loader} id='loader2'><span>loading...</span></div>
        <div className={styles.loader} id='loader3'><span>loading...</span></div>
        <div className={styles.loader} id='loader4'><span>loading...</span></div>
        {(typeof window != `undefined`) &&
            <>
            <img className="hidden src" src={maps[0]} />
            <img className="hidden src" src={maps[1]} />
            <img className="hidden src" src={maps[2]} />
            <img className="hidden src" src={maps[3]} />
            <ReactP5Wrapper sketch={sketch2} />
            <ReactP5Wrapper sketch={sketch3} />
            <ReactP5Wrapper sketch={sketch4} />
            <ReactP5Wrapper sketch={sketch} />
            </>
        }
        <img draggable="false" src={refusal}/>
        <div className={styles.enter}>
          <Link to="/home/"><h4><TranslatedPhrase translations={translations} phrase={phrase}/>→</h4></Link>
        </div>
      </div>
  )
};

export default Collage;


