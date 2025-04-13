export default {
    name: 'gallery',
    title: 'Gallery',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96
        }
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text'
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true
            },
            fields: [
              {
                name: 'caption',
                title: 'Caption',
                type: 'string',
                options: {
                  isHighlighted: true
                }
              },
              {
                name: 'alt',
                title: 'Alternative text',
                type: 'string',
                options: {
                  isHighlighted: true
                }
              }
            ]
          }
        ]
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{type: 'category'}]
      },
      {
        name: 'order',
        title: 'Order',
        type: 'number',
        description: 'Order in the gallery list (lower numbers appear first)'
      }
    ],
    preview: {
      select: {
        title: 'title',
        media: 'images.0',
        category: 'category.title'
      },
      prepare(selection) {
        const {title, media, category} = selection
        return {
          title: title,
          subtitle: category ? `Category: ${category}` : '',
          media: media
        }
      }
    }
  }