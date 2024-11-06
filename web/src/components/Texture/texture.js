import sketch1 from "./sketch1";
import sketchSix from "./sketchSix";
import genesis from "./5.png";
import {ReactP5Wrapper} from "react-p5-wrapper";
import React from "react";
import * as styles from "./texture.module.css";


const Texture = () => {
  return (
      <div className={styles.root}>
        {(typeof window != `undefined`) &&
        <>
        <ReactP5Wrapper sketch={sketch1} />        
        <div className={styles.solid}><ReactP5Wrapper sketch={sketchSix} /></div> 
        </>
        }
        <img src={genesis}/>
      </div>
  )
};

export default Texture;


