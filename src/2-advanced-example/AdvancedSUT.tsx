import { useFetchPersonInfo } from "./useApi";

export interface ISUTProps {
  title: string;
}

export function SUT({ title }: ISUTProps) {
  const { isLoading, data } = useFetchPersonInfo();

  if (isLoading) {
    return <div>Loader</div>;
  }

  return (
    <>
      <h1>{title}</h1>

      <ul>
        <li>{data.firstName}</li>
        <li>{data.lastName}</li>
      </ul>
    </>
  );
}
