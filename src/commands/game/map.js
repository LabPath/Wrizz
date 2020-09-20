import { get } from 'superagent'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { MESSAGES } from '../../utils/constants'
import RedditClient from '../../structures/RedditClient'
import moment from 'moment'
import glob from 'glob'

export default class Map extends Command {
    constructor() {
        super('map', {
            aliases: ['map'],
            description: {
                content: MESSAGES.COMMANDS.GAME.MAP.DESCRIPTION,
                usage: '[--date=YYYY-MM-DD]',
                examples: ['--date=2020-01-27', '-d=2019-9-5', '--date=4-12-20']
            },
            category: 'game',
            args: [
                {
                    id: 'date',
                    type: 'string',
                    match: 'option',
                    flag: ['--date=', '-d=']
                },
            ]
        })
    }

    async exec(message, { date }) {
        const r = new RedditClient()

        if (!date) {
            try {
                const { body } = await get('https://www.reddit.com/r/Lab_path/new.json?sort=new').query({ limit: 1 });
                return message.util.send(r.embed(body.data.children[0].data));
            } catch (err) {
                return message.util.reply(MESSAGES.COMMANDS.GAME.MAP.ERR_FETCH)
            }
        }
        
        date = new Date(date).toISOString()

        glob(`./Lab Path/Maps/All/*${date.split('T')[0]}*.png`, (err, file) => {
            if (file.length) {
                file.length > 1 ? file = file[0] : file

                const img = file.toString().split('/').pop().replace(/<|>|#/g, '')

                const embed = new MessageEmbed()
                .attachFiles(file)
                .setTitle(`${moment(date).format('MMMM DD, YYYY')}`)
                .setImage(`attachment://${img}`)
                .setColor('FF5700')

                return message.util.send(embed)
            }
            return message.util.reply(MESSAGES.COMMANDS.GAME.MAP.ERR_NO_MAP(date.split('T')[0]))
        })
    }
}