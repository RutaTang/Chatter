import { app } from "electron";
import path from "path";

// place the log file in
export const LOG_PATH = app.isPackaged ? path.join(app.getPath("logs"), "log.log") : "log.log"

// place the database in
export const DATABASE_PATH = app.isPackaged ? path.join(app.getPath("userData"), "db.sqlite") : "db.sqlite"

// place the plugins folder in
export const BUILT_IN_PLUGINS_PATH = app.isPackaged ? path.join(process.resourcesPath, "plugins") : path.join(process.cwd(), "../plugins")

// place the plugins > models folder in
export const BUILT_IN_MODELS_PLUGINS_PATH = app.isPackaged ? path.join(BUILT_IN_PLUGINS_PATH, "models") : path.join(BUILT_IN_PLUGINS_PATH, "models")

// place the plugins > actors folder in
export const BUILT_IN_ACTORS_PLUGINS_PATH = app.isPackaged ? path.join(BUILT_IN_PLUGINS_PATH, "actors") : path.join(BUILT_IN_PLUGINS_PATH, "actors")
