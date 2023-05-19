import React from "react";
import { Figure } from "../Figure/figure";
import * as styles from "../Carousel/carousel.module.css";
import ReactHtmlParser from 'react-html-parser';

const MediaItem = ({ media }) => {

let embed = media.embed;
let image = media.image;

let pdf = media.pdf;
let embedCode;

if(embed?.embed?.length > 1){
  if(embed.embed.includes("iframe")){
    embedCode = embed.embed.split("<iframe")[0] + "<iframe title='"+embed.altText+"' "+embed.embed.split("<iframe")[1];
  }else{
    embedCode = embed.embed
  }
}
function lightboxed(e){
  let media = e.target?.cloneNode(true);
  if(!media){
     media = e.target.closest(".masonry-inner > div")?.cloneNode(true);
  }
  if(!media){
    media = e.target.closest(".wrapper")?.cloneNode(true);
  }
  document.querySelector("#light-box .inner").innerHTML = ""
  document.querySelector("#light-box .inner").append(media)
  document.getElementById("light-box").classList.add("show");
} 
  return(
    <div className={'media-item'} onClick={lightboxed}>
        {image &&
            <Figure node={image} />
        }
        {embed?.embed &&
          <div className={styles.embed}>{ReactHtmlParser(embedCode)}<figcaption className="embed-caption">{embed.caption}</figcaption></div>
        }
        {pdf &&
          <div className={styles.pdf}>{ReactHtmlParser("<iframe title="+ pdf.altText +" src="+pdf.asset.url+"></iframe>")}<figcaption className="embed-caption">{pdf.caption}</figcaption></div>
        }
    </div>
  ) 
};

export default MediaItem;
