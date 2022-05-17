export default{
    title: 'Date & Time',
    name: 'dateObj',
    type: 'object',
    fields: [
      {name: 'timezone', type: 'reference', title: 'timezone', description: 'choose timezone or add a new timezone', to:{ type: 'timezone'}},
      {name: 'text', type: 'richText', title: 'Display Date & Time', description: 'What are the date/time details for this event in this timezone?'},
    ],
    preview: {
        select: {
            title: 'timezone.name'
        }
    }
  }