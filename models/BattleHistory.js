import {model, Schema} from "mongoose";

const BattleHistorySchema = new Schema({
    players: {
        player1: {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            username: String,
            team: [
                {
                    type: Number,
                }
            ]
        },
        player2: {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            username: String,
            team: [
                {
                    type: Number,
                }
            ]
        }
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const BattleHistoryModel = model('BattleHistory', BattleHistorySchema);

export default BattleHistoryModel;
