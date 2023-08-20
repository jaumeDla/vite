"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions = {
    origin: (origin, callback) => {
        if (origin === 'http://localhost:5173') {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS policy'));
        }
    }
};
exports.default = corsOptions;
