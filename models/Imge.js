import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  name: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
