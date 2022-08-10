import { MdLocationPin } from "react-icons/md";

export default {
  name: 'location',
  type: 'document',
  title: 'Location',
  icon: MdLocationPin,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required().error('name cannot be left blank')
    }
    
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
