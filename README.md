# 11ty-equk

equk.co.uk blog using eleventy v2.0

## Features

- [x] tailwindcss with postcss
- [x] eslint with prettier
- [x] image optimization
- [x] syntax highlighting (zero JS output)
- [x] atom feed generation
- [x] sitemap generation
- [x] markdown checklists
- [x] post feature image
- [x] image attribution link
- [x] post list pagination
- [x] darkmode support (`localStorage` & `prefers-color-scheme`)
- [x] postcss & tailwindcss integrated with eleventy
- [x] inlined css

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

