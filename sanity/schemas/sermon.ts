import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Link to the sermon video on YouTube',
    }),
    defineField({
      name: 'sermonSlides',
      title: 'Sermon Slides (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Upload the sermon slides PDF',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scripture',
      title: 'Scripture Reference',
      type: 'string',
      description: 'e.g., "John 3:16-21"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'string',
      description: 'The sermon series this belongs to',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      speaker: 'speaker',
      date: 'date',
      media: 'thumbnail',
    },
    prepare({ title, speaker, date, media }) {
      return {
        title,
        subtitle: `${speaker} - ${date}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date, Oldest',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
});
