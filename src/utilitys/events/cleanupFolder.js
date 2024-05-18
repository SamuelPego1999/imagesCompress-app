import { EventEmitter } from "events";
import fs from "fs/promises";
import { join } from "path";
import { compressedFilesPath } from "../../../config.js";


const customEmitter = new EventEmitter();

export const cleanupEvent = customEmitter.on("cleanupFolder", async () => {
  const folderPath = compressedFilesPath;
  const folderContent = await fs.readdir(folderPath);
  folderContent.forEach(async (file) => {
    console.log(file);
    await fs.unlink(join(folderPath, file));
  });
});
