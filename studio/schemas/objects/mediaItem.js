import mediaRender from '../components/mediaRender'

export default{
    title: 'Media Item',
    name: 'mediaItem',
    type: 'object',
    description: "Choose from the three options below: Image, pdf, or embed",
    options: {
        collapsible: true,
        collapsed: true,
    },
    blockEditor: {
      icon: () => '🏞',
      render: mediaRender
    },
    fields: [
        {name: 'image', 
         type: 'figure', 
         title: 'Image', 
         description: 'upload image if your media item is an image', 
         },
        {name: 'embed', 
         type: 'embed', 
         title: 'Embed', 
         description: 'paste embed code if your media item is from soundcloud, vimeo, youtube, etc. or if your media item is an iframe', 
         options: {
            collapsible: true,
          }
        },
        {name: 'pdf', 
         type: 'pdf', 
         title: 'PDF', 
         description: 'upload pdf if your media item is a pdf', 
         }
      ],
      preview: {
        select: {
            media: 'image'
        }
      }
  }