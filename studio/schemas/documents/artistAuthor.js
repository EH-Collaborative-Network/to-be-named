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
      title: 'Location(s)', 
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
