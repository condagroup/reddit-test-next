import mongoose from 'mongoose';

const spaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: String, required: true },
});

const Space = mongoose.model('Space', spaceSchema);

export default Space;
