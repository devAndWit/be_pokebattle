import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
});

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
} );

const UserModel = model('User', UserSchema);

export default UserModel;
