import http from 'http';
import app from './app'
import {mongoConnect} from './services/mongo';
import { fetchDummyData } from './model/post.model';
const port = 3000;


const server = http.createServer(app);

const Serve = async() => {
    await mongoConnect();
    await fetchDummyData();
    server.listen(port ,()=>{
        console.log(`Server started on port: ${port}`)
    })
}

Serve();