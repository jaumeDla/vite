"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckToken = exports.Login = exports.Register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const Constants_1 = require("../config/Constants");
function Register(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password } = request.body;
            const usernameExists = yield UserModel_1.default.findOne({ username });
            const emailExists = yield UserModel_1.default.findOne({ email });
            if (!usernameExists && !emailExists) {
                const hashPassword = yield bcrypt_1.default.hash(password, 10);
                const User = new UserModel_1.default({ username, email, password: hashPassword });
                yield User.save();
                return response.status(200).send(Constants_1.REGISTER_SUCCESS);
            }
            else {
                return response.status(400).send(Constants_1.REGISTER_FAILURE);
            }
        }
        catch (error) {
            return response.status(500).send(Constants_1.REGISTER_ERROR);
        }
    });
}
exports.Register = Register;
function Login(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = request.body;
            const userInfo = yield UserModel_1.default.findOne({ email });
            if (userInfo && (yield bcrypt_1.default.compare(password, userInfo.password))) {
                const token = jsonwebtoken_1.default.sign({ username: userInfo.username, email }, process.env.JWT_AUTH || '', { expiresIn: '1d' });
                return response.status(200).send(token);
            }
            else {
                return response.status(400).send(Constants_1.LOGIN_FAILURE);
            }
        }
        catch (error) {
            return response.status(500).send(Constants_1.LOGIN_ERROR);
        }
    });
}
exports.Login = Login;
function CheckToken(request, response) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token } = request.body;
            const decoded = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_AUTH) !== null && _a !== void 0 ? _a : "");
            return response.status(200).send(decoded);
        }
        catch (_b) {
            return response.status(401).send();
        }
    });
}
exports.CheckToken = CheckToken;
