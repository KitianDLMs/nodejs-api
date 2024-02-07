import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    rol: {type: String, maxLength: 30, required: true},
    name: {type: String, maxLength: 250, required: true},
    surname: {type: String, maxLength: 250, required: false},
    email: {type: String, maxLength: 250, required: true, unique: true},
    password: {type: String, maxLength: 250, required: true},
    avatar: {type: String, maxLength: 250, required: false},
    state: {type: String, default: 1}, // 1: activo, 2: inactivo
    phone: {type: String, maxLength: 20, required: false},
    birthday: {type: String, maxLength: 20, required: false},
},{
    timestamps: true
});

const User = mongoose.model("user", UserSchema);
export default User;