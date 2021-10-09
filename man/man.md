# colours - Generate random, pleasing svgs.

## Synopsis

`colours [options]`

## Description

`colours` is a [node.js](https://nodejs.org/) based cli tool for generating random svgs. When run, a random seed will be chosen and an svg based on that seed will be written to disk.

## Website

[homepage](https://github.com/AndreasChristianson/theory-of-colours)

## Common Options

`colours --seed 1234567890`
  Create an svg with the given seed value. All calls to `colours` with the same seed produce the same image.

`colours --plan foo`
  Create an svg using the specified plan. By default the plan is chosen at random

## All Options

`colours --help`
View a breakdown of all usage options.

## Examples

`npm install theory-of-colours -g`
  Install colors via [npm](https://www.npmjs.com/).

`colours`
  Create an random SVG.

## Bugs

Please report any bugs as [issues](https://github.com/AndreasChristianson/theory-of-colours/issues).

## License

Copyright (c) 2021, Andreas Christianson (ISC License).

## See Also

- `colours --help`
- node(1)
- npm(1)
- npm-install(1)
- [svg format](https://www.w3.org/TR/SVG/)
