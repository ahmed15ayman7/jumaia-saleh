export default {
  name: 'service',
  title: 'خدمة',
  type: 'document',
  fields: [
    { name: 'image', title: 'الصورة', type: 'image', options: { hotspot: true } },
    { name: 'title', title: 'العنوان (EN)', type: 'string' },
    { name: 'titleAr', title: 'العنوان (AR)', type: 'string' },
    { name: 'description', title: 'الوصف (EN)', type: 'text' },
    { name: 'descriptionAr', title: 'الوصف (AR)', type: 'text' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
}; 