# Test Setup Class

## Motivation

This repository showcases the [`TestSetup`](./lib/test-setup.ts) class. Using this class forces you to use `setup functions` for your tests, instead of `beforeEach`. It is strongly advised to use `setup functions` because it [avoids nesting when you're testing](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing), a recommendation of the creator of React Testing Library, Kent C. Dodds.

## Default setup pattern

When writing tests for a React component you want to avoid repeating, in each test, the full setup to render it. For each test, we only want to setup the specific parts that we're interested in. This keeps our test clear and scoped to the problem at hand.

A common practice is to define a default setup for your component, and then override specific parts of that default setup in each test. The [`TestSetup`](./lib/test-setup.ts) class extracts the boilerplate-code to make this possible.

## Examples

- [Simple example](./src/1-simple-example/SimpleSUT.test.tsx) - has configurable component properties.
- [Advanced example](./src/2-advanced-example/AdvancedSUT.test.tsx) - has configurable api stubs.

## How to run

To run the tests, run `npm test` in the root folder.
