import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IWord {
    readonly word: string;
    readonly count: number;
}
const WordSchema = new Schema({
    word: String,
    count: { type: Number, default: 1 },
});

WordSchema.index({count: 1});
WordSchema.index({word: 1});
mongoose.model('Word', WordSchema);
