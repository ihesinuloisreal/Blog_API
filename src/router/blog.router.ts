import express from 'express'
import { httpGetBlog, httpPostBlog, httpGetById, httpUpdatePostBlog } from './blog.controller';

const blogRouter = express.Router();

blogRouter.get('/', httpGetBlog)
blogRouter.get('/:id', httpGetById)
blogRouter.post('/', httpPostBlog)
// blogRouter.get('/update/:id', httpGetById)
blogRouter.put('/update/:id', httpUpdatePostBlog)


export default blogRouter;