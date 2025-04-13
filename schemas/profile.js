export default {
    name: 'profile',
    title: 'Profile',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96
        }
      },
      {
        name: 'profileImage',
        title: 'Profile Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'array',
        of: [
          {
            type: 'block'
          }
        ]
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string'
      },
      {
        name: 'phone',
        title: 'Phone',
        type: 'string'
      },
      {
        name: 'socialLinks',
        title: 'Social Links',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'platform',
                title: 'Platform',
                type: 'string',
                options: {
                  list: [
                    {title: 'LinkedIn', value: 'linkedin'},
                    {title: 'Instagram', value: 'instagram'},
                    {title: 'YouTube', value: 'youtube'},
                    {title: 'Vimeo', value: 'vimeo'},
                    {title: 'Twitter', value: 'twitter'},
                    {title: 'TikTok', value: 'tiktok'},
                    {title: 'IMDb', value: 'imdb'},
                  ]
                }
              },
              {
                name: 'url',
                title: 'URL',
                type: 'url'
              }
            ],
            preview: {
              select: {
                title: 'platform',
                subtitle: 'url'
              }
            }
          }
        ]
      }
    ]
  }