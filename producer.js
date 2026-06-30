const { Queue } = require('bullmq');

const IORedis = require("ioredis");
const connection = new IORedis();

const notificationQueue = new Queue('email-queue');

async function init() {
    const res = await notificationQueue.add('email-to-ankit', {
        email: 'ankit@gmail.com',
        subject: 'Welcome msg',
        body: 'Body of the msg',

    }, { connection })
    console.log('Job added to queue: ', res.id);
}

init();