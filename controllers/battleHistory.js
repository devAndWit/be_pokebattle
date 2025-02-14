import asyncHandler from "../utils/handler/asyncHandler.js";
import BattleHistoryModel from "../models/BattleHistory.js";

const getUserABattleHistory = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const battles = await BattleHistoryModel.find({
        $or: [
            {'players.player1.userId': userId},
            {'players.player2.userId': userId}
        ]
    })
        .populate('players.player1.userId', 'username')
        .populate('players.player2.userId', 'username')
        .populate('winner', 'username')
        .sort({createdAt: -1});

    res.json(battles)
});

export {getUserABattleHistory};
