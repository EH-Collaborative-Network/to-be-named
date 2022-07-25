import React from "react";
import BlockContent from "../TranslationHelpers/block-content";
// import MediaItem from "./MediaItem";
import * as styles from "./marquee.module.css";

const Marquee = ({marqueeContent, globalLanguages, languagePhrases}) => {
if(marqueeContent){


  return(
    <div aria-hidden="true" className={styles.marquee}>
      <ul className={styles.listInline}>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
      </ul>
      <ul class={styles.listInline}>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
      </ul>
      <ul class={styles.listInline}>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /></li>
        <li>⟡</li>
      </ul>
    </div>
  )
}
};

export default Marquee;
