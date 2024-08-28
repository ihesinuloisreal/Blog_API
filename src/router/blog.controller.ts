import { Request, Response } from "express";

export async function httpGetBlog(req:Request, res:Response){
    // Send a response to the client
    res.send('Hello, World!');
}

export async function httpGetById(){
    
}

export async function httpPostBlog(req:Request, res:Response){

}
