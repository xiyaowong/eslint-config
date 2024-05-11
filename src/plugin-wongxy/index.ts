import type { ESLint } from 'eslint'

import emptyLineAfterControllFlow from './empty-line-after-controll-flow'

const plugin = {
  meta: {
    name: 'wongxy',
  },
  rules: {
    'empty-line-after-controll-flow': emptyLineAfterControllFlow,
  },
} satisfies ESLint.Plugin

export default plugin
