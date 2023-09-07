import React from "react";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import TranslatedPhrase from "../TranslationHelpers/translatedPhrase";
import { Figure } from "../Figure/figure";
import * as styles from "./card.module.css";
import { Link } from "gatsby";

const Card = ({ titles, slug, image, descriptions,languagePhrases, globalLanguages, extra, banner }) => {
  return(
    <div className={styles.root + " " + extra}>
      {slug &&
      <>
      {banner &&
          <div className={styles.banner}><span><TranslatedPhrase translations={languagePhrases} phrase={'current'}/></span></div>
        }
      <Link to={slug}>
        
        {titles &&
          <h2><TranslatedTitle translations={titles}/></h2> 
        }
        
        {descriptions &&
          <span className={styles.description}>
            {descriptions}
          </span>
        }
        </Link>
        {image &&
          <Link to={slug}>
            <Figure node={image} />
          </Link>
        }
      </>
      }
      {!slug &&
      <>
      {titles &&
          <h2><TranslatedTitle translations={titles}/>→</h2>
        }
        
        {descriptions &&
          <div className={styles.description}>
            {descriptions}
          </div>
        }
        {image &&
          <Figure node={image} />
        }
      </>
      }
    </div>
  )
};

export default Card;
