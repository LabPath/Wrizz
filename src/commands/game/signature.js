import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { COLORS, MESSAGES, flatten } from '../../utils/constants'
import { PGSQL } from '../../utils/postgresql'

export default class Signature extends Command {
    constructor() {
        super('signature', {
            aliases: ['signature', 'si', 'sig'],
            description: {
                content: MESSAGES.COMMANDS.GAME.SIGNATURE.DESCRIPTION,
                usage: '<hero> [level]',
            },
            category: 'game',
            args: [
                {
                    id: 'hero',
                    type: 'hero',
                    prompt: {
                        start: message => MESSAGES.COMMANDS.GAME.SIGNATURE.HERO(message.author),
                        retry: (message, { phrase }) => MESSAGES.COMMANDS.GAME.SIGNATURE.ERR_EXISTS(message.author, phrase)
                    }
                },
                {
                    id: 'level',
                    type: (_, num) => {
                        if (!num) return null
                        if (!['all', '0', '10', '20', '30'].includes(num)) return null
                        return num
                    },
                    match: 'option',
                    flag: '--level=',
                    default: 'all',
                    prompt: {
                        start: message => MESSAGES.COMMANDS.GAME.SIGNATURE.LEVEL(message.author),
                        retry: (message, { phrase }) => MESSAGES.COMMANDS.GAME.SIGNATURE.ERR_EXISTS2(message.author, phrase)
                    }
                }
            ]
        })
    }

    async exec(message, { hero, level }) {
        const result = await PGSQL.HERO.SIGNATURE(hero)

        const fnEmbed = new MessageEmbed()
        .setAuthor(`${hero}  |  ${flatten(result, 'si_skill')}`)
        .setDescription(`*${flatten(result, 'si_description')}*`)
        .addField(`${level !== '0' ? `+${level} Unlock` : 'Unlock'}`, flatten(result, `si_lv${level}`))
        .setColor(COLORS[level])

        if (level === 'all') {
            fnEmbed.fields = []
            fnEmbed
                .addField('Unlock', flatten(result, 'si_lv0'))
                .addField('+10 Unlock', flatten(result, 'si_lv10'))
                .addField('+20 Unlock', flatten(result, 'si_lv20'))
                .addField('+30 Unlock', flatten(result, 'si_lv30'))
                .setColor(COLORS.DEFAULT)
        }

        return message.util.send(fnEmbed)
    }
}