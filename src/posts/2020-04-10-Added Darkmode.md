---
slug:
title: "Added Darkmode To Site"
date: 2020-04-10T10:03:16.551Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - gatsby
  - nodejs
  - github
  - react
  - firefox
image:
---

<p class="text-center"><img class="inline reactjs_logo" src="/media/logos/reactsq.svg" alt="reactjs-logo" width="135px"> <img class="inline" src="/media/icons/moon_y.svg" alt="moon-ico" width="128px"></p>

I finally added Darkmode to the site using React State & localStorage.

## Features

- [x] Supports `prefers-color-scheme`
- [x] Fades to Black
- [x] Simple Sun / Moon Icon
- [x] Uses `localStorage`
- [x] Uses React Hooks
- [x] Uses React State

You can toggle darkmode by clicking the icon in the top menu.

## Final Implementation

I was going to use react context (<a href="/2020/04/08/darkmode-using-react-context" aria-label="View Article" target="_blank" rel="noopener noreferrer">Darkmode Using React Context</a>) but after looking around I found a react component with a better darkmode implementation which uses `addEventListener` with `useEffect` to create an event listener & `element.classList.add` to change the `className` of the `body` element.

<a href="https://github.com/donavon/use-dark-mode" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer">📦 use-dark-mode</a><br/>
<a href="https://github.com/donavon/use-event-listener" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer">📦 use-event-listener</a><br/>
<a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" aria-label="View Article on MDN" target="_blank" rel="noopener noreferrer">📝 MDN addEventListener</a>

I didn't like the default toggle switch style that comes with `use-dark-mode` so I created a custom component using simple sun & moon icons.

```jsx
const ToggleDark = () => {
  const darkMode = useDarkMode(false)

  return (
    <div className="navbar-item dark-toggle">
      <button className="toggle-darkmode" onClick={darkMode.toggle} type="submit">
        {darkMode.value ? (
          <img src={sun} className="sun-icon" alt="sun-icon" />
        ) : (
          <img src={moon} className="moon-icon" alt="moon-icon" />
        )}
      </button>
    </div>
  )
}
```

### Firefox Developer Tools

Firefox Page Inspector makes creating a darkmode style easy with the ability to view all changes you have made to a sites styles.

<p class="text-center"><img src="/media/images/firefox_css_changes.png" alt="firefox inspector changes"></p>

It also has the ability to `copy all changes` making it easier to create a custom darkmode stylesheet.

<a href="https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_and_edit_CSS" aria-label="View Article on MDN" target="_blank" rel="noopener noreferrer">📝 MDN Examine and edit CSS</a>

## Source Code

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>