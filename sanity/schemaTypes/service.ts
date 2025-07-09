export default {
  name: 'service',
  title: 'خدمة',
  type: 'document',
  fields: [
    { name: 'image', title: 'الصورة', type: 'image', options: { hotspot: true } },
    {
      name: 'pageType',
      title: 'الصفحه التي تنتمي اليها',
      type: 'reference',
      to: [{ type: 'pageType' }],
    },
    { name: 'description', title: 'الوصف (EN)', type: 'text' },
    { name: 'descriptionAr', title: 'الوصف (AR)', type: 'text' },
  ],
  preview: {
    select: { title: 'pageType.title', media: 'image' },
    prepare(selection: { title: string; media: any }) {
      const { title, media } = selection;
      return {
        title: title || "خدمة",
        media: media,
      };
    },
  },
}; 