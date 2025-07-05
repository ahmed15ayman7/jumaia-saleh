import { type SchemaTypeDefinition } from 'sanity'
import dynamicPage from './dynamicPageSchema'
import pageType from './pageTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [dynamicPage, pageType],
}
