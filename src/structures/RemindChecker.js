import { sequelize } from '../models/index'
import { MessageEmbed } from 'discord.js'
import { PGSQL } from '../utils/postgresql';
import { MESSAGES, COLORS } from '../utils/constants';

export default class RemindChecker {
	constructor(client, { checkRate = 5 * 60 * 1000 } = {}) {
        this.checkRate = checkRate;
        this.client = client
        this.queued = new Map()
	}

    async add(remind) {
        await PGSQL.REMINDERS.ADD(remind)

        if ((remind.endAt ? remind.endAt : 0) < Date.now() + this.checkRate) this.continue(remind);
    }

	async finish(remind) {
        const user = this.client.users.cache.get(remind.userID)
        const guild = this.client.guilds.cache.get(remind.guildID)
        const channel = guild.channels.cache.get(remind.channelID)

        try {
            const remEmbed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL())
            .setTitle(remind.reference)
            .addField('❯ Content', remind.content)
            .setColor(COLORS.DEFAULT)

            user.send(remEmbed)
        } catch (err) {
            return channel.send(MESSAGES.COMMANDS.GENERAL.REMIND.FINISH(user, remind.content))
        }

		const schedule = this.queued.get(remind.id);
		if (schedule) this.client.clearTimeout(schedule);
        this.queued.delete(remind.id);

        await PGSQL.REMINDERS.FINISH(remind)
	}

	async forget(remind) {
		const schedule = this.queued.get(remind.id);
		if (schedule) this.client.clearTimeout(schedule);
		this.queued.delete(remind.id);

        await PGSQL.REMINDERS.FORGET(remind)
	}

	continue(remind) {
		this.queued.set(remind.id,
			this.client.setTimeout(() => {
				this.finish(remind);
            }, (remind.endAt ? remind.endAt : 0) - Date.now())
        );
	}

	async init() {
        await this.check();
		this.checkInterval = this.client.setInterval(this.check.bind(this), this.checkRate);
	}

	async check() {
		const reminders = await sequelize.models.reminders.findAll()

		for (const reminder of reminders) {
            if (this.queued.has(reminder.id)) continue;

			if ((reminder.endAt ? reminder.endAt : 0) < Date.now()) this.finish(reminder);
			else this.continue(reminder);
		}
	}
}