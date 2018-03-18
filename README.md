![Hero Patterns SCSS Cover](https://github.com/polyneue/hero-patterns-scss/blob/master/docs/hero-patterns-scss.gif)

[![Build Status](https://travis-ci.org/Polyneue/hero-patterns-scss.svg?branch=master)](https://travis-ci.org/Polyneue/hero-patterns-scss)
[![Coverage Status](https://coveralls.io/repos/github/Polyneue/hero-patterns-scss/badge.svg?branch=develop)](https://coveralls.io/github/Polyneue/hero-patterns-scss?branch=develop)

## Introduction

Hero Patterns SCSS was created to make using [Hero Patterns](http://www.heropatterns.com/) more intuitive. Hero Patterns SCSS makes it easy to add SVG background patterns to your stylesheets with one simple Sass function.

## Features

* Exports only the patterns that you use
* Provides parameters to easily customize SVG fill and opacity
* SVG output is optimized using [mini-svg-data-uri](https://github.com/tigt/mini-svg-data-uri)

## Installation

Install package with NPM

```
npm install hero-patterns-scss --save
```

## Getting Started

After installing the package, import hero-patterns-scss into your project and use the `hero-pattern()` function to generate the svg output.

```scss
@import './node_modules/hero-patterns-scss/dist/entry.scss';

body {
    background-color: #dfdbe5;
    background-image: hero-pattern($jupiter, #9c92ac, 0.4);
    background-size: 30px;
}
```

## Usage

Hero Patterns SCSS has one main function used to generate the SVG output.

#### `hero-pattern($pattern, $fill, $opacity)`

| Parameter  | Type     | Description                                 |
| ---------- | -------- | ------------------------------------------- |
| `$pattern` | `String` | A reference to the pattern being generated. |
| `$fill`    | `String` | Hex, RGB, or HSL values.                    |
| `$opacity` | `Number` | `0.0` through `1.0`. Default is `1.0`.      |

**Notes:**
For a list of patterns see [Hero Patterns](http://www.heropatterns.com/). To conform to sass variable requirements,
the pattern names are not a 1:1 match. Below is an example of converting a pattern name to the Sass variable equivalent.

*Example:* '4 Point Stars' is `$four-point-stars`.

## Copyright and License

Code copyright 2018 Ed Mendoza. Code released under the [MIT license](https://github.com/polyneue/hero-patterns-scss/blob/master/LICENSE).
