const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URI || 'redis://127.0.0.1:6379');
export const client2 = redis.createClient(process.env.REDIS_URI || 'redis://127.0.0.1:6379');
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

client.on("connect", function() {
    console.log('redis connected')
});
client.on("error", function(error) {
    console.error(error);
});

export enum REDIS_KEYS {
    CURRENT_LENGTH= 'currentLength',
    LIST= 'list',
}

export default client;
