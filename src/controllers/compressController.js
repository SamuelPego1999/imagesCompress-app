import sharp from "sharp";
import fs from "fs/promises";
import { join } from "path";
import { cleanupEvent } from "../utilitys/events/cleanupFolder.js";
import { compressedFilesPath } from "../../config.js";

export const commpressController = async (req, res) => {
  try {
    cleanupEvent.emit("cleanupFolder");
    const { format, quality } = req.body;
    const files = req.files["files[]"];
    const outputFolder = compressedFilesPath;

    if (files && Array.isArray(files)) {
      for (let file of files) {
        if (!file.mimetype.includes("image/")) {
          return res
            .status(415)
            .json({ message: "unsuported type", status: 415 });
        }
      }
      const arrayUrls = [];
      for (let file of files) {
        console.log(file);
        const outputName = file.name.replace(/[^.]+$/, format);
        if (format == "jpeg") {
          const image = await sharp(file.data)
            .jpeg({ quality: parseInt(quality) })
            .toFile(join(outputFolder, outputName))
            .then((data) => {
              arrayUrls.push([outputName, data.size]);
            });
        } else {
          const image = await sharp(file.data)
            .png({ quality: parseInt(quality) })
            .toFile(join(outputFolder, outputName))
            .then((data) => {
              arrayUrls.push([outputName, data.size]);
            });
        }
      }

      return res.status(200).json(arrayUrls);
    } else if (files) {
      if (!files.mimetype.includes("image/")) {
        return res
          .status(415)
          .json({ message: "unsuported type", status: 415 });
      }
      const outputName = files.name.replace(/[^.]+$/, format);
      if (format == "jpeg") {
        const image = await sharp(files.data)
          .jpeg({ quality: parseInt(quality) })
          .toFile(join(outputFolder, outputName))
          .then((data) => {
            return res.status(200).json([outputName, data.size]);
          });
      } else {
        const image = await sharp(files.data)
          .png({ quality: parseInt(quality) })
          .toFile(join(outputFolder, outputName))
          .then((data) => {
            return res.status(200).json([outputName, data.size]);
          });
      }
    } else {
      res.status(206).send({ message: "sin archivos" });
    }
  } catch (err) {
    console.log(err);
  }
};
