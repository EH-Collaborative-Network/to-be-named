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
    // {
    //   resolve: "gatsby-plugin-google-tagmanager",
    //   options: {
    //     id: "G-LVZH6EJH74",
  
    //     // Include GTM in development.
    //     //
    //     // Defaults to false meaning GTM will only be loaded in production.
    //     includeInDevelopment: false,
  
    //     // datalayer to be set before GTM is loaded
    //     // should be an object or a function that is executed in the browser
    //     //
    //     // Defaults to null
    //     defaultDataLayer: { platform: "gatsby" },
     
    //   },
    // },
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
                  exhibition
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
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                  artists {
                    id
                      _id
                      name
                      bios{
                        _rawText(resolveReferences: { maxDepth: 20 })
                        language{
                          id
                          name
                          code
                        }
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
                  image {
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


    
          let projects = data.allSanityProject.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            titles: edge.node.titles,
            slug: edge.node.slug,
            artists: edge.node.artists,
            exhibition: edge.node.exhibition,
            mainImage: edge.node.mainImage,
            type: "project"
          }))


          let exhibitions = data.allSanityExhibition.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.statement,
            titles: edge.node.titles,
            slug: edge.node.slug,
            image: edge.node.image,
            type: "exhibition"
          }))

          let finalArray = projects.concat(exhibitions)
          return(finalArray.flat(1))
        },
      },
    },
  ]
}
