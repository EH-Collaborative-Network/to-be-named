import { MdAutoAwesome } from "react-icons/md";

export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  icon: MdAutoAwesome,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Title (Internal use only)',
      validation: Rule => Rule.required().error('title cannot be left blank')
    },
    {
      name: 'titles',
      title: 'Titles to Display',
      type: 'array',
      description:"select add item to add a title in any language (including English)",
      of: [{type: 'titleTranslation'}],
    },
    {
      name: 'subtitles',
      title: 'Subtitles to Display',
      type: 'array',
      description:"select add item to add a title in any language (including English)",
      of: [{type: 'titleTranslation'}],
    },
    {
      name: 'artists', 
      type: 'array', 
      title: 'Artist/Author(s)', 
      of:[{type:'reference', title:'Artist/Author', to: [{type: 'person'}]}]
  },
  {
    name:'sortLetter',
    type: 'string',
    title: 'Last name of the first artist/author',
    description: 'this is used for sorting purposes',
  },
  {
      name: 'exhibitions', 
      type: 'array', 
      title: 'Exhibition(s)', 
      of:[{type:'reference', title:'Exhibition', to: [{type: 'exhibition'}]}]
  },
    {
      name: 'mainImage',
      title: 'Thumbnail Image',
      type: 'figure',
    },
    {
       name:'slug',
       type: 'slug',
       title: 'Slug (what should the link to this page look like)',
       validation: Rule => Rule.required().error('slug cannot be left blank'),
       options: {
        source: 'name',
        maxLength: 200, // will be ignored if slugify is set
        slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             .slice(0, 200)
      }
    },
    {
        name:'exhibition',
        type: 'boolean',
        title: 'Is this project part of the exhibition?',
        description: '',
    },
    {
        name:'volume',
        type: 'boolean',
        title: 'Is this project part of the edited volume?',
        description: '',
    },
    {
        name:'studentWork',
        type: 'boolean',
        title: 'Is this student work?',
        description: '',
    },
    {
        name:'commissioned',
        type: 'boolean',
        title: 'Is this a commissioned work?',
        description: '',
    },
      {
        name:'regional',
        type: 'boolean',
        title: 'Is this a regional work?',
        description: '',
    },
    {
      name:'traveling',
      type: 'boolean',
      title: 'Is this a traveling work?',
      description: '',
    },
    {
      name:'websiteContributor',
      type: 'boolean',
      title: 'Is a website contributor?',
      description: '',
    },
    {
        name: 'mainLink',
        title: 'Link to project website (if any)',
        type: 'link'
      },
      {
        name: 'descriptions',
        title: 'Description',
        type: 'array',
        description:"select add item to add a description in any language (including English)",
        of: [{type: 'translation'}],
    },
    {
        name: 'media',
        title: 'Media',
        type: 'array',
        options: {layout: 'grid'},
        of: [{type: 'mediaItem'}],
    },
    {
      name: 'researchThreads', 
      type: 'array', 
      title: 'Research Thread(s). *This will be used for filtering on the exhibition & edition index pages, not displayed on the profile page.', 
      of:[{type:'reference', title:'Research Thread', to: [{type: 'researchThread'}]}]
    },
    {
      name: 'mediums', 
      type: 'array', 
      title: 'Medium(s)', 
      of:[{type:'reference', title:'Medium', to: [{type: 'medium'}]}]
    },
    {
        name: 'keywords',
        type: 'array',
        title: 'Keywords',
        description: 'Add keywords that describe this working group (optional)',
        of: [{type: 'string'}],
        options: {
          layout: 'tags'
        }
      }
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
