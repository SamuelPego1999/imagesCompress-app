import express from "express"
import { compressZipController } from "../controllers/compressZipController.js";
import { compressedFilesPath } from "../../config.js";

export const routerGet = express.Router();

routerGet.get("/",(req,res)=>{ 
    res.render("index.njk")
})

routerGet.get("/getAllCompressed",compressZipController)

routerGet.get("/images.zip",(req,res)=> {
    const path = compressedFilesPath;
    res.download(path + "/images.zip")
})