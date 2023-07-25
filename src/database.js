import { connect } from 'mongoose';

const dbConnect = async () => {
  try {
    const DB_URI = process.env.DB_URI;
    await connect(DB_URI);
    console.log('DB is connected');
  } catch (e) {
    console.log(e);
  }
};

export default dbConnect;
