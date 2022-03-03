import mongoose from 'mongoose';

const connectDB = (url) => {
    console.log('Connecting to MongoDBAtlas');
    return mongoose.connect(url);
}

export default connectDB;