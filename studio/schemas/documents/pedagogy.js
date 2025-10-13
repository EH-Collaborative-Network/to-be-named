import { MdCastForEducation } from "react-icons/md";

export default {
  name: 'pedagogy',
  type: 'document',
  title: 'Pedagogy',
  icon: MdCastForEducation,
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
      name: 'titles',
      title: 'Titles to Display',
      type: 'array',
      description:"select add item to add a title in any language (including English)",
      of: [{type: 'titleTranslation'}],
    },
     {
      name: 'descriptions',
      title: 'Descriptions',
      type: 'array',
      description:"select add item to add a description in any language (including English)",
      of: [{type: 'translation'}],
    } 
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
