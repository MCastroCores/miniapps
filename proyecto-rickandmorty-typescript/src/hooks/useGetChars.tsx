import { useEffect, useState } from "react";
import { CharData } from "../interfaces";

export const useGetChars = () => {
  const [chars, setChars] = useState<CharData | null>(null);

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

  return chars;
};
