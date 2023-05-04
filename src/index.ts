import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();
const mongoConnect = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URL as string);
  console.log('Database connection successful');
  return connection;
};

const port = process.env.PORT || 3000;
(async () => {
  try {
    await mongoConnect();
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log('Error', (error as Error).message);
  }
})();
