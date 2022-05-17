import { MdInsertLink, MdImage } from "react-icons/md";

export default {
  name: 'richText',
  type: 'array',
  title: 'richText',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'}
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            blockEditor: {
              icon: MdInsertLink
            },
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              }
            ]
          },
          {
            title: 'Image',
            name: 'image',
            type: 'image',
            blockEditor: {
              icon: MdImage,
            }
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            blockEditor: {
              icon: () => '🔗'
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'page' },
                  { type: 'project' },
                  { type: 'event' }
                  // other types you may want to link to
                ]
              }
            ]
          }
        ]
      }
    }
  ]
}
