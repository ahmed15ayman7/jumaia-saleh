// fetchPracticeArea.ts
import { client } from './client';

export const fetchDynamicPage = async (slug: string, locale: string) => {
  const query = `
    *[_type == "${slug}" && language == $locale][0]{
      imageUrl,
      bottomImage,
      mainTitle,
      subtitle,
      description,
      points[]{
        title,
        desc
      },
      endDescription,
      readMore,
      readMoreLink,
      brochureTitle,
      brochureDesc,
      brochureFiles[]{
        label,
        link
      },
      whyTitle,
      whyDesc,
      whyPoints,
      breadcrumb[] {
        label,
        href
      },
      brochureTitle,
      brochureDesc,
      brochureFiles[]{
        label,
        link
      },
      whyTitle,
      whyDesc,
      whyPoints,
      bottomImage,
      relatedTitle,
      relatedDesc,
      relatedServices[]{
        image,
        title
      },
        newsletterTitle,
        newsletterDesc,
        newsletterInput,
        newsletterCta,
        newsletterSlides[]{
          backgroundImage,
          contentImage,
          label,
          title
        },
        newsletterPhone
    }
  `;
  return await client.fetch(query, { slug, locale });
};
