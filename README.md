# eslint-config

Personal ESLint configuration, based on `@antfu/eslint-config`

## Usage

```bash
pnpm i -D eslint @antfu/eslint-config
```

And create `eslint.config.mjs` in your project root:

```js
// eslint.config.mjs
import wongxy from '@wongxy/eslint-config'

export default wongxy()
```
