import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  distanceKm?: number;
  durationMin?: number;
  recordedAt: Date;
}

const ActivitySchema: Schema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distanceKm: { type: Number },
  durationMin: { type: Number },
  recordedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
