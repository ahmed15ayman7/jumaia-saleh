// سكيمة Blog للـ Sanity
export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'DD-MM-YYYY' },
    },
    {
      name: 'title',
      title: 'Title (EN)',
      type: 'string',
    },
    {
      name: 'titleAr',
      title: 'Title (AR)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description (EN)',
      type: 'text',
    },
    {
      name: 'descriptionAr',
      title: 'Description (AR)',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'mainImage',
    },
    prepare(selection: { title: string; date: string; media: any }) {
      const { title, date, media } = selection;
      return {
        title: title,
        subtitle: date,
        media: media,
      };
    },
  },
}; 