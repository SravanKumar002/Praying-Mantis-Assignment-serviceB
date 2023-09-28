const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3001 || process.env.PORT;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://sravankumarega002:Sravan123@cluster0.ka0g799.mongodb.net/?retryWrites=true&w=majority");
const db = mongoose.connection;


db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a user profile schema and model
const userProfileSchema = new mongoose.Schema({
  username: String,
  email: String,
  age: Number,
  location: String,
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

app.post('/serviceb', async (req, res) => {
  try {
    const userProfile = req.body;
    const newUserProfile = new UserProfile(userProfile);
    const resp = await newUserProfile.save();
    console.log(resp._id);
    res.send({ userId: resp._id });   
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Service B is running on port ${PORT}`);
});
