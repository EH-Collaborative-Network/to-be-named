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

/* Exhibitions */
async function createExhibitionPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityExhibition(filter: {slug: {current: {ne: null}}}) {
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

  const exhibitionEdges = (result.data.allSanityExhibition || {}).edges || []

  exhibitionEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/exhibition/${slug.replace(/[?=]/g, "").replace(/[#=]/g, "")}/`

      createPage({
        path,
        component: require.resolve('./src/templates/exhibition.js'),
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
  await createExhibitionPages(graphql, actions)
  await createDefaultPages(graphql, actions)

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