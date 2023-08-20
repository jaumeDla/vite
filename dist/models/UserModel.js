"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, min: 8, max: 50 },
    email: { type: String, required: true, max: 80 },
    password: { type: String, required: true, min: 8 },
    verified: { type: Boolean, default: false },
    creation: { type: Date, default: Date.now() }
});
const UserModel = mongoose_1.default.model("Users", UserSchema);
exports.default = UserModel;
