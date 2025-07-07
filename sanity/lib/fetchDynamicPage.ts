// fetchPracticeArea.ts
import { client } from './client';

export const fetchDynamicPage = async (slug: string, locale: string) => {
  const query = `
    *[_type == "real-estate" && slug->value == $slug && language == $locale][0]{
      sharedPageContent->{
        title,
        image,
        brochureFiles,
        newsletterSlides,
        relatedServices
      },
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
export const fetchDynamicPageType = async (slug: string) => {
  const query = `
    *[_type == "pageType"]{
      title,
      titleEn,
      value
    }
  `;
  return await client.fetch(query, { slug });
};



export const fetchAboutUs = async (locale: string = 'ar') => {
  const query = `
    *[_type == "aboutUs"][0]{
    breadcrumb,
      hero->{
        title,
        titleAr,
        subtitle,
        subtitleAr,
        backgroundImage {
          asset->{url}
        }
      },
      content {
        title,
        titleAr,
        author,
        authorAr,
        date,
        description,
        descriptionAr
      },
      brochure {
        title,
        titleAr,
        description,
        descriptionAr,
        buttons[]{
          label,
          labelAr,
          link
        }
      },
      vision {
        title,
        titleAr,
        description,
        descriptionAr,
        description2,
        descriptionAr2,
        description3,
        descriptionAr3
      },
      whyUs {
        title,
        titleAr,
        description,
        descriptionAr,
        points[]{
          label,
          labelAr
        }
      },
    }
  `;
  return await client.fetch(query, { locale });
};

export const fetchTerms = async (locale: string = 'ar') => {
  const query = `
    *[_type == "terms"][0]{
      breadcrumb,
      hero->{
        title,
        titleAr,
        subtitle,
        subtitleAr,
        backgroundImage { 
          asset->{url}
        }
      },
      content {
        title,
        titleAr,
        description,
        descriptionAr,
        items[]{
          title,
          titleAr,
          description,
          descriptionAr
        }
      }
    }
  `;
  return await client.fetch(query, { locale });
};

export const fetchPrivacy = async (locale: string = 'ar') => {
  const query = `
    *[_type == "privacy"][0]{
      breadcrumb,
      hero->{
        title,
        titleAr,
        subtitle,
        subtitleAr,
        backgroundImage { 
          asset->{url}
        }
      },
      content {
        title,
        titleAr,
        description,
        descriptionAr,
        items[]{
          title,
          titleAr,
          description,
          descriptionAr
        }
      }
    }
  `;
  return await client.fetch(query, { locale });
};