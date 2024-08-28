import express from 'express'
import { httpGetBlog, httpPostBlog } from './blog.controller';

const blogRouter = express.Router();

blogRouter.get('/', httpGetBlog)
blogRouter.get('/:id', httpGetBlog)
blogRouter.post('/', httpPostBlog)

export default blogRouter;