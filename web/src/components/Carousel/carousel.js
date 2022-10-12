import React, {useState, useEffect}  from "react";
import * as styles from "./carousel.module.css";
import MediaItem from "../MediaItem/mediaItem";
import { Figure } from "../Figure/figure";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import { Link } from "@reach/router";
import Masonry from "../Masonry/Masonry";

const Carousel = ({ media, imageOnly }) => {
  const [start, setStart] = useState([0,0]);
  const [a, setA] = useState("")
  const [dir, setDir] = useState(0)
  const [paused, setPaused] = useState(false)
  
  useEffect(() => {
    let track = document.getElementsByClassName(styles.slideTrack)[0];
    let as = track.querySelectorAll('a');
    let totalWidth = 0;
    for(let i = 0; i < as.length; i++){
      totalWidth = totalWidth + as[i].offsetWidth + 5;
    }
    // track.style.width = totalWidth + "px"
    let interval = setInterval(() => {
      let track = document.getElementsByClassName(styles.slideTrack)[0];
      let inner = track.closest('.inner');
      let t = track.style.transform;
      t = t.split("%")[0];
      t = t.split("(-")[1];
      t = parseFloat(t)

      if(track.classList.contains('paused')){
        inner.scrollLeft += 0;
      }else if(track.classList.contains('rtl') && inner.scrollLeft >= (inner.scrollWidth - inner.offsetWidth)){
        inner.scrollLeft -= 1;
        setDir(dir => 1);
      }else if(track.classList.contains('ltr') && inner.scrollLeft <= 0){
        inner.scrollLeft += 1;
        setDir(dir => 0);
      }else if(track.classList.contains('ltr')){
        inner.scrollLeft -= 1;
      }else{
        inner.scrollLeft += 1;
      }
  
    }, 10);

    return () => clearInterval(interval);

  }, []);
  const handleOver = function(event){
    setPaused(true)
  }
  const handleOut = function(event){
    setPaused(false)
  }
  const handleDown = function(event){
    event.preventDefault()
    let el = event.target;
    if(!el.href){
      el = el.closest("a").href
    }else{
      el = el.href
    }
    setA(el)
    setStart([event.pageX, event.pageY])
  }
  const handleUp = function(e){
    let startX = start[0]
    let startY = start[1]
    const diffX = Math.abs(e.pageX - startX);
    const diffY = Math.abs(e.pageY - startY);
    if(diffX > 20){
      e.preventDefault()
    }else{
      if(a){
        window.location.href = a
      }
      
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
      
        <div className={styles.inner + " inner"}>

          <div onMouseOver={handleOver} onMouseLeave={handleOut} className={`${dir ? 'ltr' : 'rtl'}` +" " + styles.slideTrack + " "+"slide-track " + `${paused ? 'paused' : ''}`}>
            {medias}
          </div>
            {/* <AliceCarousel autoPlayStrategy={"default"} autoPlayDirection={"ltr"} autoPlayInterval={10} animationEasingFunction={"linear"} animationDuration={10000} autoPlay infinite  disableButtonsControls disableDotsControls mouseTracking swipeDelta={50} items={medias}/> */}
        </div>
      <div className={styles.wrapper}></div>
    </div>
    }
    </>
  ) 
};

export default Carousel;
