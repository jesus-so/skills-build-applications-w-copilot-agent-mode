/**
 * Seed the octofit_db database with test data
 *
 * Run with: `npm run seed` from the backend folder
 */
import mongoose from 'mongoose';
import User from '../models/user.model';
import Team from '../models/team.model';
import Activity from '../models/activity.model';
import Workout from '../models/workout.model';
import Leaderboard from '../models/leaderboard.model';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for seeding');

  // Clear existing
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ]);

  // Create users
  const users = await User.create([
    { name: 'Alice Runner', email: 'alice@example.com' },
    { name: 'Bob Cyclist', email: 'bob@example.com' },
    { name: 'Carol Swimmer', email: 'carol@example.com' }
  ]);

  // Teams
  const team = await Team.create({ name: 'Team Velocity', members: [users[0]._id, users[1]._id] });

  // Activities
  await Activity.create([
    { user: users[0]._id, type: 'run', distanceKm: 5.2, durationMin: 28 },
    { user: users[1]._id, type: 'bike', distanceKm: 20.5, durationMin: 55 },
    { user: users[2]._id, type: 'swim', distanceKm: 1.2, durationMin: 35 }
  ]);

  // Workouts
  const workouts = await Workout.create([
    { title: 'Quick HIIT', description: '20-minute interval', durationMin: 20, difficulty: 'hard' },
    { title: 'Endurance Ride', description: '60-minute steady ride', durationMin: 60, difficulty: 'medium' }
  ]);

  // Leaderboard
  await Leaderboard.create([
    { user: users[0]._id, score: 1500, rank: 1 },
    { user: users[1]._id, score: 1200, rank: 2 },
    { user: users[2]._id, score: 900, rank: 3 }
  ]);

  // Associate team to user
  users[0].team = team._id;
  users[1].team = team._id;
  await users[0].save();
  await users[1].save();

  console.log('Seed data created');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
