const {isFuture,parseISO} = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createProjectPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityProject(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProject || {}).edges || []

  projectEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/project/${slug}/`

      createPage({
        path,
        component: require.resolve('./src/templates/project.js'),
        context: {id}
      })
    })
}
/* Artist Authors  */
async function createArtistAuthorPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityArtistAuthor(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const artistAuthorEdges = (result.data.allSanityArtistAuthor || {}).edges || []

  artistAuthorEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/creator/${slug.replace(/[?=]/g, "").replace(/[#=]/g, "")}/`

      createPage({
        path,
        component: require.resolve('./src/templates/artistAuthor.js'),
        context: {id}
      })
    })
}
/* Research Threads */
async function createResearchThreadPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityResearchThread(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const researchThreadEdges = (result.data.allSanityResearchThread || {}).edges || []

  researchThreadEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/thread/${slug.replace(/[?=]/g, "").replace(/[#=]/g, "")}/`

      createPage({
        path,
        component: require.resolve('./src/templates/researchThread.js'),
        context: {id}
      })
    })
}
/* Events */
async function createEventPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityEvent(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const eventEdges = (result.data.allSanityEvent || {}).edges || []

  eventEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/event/${slug.replace(/[?=]/g, "").replace(/[#=]/g, "")}/`

      createPage({
        path,
        component: require.resolve('./src/templates/event.js'),
        context: {id}
      })
    })
}

/* Page */
async function createDefaultPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityPage(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const pageEdges = (result.data.allSanityPage || {}).edges || []

  pageEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/${slug.replace(/[?=]/g, "").replace(/[#=]/g, "")}/`

      createPage({
        path,
        component: require.resolve('./src/templates/page.js'),
        context: {id}
      })
    })
}

exports.createPages = async ({graphql, actions}) => {
  await createProjectPages(graphql, actions)
  await createResearchThreadPages(graphql, actions)
  await createArtistAuthorPages(graphql, actions)
  await createDefaultPages(graphql, actions)
  await createEventPages(graphql, actions)

}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
      actions.setWebpackConfig({
          module: {
              rules: [
                  {
                      test: /react-p5-wrapper/,
                      use: loaders.null()
                  },
                  {
                    test: /p5/,
                    use: loaders.null()
                }
              ]
          }
      });
  }
};