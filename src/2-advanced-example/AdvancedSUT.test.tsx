import { render } from "@testing-library/react";
import { SUT, ISUTProps } from "./AdvancedSUT";
import { TestSetup } from "../../lib/test-setup";
import { ApiResponse, PersonInfo } from "./useFetchPersonInfo";
import * as useFetchPersonInfo from "./useFetchPersonInfo";

type SetupConfig = {
  props: ISUTProps;
  stubs: {
    useFetchPersonInfo: ApiResponse<PersonInfo>;
  };
};

const defaultConfig: SetupConfig = {
  props: {
    title: "someTitle",
  },
  stubs: {
    useFetchPersonInfo: {
      isOk: true,
      isLoading: false,
      data: {
        firstName: "Rubber",
        lastName: "Duck",
      },
    },
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
