# 11ty-equk

equk.co.uk blog using eleventy v2.0

<br />

<p align="center">
<img class="inline 11ty_logo" src="./public/media/logos/11ty-96x96.png" alt="11ty-logo" width="80px">
<img class="inline nunjucks_logo" src="./public/media/logos/nunjucks.png" alt="nunjucks-logo" width="80px">
</p>

## Features

- [x] postcss integration
- [x] esbuild integration
- [x] image optimization
- [x] syntax highlighting (zero JS output)
- [x] atom feed generation
- [x] sitemap generation
- [x] post feature image
- [x] image attribution link
- [x] post list pagination
- [x] darkmode support (`localStorage` & `prefers-color-scheme`)
- [x] inlined css
- [x] opengraph meta tags
- [x] social media meta tags
- [x] 11ty bundle support
- [x] markdown checklists
- [x] eslint with prettier

## Image Optimization

- [x] includes `{% image %}` shortcode
- [x] automatic optimization in markdown
- [x] Automated `<picture>` syntax markup with srcset and optional sizes
- [x] Includes width/height attributes to avoid content layout shift
- [x] Includes `loading="lazy"` for native lazy loading without JavaScript
- [x] Includes `decoding="async"`

## URL Generation

Post permalinks are generated using `title` & `date` fields

Resulting in `/YYYY/MM/DD/slugify-title`

---

#### based on eleventy-base-blog v8

A starter repository showing how to build a blog with the [Eleventy](https://www.11ty.dev/) site generator (using the [v2.0 release](https://www.11ty.dev/blog/eleventy-v2/)).

