import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { CLRS, MESSAGES, flatten } from '../../utils/constants'
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
                    flag: ['--level=', '-lvl='],
                    default: 'all'
                }
            ]
        })
    }

    async exec(message, { hero, level }) {
        let result = await PGSQL.HERO.SIGNATURE(hero)
        result = flatten(result)

        const siEmbed = new MessageEmbed()
        .setAuthor(`${hero}  |  ${result.si_item}`)
        .setDescription(`*${result.si_desc}*`)
        .addField(`${level !== '0' ? `+${level} Unlock` : 'Unlock'}  |  ${result.si_skill}`, result[`si_lv${level}`])
        .setColor(CLRS[level])

        if (level === 'all') {
            siEmbed.fields = []
            siEmbed
                .addField('Unlock', result.si_lv0)
                .addField('+10 Unlock', result.si_lv10)
                .addField('+20 Unlock', result.si_lv20)
                .addField('+30 Unlock', result.si_lv30)
                .setColor(CLRS.DEFAULT)
        }

        return message.util.send(siEmbed)
    }
}