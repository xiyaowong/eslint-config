import fs from 'node:fs/promises'

import { combine } from '@antfu/eslint-config'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'

import { tailwindcss } from '../src/tailwindcss'

async function run() {
  const configs = await combine(tailwindcss())

  const configNames = configs.map(i => i.name).filter(Boolean) as string[]

  let dts = await flatConfigsToRulesDTS(configs, {
    includeAugmentation: false,
  })

  dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

  await fs.writeFile('src/typegen.d.ts', dts)
}

run()
