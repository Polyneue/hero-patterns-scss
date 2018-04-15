![Hero Patterns SCSS Cover](https://raw.githubusercontent.com/Polyneue/hero-patterns-scss/master/docs/hero-patterns-scss.gif)

[![Build Status](https://travis-ci.org/Polyneue/hero-patterns-scss.svg?branch=master)](https://travis-ci.org/Polyneue/hero-patterns-scss)
[![Coverage Status](https://coveralls.io/repos/github/Polyneue/hero-patterns-scss/badge.svg?branch=develop)](https://coveralls.io/github/Polyneue/hero-patterns-scss?branch=develop)

## Introduction

Hero Patterns SCSS makes it easy to add SVG background patterns to your stylesheets with one simple Sass function. SVG patterns are from [Hero Patterns](http://www.heropatterns.com/).

## Features

* Exports only the patterns that you use
* Provides parameters to easily customize SVG fill and opacity
* SVG output is optimized using [mini-svg-data-uri](https://github.com/tigt/mini-svg-data-uri)

## Installation

Install package with NPM

```
npm install hero-patterns-scss --save
```

**OR**  

Clone the repository and add the `dist/` directory to your project.

```
git clone git@github.com:Polyneue/hero-patterns-scss.git
```

## Getting Started

After installing the package, import hero-patterns-scss into your project and use the `hero-pattern()` function to generate the svg output.

```scss
@import './node_modules/hero-patterns-scss/dist/entry.scss';

body {
    background-color: #dfdbe5;
    background-image: hero-pattern('jupiter', #9c92ac, 0.4);
    background-size: 30px;
}
```

## Usage

Hero Patterns SCSS has one main function used to generate the SVG output.

#### `hero-pattern($pattern, $fill, $opacity)`

| Parameter  | Type     | Description                                    |
| ---------- | -------- | ---------------------------------------------- |
| `$pattern` | `String` | The pattern name to be generated.              |
| `$fill`    | `String` | Hex, RGB, or HSL values. Default is `#000000`. |
| `$opacity` | `Number` | `0.0` through `1.0`. Default is `1.0`.         |

**Notes:**  
For examples of all patterns, see [Hero Patterns](http://www.heropatterns.com/). You can find a full list of names and matching variables [here](https://github.com/polyneue/hero-patterns-scss/blob/master/dist/partials/patterns-map.scss).

## Copyright and License

Code copyright 2018 Ed Mendoza. Code released under the [MIT license](https://github.com/polyneue/hero-patterns-scss/blob/master/LICENSE).
