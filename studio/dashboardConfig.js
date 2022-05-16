export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6282bb6414e5ce1a39cbcd0e',
                  title: 'Sanity Studio',
                  name: 'to-be-named-studio',
                  apiId: '14c6ee98-b893-4f47-8c9d-9d5a52f1574b'
                },
                {
                  buildHookId: '6282bb64ed2685196c0097be',
                  title: 'Portfolio Website',
                  name: 'to-be-named',
                  apiId: 'a5757acb-0e49-4417-856b-957cc77e95c4'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/AaratiAkkapeddi/to-be-named',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://to-be-named.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
