import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

import {codeInput} from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'bulletin',

  basePath: '/studio',

  projectId: 'l4wrpsh5',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
})
