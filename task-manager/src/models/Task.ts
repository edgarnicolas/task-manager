import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  title: string;
  description?: string;
  dueDate?: Date;
  status: 'pending' | 'in progress' | 'completed';
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  status: { type: String, enum: ['pending', 'in progress', 'completed'], required: true }
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

export { ITask };
export default Task;
