export default {
    name: 'resumeItem',
    title: 'Resume Item',
    type: 'document',
    fields: [
      {
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
          list: [
            {title: 'Work Experience', value: 'work'},
            {title: 'Education', value: 'education'},
            {title: 'Skills', value: 'skills'},
            {title: 'Awards', value: 'awards'}
          ]
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'title',
        title: 'Title/Position',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'organization',
        title: 'Company/Organization',
        type: 'string'
      },
      {
        name: 'startDate',
        title: 'Start Date',
        type: 'date'
      },
      {
        name: 'endDate',
        title: 'End Date',
        type: 'date',
        description: 'Leave blank if current'
      },
      {
        name: 'current',
        title: 'Current Position',
        type: 'boolean',
        description: 'Check if this is your current position'
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'array',
        of: [
          {
            type: 'block'
          }
        ]
      },
      {
        name: 'order',
        title: 'Order',
        type: 'number',
        description: 'Order within category (lower numbers appear first)'
      }
    ],
    orderings: [
      {
        title: 'Start Date, New',
        name: 'startDateDesc',
        by: [
          {field: 'startDate', direction: 'desc'}
        ]
      },
      {
        title: 'Custom Order',
        name: 'manualOrder',
        by: [
          {field: 'order', direction: 'asc'}
        ]
      },
      {
        title: 'Category',
        name: 'category',
        by: [
          {field: 'category', direction: 'asc'},
          {field: 'order', direction: 'asc'}
        ]
      }
    ],
    preview: {
      select: {
        title: 'title',
        organization: 'organization',
        category: 'category'
      },
      prepare(selection) {
        const {title, organization, category} = selection
        let categoryLabel = '';
        
        switch(category) {
          case 'work': categoryLabel = 'Work'; break;
          case 'education': categoryLabel = 'Education'; break;
          case 'skills': categoryLabel = 'Skills'; break;
          case 'awards': categoryLabel = 'Awards'; break;
        }
        
        return {
          title: title,
          subtitle: `${categoryLabel} | ${organization || ''}`
        }
      }
    }
  }