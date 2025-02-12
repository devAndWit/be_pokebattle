import {
  fetchAllPokemon,
  fetchAllPokemonPerPage,
  fetchPokemonById,
} from "./utils/api/pokemon/pokemon.js";

// console.log(await fetchAllPokemon());
console.log(await fetchAllPokemonPerPage(2, 20));
// console.log(await fetchPokemonById(300));
