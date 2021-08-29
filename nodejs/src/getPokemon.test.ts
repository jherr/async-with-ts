import { getPokemonList } from "../src/getPokemon";
describe("getPokemon", () => {
  it("should get list", async () => {
    const list = await getPokemonList();
    console.log("Actually running test");
    expect(list.results[0].name).toBe("bulbasaur");
  });
});
