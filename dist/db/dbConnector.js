import mongoose from 'mongoose';
import 'dotenv/config';
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
    }
    catch (error) {
        console.error('Error while connecting to DB');
    }
};
export default connectToDB;
