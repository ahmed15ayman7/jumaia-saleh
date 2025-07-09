// fetchPracticeArea.ts
import { client } from "./client";

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

export const fetchAboutUs = async (locale: string = "ar") => {
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

export const fetchTerms = async (locale: string = "ar") => {
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

export const fetchPrivacy = async (locale: string = "ar") => {
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

export const fetchAdminAuth = async () => {
  const query = `
    *[_type == "adminAuth"][0]{
      email,
      password,
      code
    }
  `;
  return await client.fetch(query);
};

export const fetchBlog = async (skip: number = 0, limit: number = 4) => {
  const query = `
    *[_type == "blog" && defined(slug.current)] | order(date desc)[$skip...$end] {
      date,
      title,
      titleAr,
      description,
      descriptionAr,
      slug,
      image{
        asset->{
          url
        }
      }
    }
  `;
  return await client.fetch(query, { skip, end: skip + limit });
};
export const fetchBlogPage = async (locale: string) => {
  const query = `
    *[_type == "blogPage"][0]{
      breadcrumb,
      hero->{
        title,
        titleAr,
        subtitle,
        subtitleAr,
        backgroundImage { asset->{url} }
      }
    }
  `;
  return await client.fetch(query, { locale });
};

export const fetchServices = async (locale: string = "ar") => {
  const query = `
    *[_type == "servicePage"][0]{
      breadcrumb,
      hero->{
        title,
        titleAr,
        subtitle,
        subtitleAr,
        backgroundImage { asset->{url} }
      },
      services[]->{
        description,
        descriptionAr,
        pageType->{
        title,
        titleEn,
        value
          },
          image{
            asset->{
              url
            }
          }
        }
      }
  `;
  return await client.fetch(query, { locale });
};

export const fetchContactPage = async (locale: string = "ar") => {
  const query = `
    *[_type == "contactPage"][0]{
      breadcrumb,
      hero->{
        title,
        titleAr,
        subtitle,
        subtitleAr,
        backgroundImage { asset->{url} }
      },
      contactFormData {
        title,
        titleAr,
        subtitle,
        subtitleAr,
        nameLabel,
        nameLabelAr,
        emailLabel,
        emailLabelAr,
        phoneLabel,
        phoneLabelAr,
        serviceTypeLabel,
        serviceTypeLabelAr,
        messageLabel,
        messageLabelAr,
        submitButtonLabel,
        submitButtonLabelAr
      },
      lowerImage { asset->{url} },
      phone,
      callUsLabel,
      callUsLabelAr,
      callUsButtonLabel,
      callUsButtonLabelAr
    }
  `;
  return await client.fetch(query, { locale });
};
