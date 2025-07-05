import { type SchemaTypeDefinition } from 'sanity'
import dynamicPage from './dynamicPageSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [dynamicPage],
}
