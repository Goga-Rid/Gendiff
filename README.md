### Hexlet tests and linter status:
[![Actions Status](https://github.com/Goga-Rid/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Goga-Rid/frontend-project-46/actions)

# Gendiff: Gendiff — is a console utility that takes two data structures as input and outputs their differences in the course of former changes.

## Information about features

### Support for file extensions:
* Yaml(yml), Json

### Types of outputs:
* Stylish, plain text, json

## Installation instruction
### Initially clone this repository and run the commands:
```
make install
```
```
sudo npm link
```

## Usage information:
### enter the command below in the console and examine the information
```
gendiff -h
```
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version         output the version number
  -f, --format, <type>  output format (default: "stylish")
  -h, --help            output usage information
```

## Examples of work: 
**Comparison of flat files (JSON)**
[![asciicast](https://asciinema.org/a/tcFv6GYSN3Ls7zsCF2S6nyh0u.svg)](https://asciinema.org/a/tcFv6GYSN3Ls7zsCF2S6nyh0u)