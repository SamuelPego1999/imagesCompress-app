import {fileURLToPath} from "url";

export const PORT = process.env.PORT || 3000;
export const compressedFilesPath = fileURLToPath(import.meta.url);