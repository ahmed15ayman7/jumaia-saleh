// schemas/terms.ts
const terms = {
  name: "terms",
  title: "الشروط والأحكام",
  type: "document",
  fields: [
    {
      name: "breadcrumb",
      title: "التنقلات اعلي الصفحه",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "التسمية بالانجليزيه", type: "string" },
            { name: "labelAr", title: "التسمية باللغه العربيه", type: "string" },
            { name: "href", title: "الرابط", type: "string" },
          ],
        },
      ],
    },
    // 1. Hero Section
    {
      name: "hero",
      title: "الصوره الرئيسيه في الصفحه والكلمات الرئيسيه",
      type: "reference",
      to: [{ type: "hero" }],
    },

    // 2. Content Section
    {
      name: "content",
      title: "المحتوى الرئيسي في الصفحه",
      type: "object",
      fields: [
        { name: "title", title: "العنوان الرئيسي بالانجليزيه", type: "string" },
        {
          name: "titleAr",
          title: "العنوان الرئيسي باللغه العربيه", 
          type: "string",
        },
        { name: "author", title: "المؤلف بالانجليزيه", type: "string" },
        { name: "authorAr", title: "المؤلف باللغه العربيه", type: "string" },
        { name: "description", title: "الوصف", type: "text" },
        { name: "descriptionAr", title: "الوصف باللغه العربيه", type: "text" },
        {
          name: "items",
          title: "العناصر",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "العنوان بالانجليزيه", type: "string" },
                { name: "titleAr", title: "العنوان باللغه العربيه", type: "string" },
                { name: "description", title: "الوصف بالانجليزيه", type: "text" },
                { name: "descriptionAr", title: "الوصف باللغه العربيه", type: "text" },
              ],
            },
          ],
        },
      ],
    },

  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'hero.backgroundImage'
    },
    prepare(selection: any) {
      return {
        title: selection.title ||"الشروط والأحكام",
        subtitle: selection.subtitle ||"terms",
        media: selection.media
      }
    }
  }
};

export default terms;
