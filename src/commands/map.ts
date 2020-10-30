import { cmd } from '../utils/Constants';
import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import moment from 'moment-timezone';
import readdirp from 'readdirp'
import fetch from 'node-fetch';

export default class Map extends Command {
    public constructor() {
        super('map', {
            aliases: ['map'],
            description: {
                content: cmd.map.description,
                usage: '[-d=, --date=]',
                examples: ['--date=2020-01-27', '-d=2019-9-5', '--date=4-12-20']
            },
            args: [
                {
                    id: 'date',
                    type: 'string',
                    match: 'option',
                    flag: ['--date=', '-d=']
                }
            ]
        });
    }

    public async exec(message: Message, { date }) {
        if (!date) {
            try {
                const { data } = await (await fetch('https://www.reddit.com/r/Lab_path/hot.json?limit=1')).json()

                return message.util?.send(this.embed(data.children[0].data));
            } catch (err) {
                return message.util?.send(cmd.map.err_fetch);
            }
        }

        date = new Date(date).toISOString();

        const dir = readdirp(`${__dirname}/../../Lab Path`, {
            fileFilter: `*${date.split('T')[0]}*.png`
        })

        for await (const file of dir) {
            const embed = new MessageEmbed()
                .attachFiles([file.fullPath])
                .setTitle(moment(date).format('MMMM DD, YYYY'))
                .setImage(`attachment://${file.basename.replace(/<|>|#/g, '')}`)
                .setColor(0xFF5700);

            return message.util?.send(embed);
        }

        return message.util?.send(cmd.map.err_map(date.split('T')[0]));
    }

    public embed(post: any): MessageEmbed {
        const time = moment.tz(post.created_utc * 1000, 'America/New_York');

        const embed = new MessageEmbed()
            .setTitle(time.add(1, 'd').format('MMMM DD, YYYY'))
            .setURL(`https://reddit.com/${post.permalink}`)
            .setImage(post.url)
            .setFooter(`Posted by u/${post.author}`)
            .setTimestamp(post.created_utc * 1000)
            .setColor(0xFF5700);

        return embed
    }
}
