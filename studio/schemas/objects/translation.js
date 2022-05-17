export default{
    title: 'Translation',
    name: 'translation',
    type: 'object',
    fields: [
        {name: 'language', type: 'reference', title: 'language', description: "What language is this text in? (Check the dropdown for the language option. If the language doesn't exist, you may add it by selecting 'Create New')", to:{ type: 'language'}, validation: Rule => Rule.required().error('cannot be left blank'),},
        {name: 'text', type: 'richText', title: 'text'},
      ],
    preview: {
        select: {
            title: 'language.name'
        }
    }
  }