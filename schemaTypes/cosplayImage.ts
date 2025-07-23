import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'cosplayImage',
  title: 'Cosplay Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'cosplayer',
      title: 'Cosplayer',
      type: 'reference',
      to: {type: 'cosplayer'},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'character',
      title: 'Character',
      type: 'string',
    }),
    defineField({
      name: 'series',
      title: 'Series/Anime',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'isNSFW',
      title: 'NSFW Content',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'uploadDate',
      title: 'Upload Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Original Twitter URL',
      type: 'url',
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'character',
      media: 'image',
      cosplayer: 'cosplayer.name'
    },
    prepare(selection) {
      const {title, subtitle, cosplayer} = selection
      return {
        title: title || 'Untitled',
        subtitle: `${cosplayer || 'Unknown'} - ${subtitle || 'No character'}`,
        media: selection.media
      }
    },
  },
}) 