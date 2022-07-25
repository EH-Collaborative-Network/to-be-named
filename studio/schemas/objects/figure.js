import mediaRender from '../components/mediaRender'


export default{
    title: 'Image',
    name: 'figure',
    type: 'image',
    options: { hotspot:true},
    blockEditor: {
        icon: () => '🏞',
        render: mediaRender
      },
    fields: [
        {name: 'altText', type: 'text', title: 'Alt Text', description: 'description for screen readers'},
        {name: 'caption', type: 'text', title: 'Caption', description: 'caption for your image'}
      ]
  }