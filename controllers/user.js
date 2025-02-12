import asyncHandler from "../utils/handler/asyncHandler.js";
import UserModel from "../models/User.js";
import ErrorResponse from "../utils/error/ErrorResponse.js";

const getUserPokemonList = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const user = await UserModel.findById(id).select("pokemonList").lean();

    if (!user) throw new ErrorResponse("User not found", 404);
    res.json(user.pokemonList)
});

const getTopUsers = asyncHandler(async (req, res) => {
    const topUsers = await UserModel.find()
        .sort({rating: -1})
        .limit(10)
        .select("_id username rating")
        .lean();

    res.json({topUsers})
});
