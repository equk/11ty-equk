# 11ty-equk

equk.co.uk blog using eleventy v2.0

<br />

<p align="center">
<img class="inline 11ty_logo" src="./public/media/logos/11ty-96x96.png" alt="11ty-logo">
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

# Contact

Website: https://equk.co.uk

Mastodon: [@equilibriumuk@hachyderm.io](https://hachyderm.io/@equilibriumuk)

# License

Source Code: MIT License

Content & Media: Copyright

(You are **not** permitted to re-use the content publicly or commercially)

---

based on eleventy-base-blog
