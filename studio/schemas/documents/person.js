import { MdPerson } from "react-icons/md";

export default {
  name: 'person',
  type: 'document',
  title: 'Person/Organization/Collaborator',
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
  }
        
    
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
