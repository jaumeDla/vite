import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import corsOptions from "./config/CorsOptions";
import authRoutes from "./routes/AuthRoutes";

dotenv.config();
const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(morgan("common"));
app.use(cors(corsOptions));

//routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DB ?? "")
  .then(() => app.listen(PORT, () => console.log(`Database and server running on port ${PORT}`)))
  .catch((error: any) => console.error("Error connecting to database: ", error));


