export interface ISUTProps {
  title: string;
  items: string[];
}

export function SUT({ title, items }: ISUTProps) {
  return (
    <>
      <h1>{title}</h1>
      <ul>
        {items.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
    </>
  );
}
