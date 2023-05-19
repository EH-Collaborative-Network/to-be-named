// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')
const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  flags:{
    PARALLEL_QUERY_RUNNING: false
  },
  siteMetadata: {
    title: "To Be -- Named",
    titleTemplate: "To Be -- Named",
    description:
      "The Experimental Humanities Collaborative Network is a global network rethinking the humanities in the light of changing technologies, our increasingly connected planet, the ongoing ecological crisis, and the need to create more inclusive institutions.",
    url: "https://ehcn.bard.edu", // No trailing slash allowed!
    image: 'src/assets/logo.png', // Path to the image placed in the 'static' folder, in the project's root directory.
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-remove-fingerprints`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/images/favicon-32x32.png',
      }
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'items',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: 'speed',

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allSanityPage {
              edges {
                node {
                  bodies {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  keywords
                  name
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                  slug {
                    current
                  }
                }
              }
            }
            allSanityProject {
              edges {
                node {
                  descriptions {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  keywords
                  name
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                  slug {
                    current
                  }
                }
              }
            }
            allSanityExhibition {
              edges {
                node {
                  statement {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  name
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                  slug {
                    current
                  }
                }
              }
            }
            allSanityPerson{
              edges {
                node {
                  bios {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  name
                }
              }
            }
           
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        // index: ['title', 'body'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        // store: ['id', 'path', 'title'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) => {

        

          let pages = data.allSanityPage.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.bodies,
            titles: edge.node.titles,
            slug:edge.node.slug,
            type: "page"
          }))

    
          let projects = data.allSanityProject.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            titles: edge.node.titles,
            slug: edge.node.slug,
            type: "project"
          }))

          let persons = data.allSanityPerson.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.bios,
            name: edge.node.name,
            type: "person"
          }))

          let exhibitions = data.allSanityExhibition.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            titles: edge.node.titles,
            slug: edge.node.slug,
            type: "exhibition"
          }))

          let finalArray = events.concat( projects, exhibitions, pages, persons)
          return(finalArray.flat(1))
        },
      },
    },
  ]
}
