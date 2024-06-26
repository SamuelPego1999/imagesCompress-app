import fs from "fs";
import { join } from "path";
import archiver from "archiver";
import { compressedFilesPath } from "../../config.js";

export const compressZipController = async (req, res) => {
    const folderImagesPath = compressedFilesPath;
  try {
    const output = fs.createWriteStream(
      folderImagesPath + "/images.zip"
    );
    const archive = archiver("zip", { zlib: { level: 9 } });
    const folderContent = fs.readdirSync(folderImagesPath);
    for (let file of folderContent) {
        if (file.includes(".zip") || file.includes(".gitkeep")){ 
          continue;
        }
        else {
            archive.file(join(folderImagesPath,file),{name:file})
        }
    }
    archive.pipe(output)
    output.on("close",()=> {
        console.log("ya cerro")
    })
    archive.finalize()
    res.status(200).json({message:"zip ready"})
    
    
    console.log(folderContent)
    
  } catch (err) {
    res.status(500).send({message:"error interno"})
    console.log(err);
  }
};
