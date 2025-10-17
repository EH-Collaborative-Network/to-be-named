import React, { useState } from "react";
import { graphql } from "gatsby";
import {
    mapEdgesToNodes,
    filterOutDocsWithoutSlugs,
    filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/Container/container";
import BlockContent from "../components/TranslationHelpers/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Card from "../components/Card/card";
import Layout from "../containers/layout";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import * as cardStyles from "../components/Card/card.module.css"
import { Link } from "@reach/router";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import sanityClient from "@sanity/client";
import * as styles from "../components/Time/time.module.css"

const client = sanityClient({
    projectId: '46orb7yp',
    dataset: 'production',
    apiVersion: '2022-03-25',
    token: process.env.SANITY_TOKEN,
    useCdn: true,
})

export const query = graphql`
  query ResearchThreadsPageQuery {
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
          aboutProject
          volume
          contact
          artworkIndex
          exhibition
          peopleAndPartners
          upcomingEvents
          researchThreads
          availableIn
          search
        }
      }
    }
    ap: allSanityPage(filter: {slug: {current: {eq: "research-threads"}}}) {
      edges {
        node {
          id
          _id
          titles{
            text
            language{
              id
              name
              code
            }
          }
          bodies{
            _rawText(resolveReferences: { maxDepth: 20 })
            language{
              id
              name
              code
            }
          }
        }
      }
    }
    threads: allSanityResearchThread {
      edges {
        node {
              name
              titles{
                text
                language{
                  id
                  name
                  code
                }
              }
              descriptions{
                _rawText(resolveReferences: { maxDepth: 20 })
                language{
                  id
                  name
                  code
                }
              }
        }
      }
    }
      projects: allSanityProject{
      edges {
        node {
              sortLetter
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
              exhibition
              commissioned
              traveling
              regional
              studentWork
              exhibitions{
                titles{
                  text
                  language{
                    id
                    name
                    code
                  }
                }
                name
              }
              researchThreads{
                titles{
                  text
                  language{
                    id
                    name
                    code
                  }
                }
                name
              }
              locations{
                titles{
                  text
                  language{
                    id
                    name
                    code
                  }
                }
                name
              }
              mediums{
                titles{
                  text
                  language{
                    id
                    name
                    code
                  }
                }
                name
              }
          
        }
      }
    }
    locations: allSanityLocation {
      edges {
        node {
              name
              titles{
                text
                language{
                  id
                  name
                  code
                }
              }
        }
      }
    }
    mediums: allSanityMedium {
      edges {
        node {
              name
              titles{
                text
                language{
                  id
                  name
                  code
                }
              }
        }
      }
    }
  }
`;

const ResearchThreadsPage = props => {
    const { data, errors } = props;
    const threads = (data || {}).threads.edges
    const projects = (data || {}).projects.edges
    const locations = (data || {}).locations?.edges || []
    const mediums = (data || {}).mediums?.edges || []
    
    // State to track selected filters
    const [selectedThread, setSelectedThread] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedMedium, setSelectedMedium] = useState('all');

    // Handle checkbox changes - only one thread at a time
    const handleThreadToggle = (threadName) => {
        setSelectedThread(prev => prev === threadName ? null : threadName);
    };

    // Handle location dropdown change
    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    // Handle medium dropdown change
    const handleMediumChange = (e) => {
        setSelectedMedium(e.target.value);
    };

    // Create thread filter checkboxes
    let threadCards = threads.map((node, index) => (
        <div className="thread-filter" key={index}>
            <input 
                id={'thread-filter-' + index} 
                type="checkbox"
                checked={selectedThread === node.node.name}
                onChange={() => handleThreadToggle(node.node.name)}
            />
            <label htmlFor={'thread-filter-' + index}>
                <TranslatedTitle translations={node.node.titles} />
            </label>
        </div>
    ));

    // Get the selected thread's description
    const selectedThreadData = threads.find(thread => thread.node.name === selectedThread);
    const selectedThreadDescription = selectedThreadData?.node?.descriptions;

    // Helper function to get translated text for current language
    const getTranslatedText = (translations) => {
        if (!translations || translations.length === 0) return '';
        // You may need to adjust this based on your current language context
        // For now, returning the first translation or English as fallback
        const translation = translations.find(t => t.language?.code === 'en') || translations[0];
        return translation?.text || '';
    };

    // Create location dropdown
    let locationDropdown = (
        <select value={selectedLocation} onChange={handleLocationChange}>
            <option value="all">All Locations</option>
            {locations.map((node, index) => (
                <option key={index} value={node.node.name}>
                    {getTranslatedText(node.node.titles)}
                </option>
            ))}
        </select>
    );

    // Create medium dropdown
    let mediumDropdown = (
        <select value={selectedMedium} onChange={handleMediumChange}>
            <option value="all">All Contributors</option>
            {mediums.map((node, index) => (
                <option key={index} value={node.node.name}>
                    {getTranslatedText(node.node.titles)}
                </option>
            ))}
        </select>
    );

    // Sort projects
    const sortedProjects = [...projects].sort((a, b) => {
        if (a.node.sortLetter < b.node.sortLetter) return -1;
        if (a.node.sortLetter > b.node.sortLetter) return 1;
        return 0;
    });

    // Filter projects based on all selected filters
    const filteredProjects = sortedProjects.filter(project => {
        // Filter by research thread (only one)
        if (selectedThread !== null) {
            const projectThreads = project.node.researchThreads || [];
            const hasThread = projectThreads.some(thread => thread.name === selectedThread);
            if (!hasThread) return false;
        }

        // Filter by location (single selection from dropdown)
        if (selectedLocation !== 'all') {
            const projectLocations = project.node.locations || [];
            const hasLocation = projectLocations.some(location => 
                location.name === selectedLocation
            );
            if (!hasLocation) return false;
        }

        // Filter by medium (single selection from dropdown)
        if (selectedMedium !== 'all') {
            const projectMediums = project.node.mediums || [];
            const hasMedium = projectMediums.some(medium => 
                medium.name === selectedMedium
            );
            if (!hasMedium) return false;
        }

        return true;
    });

    // Create project cards from filtered projects
    let projectCards = filteredProjects.map((node, index) => {
        let image = node.node.mainImage;
        let projectLinks = [
        
        ];

        node.node.artists?.forEach((artist, idx) => {
            projectLinks.push(<em key={`artist-${idx}`}>{artist.name}</em>);
        });

        return (
            <Card 
                className={styles.blockLink} 
                slug={"/project/" + node.node.slug.current} 
                image={image} 
                descriptions={projectLinks} 
                titles={node.node.titles} 
                languagePhrases={languagePhrases} 
                globalLanguages={globalLanguages} 
                key={index} 
            />
        );
    });

    if (errors) {
        return (
            <Layout>
                <GraphQLErrorList errors={errors} />
            </Layout>
        );
    }

    const site = (data || {}).site;
    const globalLanguages = site.languages;
    const ap = (data || {}).ap.edges[0]?.node?.bodies;
    let previewQuery = '*[_id == "drafts.' + (data || {}).ap.edges[0]?.node?._id + '"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}}'
    const location = useLocation();
    let preview = false;
    const [previewData, setPreviewData] = useState(false)
    
    if (location?.search) {
        preview = queryString.parse(location.search).preview;
    }
    
    if (preview && !previewData) {
        const fetchData = async () => {
            setPreviewData(await client.fetch(previewQuery).then((data) => {
                return (data[0]);
            }))
        }
        fetchData()
    }
    
    const titles = (data || {}).ap.edges[0]?.node?.titles;
    const languagePhrases = (data || {}).languagePhrases?.edges;

    if (!site) {
        throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
        );
    }

    return (
        <>
            <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
                <SEO title={site.title} description={site.description} keywords={site.keywords} />
                <Container>
                    <h1 hidden>Welcome to {site.title}</h1>
                    <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : titles} /></h1>
                    <div className="top-text people-page one-column">
                        <BlockContent 
                            languagePhrases={languagePhrases} 
                            blocks={(preview && previewData) ? previewData.bodies : ap} 
                            globalLanguages={globalLanguages} 
                        />
                    </div>
                    <br />
                    <div className="filters-section">
                        <div className="thread-filters">
                            {threadCards}
                            {selectedThreadDescription && (
                                <div className="thread-description">
                                    <BlockContent 
                                        languagePhrases={languagePhrases} 
                                        blocks={selectedThreadDescription} 
                                        globalLanguages={globalLanguages} 
                                    />
                                </div>
                            )}
                        </div>
                        
                        <div className="dropdown-filters">
                            {locations.length > 0 && (
                                <div className="location-filter">
                                    {locationDropdown}
                                </div>
                            )}
                            
                            {mediums.length > 0 && (
                                <div className="medium-filter">
                                    {mediumDropdown}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className={cardStyles.cardWrapper}>
                        {projectCards}
                    </div>
                </Container>
            </Layout>
        </>
    );
};

export default ResearchThreadsPage;
