const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Mongo successfully');
  } catch (error) {
    console.error('Error connecting to Mongo:', error.message);
  }
};

module.exports = connectToMongo;
