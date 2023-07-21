---
slug:
title: "Adding Typescript Part 2 (Gatsby)"
date: 2021-09-28T15:49:13.371Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - typescript
  - gatsby
  - nodejs
  - github
  - react
image:
---

<p class="text-center"><img src="/media/logos/gatsby.svg" alt="gatsby logo" width="150px" class="inline"> <img src="/media/logos/typescript.svg" alt="typescript logo" width="150px" class="inline"></p>

<br />

## Gatsby Config & Node API

After converting all my react components on the site to Typescript I looked around for references to people using Gatsby with Typescript based config.

### Finding a Workaround

The most insightful thing I found was a gist.

<i class="fa fa-code-fork git-fork"></i> <a href="https://gist.github.com/JohnAlbin/2fc05966624dffb20f4b06b4305280f9" target="_blank" rel="noopener noreferrer">Github Gist - JohnAlbin - TypeScript + Gatsby config and node API</a>



Gatsby looks for `gatsby-config.js` (javascript) so simply renaming the file will not work.

Instead you need to use `ts-node` to load typescript & export all variables from `gatsby-config.ts`.<br />
As `ts-node` is active Gatsby should then load other gatsby components using the `.ts` extension.

<blockquote>
<p><strong>ts-node</strong> is a TypeScript execution engine and REPL for Node.js.</p>

It JIT transforms TypeScript into JavaScript, enabling you to directly execute TypeScript on Node.js without precompiling.<br />
This is accomplished by hooking node's module loading APIs, enabling it to be used seamlessly alongside other Node.js tools and libraries.
</blockquote>

<i class="fa fa-link"></i> <a href="https://github.com/TypeStrong/ts-node" target="_blank" rel="noopener noreferrer">TypeStrong/ts-node on Github</a>

### Implementing ts-node in gatsby-config

- [x] install `ts-node` as a dependency
- [x] rename `gatsby-config.js` to `gatsby-config.ts`
- [x] create new `gatsby-config.js` with `ts-node`
- [x] export everything from `gatsby-config.ts`
- [x] rename `gatsby-*.js` to `gatsby-*.ts`

<br />

<i class="fa fa-file-code-o git-fork"></i> gatsby-config.js

```js
require('ts-node').register()

module.exports = require('./gatsby-config.ts')
```

Gatsby should now reference typescript based config files. (eg: `gatsby-node.ts`, `gatsby-browser.ts`)

<article class="message is-danger">
  <div class="message-body">
    <i class="fa fa-info-circle"></i> You may need to refactor some existing code depending on how you have Typescript configured.
  </div>
</article>

### Typescript Config

<br />

<i class="fa fa-file-code-o git-fork"></i> tsconfig.json

```json
{
    "compilerOptions": {
        "module": "CommonJS",
        "target": "ESNext",
        "lib": [
            "DOM",
            "ESNext"
        ],
        "strict": true,
        "moduleResolution": "node",
        "sourceMap": true,
        "jsx": "preserve",
        "allowJs": true,
        "noEmit": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "noImplicitAny": false,
        "forceConsistentCasingInFileNames": true,
        "allowSyntheticDefaultImports": true,
    },
    "exclude": [
        "node_modules",
        "public",
        ".cache"
    ]
}
```

<article class="message is-info">
  <div class="message-body">
    <i class="fa fa-info-circle"></i> You may want to start with <code class="language-text">strict: false</code> then work towards enabling strict mode later.
  </div>
</article>

## Source Code

You can find the full pull request for the above changes of this site on github.

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/9" target="_blank" rel="noopener noreferrer">Using Typescript For Gatsby Config & Node API</a>

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>