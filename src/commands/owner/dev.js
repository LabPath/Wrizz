import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js';
import moment from 'moment'
import { sequelize } from '../../models';
import fs from 'fs'

export default class Dev extends Command {
    constructor() {
        super('dev', {
            aliases: ['dev'],
            category: 'owner',
            ownerOnly: true
        })
    }

    async exec(message) {

    }
}