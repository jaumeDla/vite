import { CorsOptions } from 'cors';
import { CORS_ERROR } from './Constants';

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin === 'http://localhost:5173') {
            callback(null, true);
        } else {
            callback(new Error(CORS_ERROR));
        }
    }
};

export default corsOptions;
