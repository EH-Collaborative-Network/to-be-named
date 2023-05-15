import React, {useState}  from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Card from "../components/Card/card";
import Layout from "../containers/layout";
import BlockContent from "../components/TranslationHelpers/block-content";
import { useLocation } from '@reach/router';
import Masonry from "../components/Masonry/Masonry";
import Carousel from "../components/Carousel/carousel";
import {Link} from "gatsby";
import * as cardStyles from "../components/Card/card.module.css"
import * as styles from "../components/Time/time.module.css"
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import createDateTime from "../components/Time/createDateTime";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import { id } from "date-fns/locale";
import TimeZoneList from "../components/Time/timeZoneList";
import LangContext from "../components/context/lang";
import translateTime from "../components/Time/translateTime";

export const query = graphql`
  query ExhibitionQuery($id: String!) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      languages {
        name
        code
      }
    }
    languagePhrases: allSanityLanguage {
      edges {
        node {
          name
          code
          about
          seeAllExhibitionLocations
          volume
          timezone
          exhibition
          contact
          artworkIndex
          peopleAndPartners
          upcomingEvents
          researchThreads
          availableIn
          search
        }
      }
    }
    projects: allSanityProject (filter: {exhibitions: {elemMatch: {id:{eq: $id}} }}){
      edges{
        node {
          titles{
            text
            language{
              id
              name
              code
            }
          }
          artists {
            id
              _id
              name
          }
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            asset {
              _id
            }
            altText
          }
          slug {
            current
          }     
        }
      }
    }
    exhibition: sanityExhibition(id: { eq: $id }) {
      id
      image {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
        }
      }
      media{
        embed{
          embed
          altText
          caption
        }
        pdf{
          altText
          caption
          asset {
            url
            _id
          }
        }
        image{
          crop {
            _key
            _type
            top
            bottom
            left
            right
          }
          hotspot {
            _key
            _type
            x
            y
            height
            width
          }
          asset {
            _id
          }
          altText
        }
      }
      statement{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          name
          code
        }
      }
      dates{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          name
          code
        }
      }
      titles{
        text
        language{
          id
          name
          code
        }
      }
      slug {
        current
      }

      
    }
  }
`;

const ExhibitionTemplate = props => {
  const { data, errors } = props;
  const page = data && data.exhibition;
  const projects = data && data.projects?.edges;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  const location = useLocation();

    /* Create artist cards based on current filters */
  let projectCards = []
  projects.map(function(node, index){
    let image;
    let projectLinks = []
    image = node.node.mainImage;
    projectLinks.push(
      <Link key={index} className={styles.blockLink} to={"/project/"+node.node.slug.current}><TranslatedTitle translations={node.titles}/></Link>
    )  
    
    node.node.artists?.map(function(node,index){
      projectLinks.push(<em>{node.name}</em>)
    })

    
    projectCards.push( <Card slug={"/project/"+node.node.slug.current} image={image} descriptions={projectLinks} titles={node.node.titles} languagePhrases={languagePhrases} globalLanguages={globalLanguages} key={index}/> )

  })
  let media = []
  console.log(page.media)
  
  return (
    <Layout navTranslations={languagePhrases} globalLanguages={globalLanguages} >
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <div className="top-title">
        <Link to="/exhibition" className='breadcrumb'>← <TranslatedPhrase translations={languagePhrases} phrase={'seeAllExhibitionLocations'}/></Link>
        </div>
        <h1><TranslatedTitle translations={page.titles}/></h1>
        <div className="top-title">
          <BlockContent blocks={ page.dates}/>
        </div>
        <div className="top-text one-column"><BlockContent blocks={ page.statement}/></div>
        {page.media?.length > 0 &&
          <Carousel imageOnly={false} media={page.media}/>
        }
        <div className={cardStyles.cardWrapper}>
          {projectCards}
        </div>
        
      </Container>
    </Layout>
  );
};

export default ExhibitionTemplate;