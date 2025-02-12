import {model, Schema} from "mongoose";
import bcrypt from "bcryptjs"
import {emailRegex, passwordRegex} from "../utils/validate/validation.js";


const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide an username.'],
        unique: [true, 'Username already in use.'],
    },
    email: {
        type:String,
        required: [true, 'Please provide an email.'],
        unique: [true, 'Email already in use.'],
        match: [emailRegex, 'Email not valid.']
    },
    password: {
        type: String,
        required: true,
        match: [
            passwordRegex,
            'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.'
        ]
    },
    pokemonList: [
        {
            pokemonId: {
                type: Number,
            },
            experience: {
                type: Number,
                min: 0,
            }
        }
    ],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    pokeCoin: {
        type: Number,
        required: true,
        default: 0,
    },
    timestamps: true,
});

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
} );

const UserModel = model('User', UserSchema);

export default UserModel;
