export default {
  name: "ourPracticeAreas",
  title: " قسم مجالات اعمالنا في الصفحة الرئيسية",
  type: "document",
  fields: [
    {
      name: "title",
      title: "العنوان",
      type: "string",
      description: "العنوان الرئيسي لقسم مجالات اعمالنا في الصفحة الرئيسية",
    },
    {
      name: "titleAr",
      title: "العنوان بالعربية",
      type: "string",
      description: "العنوان الرئيسي لقسم مجالات اعمالنا في الصفحة الرئيسية باللغة العربية",
    },
    {
      name: "description",
      title: "الوصف",
      type: "text",
      description: "وصف قسم مجالات اعمالنا في الصفحة الرئيسية",
    },
    {
      name: "descriptionAr",
      title: "الوصف بالعربية",
      type: "text",
      description: "وصف قسم خدماتنا في الصفحة الرئيسية باللغة العربية",
    },
    {
      name: "practiceAreas",
      title: "مجالات الممارسة",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "pageType",
              title: "الصفحة",
              type: "reference",
              to: [{ type: "pageType" }],
            },
            {
              name: "image",
              title: "الصورة",
              type: "image",
              description: "صورة للخدمة ",
              options: {
                hotspot: true,
              },
            },
          ],
        },

      ],
      preview: {
        select: {
          title: "pageType.title",
          media: "image",
        },
        prepare({ title, media }: { title: string; media: any }) {
          return {
            title: title || "بدون عنوان",
            media,
          };
        },
      },
    },
  ],
};
