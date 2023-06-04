import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { initDefaultSettings } from "./operations/settings"


AppDataSource.initialize().then(async () => {
    console.log("Database initialized Successfully")
    await initDefaultSettings()
    console.log("Default settings initialized Successfully")
}).catch(error => console.log(error))

