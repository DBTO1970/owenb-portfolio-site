export default {
    name: 'project',
    title: 'Project',
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
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{type: 'category'}]
      },
      {
        name: 'mainImage',
        title: 'Main image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'releaseDate',
        title: 'Release Date',
        type: 'date'
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
        name: 'videoType',
        title: 'Video Type',
        type: 'string',
        options: {
          list: [
            {title: 'YouTube', value: 'youtube'},
            {title: 'Vimeo', value: 'vimeo'},
            {title: 'Cloudinary', value: 'cloudinary'},
            {title: 'Other Embed', value: 'embed'}
          ]
        }
      },
      {
        name: 'videoUrl',
        title: 'Video URL',
        type: 'url',
        description: 'YouTube or Vimeo URL'
      },
      {
        name: 'videoFile',
        title: 'Video File (Cloudinary)',
        type: 'file',
        description: 'For directly uploaded videos (if not using YouTube/Vimeo)',
        options: {
          accept: 'video/*'
        },
        hidden: ({document}) => document?.videoType !== 'cloudinary'
      },
      {
        name: 'embedCode',
        title: 'Embed Code',
        type: 'text',
        description: 'Paste embed code here',
        hidden: ({document}) => document?.videoType !== 'embed'
      },
      {
        name: 'credits',
        title: 'Credits',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'role',
                title: 'Role',
                type: 'string'
              },
              {
                name: 'name',
                title: 'Name',
                type: 'string'
              }
            ],
            preview: {
              select: {
                title: 'role',
                subtitle: 'name'
              }
            }
          }
        ]
      },
      {
        name: 'gallery',
        title: 'Project Gallery',
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
        name: 'featured',
        title: 'Featured Project',
        type: 'boolean',
        description: 'Show this project on the homepage'
      },
      {
        name: 'order',
        title: 'Order',
        type: 'number',
        description: 'Order for featured projects (lower numbers appear first)'
      }
    ],
    orderings: [
      {
        title: 'Release Date, New',
        name: 'releaseDateDesc',
        by: [
          {field: 'releaseDate', direction: 'desc'}
        ]
      },
      {
        title: 'Featured Order',
        name: 'featuredOrder',
        by: [
          {field: 'order', direction: 'asc'}
        ]
      }
    ],
    preview: {
      select: {
        title: 'title',
        media: 'mainImage',
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