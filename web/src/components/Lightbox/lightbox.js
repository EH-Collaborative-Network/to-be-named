import React from "react";
// import MediaItem from "./MediaItem";
import * as styles from "./lightbox.module.css";

const Lightbox = ({ }) => {
  function handler(){
      document.getElementById("light-box").classList.remove("show");
      let inner = document.getElementById("light-box")
      inner = inner.querySelector(".inner");
      inner.innerHTML = ""
  }
  return(
    <div id="light-box" className={styles.root}>
        <div onClick={handler} className={styles.inner}>
            <div className={styles.close} onClick={handler}>
              <svg viewBox="0 0 54 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="73.4602" height="3.45354" rx="1.72677" transform="matrix(0.698084 0.716016 -0.698084 0.716016 2.61719 0.69043)" fill="#333333"/>
              <rect width="73.4602" height="3.52472" rx="1.76236" transform="matrix(0.698084 -0.716016 0.698084 0.716016 0 53.6006)" fill="#333333"/>
              </svg>
            </div>
            <div className={  " "+"inner"}></div>
        </div>
    </div>
  )
};

export default Lightbox;
