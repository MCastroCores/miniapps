interface CharObject {
  id: number;
  name: string;
  status: string;
}

interface CharListProps {
  chars: { results: CharObject[]; name: string; id: number };
  name: string;
  isAlive: boolean;
}

export const CharList = ({ chars, name, isAlive }: CharListProps) => {
  return (
    <ul
      className="flex flex-col place-items-center
      "
    >
      {chars &&
        chars.results
          .filter((char: CharObject) => char.name.toLowerCase().includes(name))
          .filter((char: CharObject) =>
            isAlive ? char.status === "Alive" : true
          )
          .map((char) => {
            return (
              <li
                className="text-white font-semibold p-2 text-xl"
                key={char.id}
              >
                {char.name}
              </li>
            );
          })}
    </ul>
  );
};
