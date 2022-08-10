import React from "react";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import { Figure } from "../Figure/figure";
import * as styles from "./card.module.css";
import { Link } from "gatsby";

const Card = ({ titles, slug, image, descriptions,languagePhrases, globalLanguages, extra }) => {
  return(
    <div className={styles.root + " " + extra}>
      {slug &&
      <Link to={slug}>
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
      </Link>
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
