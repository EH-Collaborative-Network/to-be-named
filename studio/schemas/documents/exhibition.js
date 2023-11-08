import {  MdTour } from "react-icons/md";

export default {
  name: 'exhibition',
  type: 'document',
  title: 'Exhibition',
  icon: MdTour,
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
      {
        name: 'subtitles',
        title: 'Subtitles to Display',
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
      name: 'image',
      title: 'Image',
      type: 'figure'
    },
    {
      name: 'threedwalk',
      title: '3D walkthrough',
      type: 'embed'
    },
    {
      name:'current',
      type: 'boolean',
      title: 'Is this exhibition currently showing?',
      description: '',
    },
    {
      name:'order',
      type: 'number',
      title: 'What is the order of this exhibition (i.e. 1 for first, 2 for second)?',
      description: '',
    },
    {
      name: 'statement',
      title: 'Curatorial Statement',
      type: 'array',
      description:"select add item to add a statement in any language (including English)",
      of: [{type: 'translation'}],
    },
    {
      name: 'dates',
      title: 'Dates',
      type: 'array',
      description:"select add item to add a date in any language (including English)",
      of: [{type: 'translation'}],
    },
    {
      name: 'cardDates',
      title: 'Dates (no links)',
      type: 'array',
      description:"select add item to add a date in any language (including English)",
      of: [{type: 'translation'}],
    },
    {
        name: 'media',
        title: 'Media',
        type: 'array',
        options: {layout: 'grid'},
        of: [{type: 'mediaItem'}],
    },
    
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
