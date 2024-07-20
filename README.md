# ConfigurableCallback

This repository showcases the [`ConfigurableCallback`](./lib/configurable-callback.ts) class. It lets you define a callback with default parameters. But each time you run the callback, you're able to override some of those parameters.

## Syntax

```ts
const defaultParams = {
  message: "Hello world!",
  logLevel: "Information",
};

const LogMessage = new ConfigurableCallback(defaultParams, (params) => {
  console.log(params.logLevel, ": ", params.message);
});
```

```ts
LogMessage.run({
  message: "Hello override!",
});

// Result: "Information: Hello override!"
```

```ts
LogMessage.run((params) => {
  params.message = "Hello override!";
});

// Result: "Information: Hello override!"
```

## Can't I achieve the same by just using language features?

```ts
function logMessage(message = "Hello world!", logLevel = "Information") {
  console.log(logLevel, ": ", message);
}

logMessage(message: "Hello override!");
```

Yes! But... this starts to get annoying when the parameters are more complex types, like objects, arrays or objects with arrays.

```ts
const defaultParams = {
  logLevel: "Information",
  messages: ["Hello", "World"],
};

function logMessage(params = defaultParams) {
  console.log(params.logLevel, ": ", params.messages.join(""));
}

// To add to the message - Result: Hello world!
logMessage({
  ...defaultParams,
  messages: [...defaultParams.messages, "!"],
});

// To update the message - Result: Hello override
const params = { ...defaultParams };
params.messages[1] = "override";
logMessage(params);
```

`ConfigurableCallback` is just a wrapper for the code you see above. All it does is:

- Removes some of the boilerplate to make this possible.
- Makes your code look a bit cleaner.
- Makes your code express more intent.

# Application in React FE testing

A `ConfigurableCallback` is particularly usefull when creating `setup functions` for your tests. Setup functions are an alternative to `beforeEach`. It is strongly advised to use these, because it [avoids nesting when you're testing](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing), a recommendation of the creator of React Testing Library, Kent C. Dodds.

When writing tests for a React component you want to avoid repeating, in each test, the full setup to render it. We only want to setup the specific parts that we're interested in. This keeps our test clear and scoped to the problem at hand. A common practice is to define a default setup for your component, and then override specific parts of it in each test. The `ConfigurableCallback` extracts the boilerplate-code to make this possible.

## Examples

- [Simple example](./src/1-simple-example/SimpleSUT.test.tsx) - has configurable component properties.
- [Advanced example](./src/2-advanced-example/AdvancedSUT.test.tsx) - has configurable api stubs.

## How to run

To run the tests, run `npm test` in the root folder.
