import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();
const MONGO_URL: string= process.env.MONGO_URL || "";

mongoose.connection.once('open', () => {
console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
console.error(err);
});

async function mongoConnect() {
await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
await mongoose.disconnect();
}

export {mongoConnect, mongoDisconnect};