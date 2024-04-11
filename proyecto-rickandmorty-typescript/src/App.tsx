import { useState } from "react";
import { CharList } from "./components/CharList/CharList";
import { useGetChars } from "./hooks/useGetChars";

const App = () => {
  const chars = useGetChars();
  const [name, setName] = useState<string>("");
  const [isAlive, setIsAlive] = useState<boolean>(false);

  return (
    <>
      <h1 className="text-center text-white text-2xl font-bold p-3 mb-5">
        Lista de personajes de Rick and Morty
      </h1>
      <form className="flex flex-col justify-center items-center">
        <input
          className="p-3 mb-5 text-center"
          type="text"
          placeholder="Nombre..."
          onChange={(e) => setName(e.target.value.toLowerCase())}
        />
        <label className="flex p-4">
          <input
            type="checkbox"
            onChange={(e) => setIsAlive(e.target.checked)}
          />
          <p className="text-white ml-2">Alive</p>
        </label>
      </form>
      {chars ? (
        <CharList chars={chars} name={name} isAlive={isAlive} />
      ) : (
        <p className="text-white ml-2">Cargando personajes...</p>
      )}
    </>
  );
};

export default App;
