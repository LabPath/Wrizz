import { Server } from 'ws'
import { get } from 'superagent'
import cs from 'clean-stack'
import request from 'request'
let date = Math.floor(Date.now() / 1000)

const error = (event, err) => event.emit('error', new Error(err));

const fetch = async sub => {
    return new Promise(resolve => {
        try {
            request({
                url: `https://reddit.com/r/${sub}/new.json?limit=1`,
                json: true
            }, async (err, res, body) => {
                if (!res) res = { statusCode: 404 };
                if (res.statusCode === 200) {
                    const posts = []

                    for await (const post of body.data.children.reverse()) {
                        if (date <= post.data.created_utc) {
                            date = post.data.created_utc;

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
        this.list = new Set()
    };

    async add(sub) {
        const res = await this.get(sub);

        if (!res) return this;
        if (!this.list.has(sub)) this.list.add(sub);

        return this;
    }

    async remove(sub) {
        const res = await this.get(sub);

        if (!res) return this;
        if (this.list.has(sub)) this.list.delete(sub);

        return this;
    }

    async get(sub) {
        const res = await this.isValid(sub);

        if (res !== true) {
            this.events.emit('error', new Error(`The subreddit '${sub}' is invalid`));
            return null;
        };
        return true;
    }

    async isValid(sub) {
        const res = await get(`https://reddit.com/r/${sub}/about.json`).catch(() => null);

        if (!res) return false;
        if (res.status !== 200) return false;
        if (res.body.data.hasOwnProperty('children')) {
            if (res.body.data.children.length === 0) return false;
        }
        return true;
    }

    on(event, listener) {
        this.events.on(event, listener);
        return this.events;
    };

    async start() {
        if (this.list.size === 0) return error(this.events, 'No subreddits added');

        setInterval(async () => {
            this.list.forEach(async sub => {
                if (sub) {
                    const data = await fetch(sub);
                    if (data.length !== 0) {
                        this.events.emit('post', data);
                    }
                };
            });
        }, 3000);
        this.events.emit('ready', null);
    };
};