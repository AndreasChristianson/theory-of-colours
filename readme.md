# Theory of Colours

_Si vera nostra sunt aut falsa, erunt talia, licet nostra per vitam defendimus. Post fata pueri qui nunc ludunt nostri judices erunt._

This package is a cli tool that generates random, pleasing, SVGs.

<p>
    <a href="https://github.com/AndreasChristianson/theory-of-colours/actions/workflows/publish.yaml" alt="Build">
        <img src="https://img.shields.io/github/workflow/status/AndreasChristianson/theory-of-colours/main" /></a>
            <a href="https://www.npmjs.com/package/theory-of-colours" alt="npm downloads">
        <img src="https://img.shields.io/npm/dw/theory-of-colours" /></a>
    <a href="https://www.npmjs.com/package/theory-of-colours?activeTab=versions" alt="npm versions">
        <img src="https://img.shields.io/npm/v/theory-of-colours" /></a>
</p>

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
    - [ ] add option to use a temp file
      - [ ] default true
  - [x] open
    - [ ] default true
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
