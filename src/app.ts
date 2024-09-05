import express, { json } from "express";
import morgan from "morgan";
import blogRouter from "./router/blog.router";
import bodyParser from "body-parser";


const app = express();
app.use(json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined'))
app.use('/blog', blogRouter);

export = app
