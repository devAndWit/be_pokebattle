import { Router } from "express";
import {
  fetchAllPokemon,
  fetchAllPokemonPerPage,
  fetchPokemonById,
} from "../controllers/pokemon.js";

const pokemonRouter = Router();

pokemonRouter.get("/all", fetchAllPokemon);
pokemonRouter.get("/page/:page", fetchAllPokemonPerPage);
pokemonRouter.get("/page/:page/:perPage", fetchAllPokemonPerPage);
pokemonRouter.get("/byId/:id", fetchPokemonById);

export default pokemonRouter;
