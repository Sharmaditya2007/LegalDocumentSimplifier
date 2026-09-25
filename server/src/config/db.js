const mongoose = require('mongoose');
const dns = require('dns');

// Configure reliable DNS servers to resolve MongoDB Atlas SRV records on all networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore if already set or in restricted environment
}

let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI || mongoURI.trim() === '') {
    console.log('ℹ️  MongoDB URI not set: using zero-config persistent local store.');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 8000,
    });
    isConnected = true;
    console.log(`=======================================================`);
    console.log(`✅  MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`=======================================================`);

    // Sync in-memory / local store with MongoDB Atlas collections
    const localStore = require('../data/localStore');
    await localStore.syncWithMongo();

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
