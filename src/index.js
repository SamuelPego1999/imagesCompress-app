import express, { json, urlencoded } from "express"
import {dirname, join} from "path"
import { fileURLToPath } from "url";
import nunjucks from "nunjucks";
import fileUpload from "express-fileupload";
import { routerGet } from "./routers/routerGet.js";
import { routerPost } from "./routers/routerPost.js";

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(join(__dirname,"public")))
app.use(fileUpload({createParentPath:true}))
app.use(json())
app.use(urlencoded({extended:true}))

nunjucks.configure([join(__dirname,"views"),join(__dirname,"views","partials")],{
    autoescape:true,
    express:app
})
app.use(routerGet)
app.use(routerPost)



app.listen(3000,()=> {
    console.log("app listen on port 3000" )
}) 