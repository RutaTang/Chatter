import fs from "fs"
import path from "path";

export async function getChildrenDirectories(folderPath: string) {
    const files = fs.readdirSync(folderPath);
    const directories = files.filter(file => {
        const fullPath = path.join(folderPath, file);
        const stat = fs.statSync(fullPath);
        return stat.isDirectory() && !file.startsWith(".");
    });
    return directories.map(directory => {
        return path.join(folderPath, directory);
    });
}

