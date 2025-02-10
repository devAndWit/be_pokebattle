import axios from "axios";

const pokeUrl = "https://pokeapi.co/api/v2";
const pokePerPage = 20;

export async function fetchAllPokemon() {
  try {
    const allPokemon = await axios.get(`${pokeUrl}/pokemon?limit=100000`);
    if (!allPokemon) {
      console.error("Fehler beim Abrufen der Pokémon:");
      return {
        data: "",
        status: 200,
        error: "",
      };
    }
    return {
      data: allPokemon.data,
      status: 200,
      pokeCount: allPokemon.data.results.length,
      error: "",
    };
  } catch (error) {
    console.error("Fehler beim Abrufen der Pokémon:", error);
    return {
      data: "",
      status: 500,
      error: "keine Daten vorhanden",
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
      console.error("Fehler beim Abrufen der Pokémon:");
      return {
        data: "",
        status: 400,
        error: "keine Daten vorhanden",
      };
    }

    return {
      data: pokemonList.data,
      status: 200,
      pokeCount: allPokemon.data.results.length,
      error: "",
    };
  } catch (error) {
    console.error("Fehler beim Abrufen der Pokémon:", error);
    return {
      data: "",
      status: 500,
      error: "keine Daten vorhanden",
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
