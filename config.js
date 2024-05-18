import {fileURLToPath} from "url";
import {join,dirname} from "path";

export const PORT = process.env.PORT || 3000;
export const compressedFilesPath = join(import.meta.url,"src","public","filesCompressed");
