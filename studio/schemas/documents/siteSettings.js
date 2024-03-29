export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish'
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'instagram',
      type: 'string',
      title: 'Instagram Token'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your portfolio for search engines and social media.'
    },
    {
      name: 'languages',
      type: 'array',
      description: 'Languages with translations available globally accross the website',
      title: 'Languages',
      of:[{type:'reference', title:'Language', to: [{type: 'language'}]}]
    },
    {
      name: 'projects', 
      type: 'array', 
      title: 'Featured Projects/articles', 
      of:[{type:'reference', title:'Project/Article', to: [{type: 'project'}]}]
    },
    {
      name: 'credits',
      title: 'Homepage Credits',
      type: 'array',
      description:"Credits for landing page artists",
      of: [{type: 'translation'}],
  },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your portfolio.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }
  ]
}
