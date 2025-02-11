import axios from "axios";
import ErrorPokemon from "../../error/errorPokemon.js";

const pokeUrl = "https://pokeapi.co/api/v2";
const pokePerPage = 20;

export async function fetchAllPokemon() {
  try {
    const allPokemon = await axios.get(`${pokeUrl}/pokemon?limit=100000`);
    if (!allPokemon) {
      return {
        data: "",
        status: 400,
        error: "400: Fehler beim Abrufen der Pokémon.",
      };
    }
    return {
      data: allPokemon.data,
      status: 200,
      pokeCount: allPokemon.data.results.length,
      error: "",
    };
  } catch (error) {
    return {
      data: "",
      status: 500,
      error: "500 Fehler beim Abrufen der Pokémon:",
    };
  }
}

export async function fetchAllPokemonPerPage(page = 1, perPage = pokePerPage) {
  try {
    let start = page * perPage;

    const pokemonList = await axios.get(
      `${pokeUrl}/pokemon?offset=${start}&?limit=${perPage}`
    );

    if (!pokemonList) {
      return {
        data: "",
        status: 400,
        error: "Fehler beim Abrufen der Pokémon:",
      };
    }

    return {
      data: pokemonList.data,
      status: 200,
      pokeCount: allPokemon.data.results.length,
      error: "",
    };
  } catch (error) {
    
    return {
      data: "",
      status: 500,
      error: "Fehler beim Abrufen der Pokémon.",
    };
  }
}

export async function fetchPokemonById(id = 0) {
  try {
    const pokemon = await axios.get(`${pokeUrl}/pokemon/${id}`);
    if (!pokemon) {
      return {
        data: "",
        status: 400,
        error: "keine Daten vorhanden",
      };
    }
    return { data: pokemon.data, status: 200, error: "" };
  } catch (error) {
    return {
      data: "",
      status: 500,
      error: "keine Daten vorhanden",
    };
  }
}
