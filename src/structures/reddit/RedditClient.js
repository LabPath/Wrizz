import { Server } from 'ws'
import cs from 'clean-stack'
import request from 'request'
let date = Math.floor(Date.now() / 1000)

const fetch = async () => {
    return new Promise(resolve => {
        try {
            request({
                url: `https://reddit.com/r/Lab_path/new.json?limit=1`,
                json: true
            }, async (err, res, body) => {
                if (!res) res = { statusCode: 404 };
                if (res.statusCode === 200) {
                    const posts = []

                    for await (const post of body.data.children.reverse()) {
                        if (date <= post.data.created_utc) {
                            date = post.data.created_utc;

                            if (post.data.thumbnail === 'self') return
                            posts.push(post.data)
                        }
                    };

                    if (posts.length === 0) return resolve([]);
                    ++date;
                    return resolve(posts);
                };
            });
        } catch (err) {
            resolve([])
            throw new Error(cs(err.stack))
        }
    })
};

export default class RedditClient {
    constructor() {
        this.events = new Server({ port: 1034 });
    };

    on(event, listener) {
        this.events.on(event, listener);
        return this.events;
    };

    async start() {
        setInterval(async () => {
            const data = await fetch();
            if (data.length !== 0) {
                this.events.emit('post', data);
            }
        }, 3000);
        this.events.emit('ready', null);
    };
};