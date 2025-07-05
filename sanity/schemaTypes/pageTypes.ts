export default {
    name: 'pageType',
    title: 'الاسم الخاص بصفحات الخدمات',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title | اسم الصفحه بالعربية', type: 'string' },
      { name: 'titleEn', title: 'Title | اسم الصفحه بالانجليزية', type: 'string' },
      { name: 'value', title: 'Slug Value | قيمه الصفحه زي: real-estate', type: 'string' }, // زي: real-estate
    ]
  }
  