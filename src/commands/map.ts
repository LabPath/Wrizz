import fetch from 'node-fetch';
import { Command } from 'discord-akairo';
import { Temporal } from 'proposal-temporal'
import { MessageEmbed, Message } from 'discord.js';
import { Listing, Post } from '../utils/interfaces';
import { cmd, LONG_DATE_FORMAT } from '../utils/Constants';

export default class Map extends Command {
    public constructor() {
        super('map', {
            aliases: ['map'],
            description: {
                content: cmd.map.description,
                options: [
                    {
                        flag: '-d=, --date=',
                        description: cmd.map.options.date
                    },
                    {
                        flag: '--dismal',
                        description: cmd.map.options.mode
                    }
                ],
                usage: '[--dismal] [-d=, --date=]',
                examples: [
                    '--dismal', 
                    '--dismal --date=2020-12-04', 
                    '--date=2020-01-27', 
                    '-d=2019-09-05'
                ]
            },
            args: [
                {
                    id: 'date',
                    type: 'string',
                    match: 'option',
                    flag: ['--date=', '-d=']
                },
                {
                    id: 'dismal',
                    type: 'string',
                    match: 'flag',
                    flag: '--dismal'
                }
            ]
        });
    }

    public async exec(message: Message, { date, dismal }: { date: any, dismal: boolean }) {
        const mode = dismal ? 'Dismal Maze' : 'Arcane Labyrinth'
        date ? date = Temporal.PlainDate.from(date) : null

        if (!date) {
            const { data }: Listing<Post> = await this.fetch(`${process.env.REDDIT_URL}/new.json?limit=2`)

            if (data) {
                const [map] = data.children.filter(({ data }) => {
                    return data.title.match(dismal ? /Dismal Maze/i : /Lab Path/i)
                })

                return message.util?.send(this.embed(map, mode));
            }

            return message.util?.send(cmd.map.err_fetch);
        }

        const files: File[] = await this.fetch(`${process.env.GITHUB_URL}/${mode.split(' ').join('')}/${this.url(date)}`)
        const [file] = files?.filter((file) => file.name.includes(date))

        if (!files || !file) {
            return message.util?.send(cmd.map.err_map(date));
        }

        const [id] = file.name.match(/(?<=#).+(?=\.png)/)
        const [{ data }]: Listing<Post>[] = await this.fetch(`${process.env.REDDIT_URL}/comments/${id}.json`)

        if (data) {
            return message.util?.send(this.embed(data.children[0], mode))
        }

        return message.util?.send(cmd.map.err_map(id));
    }

    private embed({ data }: Post, mode: string): MessageEmbed {
        const nano = Temporal.Instant.fromEpochSeconds(data.created_utc).epochNanoseconds
        const time = new Temporal.ZonedDateTime(nano, 'America/New_York')

        const formatted = time.add({ days: 1 }).toLocaleString('en-US', LONG_DATE_FORMAT)

        return new MessageEmbed()
            .setTitle(`${mode} – ${formatted}`)
            .setURL(`https://reddit.com/${data.permalink}`)
            .setImage(data.url)
            .setFooter(`Posted by u/${data.author}`)
            .setTimestamp(time.toInstant().epochMilliseconds)
            .setColor(0xFF5700);
    }

    private async fetch(url: string): Promise<any> {
        return (await fetch(url)).json()
    }

    private url(date: Temporal.PlainDate): string {
        return `${date.year}/${date.month}_${date.toLocaleString('en-US', { month: 'long' })}`
    }
}
