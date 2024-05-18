import {fileURLToPath} from "url";
import {join,dirname} from "path";

export const PORT = process.env.PORT || 3000;
export const compressedFilesPath = join(dirname(fileURLToPath(import.meta.url)),"src","public","filesCompressed");
const x = compressedFilesPath

console.log(x)