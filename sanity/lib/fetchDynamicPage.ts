// fetchPracticeArea.ts
import { client } from "./client";

export const fetchDynamicPage = async (slug: string, locale: string) => {
  const query = `
    *[_type == "real-estate" && slug->value == $slug && language == $locale][0]{
      sharedPageContent->{
        title,
        image,
          brochureFiles[]{
            label,
            labelAr,
            link  {
              asset->{
                url
              }
            }
        },
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
        title,
        titleAr,
        link
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
    *[_type == "blog"] | order(date desc)[$skip...$end] {
      date,
      title,
      titleAr,
      description,
      descriptionAr,
      slug,
      image {
        asset -> {
          url
        }
      },
      blogPage->{
        slug {
          current
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

// Fetch functions for shared components
export const fetchAdvocates = async (locale: string = "ar") => {
  const query = `
    *[_type == "advocates"][0]{
      title,
      titleAr,
      description,
      descriptionAr,
      statistics[]{
        value,
        suffix,
        label,
        labelAr
      }
    }
  `;
  return await client.fetch(query, { locale });
};

export const fetchHero = async (locale: string = "ar") => {
  const query = `
    *[_type == "hero"][0]{
      hero,
      heroAr,
      subtitle,
      subtitleAr,
      subtitle2,
      subtitle2Ar,
      subtitle3,
      subtitle3Ar,
      description,
      descriptionAr,
      button,
      buttonAr
    }
  `;
  return await client.fetch(query, { locale });
};

export const fetchLegalAdvisors = async (locale: string = "ar") => {
  const query = `
    *[_type == "legalAdvisors"][0]{
      header{
        get,
        getAr,
        advisors,
        advisorsAr,
        description,
        descriptionAr
      },
      contact{
        phoneNumber,
        phoneNumberAr
      },
      divider,
      dividerAr,
      sendUs{
        header{
          send,
          sendAr,
          us,
          usAr,
          inquiry,
          inquiryAr
        },
        description,
        descriptionAr
      },
      cta,
      ctaAr
    }
  `;
  return await client.fetch(query, { locale });
};

export const fetchOurExperience = async (locale: string = "ar") => {
  const query = `
    *[_type == "ourExperience"][0]{
      yourFirstAid,
      yourFirstAidAr,
      letOurExperience,
      letOurExperienceAr,
      beYourGuide,
      beYourGuideAr,
      description,
      descriptionAr,
      contactUs,
      contactUsAr
    }
  `;
  return await client.fetch(query, { locale });
};

export const fetchOurLawyers = async (locale: string = "ar") => {
  const query = `
    *[_type == "ourLawyers"][0]{
      title,
      titleAr,
      description,
      descriptionAr,
      lawyers[]{
        name,
        nameAr,
        title,
        titleAr,
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

export const fetchOurPracticeAreas = async (locale: string = "ar") => {
  const query = `
    *[_type == "ourPracticeAreas"][0]{
      title,
      titleAr,
      description,
      descriptionAr,
      practiceAreas[]{
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

export const fetchTestimonials = async (locale: string = "ar") => {
  const query = `
    *[_type == "testimonials"][0]{
      tag,
      tagAr,
      title,
      titleAr,
      button,
      buttonAr,
      testimonials[]{
        description,
        descriptionAr,
        name,
        nameAr,
        role,
        roleAr
      }
    }
  `;
  return await client.fetch(query, { locale });
};

export const fetchBlogPageSlug = async (slug: string) => {
  const query = `
    *[_type == "blogPageSchema" && slug.current == $slug][0]{
      slug {
        current
      },
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
  return await client.fetch(query, { slug });
};
