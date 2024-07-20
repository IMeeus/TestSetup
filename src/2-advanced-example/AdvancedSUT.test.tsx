import { render } from "@testing-library/react";
import { SUT, ISUTProps } from "./AdvancedSUT";
import { ConfigurableCallback } from "../../lib/configurable-callback";
import { ApiResponse, PersonInfo } from "./useFetchPersonInfo";
import * as useFetchPersonInfo from "./useFetchPersonInfo";

type ISetupProps = {
  props: ISUTProps;
  stubs: {
    useFetchPersonInfo: ApiResponse<PersonInfo>;
  };
};

const defaultSetup: ISetupProps = {
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

const Setup = new ConfigurableCallback(defaultSetup, (setup) => {
  jest
    .spyOn(useFetchPersonInfo, "useFetchPersonInfo")
    .mockReturnValue(setup.stubs.useFetchPersonInfo);

  // You may consider a render as a part of your Act, and want to keep it separate from your Arrange/Setup.
  // In this case, you can split the render off to it's own ConfigurableCallback.
  // I don't do it, because I personally see a render as a part your Setup/Arrange.
  // Depends on your taste I guess.
  return { ...render(<SUT {...setup.props} />) };
});

test("renders correctly by default", () => {
  const { container } = Setup.run();

  expect(container).toMatchSnapshot();
});

test("renders correctly when api is loading", () => {
  const { container } = Setup.run({
    stubs: {
      useFetchPersonInfo: {
        isLoading: true,
      },
    },
  });

  expect(container).toMatchSnapshot();
});
