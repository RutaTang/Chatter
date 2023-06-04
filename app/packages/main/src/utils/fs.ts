import fs from "fs/promises"
import path from "path";

export async function getChildrenDirectories(folderPath: string) {
    const files = await fs.readdir(folderPath);
    const directories = files.filter(async file => {
        const fullPath = path.join(folderPath, file);
        const stat = await fs.stat(fullPath);
        return stat.isDirectory();
    });
    return directories.map(directory => {
        return path.join(folderPath, directory);
    });
}

