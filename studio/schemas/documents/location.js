import { MdLocationPin } from "react-icons/md";

export default {
  name: 'location',
  type: 'document',
  title: 'Location',
  icon: MdPattern,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required().error('name cannot be left blank')
    },
    {
      name: 'titles',
      title: 'Titles to Display',
      type: 'array',
      description:"select add item to add a title in any language (including English)",
      of: [{type: 'titleTranslation'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
