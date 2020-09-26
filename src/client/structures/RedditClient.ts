import { MessageEmbed } from 'discord.js';
import { AkairoClient } from 'discord-akairo';
import moment from 'moment-timezone';
import request from 'request';
import { TextChannel } from 'discord.js';

let date = Math.floor(Date.now() / 1000);

const fetch = async (): Promise<any> => {
    return new Promise((resolve) => {
        try {
            request(
                {
                    url: `https://reddit.com/r/voidworldproblems/new.json?limit=1`,
                    json: true
                },
                async (err: string, res: any, body: any) => {
                    if (!res) res = { statusCode: 404 };
                    if (res.statusCode === 200) {
                        const posts = [];

                        for await (const post of body.data.children.reverse()) {
                            if (date <= post.data.created_utc) {
                                date = post.data.created_utc;

                                if (post.data.thumbnail === 'self') return;
                                posts.push(post.data);
                            }
                        }

                        if (posts.length === 0) return resolve([]);
                        ++date;
                        return resolve(posts);
                    }
                }
            );
        } catch (err) {
            resolve([]);
            throw new Error(err.stack);
        }
    });
};

export default class RedditClient {
    client: AkairoClient;

    constructor(client: AkairoClient) {
        this.client = client;
    }

    async init() {
        setInterval(async () => {
            const data = await fetch();
            if (data.length !== 0) {
                this.post(data);
            }
        }, 3000);
    }

    post(data: Array<object>) {
        const guild = this.client.guilds.cache.get(process.env.GUILD_ID);
        const channel = guild.channels.cache.get(process.env.CHANNEL_ID) as TextChannel;
        const role = guild.roles.cache.get('725477327215132693');

        channel.send(role ? role : '', this.embed(data[0], false));
    }

    embed(post: any, cmd: boolean) {
        const time = moment.tz(post.created_utc * 1000, 'America/New_York');
        const embed = new MessageEmbed();

        if (!cmd) embed.setTitle(`${time.add(1, 'd').format('MMMM DD, YYYY')}`);

        embed
            .setURL(`https://reddit.com/${post.permalink}`)
            .setImage(post.url)
            .setFooter(`Posted by u/${post.author} | ${time.format('h:mm:ss A')}`)
            .setColor('FF5700');

        return embed;
    }
}
