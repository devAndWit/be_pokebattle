import axios from "axios";
import ErrorPokemon from "../../error/errorPokemon.js";

const pokeUrl = "https://pokeapi.co/api/v2";
const pokePerPage = 20;

export async function fetchAllPokemon() {
  try {
    const allPokemon = await axios.get(`${pokeUrl}/pokemon?limit=100000`);
    if (!allPokemon) {
      throw new Error("400: Keine Pokemondaten gefunden.");
    }

    let data = [];
    allPokemon.data.results.forEach((val) => {
      data.push({
        name: val.name,
        url: val.url,
        id: parseInt(val.url.match(/\/pokemon\/(\d+)\//)[1]),
      });
    });

    return {
      data: data,
      status: 200,
      count: data.length,
    };
  } catch (error) {
    throw new Error("500: Fehler im Bearbeiten der Pokemondaten.", error);
  }
}

export async function fetchAllPokemonPerPage(page = 1, perPage = pokePerPage) {
  try {
    let start = page * perPage;

    const pokemonList = await axios.get(
      `${pokeUrl}/pokemon?offset=${start}&?limit=${perPage}`
    );

    if (!pokemonList) {
      throw new Error("400: Keine Pokemondaten gefunden.");
    }

    let data = [];
    pokemonList.data.results.forEach((val) => {
      data.push({
        name: val.name,
        url: val.url,
        id: parseInt(val.url.match(/\/pokemon\/(\d+)\//)[1]),
      });
    });

    // console.log(data);

    let pokeList = [];
    pokeList = data.map(async (val, index) => {
      let poke = await fetchPokemonById(val.id);
      console.log(poke.data);
      return poke.data;
    });

    return {
      data: pokeList,
      status: 200,
      count: data.length,
      test: "",
    };
  } catch (error) {
    throw new Error("500: Fehler im Bearbeiten der Pokemondaten.", error);
  }
}

export async function fetchPokemonById(id = 0) {
  try {
    const pokemon = await axios.get(`${pokeUrl}/pokemon/${id}`);

    if (!pokemon) {
      throw new Error("400: Pokemon nicht gefunden.");
    }

    const poke_info = extractDataFromPokemonData(pokemon.data);

    return { data: poke_info, status: 200 };
  } catch (error) {
    throw new Error(
      `500: Fehler im Bearbeiten der Pokemondaten mit id ${id}`,
      error
    );
  }
}

function extractDataFromPokemonData(pokemon) {
  let poke = {
    id: pokemon.id,
    name: pokemon.name,
    base_xp: pokemon.base_experience,
    species: pokemon.species.name,
    weight: pokemon.weight,
    height: pokemon.height,
    abilities: pokemon.abilities.map((value, index) => {
      return value.ability.name;
    }),
    sprites: {
      images: {
        dream_world: pokemon.sprites.other.dream_world.front_default,
        home: pokemon.sprites.other.home.front_default,
        artwork: pokemon.sprites.other["official-artwork"].front_default,
      },
      gifs: {
        back_default: pokemon.sprites.other.showdown.back_default,
        back_shiny: pokemon.sprites.other.showdown.back_shiny,
        front_default: pokemon.sprites.other.showdown.front_default,
        front_shiny: pokemon.sprites.other.showdown.front_shiny,
      },
    },
    stats: pokemon.stats
      .map((value, index) => {
        let key = value.stat.name.replace("-", "_");
        return {
          [key]: value.base_stat,
        };
      })
      .reduce((acc, stat) => {
        const key = Object.keys(stat)[0];
        acc[key] = stat[key];
        return acc;
      }, {}),
    type: pokemon.types.map((value, index) => {
      return value.type.name;
    }),
  };

  return poke;
}
