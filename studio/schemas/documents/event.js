import { MdEventNote } from "react-icons/md";

export default {
  name: 'event',
  type: 'document',
  title: 'Event',
  icon: MdEventNote,
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
        name:'startDate',
        type: 'date',
        title: 'Start Date in EST (for sorting purposes)',
        description: "this is for ordering events on the calendar, it won't be displayed on the website"
     },
     {
        name:'endDate',
        type: 'date',
        title: 'End Date in EST (for sorting purposes)',
        description: "this is for ordering events on the calendar, it won't be displayed on the website"
     },
     {
         name: 'displayDate',
         type: 'richText',
         title: 'Display Date & Time',
         type: 'array',
         of: [{type: 'dateObj'}],
         description: 'this will show up on the event page'
     },
     {
        name: 'mainLink',
        title: 'Link to event website (if any)',
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
        name: 'people',
        type: 'array',
        description: 'EHCN Personnel associated with this event (if any)',
        title: 'EHCN Personnel',
        of:[{type:'reference', title:'Associated EHCN Personnel', to: [{type: 'person'}]}]
    },
    {
        name: 'media',
        title: 'Image(s)',
        type: 'array',
        options: {layout: 'grid'},
        of: [{type: 'mediaItem'}],
    },
    {
        name: 'keywords',
        type: 'array',
        title: 'Keywords',
        description: 'Add keywords that describe this event (optional)',
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
