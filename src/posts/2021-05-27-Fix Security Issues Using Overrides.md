---
slug:
title: "Fix Security Issues Using Overrides"
date: 2021-05-27T11:56:52.523Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - gatsby
  - nodejs
  - github
  - pnpm
  - security
image:
---

<p class="text-center"><img src="/media/logos/nodejs.svg" alt="nodejs logo" width="180px" class="inline"></p>

I recently moved to pnpm which has the ability to override dependencies.<br />
This feature can be used to **patch security vulnerabilities quickly** removing the need to wait for developers of dependant packages or frameworks to deploy fixes.

## Security Alerts

Anyone who develops apps in nodejs most probably has some sort of security auditing solution which notifies them of outdated dependencies.

If you use github you probably receive Dependabot security alerts when a new vulnerability is found in your projects.

Sometimes there are multiple dependencies referencing outdated or unpatched versions of libraries making it hard to easily fix these problems.

## Dependency Checking

NPM, Yarn & PNPM all have the ability to do a security audit of dependencies.

<blockquote><strong><i class="fa fa-link"></i>  <a href="https://docs.npmjs.com/cli/v6/commands/npm-audit" target="_blank" rel="noopener noreferrer">npm audit</a></strong><br /><br />

The audit command submits a description of the dependencies configured in your project to your default registry and asks for a report of known vulnerabilities.<br />
The report returned includes instructions on how to act on this information.</blockquote>

## Dependency Updates

### NPM

NPM features `npm audit fix` which writes the updated packages to the lock file.<br/>
This can be hard to keep track of & can even cause problems in the future when packages are upgraded.

One example I had was with my `unsplash-nextjs` project.<br />
I had to remove the lockfile & create a new clean lockfile in order to fix CVEs.

<p><i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/unsplash-nextjs/commit/2dcb36d9e04dda0d17b10c1e1d4cfbfc7b7fc9aa" target="_blank" rel="noopener noreferrer">clean package lock - fixes for CVE-2021-23368 & CVE-2021-23362</a>
</p>

### Yarn

I couldn't find much info on how to update non toplevel dependencies this using yarn.

There are some references to people writing workarounds which migrate yarn to npm allowing npm to do the security fixes & then migrate the lockfile back to yarn again.

```sh
npm install --package-lock-only
npm audit fix
rm yarn.lock
yarn import
rm package-lock.json
```

This seems like a lot of work as it installs all dependencies using npm, npm then installs fixes & it then removes `yarn.lock` before running `yarn import`.<br />
*(`npm audit fix` runs `npm install`)*

<blockquote><strong><i class="fa fa-link"></i>  <a href="https://docs.npmjs.com/cli/v6/commands/npm-audit#description" target="_blank" rel="noopener noreferrer">npm audit fix</a></strong><br /><br />
Note that some vulnerabilities cannot be fixed automatically and will require manual intervention or review.<br />
Also note that since npm audit fix runs a full-fledged npm install under the hood, all configs that apply to the installer will also apply to npm install</blockquote>

<i class="fa fa-link"></i> <a href="https://dev.to/antongolub/yarn-audit-fix-workaround-i2a" target="_blank" rel="noopener noreferrer">Yarn audit fix: workaround | dev.to</a>

### PNPM

With pnpm there is the ability to do a security audit (as with yarn & npm).<br />
One thing with pnpm is the overrides feature which allows you to match package versions & upgrade them throughout the whole dependency graph.

## PNPM Overrides

This feature gives you the ability to patch depdendencies before developers update dependent projects (eg: Gatsby).

<blockquote><strong><i class="fa fa-link"></i> <a href="https://pnpm.io/package_json#pnpmoverrides" target="_blank" rel="noopener noreferrer">pnpm.overrides</a></strong><br /><br />
This field allows you to instruct pnpm to override any dependency in the dependency graph.<br />
This is useful to enforce all your packages to use a single version of a dependency, backport a fix, or replace a dependency with a fork.</blockquote>

This gives you a few advantages

- [x] Override dependency versions
- [x] Test new updates early
- [x] Implement & deploy updates early

Because of the way version matching works you can leave these overrides in `package.json` with no worries of breaking things when future updates are released.

## Examples

I have used `pnpm.overrides` to fix various CVEs on this site.

Currently the overrides fix 6 CVEs

```json
  "pnpm": {
    "overrides": {
      "axios@<0.21.1": "^0.21.1",
      "browserslist@<4.16.5": "^4.16.5",
      "dns-packet@<5.2.2": "^5.2.2",
      "sanitize-html@<2.3.2": "^2.3.2",
      "trim@<1.0.1": "^1.0.1"
    }
  }
```

CVEs fixed by these overrides

- [x] <a title="CVE-2021-26540" target="_blank" rel="noopener noreferrer" href="https://github.com/advisories/GHSA-mjxr-4v3x-q3m4">CVE-2021-26540</a>
- [x] <a title="CVE-2021-26539" target="_blank" rel="noopener noreferrer" href="https://github.com/advisories/GHSA-rjqq-98f6-6j3r">CVE-2021-26539</a>
- [x] <a title="CVE-2021-23386" target="_blank" rel="noopener noreferrer" href="https://github.com/advisories/GHSA-3wcq-x3mq-6r9p">CVE-2021-23386</a>
- [x] <a title="CVE-2021-23364" target="_blank" rel="noopener noreferrer" href="https://github.com/advisories/GHSA-w8qv-6jwh-64r5">CVE-2021-23364</a>
- [x] <a title="CVE-2020-28168" target="_blank" rel="noopener noreferrer" href="https://github.com/advisories/GHSA-4w2v-q235-vp99">CVE-2020-28168</a>
- [x] <a title="CVE-2020-7753" target="_blank" rel="noopener noreferrer" href="https://github.com/advisories/GHSA-w5p7-h5w8-2hfq">CVE-2020-7753</a>

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/7" target="_blank" rel="noopener noreferrer">Security fixes pull request on github</a>