---
slug:
title: "Darkmode Using React Context"
date: 2020-04-08T13:44:44.108Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - nodejs
  - github
  - react
image:
---

<p class="text-center"><img class="inline reactjs_logo" src="/media/logos/reactsq.svg" alt="reactjs-logo" width="135px"> <img class="inline" src="/media/icons/moon_y.svg" alt="moon-ico" width="128px"></p>

This is an example app I made using `create-react-app` to show implementing darkmode using react context with hooks & localStorage.

## Features

- [x] Supports `prefers-color-scheme`
- [x] Fades to Black
- [x] Uses `localStorage`
- [x] Uses React Hooks
- [x] Uses React State
- [x] Uses React Context

## Context

<blockquote>Context provides a way to pass data through the component tree without having to pass props down manually at every level.</blockquote>

<a href="https://reactjs.org/docs/context.html" aria-label="View on React Docs" target="_blank" rel="noopener noreferrer">📝 Context in React Documentation</a>

Use `createContext` to initialize react context.

```jsx
export const ThemeContext = createContext();
```
<br/>

<blockquote>Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.</blockquote>

Wrap the content in `App.js` inside of the `Context.Provider` element.

## Toggle State

Use `useState` to toggle the state of `darkMode`.

```jsx
const [darkMode, setdarkMode] = useState();

const toggleDark = () => {
  setdarkMode(!darkMode)
}
```

## Initialize On Component Load

Use `useEffect` to load the main functions for toggling state once the component is loaded.

```jsx
	useEffect(() => {
		setdarkMode(false)
		const lsDark = JSON.parse(localStorage.getItem('darkMode'))
    if (lsDark) {
      setdarkMode(lsDark)
    }
	}, [])
```

## Store Setting

One of the easiest ways to store a setting is to utilize `localStorage` using `localStorage.setItem` & `localStorage.getItem`.

## Supporting Browser Option

Most browsers support `prefers-color-scheme` option which allows sites to automatically switch to darkmode without user interaction.

This is a boolean value so we just need to check if it equals true.

```js
const prefersDarkMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches === true
```

## Component

Creating a component to toggle `darkMode` is pretty simple as state is just a `bool`.

The only thing we need to code in is a check to toggle the moon & sun icons.

```jsx
const ToggleTheme = () => {
	const { darkMode, toggleDark } = useContext(ThemeContext);

	return (
		<div className="darkmode-container">
			<button className="toggle-darkmode" onClick={toggleDark}>
			{darkMode ? (
				<img src={sun} className="sun-icon" alt="sun-icon" />
			) : (
				<img src={moon} className="moon-icon" alt="moon-icon" />
			)}
			</button>
 		</div>
	)
}
```

This project can be downloaded from github.

<a class="github" href="https://github.com/equk/darkmode-react-context" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> Download</a>
