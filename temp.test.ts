import { TestSetup } from "./testing-tools/lib/test-setup";

type Avatar = {
  name: string;
};

type CalendarDay = {
  name: string;
  num: number;
};

type SomeProps = {
  avatar: Avatar;
  days: CalendarDay[];
};

type SetupConfig = {
  props: SomeProps;
};

const defaultConfig: SetupConfig = {
  props: {
    avatar: {
      name: "alex",
    },
    days: [
      {
        name: "monday",
        num: 1,
      },
      {
        name: "tuesday",
        num: 2,
      },
    ],
  },
};

const setup = new TestSetup(defaultConfig, (c) => {
  return c.props.avatar;
});

const x = setup.run({
  props: {
    avatar: {
      name: "works",
    },
    days: [
      {
        name: "",
      },
    ],
  },
});

const z = setup.run2((c) => {
  c.props.days[1].name = "wednesday";
});
