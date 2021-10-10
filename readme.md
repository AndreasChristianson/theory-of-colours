# Theory of Colours
[![npm versions](https://img.shields.io/npm/v/theory-of-colours)](https://www.npmjs.com/package/theory-of-colours?activeTab=versions)
[![npm downloads](https://img.shields.io/npm/dw/theory-of-colours)](https://www.npmjs.com/package/theory-of-colours)
[![CodeQL](https://github.com/AndreasChristianson/theory-of-colours/actions/workflows/codeql-analysis.yaml/badge.svg)](https://github.com/AndreasChristianson/theory-of-colours/actions/workflows/codeql-analysis.yaml)
[![main](https://github.com/AndreasChristianson/theory-of-colours/actions/workflows/publish.yaml/badge.svg)](https://github.com/AndreasChristianson/theory-of-colours/actions/workflows/publish.yaml)

> _Si vera nostra sunt aut falsa, erunt talia, licet nostra per vitam defendimus. Post fata pueri qui nunc ludunt nostri judices erunt._

This package is a cli tool that generates random, pleasing, SVGs.

## Installation

`npm install -g theory-of-colours`

## Usage

`colours --help`

## Gotcha

I don't think the shebang will work on windows

## Todo

- [x] publish
  - [x] auto publish main
- [x] cli args
  - [x] filename to write to
    - [x] add option to use a temp file
      - [x] default true
  - [x] open
    - [x] default true
  - [ ] rethink not passing arguments
  - [ ] two pass argument filling
- SVG generation
  - [x] don't write elements before collecting them
- files
  - [x] don't spew drain listener warnings
- reproducibility
  - [ ] make sure identical seeds yield identical SVGs
    - [ ] first AT
- testability
  - [x] get jest working
  - all exports
    - [ ] should return named constants
    - [ ] should be functions
  - [ ] no module load time computation
- polish
  - [ ] stop using log trackers
  - [ ] stop using classes


## Road Map

- [ ] Random dots
  - [x] distribution
  - [ ] symmetry
  - [x] background color
  - [ ] non-overlapping
- [ ] strokes
  - [ ] bezier curves
  - [ ] width variance
  - [ ] directional
- animations
  - [ ] shimmy shimmy ya
- [ ] prosper?
