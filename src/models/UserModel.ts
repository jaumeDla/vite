import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, min: 8, max: 50 },
    email: { type: String, required: true, max: 80 },
    password: { type: String, required: true, min: 8 },
    verified: { type: Boolean, default: false },
    creation: { type: Date, default: Date.now() }
});

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel