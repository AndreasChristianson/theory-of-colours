# Theory of Colours

_Si vera nostra sunt aut falsa, erunt talia, licet nostra per vitam defendimus. Post fata pueri qui nunc ludunt nostri judices erunt._

This package generates random SVGs.

## Installation

`npm install -g theory-of-colours`

## Usage

`colours --help`

## Gotcha

I don't think the shebang will work on windows

## Todo

- [ ] publish
  - [ ] auto publish main
- [x] cli args
  - [x] filename to write to
  - [x] open
- SVG generation
  - [ ] don't write elements before collecting them
- files
  - [ ] don't spew drain listener warnings
- reproducability
  - [ ] make sure identical seeds yield identical svgs
    - [ ] first AT

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
