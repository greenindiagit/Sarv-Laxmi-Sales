import mongoose from 'mongoose';

// 🔁 Your MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/sarvlaxmiDB'; // <-- change this

// 🧱 Connect and drop unique indexes
async function dropUniqueIndexes() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    const collection = mongoose.connection.collection('quatations'); // <- use the correct collection name

    const indexes = await collection.indexes();
    console.log('📋 Existing Indexes:', indexes);

    for (const index of indexes) {
      if (index.unique && index.name !== '_id_') {
        console.log(`🗑️ Dropping unique index: ${index.name}`);
        await collection.dropIndex(index.name);
      }
    }

    console.log('✅ All unique indexes removed (except _id)');
    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error dropping indexes:', err.message);
    process.exit(1);
  }
}

dropUniqueIndexes();
