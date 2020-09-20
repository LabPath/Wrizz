import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { MESSAGES, c } from '../../utils/constants'

export default class Signature extends Command {
    constructor() {
        super('signature', {
            aliases: ['signature', 'si', 'sig'],
            description: {
                content: MESSAGES.COMMANDS.GAME.SIGNATURE.DESCRIPTION,
                usage: '<hero> [--level=]',
            },
            category: 'game',
            args: [
                {
                    id: 'hero',
                    prompt: {
                        start: message => MESSAGES.COMMANDS.GAME.SIGNATURE.HERO(message.author),
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
        const [exists] = this.client.query.heroType(hero, message)
        if (exists) return

        const embed = new MessageEmbed()
        .setAuthor(`${hero.name}  |  ${hero.si_item}`)
        .setDescription(`*${hero.si_desc}*`)
        .addField(`${level !== '0' ? `+${level} Unlock` : 'Unlock'}  |  ${hero.si_skill}`, hero[`si_lv${level}`])
        .setColor(c[level])

        if (level === 'all') {
            embed.fields = []
            embed
                .addField('Unlock', hero.si_lv0)
                .addField('+10 Unlock', hero.si_lv10)
                .addField('+20 Unlock', hero.si_lv20)
                .addField('+30 Unlock', hero.si_lv30)
                .setColor(c[hero.faction.toLowerCase()])
        }

        return message.util.send(embed)
    }
}