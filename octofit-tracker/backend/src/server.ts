import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit';
const PORT = Number(process.env.PORT || 8000);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('OctoFit Tracker API');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
