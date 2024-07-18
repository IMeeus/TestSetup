import { render } from "@testing-library/react";
import { SUT, ISUTProps } from "./AdvancedSUT";
import { TestSetup } from "../../lib/test-setup";
import { ApiResponse, PersonInfo } from "./useApi";
import * as useFetchPersonInfo from "./useApi";

const defaultProps: ISUTProps = {
  title: "someTitle",
};

const defaultUseFetchPersonInfo: ApiResponse<PersonInfo> = {
  isOk: true,
  isLoading: false,
  data: {
    firstName: "Rubber",
    lastName: "Duck",
  },
};

const defaultConfig = {
  props: defaultProps,
  stubs: {
    useFetchPersonInfo: defaultUseFetchPersonInfo,
  },
};

const setup = new TestSetup(defaultConfig, (config) => {
  jest
    .spyOn(useFetchPersonInfo, "useFetchPersonInfo")
    .mockReturnValue(config.stubs.useFetchPersonInfo);

  return { ...render(<SUT {...config.props} />) };
});

test("renders correctly by default", () => {
  const { container } = setup.run();

  expect(container).toMatchSnapshot();
});

test("renders correctly when api is loading", () => {
  const { container } = setup.run({
    stubs: {
      useFetchPersonInfo: {
        isLoading: true,
      },
    },
  });

  expect(container).toMatchSnapshot();
});
