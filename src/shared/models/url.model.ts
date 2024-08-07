import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
});

const Url = mongoose.model('Url', urlSchema);
export default Url;
