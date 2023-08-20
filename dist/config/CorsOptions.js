"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
const corsOptions = {
    origin: (origin, callback) => {
        if (origin === 'http://localhost:5173') {
            callback(null, true);
        }
        else {
            callback(new Error(Constants_1.CORS_ERROR));
        }
    }
};
exports.default = corsOptions;
