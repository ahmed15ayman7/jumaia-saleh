export default {
      name: 'hero',
      title: 'الصوره الرئيسيه في الصفحه والكلمات الرئيسيه',
      type: 'document',
      fields: [
        { name: 'backgroundImage', title: 'صوره الرئيسيه', type: 'image', options: { hotspot: true } },
        { name: 'title', title: 'العنوان الرئيسي', type: 'string' },
        { name: 'titleAr', title: 'العنوان الرئيسي باللغه العربيه', type: 'string' },
        { name: 'subtitle', title: 'العنوان الفرعي', type: 'string' },
        { name: 'subtitleAr', title: 'العنوان الفرعي باللغه العربيه', type: 'string' },
      ],
    }