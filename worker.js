const { Worker } = require('bullmq')

const IORedis = require("ioredis");

const connection = new IORedis({
    // host: "127.0.0.1",
    // port: 6379,
    maxRetriesPerRequest: null,
});

const sendEmail = () => new Promise((res, rej) => setTimeout(() => res(), 5 * 1000));

const worker = new Worker('email-queue', async (job) => {
    console.log(`I got a msg with id: ${job.id}`);
    console.log('Processing msg');
    console.log('Sending email to: ', job.data.email);

    await sendEmail();
    console.log('Email Sent Successfully');
}, {
    connection,
});

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed:`, err);
});