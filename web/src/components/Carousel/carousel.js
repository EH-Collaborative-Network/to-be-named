import React, {useState}  from "react";
import AliceCarousel from "react-alice-carousel";
import * as styles from "./carousel.module.css";
import MediaItem from "../MediaItem/mediaItem";
import 'react-alice-carousel/lib/alice-carousel.css';
import { Figure } from "../Figure/figure";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import { Link } from "@reach/router";
import Masonry from "../Masonry/Masonry";

const Carousel = ({ media, imageOnly }) => {
  const [start, setStart] = useState([0,0]);
  const handleDown = function(event){
    setStart([event.pageX, event.pageY])
  }
  const handleUp = function(e){
    let startX = start[0]
    let startY = start[1]
    const diffX = Math.abs(e.pageX - startX);
    const diffY = Math.abs(e.pageY - startY);
    if(diffX > 10){
      e.preventDefault()
    }else{
      window.location.href = e.target.href || e.target.closest("a").href
    }
  }

  let medias = media.map(function(node, index){
    if(imageOnly){
      if(node[0]){
      return(
        <Link onMouseDown={handleDown} onMouseUp={handleUp} to={node[2]}>
            <Figure key={index} node={node[0]} />
            <h4><TranslatedTitle translations={node[1]}/></h4>
        </Link>
      )
      }else{
        return(<></>)
      }
    }else{
      return <MediaItem key={index} media={node}></MediaItem>;
    }
    
})

let resp = {
    0: {
        items: 1,
    },
    1024: {
        items: 3
    }
  }
  return(
    <>
    {(media.length <= 2 && !imageOnly) ?
      <Masonry media={media}/>
              :
    <div className={styles.root}>
        <div className={styles.inner}>
            <AliceCarousel autoPlayStrategy={"default"} autoPlayInterval={0} animationEasingFunction={"linear"} animationDuration={10000} autoPlay infinite keyboardNavigation responsive={resp} disableButtonsControls disableDotsControls mouseTracking items={medias}/>
        </div>
      <div className={styles.wrapper}></div>
    </div>
    }
    </>
  ) 
};

export default Carousel;
