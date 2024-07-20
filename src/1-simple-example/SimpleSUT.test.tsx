import { render, screen } from "@testing-library/react";
import { SUT, ISUTProps } from "./SimpleSUT";
import { ConfigurableCallback } from "../../lib/configurable-callback";

const defaultProps: ISUTProps = {
  title: "someTitle",
  items: ["someItem1", "someItem2"],
};

const Render = new ConfigurableCallback(defaultProps, (props) => {
  return { ...render(<SUT {...props} />) };
});

test("renders correctly with default props", () => {
  const { container } = Render.run();

  expect(container).toMatchSnapshot();
});

test("overrides title correctly", () => {
  Render.run({
    title: "expectedTitle",
  });

  const title = screen.queryByText(/expectedTitle/i);
  expect(title).toBeInTheDocument();
});

test("overrides all items correctly", () => {
  Render.run({
    items: ["expectedItem"],
  });

  const expectedItem = screen.queryByText(/expectedItem/i);
  const someItem2 = screen.queryByText(/someItem2/i);

  expect(expectedItem).toBeInTheDocument();
  expect(someItem2).not.toBeInTheDocument();
});

test("overrides specific item correctly", () => {
  Render.run((props) => {
    props.items[0] = "expectedItem";
  });

  const expectedItem = screen.queryByText(/expectedItem/i);
  const someItem2 = screen.queryByText(/someItem2/i);

  expect(expectedItem).toBeInTheDocument();
  expect(someItem2).toBeInTheDocument();
});
