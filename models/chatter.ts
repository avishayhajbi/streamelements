import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IChatter {
    readonly chatter: string;
    readonly count: number;
}
const ChatterSchema = new Schema({
    chatter: String,
    count: { type: Number, default: 1 },
});

ChatterSchema.index({count: 1});
ChatterSchema.index({chatter: 1});
mongoose.model('Chatter', ChatterSchema);
