// schemas/aboutUs.ts
const aboutUs = {
  name: "aboutUs",
  title: "صفحة من نحن",
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
        { name: "date", title: "التاريخ", type: "datetime" },
        { name: "description", title: "الوصف", type: "text" },
        { name: "descriptionAr", title: "الوصف باللغه العربيه", type: "text" },
      ],
    },

    // 3. Brochure Section
    {
      name: "brochure",
      title: "الملفات التعريفيه",
      type: "object",
      fields: [
        { name: "title", title: "العنوان الرئيسي بالانجليزيه", type: "string" },
        {
          name: "titleAr",
          title: "العنوان الرئيسي باللغه العربيه",
          type: "string",
        },
        { name: "description", title: "الوصف بالانجليزيه", type: "string" },
        {
          name: "descriptionAr",
          title: "الوصف باللغه العربيه",
          type: "string",
        },
        {
          name: "buttons",
          title: "الأزرار",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "النص بالانجليزيه", type: "string" },
                {
                  name: "labelAr",
                  title: "النص باللغه العربيه",
                  type: "string",
                },
                {
                  name: "link",
                  title: "الرابط",
                  type: "file",
                  options: { accept: [".pdf", ".docx", ".jpg"] } 
                  },
              ],
            },
          ],
        },
      ],
    },

    // 4. Vision Section
    {
      name: "vision",
      title: "الرؤيه",
      type: "object",
      fields: [
        { name: "title", title: "العنوان الرئيسي بالانجليزيه", type: "string" },
        {
          name: "titleAr",
          title: "العنوان الرئيسي باللغه العربيه",
          type: "string",
        },
        { name: "description", title: "الوصف الاول بالانجليزيه", type: "text" },
        { name: "descriptionAr", title: "الوصف الاول باللغه العربيه", type: "text" },
        { name: "description2", title: "الوصف الثاني بالانجليزيه", type: "text" },
        { name: "descriptionAr2", title: "الوصف الثاني باللغه العربيه", type: "text" },
        { name: "description3", title: "الوصف الثالث بالانجليزيه", type: "text" },
        { name: "descriptionAr3", title: "الوصف الثالث باللغه العربيه", type: "text" },
      ],
    },

    // 5. Why Us Section
    {
      name: "whyUs",
      title: "لماذا نحن",
      type: "object",
      fields: [
        { name: "title", title: "العنوان الرئيسي بالانجليزيه", type: "string" },
        {
          name: "titleAr",
          title: "العنوان الرئيسي باللغه العربيه",
          type: "string",
        },
        { name: "description", title: "الوصف بالانجليزيه", type: "text" },
        { name: "descriptionAr", title: "الوصف باللغه العربيه", type: "text" },
        {
          name: "points",
          title: "النقاط",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "النص بالانجليزيه", type: "string" },
                {
                  name: "labelAr",
                  title: "النص باللغه العربيه",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    },

    // // 6. Statistics Section
    // {
    //   name: "statistics",
    //   title: "الإحصائيات",
    //   type: "array",
    //   of: [
    //     {
    //       type: "object",
    //       fields: [
    //         { name: "label", title: "النص بالانجليزيه", type: "string" },
    //         { name: "labelAr", title: "النص باللغه العربيه", type: "string" },
    //         { name: "title", title: "العنوان بالانجليزيه", type: "string" },
    //         {
    //           name: "titleAr",
    //           title: "العنوان باللغه العربيه",
    //           type: "string",
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: any) {
      return {
        title: selection.title ||"من نحن",
      }
    }
  }
};

export default aboutUs;
