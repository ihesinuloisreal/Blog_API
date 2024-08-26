import { Request, Response } from "express";

export function httpGetBlog(req:Request, res:Response){
    // Send a response to the client
    res.send('Hello, TypeScript + Node.js + Express!');
}

