import fetch from 'node-fetch';
import { Command } from 'discord-akairo';
import moment, { Moment } from 'moment-timezone';
import { MessageEmbed, Message } from 'discord.js';
import { Listing, Post } from '../utils/interfaces';
import { cmd, dateRegex, months } from '../utils/Constants';

export default class Map extends Command {
    public constructor() {
        super('map', {
            aliases: ['map'],
            description: {
                content: cmd.map.description,
                options: [
                    {
                        flags: '[-d=, --date=]',
                        description: cmd.map.options
                    }
                ],
                usage: '[-d=, --date=]',
                examples: ['map', '--date=2020-01-27', '-d=2019-09-05']
            },
            args: [
                {
                    id: 'date',
                    type: (_, phrase: string) => {
                        const match = phrase.match(dateRegex)?.[0]
                        const date = moment(match)

                        if (!match || !date.isValid()) return null
                        return date
                    },
                    match: 'option',
                    flag: ['--date=', '-d=']
                }
            ]
        });
    }

    public async exec(message: Message, { date }: { date: Moment }) {
        const formatted = date?.format('YYYY-MM-DD')

        if (!date) {
            try {
                const { data }: Listing<Post> = await (await fetch(`${process.env.REDDIT_URL}/new.json?limit=1`)).json()

                return message.util?.send(this.embed(data.children[0]));
            } catch (err) {
                return message.util?.send(cmd.map.err_fetch);
            }
        }

        const files: File[] = await (await fetch(`${process.env.GITHUB_URL}/${date.year()}/${months[date.month()]}`)).json()
        const file = files?.filter((file) => file.name.includes(formatted))[0]

        if (!files || !file) {
            return message.util?.send(cmd.map.err_map(formatted));
        }

        const id = file.name.match(/(?<=#).+(?=\.png)/)[0]
        const [{ data }]: Listing<Post>[] = await (await fetch(`${process.env.REDDIT_URL}/comments/${id}.json`)).json()

        if (data) {
            return message.util?.send(this.embed(data.children[0]))
        }

        return message.util?.send(cmd.map.err_map(id));
    }

    private embed({ data }: Post): MessageEmbed {
        const time = moment.tz(data.created_utc * 1000, 'America/New_York');

        const embed = new MessageEmbed()
            .setTitle(time.add(1, 'd').format('MMMM DD, YYYY'))
            .setURL(`https://reddit.com/${data.permalink}`)
            .setImage(data.url)
            .setFooter(`Posted by u/${data.author}`)
            .setTimestamp(data.created_utc * 1000)
            .setColor(0xFF5700);

        return embed
    }
}
