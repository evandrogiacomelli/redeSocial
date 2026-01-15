import dotenv from "dotenv";
dotenv.config();
import { ApiServer } from "./interface/adapters/http/api-server";
new ApiServer().start();
