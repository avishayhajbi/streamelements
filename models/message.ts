import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IMessage {
    readonly room: string;
    readonly nick: string;
    readonly body: string;
    readonly Tags: string;
    readonly date: number;
}
const MessageSchema = new Schema({
    room: String,
    nick: String,
    body: String,
    Tags: String,
    date: { type: Date, default: Date.now },
});

MessageSchema.index({date: 1});
MessageSchema.index({room: 1});
MessageSchema.index({nick: 1});
mongoose.model('Message', MessageSchema);
