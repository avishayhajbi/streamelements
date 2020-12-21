const { spawn } = require('child_process');
import {IMessage} from '../models/message';
import redis, {REDIS_KEYS} from './/redis';

function fetch(ls) {
    ls.stdout.on('data', (data) => {
        const info = data.toString().replace(/\n\n/g, '')
            .split('event: privmsg\ndata: ')
            .map(v => {
                try {
                    JSON.parse(v);
                    return v;
                } catch (e) {
                    return null;
                }
            }).filter(v => v);
        console.log(info.length, 'new items');
        redis.set(REDIS_KEYS.CURRENT_LENGTH, info.length);
        redis.lpush(REDIS_KEYS.LIST, ...info);
    });

    ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        setTimeout(start,1000);
    });
}

setInterval(() => {
    try {
        redis.lpop(REDIS_KEYS.LIST, (err, result) => {
            if (result) {
                redis.publish(REDIS_KEYS.LIST, result)
            }
        });
    }catch (e) {
        
    }
}, 1000)

export default function start() {
    const ls = spawn('curl', ['-s', 'https://interview-proxy.streamelements.com']);
    fetch(ls);
}

start();
