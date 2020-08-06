import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { COLORS, MESSAGES, FUNCTIONS } from '../../utils/constants'
import { PGSQL } from '../../utils/postgresql'

export default class Furniture extends Command {
    constructor() {
        super('furniture', {
            aliases: ['furniture', 'fn'],
            description: {
                content: MESSAGES.COMMANDS.GAME.FURNITURE.DESCRIPTION,
                usage: '<hero>',
            },
            category: 'game',
            args: [
                {
                    id: 'hero',
                    type: 'hero',
                    prompt: {
                        start: message => MESSAGES.COMMANDS.GAME.FURNITURE.HERO(message.author),
                        retry: (message, { phrase }) => MESSAGES.COMMANDS.GAME.FURNITURE.ERR_EXISTS(message.author, phrase)
                    }
                },
            ]
        })
    }

    async exec(message, { hero }) {
        const result = await PGSQL.HERO.FURNITURE(hero)
        
        const fnEmbed = new MessageEmbed()
        .setAuthor(`${hero}  |  ${FUNCTIONS.FLATTEN(result, 'fn.ability')}`)
        .addField('3/3 Mythic Furniture', FUNCTIONS.FLATTEN(result, 'fn.lv3'))
        .addField('9/9 Mythic Furniture', FUNCTIONS.FLATTEN(result, 'fn.lv9'))
        .setColor(COLORS.DEFAULT)

        return message.util.send(fnEmbed)
    }
}