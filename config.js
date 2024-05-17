import {fileURLToPath} from "url";
import {join} from "path"

export const PORT = process.env.PORT || 3000;
export const compressedFilesPath = join(fileURLToPath(import.meta.url),"src","public","filesCompressed");