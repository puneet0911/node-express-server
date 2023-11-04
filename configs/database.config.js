require('dotenv').config()
let mongoose = require('mongoose');

// These details will be required to connect mongoDB which is hosted in sever
const username = process.env.MONGODB_USERNAME; // REPLACE WITH YOUR Cluster Username
const password = process.env.MONGODB_PASSWORD; // REPLACE WITH YOUR Cluster Password
const cluster = process.env.MONGODB_CLUSTER; // REPLACE WITH YOUR Cluster NAme
const dbname = process.env.MONGODB_DB; // REPLACE WITH YOUR DB NAME

  const connectDB = async () => {
    try {
      await mongoose
        .connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}`,{
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log('Database connection successful');
        })
        .catch((err) => {
          console.log(" err ",err)
          console.error('Database connection error');
        });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

module.exports = connectDB;