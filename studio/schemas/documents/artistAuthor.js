import { MdPerson } from "react-icons/md";

export default {
  name: 'artistAuthor',
  type: 'document',
  title: 'Artist/Author',
  icon: MdPerson,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required().error('name cannot be left blank')
    },
    {
      name: 'locationDisplay',
      title: 'Location(s) to Display',
      type: 'array',
      description:"select add item to add a title in any language (including English)",
      of: [{type: 'titleTranslation'}],
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
      name:'commissioned',
      type: 'boolean',
      title: 'Is this a commissioned artist/author?',
      description: '',
  },
  {
      name:'traveling',
      type: 'boolean',
      title: 'Is this a traveling artist/author?',
      description: '',
  },
  {
    name:'regional',
    type: 'boolean',
    title: 'Is this a regional artist/author?',
    description: '',
  },
  {
    name:'studentWork',
    type: 'boolean',
    title: 'Is this a student?',
    description: '',
  },
    {
      name: 'image',
      title: 'Image',
      type: 'figure'
    },
    {
      name: 'bios',
      title: 'Bios',
      type: 'array',
      description:"select add item to add a bio in any language (including English)",
      of: [{type: 'translation'}],
    },
    {
      name: 'medium',
      type: 'array',
      title: 'Medium(s)',
      description: 'Add keywords that describe the medium this artist/author works in (optional)',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'locations', 
      type: 'array', 
      title: 'Location(s). *This will be used for filtering on the exhibition & edition index pages, not displayed on the profile page.', 
      of:[{type:'reference', title:'Location', to: [{type: 'location'}]}]
    },
    {
        name: 'projects', 
        type: 'array', 
        title: 'Projects/articles', 
        of:[{type:'reference', title:'Project/Article', to: [{type: 'project'}]}]
    }
    
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
