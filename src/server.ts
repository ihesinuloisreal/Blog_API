import http from 'http';
import app from './app'
import {mongoConnect} from './services/mongo';
import { loadDummyData } from './model/post.model';
const port = 3000;


const server = http.createServer(app);

const Serve = async() => {
    await mongoConnect();
    await loadDummyData();
    server.listen(port ,()=>{
        console.log(`Server started on port: ${port}`)
    })
}

Serve();