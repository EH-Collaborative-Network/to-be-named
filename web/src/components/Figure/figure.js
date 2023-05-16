import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";
import clientConfig from "../../../client-config";
import * as styles from "../Carousel/carousel.module.css";

export function Figure({ node, simple }) {

  if (!node.asset) {
    return null;
  }


  const imageData = getGatsbyImageData(node.asset, { maxWidth: 675 }, clientConfig.sanity);

  return (
    <figure className={simple ? styles.simpleImage : styles.figure}>
      <GatsbyImage image={imageData} alt={node.altText || ""} />
      {node.caption && <figcaption>{node.caption}</figcaption>}
    </figure>
  );
}
