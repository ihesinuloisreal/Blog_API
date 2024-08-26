import express, { json } from "express";
import morgan from "morgan";
import blogRouter from "./router/blog.router";


const app = express();
app.use(json())

app.use(morgan('combined'))
app.use('/blog', blogRouter);

export = app
