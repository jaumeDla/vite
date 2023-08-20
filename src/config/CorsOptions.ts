import { CorsOptions } from 'cors';
import { CORS_ERROR } from './Constants';

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin === process.env.BASE_URL) {
            callback(null, true);
        } else {
            callback(new Error(CORS_ERROR));
        }
    }
};

export default corsOptions;
