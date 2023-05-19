import React from "react";
import "../../styles/layout.css";
import Modal from "../Modal/modal";
import * as styles from "./person.module.css";
const Person = ({ person, index, blue, hideArrow }) =>{
  function handler(e){
    let el = e.target.closest("span");
    
    if(!el.querySelector(".modal").classList.contains("show")){
        el.querySelector(".modal").classList.add('show');
    }
    
  }

  return(
      <span className={styles.person}>
          <div onClick={handler} className={``}>{person.name }{hideArrow ? "" : ""}</div>
          <Modal name={person.name} image={person.image} content={person.bios} />
      </span> 
  );
}


export default Person;
