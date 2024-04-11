import { CharListProps } from "../../interfaces";
import { CharObject } from "../../interfaces";

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
                className="flex flex-col justify-center items-center mb-5"
                key={char.id}
              >
                <img src={char.image} alt={`Imagen de ${char.name}`} />
                <p className="text-white font-semibold p-2 text-xl">
                  {char.name}
                </p>
              </li>
            );
          })}
    </ul>
  );
};
