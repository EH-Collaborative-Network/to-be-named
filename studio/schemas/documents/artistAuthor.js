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
