"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const CorsOptions_1 = __importDefault(require("./config/CorsOptions"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../public")));
app.use((0, morgan_1.default)("common"));
app.use((0, cors_1.default)(CorsOptions_1.default));
//routes
app.use("/auth", AuthRoutes_1.default);
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect((_a = process.env.DB) !== null && _a !== void 0 ? _a : "")
    .then(() => app.listen(PORT, () => console.log(`Database and server running on port ${PORT}`)))
    .catch((error) => console.error("Error connecting to database: ", error));
