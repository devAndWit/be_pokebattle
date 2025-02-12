import axios from "axios";
import asyncHandler from "../utils/handler/asyncHandler.js";
import ErrorResponse from "../utils/error/ErrorResponse.js";

const pokeUrl = "https://pokeapi.co/api/v2";
const pokePerPage = 20;

export const fetchAllPokemon = asyncHandler(async (req, res) => {
  try {
    const allPokemon = await axios.get(`${pokeUrl}/pokemon?limit=100000`);
    if (!allPokemon) {
      throw new ErrorResponse("Keine Pokemondaten gefunden.", 400);
    }

    let data = [];
    await allPokemon.data.results.forEach((val) => {
      data.push({
        name: val.name,
        url: val.url,
        id: parseInt(val.url.match(/\/pokemon\/(\d+)\//)[1]),
      });
    });

    const dataLength = data.length;

    res.status(200).json({
      message: "All data fetched.",
      data,
      dataLength,
    });
  } catch (error) {
    throw new ErrorResponse("Fehler im Bearbeiten der Pokemondaten.", 500);
  }
});

export const fetchAllPokemonPerPage = asyncHandler(async (req, res) => {
  console.log("fetchAllPokemonPerPage");
  const { page } = req.params;

  const perPage = !req.params.perPage ? 20 : req.params.perPage;

  console.log("page: ", page);
  console.log("perPage: ", perPage);

  try {
    let start = (page - 1) * perPage; // Offset korrekt berechnet

    const pokemonList = await axios.get(
      `${pokeUrl}/pokemon?offset=${start}&limit=${perPage}`
    );

    if (!pokemonList || !pokemonList.data.results) {
      throw new ErrorResponse("Keine Pokemondaten gefunden.", 400);
    }

    let data = pokemonList.data.results.map((val) => ({
      id: parseInt(val.url.match(/\/pokemon\/(\d+)\//)[1]),
    }));

    let pokeList = [];

    pokeList = await Promise.all(
      data.map(async (val) => {
        try {
          let url = `http://localhost:8000/api/pokemon/byId/${val.id}`;
          let response = await axios.get(url);
          return response.data.data;
        } catch (error) {
          return null;
        }
      })
    );

    // console.log(pokeList);

    pokeList = pokeList.filter((poke) => poke !== null);

    res.status(200).json({
      message: "All data fetched.",
      data: pokeList,
    });
  } catch (error) {
    throw new ErrorResponse(
      `Fehler im Bearbeiten der Pokemondaten: ${error.message}`,
      500
    );
  }
});

export const fetchPokemonById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const pokemon = await axios.get(`${pokeUrl}/pokemon/${id}`);

    if (!pokemon) {
      throw new Error("400: Pokemon nicht gefunden.");
    }

    const data = extractDataFromPokemonData(pokemon.data);

    res.status(200).json({
      message: `Fetched all Data from Pokemon with id: ${id}`,
      data,
    });
  } catch (error) {
    throw new Error(
      `500: Fehler im Bearbeiten der Pokemondaten mit id ${id}`,
      error
    );
  }
});

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
