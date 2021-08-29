import fetch from "node-fetch";

export interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}

export const getPokemonList = async (): Promise<PokemonList> => {
  const listResp = await fetch("http://localhost/api/v2/pokemon/");
  return await listResp.json();
};

export const getPokemon = async (url: string): Promise<Pokemon> => {
  const dataResp = await fetch(url);
  return await dataResp.json();
};

export const getFirstPokemon = async (): Promise<Pokemon> =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("Getting the list");
      const list = await getPokemonList();
      resolve(await getPokemon(list.results[0].url));
    } catch (error) {
      reject(error);
    }
  });
