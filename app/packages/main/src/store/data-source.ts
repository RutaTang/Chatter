import path from "path";
import { DataSource } from "typeorm";
import { DATABASE_PATH } from "../utils";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: DATABASE_PATH,
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, "./entities/*")],
    // migrations: [path.join(__dirname, "./migration/*")],
    subscribers: [],
})

