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
        {(medias.length > 2) &&
            <div className={`masonry-inner ${styles.inner} ${medias.length > 5 ? styles.three : styles.two}`}>
                {medias}
            </div>
        }
        {(medias.length <= 2) &&
            <div className={`masonry-inner ${styles.inner} ${styles.one}`}>
                {medias}
            </div>
        }
            <div className={styles.wrapper}></div>
    </div>
  ) 
};

export default Masonry;
