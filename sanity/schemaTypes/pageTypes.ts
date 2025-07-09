export default {
    name: 'pageType',
    title: 'الاسم الخاص بصفحات الخدمات',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title | اسم الصفحه بالعربية', type: 'string' },
      { name: 'titleEn', title: 'Title | اسم الصفحه بالانجليزية', type: 'string' },
      { name: 'value', title: 'Slug Value | قيمه الصفحه زي: real-estate', type: 'string' }, // زي: real-estate
    ],
    preview: {
      select: { title: 'title', value: 'value' },
      prepare(selection:any) {
        const { title, value } = selection;
        return {
          title: title || "صفحة",
          subtitle: value || "صفحة"
        }
      },
    },
  }
  