import { get } from 'superagent'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { COLORS, MESSAGES } from '../../utils/constants'
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
                examples: ['--date=2020-01-25', '--date=Feb 11', '--date=Apr 06 2020']
            },
            category: 'game',
            args: [
                {
                    id: 'date',
                    type: 'string',
                    match: 'option',
                    flag: '--date=',
                },
            ]
        })
    }

    async exec(message, { date }) {
        if (!date) {
            try {
                const { body } = await get('https://www.reddit.com/r/Lab_path/new.json?sort=new').query({ limit: 1 });
                return message.util.send(new RedditEmbed({ post: body.data.children[0].data, title: 'Arcane Labyrinth' }));
            } catch (err) {
                return message.util.send(MESSAGES.COMMANDS.GAME.MAP.ERR_FETCH)
            }
        }

        if (moment(date).isValid()) {
            date = moment(date).format('YYYY-MM-DD')
            glob(`./LabPath Maps/All/*${date}*.png`, (err, file) => {
                if (file.length) {
                    const img = file.toString().split('/').pop().replace(/<|>|#/g, '')

                    const mapEmbed = new MessageEmbed()
                    .attachFiles(file)
                    .setTitle(`Arcane Labyrinth  |  ${moment(date).format('MMMM DD, YYYY')}`)
                    .setImage(`attachment://${img}`)
                    .setColor(COLORS.REDDIT)

                    return message.util.send(mapEmbed)
                }
                return message.util.reply(MESSAGES.COMMANDS.GAME.MAP.ERR_NO_MAP(date))
            })
        } else {
            return message.util.send(MESSAGES.COMMANDS.GAME.MAP.ERR_DATE(date))
        }
    }
}