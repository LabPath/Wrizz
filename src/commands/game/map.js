import { get } from 'superagent'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { CLRS, MESSAGES } from '../../utils/constants'
import moment from 'moment'
import glob from 'glob'
import RedditEmbed from '../../structures/reddit/RedditEmbed'

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
        if (!date) {
            try {
                const { body } = await get('https://www.reddit.com/r/Lab_path/new.json?sort=new').query({ limit: 1 });
                return message.util.send(new RedditEmbed(body.data.children[0].data, true));
            } catch (err) {
                return message.util.reply(MESSAGES.COMMANDS.GAME.MAP.ERR_FETCH)
            }
        }
        
        date = new Date(date).toISOString()

        glob(`./Lab Path/Maps/All/*${date.split('T')[0]}*.png`, (err, file) => {
            if (file.length) {
                file.length > 1 ? file = file[0] : file

                const img = file.toString().split('/').pop().replace(/<|>|#/g, '')

                const mapEmbed = new MessageEmbed()
                .attachFiles(file)
                .setTitle(`${moment(date).format('MMMM DD, YYYY')}`)
                .setImage(`attachment://${img}`)
                .setColor(CLRS.REDDIT)

                return message.util.send(mapEmbed)
            }
            return message.util.reply(MESSAGES.COMMANDS.GAME.MAP.ERR_NO_MAP(date.split('T')[0]))
        })
    }
}