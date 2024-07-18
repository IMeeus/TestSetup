export type ApiResponse<T> = {
  isOk: boolean;
  error?: string;
  isLoading: boolean;
  data: T;
};

export type PersonInfo = {
  firstName: string;
  lastName: string;
};

// some hook you'd like to mock
export function useFetchPersonInfo(): ApiResponse<PersonInfo> {
  return {
    isOk: true,
    isLoading: false,
    data: {
      firstName: "Rubber",
      lastName: "Duck",
    },
  };
}
