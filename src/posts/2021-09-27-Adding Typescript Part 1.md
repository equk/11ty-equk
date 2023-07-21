---
slug:
title: "Adding Typescript Part 1"
date: 2021-09-27T14:49:22.863Z
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

<p class="text-center"><img src="/media/logos/reactsq.svg" alt="react logo" width="160px" class="inline"> <img src="/media/logos/typescript.svg" alt="typescript logo" width="150px" class="inline"></p>

<br />

## Why Add Typescript

Over the past few years Typescript has gained popularity & almost every new frontend project is based on it.

Changing the site to it makes sense for future development & maintainability.

There are also a lot of advantages over React `prop-types`.

React `prop-types` only provides component based type checking.<br />
With `typescript` we gain type checking over the project at compile time.

## Adding Typescript

#### Install Dependencies

```bash
pnpm i typescript
pnpm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

<br />

#### Add a Typescript Config

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

## ESLint & Typescript

Update ESLint config to use Typescript.

- [x] set `parser` to `@typescript-eslint/parser`
- [x] enable `@typescript-eslint` plugin
- [x] add `plugin:@typescript-eslint/recommended` to extends
- [x] enable `.tsx` file extension in `react/jsx-filename-extension`
- [x] add `.ts, .tsx` to `import/resolver`

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/8/commits/a68e9076b4dbf57ccedf0fa2a8d47832854154f0" target="_blank" rel="noopener noreferrer">updated eslint config with typescript presets</a>

## Rename Files

- [x] find all `js` & `jsx` files in `src/` with `jsx` content & rename them to `.tsx`
- [x] find all other `js` files in `src/` & rename them to `.ts`

This can be achieved using bash to rename all `js` & `jsx` files in `src/` which import react to `.tsx` & rename all others to `.ts`.

<br />

<i class="fa fa-file-code-o git-fork"></i> rename_tsx.sh

```bash
#!/bin/bash
rename_tsx() {
  fname="${1##*.}"
  content=$(cat $1)
  if [[ $content == *"import React"* ]]
  then
    mv "$1" "${1%.$fname}.tsx"
    echo "✔ moved jsx file $1 to ${1%.$fname}.tsx"
  else
    mv "$1" "${1%.$fname}.ts"
    echo "✔ moved $1 to ${1%.$fname}.ts"
  fi
}
echo "moving files with JSX content to TSX & others to TS ..."
echo
for file in $(find src -name "*.js" -o -name "*.jsx"); do
  rename_tsx $file
done
echo
echo "all files moved"
```

## From React prop-types to Typescript

Fortunately I created this site using React `prop-types` for type checking.<br />
This should make converting the site a bit quicker.

### Conversion

- [x] remove `prop-types` import
- [x] move & reformat entries from `propTypes` to a new `interface` entry
- [x] reference new `interface` entry for types

```diff
--- a/src/cms/preview-templates/post-preview.js
+++ b/src/cms/preview-templates/post-preview.tsx
@@ -1,8 +1,12 @@
 import React from 'react'
-import PropTypes from 'prop-types'
 import PreviewTemplate from '../../templates/preview-template'

-const PostPreview = ({ entry, widgetFor }) => {
+interface PostPreviewProps {
+  entry: any
+  widgetFor: any
+}
+
+const PostPreview = ({ entry, widgetFor }: PostPreviewProps) => {
   const body = widgetFor('body')
   const title = entry.getIn(['data', 'title'])
   const date = entry.getIn(['data', 'date'])
@@ -11,9 +15,4 @@ const PostPreview = ({ entry, widgetFor }) => {
   return <PreviewTemplate body={body} title={title} date={date} image={image} />
 }

-PostPreview.propTypes = {
-  entry: PropTypes.object.isRequired,
-  widgetFor: PropTypes.object.isRequired,
-}
-
 export default PostPreview
```

<article class="message is-info">
  <div class="message-body">
    <i class="fa fa-info-circle"></i> It is possible to automate this process using a tool like jscodeshift.
  </div>
</article>

## Source Code

You can find the full pull request for the above changes of this site on github.

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/8" target="_blank" rel="noopener noreferrer">Add Typescript to Components</a>

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>