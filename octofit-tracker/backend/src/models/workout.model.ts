import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description?: string;
  durationMin: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const WorkoutSchema: Schema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String },
  durationMin: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
