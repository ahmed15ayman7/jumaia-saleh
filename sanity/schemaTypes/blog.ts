// سكيمة Blog للـ Sanity
export default {
  name: 'blog',
  title: 'مقالة',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'الصورة',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'date',
      title: 'التاريخ',
      type: 'date',
      options: { dateFormat: 'DD-MM-YYYY' },
    },
    {
      name: 'title',
      title: 'العنوان (EN)',
      type: 'string',
    },
    {
      name: 'titleAr',
      title: 'العنوان (AR)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'الوصف (EN)',
      type: 'text',
    },
    {
      name: 'descriptionAr',
      title: 'الوصف (AR)',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'الرابط',
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