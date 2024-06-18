import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import rateLimiter from "./middlewares/rateLimiter";
import errorHandler from "./middlewares/errorHandler";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(rateLimiter);

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

app.use(errorHandler);

export default app;
