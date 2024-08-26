import express from 'express'
import { httpGetBlog } from './blog.controller';

const blogRouter = express.Router();

blogRouter.get('/', httpGetBlog)

export default blogRouter;