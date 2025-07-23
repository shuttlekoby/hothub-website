import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageCollection',
  title: 'Image Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Collection Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'reference',
        to: {type: 'cosplayImage'}
      }],
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
      name: 'collectionType',
      title: 'Collection Type',
      type: 'string',
      options: {
        list: [
          {title: 'Photo Set', value: 'photoset'},
          {title: 'Character Series', value: 'character'},
          {title: 'Event/Convention', value: 'event'},
          {title: 'Daily Photos', value: 'daily'},
        ]
      },
      initialValue: 'photoset'
    }),
    defineField({
      name: 'isNSFW',
      title: 'NSFW Collection',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'character',
      media: 'coverImage',
      cosplayer: 'cosplayer.name'
    },
    prepare(selection) {
      const {title, subtitle, cosplayer} = selection
      return {
        title,
        subtitle: `${cosplayer || 'Unknown'} - ${subtitle || 'No character'}`,
        media: selection.media
      }
    },
  },
}) 