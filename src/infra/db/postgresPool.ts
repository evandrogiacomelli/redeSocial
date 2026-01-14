// @ts-ignore
import {Pool} from "pg";

export const postgresPool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "rede_social",
});
