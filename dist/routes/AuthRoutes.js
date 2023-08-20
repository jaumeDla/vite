"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthControllers_1 = require("../controllers/AuthControllers");
const router = express_1.default.Router();
router.post("/register", AuthControllers_1.Register);
router.post("/login", AuthControllers_1.Login);
router.post("/check-token", AuthControllers_1.CheckToken);
exports.default = router;
