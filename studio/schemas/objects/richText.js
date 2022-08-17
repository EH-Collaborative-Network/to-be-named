import { MdInsertLink } from "react-icons/md";
import mediaRender from '../components/mediaRender'

export default {
  name: 'richText',
  type: 'array',
  title: 'richText',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'},{title: 'Heading 1', value: 'h1'}],
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
            title: 'Media Item',
            name: 'media',
            type: 'mediaItem',
            blockEditor: {
              icon: () => '🏞',
              render: mediaRender
            }
          },
          {
            name: 'person',
            type: 'object',
            title: 'EHCN Personnel',
            blockEditor: {
              icon: () => '👤'
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'person' }
                ]
              }
            ]
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
                  { type: 'researchThread' },
                  { type: 'event' },
                ]
              }
            ]
          }
        ]
      }
    }
  ]
}
