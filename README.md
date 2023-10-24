
# Advent of Code 2022

This repo contains [JC](https://juancri.com)'s solutions for [Advent of Code 2022](https://adventofcode.com/2022).

## Requirements

- [Node 20.x](https://nodejs.org/en)
- [GNU Make](https://www.gnu.org/software/make/)
- [Bats-core](https://github.com/bats-core/bats-core) Optional to run tests

## Setup

```bash
npm install
```

## Compile

```bash
make
```

## Run

Each solution has its own file. To run a specific solution, execute:

```bash
node dist/DAY/PART
```

For example:

```bash
node dist/01/first
```

## Run tests

```bash
./runtests.sh
```

## Add new day

```bash
make && node dist/init
```

## Clean

```bash
make clean
```
