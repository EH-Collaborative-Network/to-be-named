import React from "react";
import Navigation from "../Navigation/navigation";
import PropTypes from 'prop-types'
import "../../styles/layout.css";
import * as styles from "./layout.module.css";
import Lightbox from "../Lightbox/lightbox";
import Texture from "../Texture/texture"
const Layout = ({ children, siteTitle, navTranslations, globalLanguages }) =>{

  
  return(
    

      <>
        <Texture/>
        <Navigation siteTitle={siteTitle} globalLanguages={globalLanguages} translations={navTranslations} />
        <div className={styles.content}>{children}</div>
        <Lightbox/>
      </>

    
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
