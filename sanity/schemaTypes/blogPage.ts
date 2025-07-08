export default {
    name: 'blogPage',
    title: 'صفحة المدونة',
    type: 'document',
    fields: [
      {
    name: 'breadcrumb',
    title: 'Breadcrumb',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          { name: 'label', title: 'Label (EN)', type: 'string' },
          { name: 'labelAr', title: 'Label (AR)', type: 'string' },
          { name: 'href', title: 'Href', type: 'string' },
        ],
      },
    ],
  },
  {
    name: 'hero',
    title: 'Hero Section',
    type: 'reference',
    to: [{ type: 'hero' }],
  },
  {
    name: 'blog',
    title: 'Blog',
    type: 'reference',
    to: [{ type: 'blog' }],
  },
],preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection:any) {
      const { title, subtitle } = selection
      return {
        title: title || 'صفحة المدونة',
        subtitle: subtitle || 'صفحة المدونة',
      }
    },
  },
}