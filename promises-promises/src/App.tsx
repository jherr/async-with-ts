import React, { useEffect, useState } from "react";
import PromisePool from "@supercharge/promise-pool";
import { getPokemonList, getPokemon, Pokemon } from "./getPokemon";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  useEffect(() => {
    async function getData() {
      const list = await getPokemonList();

      const { results } = await PromisePool.withConcurrency(10)
        .for(list.results)
        .process(async (data) => {
          return await getPokemon(data.url);
        });

      setPokemon(results);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <ul>
        {pokemon.map((pokemon) => (
          <li key={pokemon.id}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
