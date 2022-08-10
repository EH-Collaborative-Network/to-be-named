import React from "react";
import * as styles from "./masonry.module.css";
import MediaItem from "../MediaItem/mediaItem";
import { Figure } from "../Figure/figure";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import { Link } from "@reach/router";

const Masonry = ({ media }) => {
  let medias = media.map(function(node, index){
    console.log(node)
      return <MediaItem key={index} media={node}></MediaItem>;  
    })


  return(
    <div className={styles.root}>

            <div className={`masonry-inner ${styles.inner}`}>
                {medias}
            </div>

            <div className={styles.wrapper}></div>
    </div>
  ) 
};

export default Masonry;
