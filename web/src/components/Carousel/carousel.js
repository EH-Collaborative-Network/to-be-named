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
  const [el, setEl] = useState("")
  const [paused, setPaused] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  let track;

  useEffect(() => {
    
    track = document.getElementsByClassName(styles.slideTrack)[0];
    let as = track.querySelectorAll('a');
    if(as.length == 0){
      as = track.querySelectorAll('.media-item');
    }
    let totalWidth = 0;
    for(let i = 0; i < as.length; i++){
      totalWidth = totalWidth + as[i].offsetWidth + 5;
    }
    if (totalWidth < document.querySelector(".inner").offsetWidth){
      totalWidth = document.querySelector(".inner").offsetWidth * 2
    }
    track.style.width = totalWidth + "px"
    if(typeof window != `undefined`){
      let forty = window.innerHeight/100 * 40;
      totalWidth = as.length * forty;
      track.style.width = totalWidth + "px"
    }
    console.log("HIII")

  }, []);
  const handleOver = function(event){
    setPaused(true)
  }
  const handleOut = function(event){
    setPaused(false)
  }
  
  const handleDown = function(event){
    event.preventDefault()
    let track = document.getElementsByClassName(styles.slideTrack)[0];
    let inner = track.closest('.inner');
    let el = event.target;
    if(!el.href){
      el = el.closest("a")?.href
      if(!imageOnly && !el){
        setEl(event.target.closest(".slide-track > div"));
      }
    }else{
      el = el.href
    }
    setA(el)
    setStartX(event.pageX - inner.offsetLeft);
    setIsDragging(true);
    setScrollLeft(inner.scrollLeft)
    setStart([event.pageX, event.pageY])
  }

  function lightboxed(e){
    let media = e.cloneNode(true);
    if(!media){
       media = e.closest(".masonry-inner > div")?.cloneNode(true);
    }
    if(!media){
      media = e.closest(".wrapper")?.cloneNode(true);
    }
    document.querySelector("#light-box .inner").innerHTML = ""
    document.querySelector("#light-box .inner").append(media)
    document.getElementById("light-box").classList.add("show");
  } 

  const handleMove = function(e){
    let track = document.getElementsByClassName(styles.slideTrack)[0];
    let inner = track.closest('.inner');
    let x = e.pageX - inner.offsetLeft;
    let walk = (x - startX) * 3; //scroll-fast
    if(isDragging){
      inner.scrollLeft = scrollLeft - walk;
    }

  }
  const handleUp = function(e){
    let startX = start[0]
    let startY = start[1]
    const diffX = Math.abs(e.pageX - startX);
    const diffY = Math.abs(e.pageY - startY);
    setIsDragging(false)
    if(diffX > 20){
      e.preventDefault()
    }else{
      if(a){
        window.location.href = a
      }else if(el){
        lightboxed(el)
      }
      
    }
  }

  const advanceCarousel = function(e){
    let track = e.target;
    if(track){
      track = track.closest(".outer")
      let inner = track.querySelector('.inner');
      inner.scrollBy({
        top: 0,
        left: +600,
        behavior: 'smooth'
      }) 
      
    }
  }

  const reverseCarousel = function(e){
    let track = e.target;
    if(track){
      track = track.closest(".outer")
      let inner = track.querySelector('.inner');
      inner.scrollBy({
        top: 0,
        left: -600,
        behavior: 'smooth'
      }) 
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

      return (<div><MediaItem key={index} media={node}></MediaItem></div>);
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
    <div className={styles.root + " outer"}>
      
        <div className={styles.inner + " inner"}>

          <div onMouseDown={imageOnly ? null: handleDown} onMouseUp={imageOnly ? null :  handleUp}  onMouseOver={handleOver} onMouseLeave={handleOut} className={`${dir ? 'ltr' : 'rtl'}` +" " + styles.slideTrack + " "+"slide-track " + `${paused ? 'paused' : ''}`}>
            {medias}
          </div>
            {/* <AliceCarousel autoPlayStrategy={"default"} autoPlayDirection={"ltr"} autoPlayInterval={10} animationEasingFunction={"linear"} animationDuration={10000} autoPlay infinite  disableButtonsControls disableDotsControls mouseTracking swipeDelta={50} items={medias}/> */}
        </div>
        <div onClick={reverseCarousel} className={styles.arrowButtonLeft}><svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 1L2 10.88L13 20" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div onClick={advanceCarousel} className={styles.arrowButtonRight}><svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 20L12 10.12L1 1" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      <div className={styles.wrapper}></div>
    </div>
    }
    </>
  ) 
};

export default Carousel;
