# eslint-config

ESLint config based on [`@antfu/eslint-config`](https://github.com/antfu/eslint-config).

## Usage

```bash
pnpm i -D eslint @wongxy/eslint-config
```

```js
// eslint.config.mjs
import wongxy from '@wongxy/eslint-config'

export default wongxy()
```

## Options

Everything `@antfu/eslint-config` accepts is passed through. On top of that:

| Option | Uses | Default |
| --- | --- | --- |
| `react` | `@eslint-react/eslint-plugin` | on when `react`, `react-dom`, `next` or `react-native` is installed |
| `reactnative` | `ts/no-require-imports`, `ts/no-use-before-define` off | on when `react-native` is installed |
| `tailwindcss` | `eslint-plugin-better-tailwindcss` | on when `tailwindcss` is installed |

`options.rules` and the per-integration `overrides` win over the defaults this config adds. Those defaults live in named `wongxy/*` configs.
