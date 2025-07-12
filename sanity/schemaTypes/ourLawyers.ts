export default {
  name: 'ourLawyers',
  title: 'محامونا',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'العنوان',
      type: 'string',
      description: 'العنوان الرئيسي لقسم محامونا'
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
      description: 'وصف قسم محامونا'
    },
    {
      name: 'descriptionAr',
      title: 'الوصف بالعربية',
      type: 'text',
      description: 'وصف قسم محامونا باللغة العربية'
    },
    {
      name: 'lawyers',
      title: 'المحامون',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'الاسم',
              type: 'string',
              description: 'اسم المحامي'
            },
            {
              name: 'nameAr',
              title: 'الاسم بالعربية',
              type: 'string',
              description: 'اسم المحامي باللغة العربية'
            },
            {
              name: 'title',
              title: 'المسمى الوظيفي',
              type: 'string',
              description: 'المسمى الوظيفي للمحامي'
            },
            {
              name: 'titleAr',
              title: 'المسمى الوظيفي بالعربية',
              type: 'string',
              description: 'المسمى الوظيفي باللغة العربية'
            },
            {
              name: 'image',
              title: 'الصورة',
              type: 'image',
              description: 'صورة المحامي'
            }
          ]
        }
      ]
    }
  ]
} 