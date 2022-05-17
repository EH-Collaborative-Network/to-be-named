export default{
    title: 'Embed',
    name: 'embed',
    type: 'object',
    fields: [
        {name: 'embed', type: 'text', title: 'Embed Code', description: 'paste embed code if your media item is from soundcloud, vimeo, youtube, etc. or if your media item is an iframe'},
        {name: 'altText', type: 'text', title: 'Alt Text', description: 'alt text for your embed'},
        {name: 'caption', type: 'text', title: 'caption', description: 'caption for your embed'}
      ]
  }