import PromisePool from "@supercharge/promise-pool";
import { getPokemonList, getPokemon } from "./src/getPokemon";

(async function () {
  try {
    const list = await getPokemonList();

    const { results, errors } = await PromisePool.withConcurrency(10)
      .for(list.results)
      .process(async (data) => {
        return await getPokemon(data.url);
      });

    console.log(results.map((p) => p.name));

    console.log(">> DONE");
  } catch (e) {
    console.error(e);
  }
})();
