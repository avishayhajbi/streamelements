import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IChannel {
    readonly channel: string;
    readonly count: number;
}
const ChannelSchema = new Schema({
    channel: String,
    count: { type: Number, default: 1 },
});

ChannelSchema.index({count: 1});
ChannelSchema.index({channel: 1});
mongoose.model('Channel', ChannelSchema);
