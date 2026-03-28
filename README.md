# 11ty-equk

<p align="center">
<img src="./public/media/social.png" alt="equks blog"/>
</p>

Personal blog powered by 🎈 eleventy

<img src="./public/media/logos/netlify-color-bg.svg" alt="Deploys by Netlify"/>

Deployed at: https://equk.co.uk/

<p align="center">
<img src="./public/media/logos/11ty-96x96.png" alt="11ty-logo">
</p>

<p align="center">
<img src="./public/media/build.png" alt="11ty-equk-build">
</p>

## ⚠️ not a starter template or theme

This is my own personal blog and shouldn't be used as a starter template or theme.

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
- [x] 11ty bundle support
- [x] markdown checklists
- [x] prettier ruleset
- [x] favicon generation
- [x] webmentions
- [x] blog post commenting using mastodon
- [x] esm support
- [x] oxlint for linting
- [x] data schema with type validation for posts

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

Bluesky: [@equilibriumuk.bsky.social](https://bsky.app/profile/equilibriumuk.bsky.social)

# License

Source Code: MIT License

Content & Media: Copyright

(You are **not** permitted to re-use the content publicly or commercially)

---

based on eleventy-base-blog
