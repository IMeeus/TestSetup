import { render, screen } from "@testing-library/react";
import { SUT, ISUTProps } from "./SimpleSUT";
import { TestSetup } from "../../lib/test-setup";

const defaultProps: ISUTProps = {
  title: "someTitle",
  items: ["someItem1", "someItem2"],
};

const setup = new TestSetup(defaultProps, (props) => {
  return { ...render(<SUT {...props} />) };
});

test("renders correctly with default props", () => {
  const { container } = setup.run();

  expect(container).toMatchSnapshot();
});

test("overrides title correctly", () => {
  setup.run({
    title: "expectedTitle",
  });

  const title = screen.queryByText(/expectedTitle/i);
  expect(title).toBeInTheDocument();
});

test("overrides all items correctly", () => {
  setup.run({
    items: ["expectedItem"],
  });

  const expectedItem = screen.queryByText(/expectedItem/i);
  const someItem2 = screen.queryByText(/someItem2/i);

  expect(expectedItem).toBeInTheDocument();
  expect(someItem2).not.toBeInTheDocument();
});

test("overrides specific item correctly", () => {
  setup.run2((props) => {
    props.items[0] = "expectedItem";
  });

  const expectedItem = screen.queryByText(/expectedItem/i);
  const someItem2 = screen.queryByText(/someItem2/i);

  expect(expectedItem).toBeInTheDocument();
  expect(someItem2).toBeInTheDocument();
});
