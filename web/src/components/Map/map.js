import sketch from "./sketchMap";
import sketch2 from "./sketch2";
import sketch3 from "./sketch3";
import sketch4 from "./sketch4";
import one from "./1.png"
import six from "./6.png"
import five from "./5.png"
import four from "./4.png"
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
  let maps = [one, six, five, four];
  shuffle(maps)
  if(maps[3] == six){
    maps.push(maps.shift());
  }
  return (
      <div className={styles.root}>
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
        <img src={genesis}/>
        <div className={styles.enter}>
          <Link to="/home/"><h4><TranslatedPhrase translations={translations} phrase={phrase}/>→</h4></Link>
        </div>
      </div>
  )
};

export default Map;


