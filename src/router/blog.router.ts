import express from 'express'
import { 
    httpGetBlog, 
    httpPostBlog, 
    httpGetById, 
    httpUpdatePostBlog, 
    httpDeletePost,
    httpGetByTag
} from './blog.controller';

const blogRouter = express.Router();

blogRouter.get('/', httpGetBlog)
blogRouter.get('/:id', httpGetById)
blogRouter.post('/', httpPostBlog)
blogRouter.put('/update/:id', httpUpdatePostBlog)
blogRouter.get('/delete/:id', httpDeletePost)
blogRouter.get('/fetch/:tag', httpGetByTag)



export default blogRouter;