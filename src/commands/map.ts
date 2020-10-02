import { get } from 'superagent';
import { cmd } from '../utils/Constants';
import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import RedditClient from '../client/structures/RedditClient';
import moment from 'moment';
import glob from 'glob';

export default class Map extends Command {
    constructor() {
        super('map', {
            aliases: ['map'],
            description: {
                content: cmd.map.description,
                usage: '[--date=YYYY-MM-DD]',
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

    async exec(message: Message, { date }) {
        if (!date) {
            try {
                const { body } = await get('https://www.reddit.com/r/Lab_path/new.json?sort=new').query({
                    limit: 1
                });
                return message.util?.send(
                    new RedditClient(this.client).embed(body.data.children[0].data, false)
                );
            } catch (err) {
                return message.util?.reply(cmd.map.err_fetch);
            }
        }

        date = new Date(date).toISOString();

        glob(`./Lab Path/Maps/All/*${date.split('T')[0]}*.png`, (err, files) => {
            let file: any;

            if (files.length) {
                files.length > 1 ? (file = files[0]) : file;

                const img = file.toString().split('/').pop().replace(/<|>|#/g, '');

                const embed = new MessageEmbed()
                    .attachFiles(file)
                    .setTitle(`${moment(date).format('MMMM DD, YYYY')}`)
                    .setImage(`attachment://${img}`)
                    .setColor('FF5700');

                return message.util?.send(embed);
            }
            return message.util?.reply(cmd.map.err_map(date.split('T')[0]));
        });
    }
}
