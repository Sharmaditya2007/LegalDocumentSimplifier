const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI || mongoURI.trim() === '') {
    console.log('ℹ️  MongoDB URI not set: using zero-config persistent local store.');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`=======================================================`);
    console.log(`✅  MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`=======================================================`);
    return true;
  } catch (err) {
    console.warn(`⚠️  MongoDB connection error (${err.message}). Falling back to local store.`);
    isConnected = false;
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = {
  connectDB,
  getIsConnected
};
