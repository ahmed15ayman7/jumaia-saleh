export default {
  name: 'ourPracticeAreas',
  title: 'مجالات ممارستنا',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'العنوان',
      type: 'string',
      description: 'العنوان الرئيسي لقسم مجالات الممارسة'
    },
    {
      name: 'titleAr',
      title: 'العنوان بالعربية',
      type: 'string',
      description: 'العنوان الرئيسي باللغة العربية'
    },
    {
      name: 'description',
      title: 'الوصف',
      type: 'text',
      description: 'وصف قسم مجالات الممارسة'
    },
    {
      name: 'descriptionAr',
      title: 'الوصف بالعربية',
      type: 'text',
      description: 'وصف قسم مجالات الممارسة باللغة العربية'
    },
    {
      name: 'practiceAreas',
      title: 'مجالات الممارسة',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
        {
          name: 'pageType',
          title: 'الصفحة',
          type: 'reference',
          to: [{ type: 'pageType' }]
        },
            {
              name: 'image',
              title: 'الصورة',
              type: 'image',
              description: 'صورة مجال الممارسة'
            }
          ]
        }
      ]
    }
  ]
} 