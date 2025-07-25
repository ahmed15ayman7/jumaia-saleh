import { type SchemaTypeDefinition } from 'sanity'
import dynamicPage from './dynamicPageSchema'
import pageType from './pageTypes'
import sharedPageContent from './sharedPageContent'
import aboutUs from './aboutUs'
import HeroSection from './HeroSection'
import terms from './terms'
import privacy from './privacy'
import adminAuth from './AdminAuth'
import blog from './blog'
import contactMessage from './contactMessage'
import service from './service'
import servicePage from './servicePage'
import contactPage from './contactPage'
import blogsPage from './blogsPage'
import advocates from './advocates'
import hero from './hero'
import legalAdvisors from './legalAdvisors'
import ourExperience from './ourExperience'
import ourLawyers from './ourLawyers'
import ourPracticeAreas from './ourPracticeAreas'
import testimonials from './testimonials'
import blogPage from './blogPage'
import filePDF from './filePDF'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    dynamicPage, 
    pageType, 
    sharedPageContent,
    filePDF,
    aboutUs,
    HeroSection,
    terms,
    privacy,
    adminAuth,
    blog,
    blogPage,
    blogsPage,
    contactMessage,
    service,
    contactPage,
    servicePage,
    advocates,
    hero,
    legalAdvisors,
    ourExperience,
    ourLawyers,
    ourPracticeAreas,
    testimonials
  ],
}
