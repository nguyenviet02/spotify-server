import mongoose from 'mongoose';
import 'dotenv/config';

/**
 * Mongoose Connection
 **/
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
  } catch (error) {
    console.error(error);
  }
};

export default connectToDB;
