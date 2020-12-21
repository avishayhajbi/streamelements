import mongoose from 'mongoose';
const MessageSchema = mongoose.model('Message');
const WordSchema = mongoose.model('Word');
const ChannelSchema = mongoose.model('Channel');
const ChatterSchema = mongoose.model('Chatter');
import redis, {client2, REDIS_KEYS} from '../utils/redis';

const updateWords = (data) => {
    data.body.split(' ').forEach((word) => {
        WordSchema.findOneAndUpdate({word},
            // @ts-ignore
            {$inc : {count : 1}}, {upsert: true}).exec()
            .catch((err) => {
                console.error(err);
            });
    })
    return data;
}
const updateChatters = (data) => {
    ChannelSchema.findOneAndUpdate({channel: data.room},
        // @ts-ignore
        {$inc : {count : 1}}, {upsert: true}).exec()
        .catch((err) => {
            console.error(err);
        });
    return data;
}
const updateChannels = (data) => {
    ChatterSchema.findOneAndUpdate({chatter: data.nick},
        // @ts-ignore
        {$inc : {count : 1}}, {upsert: true}).exec()
        .catch((err) => {
            console.error(err);
        });
    return data;
}


redis.on("message",(channel, message) => {
    hasMewEvent(JSON.parse(message));
})

redis.subscribe(REDIS_KEYS.LIST);


function hasMewEvent(data) {
    MessageSchema.create(data)
        .then((results) => {
            updateWords(data);
            updateChatters(data);
            updateChannels(data);
        })
        .catch((err) => {
            console.error(err);
        });
}


export const getStats = async (req, res) => {
    client2.get(REDIS_KEYS.CURRENT_LENGTH, (err, result)=> {
        return res.json({count: result || 0});
    })
}
export const getWords = async (req, res) => {
    const data = await WordSchema.find().select('word count -_id').sort({count: -1}).limit(10).exec();
    res.json(data);
}
export const getChatters = async (req, res) => {
    const data = await ChatterSchema.find().select('chatter count -_id').sort({count: -1}).limit(10).exec();
    res.json(data);
}
export const getChannels = async (req, res) => {
    const data = await ChannelSchema.find().select('channel count -_id').sort({count: -1}).limit(10).exec();
    res.json(data);
}
