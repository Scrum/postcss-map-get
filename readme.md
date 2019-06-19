# postcss-map-get <a href="https://github.com/postcss/postcss"><img align="left" height="49" title="PostCSS" src="http://postcss.github.io/postcss/logo.svg"></a>
> [PostCSS](https://github.com/postcss/postcss) plugin to transform SASS Function [map-get](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method).  

[![Travis Build Status](https://img.shields.io/travis/Scrum/postcss-map-get/master.svg?style=flat-square&label=unix)](https://travis-ci.org/Scrum/postcss-map-get)[![node](https://img.shields.io/node/v/postcss-map-get.svg?maxAge=2592000&style=flat-square)]()[![npm version](https://img.shields.io/npm/v/postcss-map-get.svg?style=flat-square)](https://www.npmjs.com/package/postcss-map-get)[![Dependency Status](https://david-dm.org/scrum/postcss-map-get.svg?style=flat-square)](https://david-dm.org/scrum/postcss-map-get)[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)[![Coveralls status](https://img.shields.io/coveralls/Scrum/postcss-map-get.svg?style=flat-square)](https://coveralls.io/r/Scrum/postcss-map-get)

[![npm downloads](https://img.shields.io/npm/dm/postcss-map-get.svg?style=flat-square)](https://www.npmjs.com/package/postcss-map-get)[![npm](https://img.shields.io/npm/dt/postcss-map-get.svg?style=flat-square)](https://www.npmjs.com/package/postcss-map-get)


## Why?
Adds the ability to use sass like Map Function [map-get](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method).  

## Install

```bash
$ npm install postcss-map-get
```

> **Note:** This project is compatible with node v4+

## Usage

```js
// Dependencies
import fs from 'fs';
import postcss from 'postcss';
import mapGet from 'postcss-map-get';

// CSS to be processed
var css = fs.readFileSync('css/input.css', 'utf8');

// Process CSS
var output = postcss()
  .use(mapGet())
  .process(css, {
    from: 'css/input.css'
  })
  .css;

console.log(output);
```
> Returns the value in a map associated with the given key. If the map doesn't have such a key, returns null.

# Example

*input.css*
```css
body {
  background: map-get((
    body: #fff,
    main-red: #c53831,
    link-blue: #0592fb
  ) !default, body);

  min-width: map-get((
    xxs: 0,
    xs: 576px,
    sm: 768px,
    md: 992px,
    lg: 1280px,
    xl: 1360px,
    xxl: 1600px
  ) !default, lg);

  max-width: 100%;
}
```
*output.css*
```css
body {
  background: #fff;

  min-width: 1280px;

  max-width: 100%;
}
```
