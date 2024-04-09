import { useEffect, useState } from "react";
import { CharList } from "./components/CharList/CharList";

function App() {
  const [chars, setChars] = useState(null);
  const [name, setName] = useState("");
  const [isAlive, setIsAlive] = useState(false);

  useEffect(() => {
    const getChars = async () => {
      try {
        const resp = await fetch("https://rickandmortyapi.com/api/character");

        if (!resp.ok) {
          throw new Error();
        }

        const data = await resp.json();
        console.log(data);
        setChars(data);
      } catch (error) {
        console.log(error);
      }
    };

    getChars();
  }, []);

  console.log(isAlive);

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
        <p>Cargando personajes...</p>
      )}
    </>
  );
}

export default App;
