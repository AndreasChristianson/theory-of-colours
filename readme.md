# Theory of Colours

_Si vera nostra sunt aut falsa, erunt talia, licet nostra per vitam defendimus. Post fata pueri qui nunc ludunt nostri judices erunt._

This package generates random SVGs.

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/AndreasChristianson/theory-of-colours/main)
![npm](https://img.shields.io/npm/v/theory-of-colours)
![npm](https://img.shields.io/npm/dw/theory-of-colours)

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
  - [x] open
- SVG generation
  - [x] don't write elements before collecting them
- files
  - [x] don't spew drain listener warnings
- reproducability
  - [ ] make sure identical seeds yield identical svgs
    - [ ] first AT
- testability
  - [x] get jest working
  - all exports
    - [ ] should return named constants
    - [ ] should be functions
  - [ ] no module load time computation

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
