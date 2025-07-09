export default {
  name: 'servicePage',
  title: 'صفحة الخدمات',
  type: 'document',
  fields: [
    { name: 'breadcrumb', title: 'الخلفيه', type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'labelAr', type: 'string' }, { name: 'href', type: 'string' }] }] },
    { name: 'hero', title: 'الصوره الرئيسيه في الصفحه والكلمات الرئيسيه', type: 'reference', to: [{ type: 'hero' }] },
    { name: 'services', title: 'الخدمات', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] },
  ],
  preview: {
    select: { title: 'title', media: 'hero.backgroundImage' },
    prepare(selection: { title: string; media: any }) {
      const { title, media } = selection;
      return {
        title: title || "صفحة الخدمات",
        media: media,
      };
    },
  },
}; 