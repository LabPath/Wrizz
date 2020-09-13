import { sequelize } from '../models/index'
import { MessageEmbed } from 'discord.js'
import { PGSQL } from '../utils/postgresql';
import { MESSAGES, CLRS } from '../utils/constants';

export default class ReminderHandler {
	constructor(client, { checkRate = 10000 } = {}) {
        this.checkRate = checkRate;
        this.client = client
        this.queued = new Map()
	}

    async add(remind) {
        await PGSQL.REMINDERS.ADD(remind)

        if ((remind.end ? remind.end : 0) < Date.now() + this.checkRate) {
            this.continue(remind);
        }
    }

	async finish(remind) {
        setTimeout(async () => { // Timeout bc I'm too lazy to force the cache
            const user = this.client.users.cache.get(remind.author)
            const channel = this.client.channels.cache.get(remind.channel_id)

            const remEmbed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL())
            .setTitle(remind.reference)
            .addField('❯ Content', remind._content)
            .setColor(CLRS.DEFAULT)

            user.send(remEmbed).catch(() => {
                channel.send(MESSAGES.COMMANDS.GENERAL.REMIND.FINISH(user, remind._content))
            })

            const schedule = this.queued.get(remind.id);
            if (schedule) this.client.clearTimeout(schedule);
            this.queued.delete(remind.id);

            await PGSQL.REMINDERS.FINISH(remind.author)
        }, 3000)
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
            }, (remind.end ? remind.end : 0) - Date.now())
        );
	}

	async init() {
        await this.check();
	}

	async check() {
		const reminders = await sequelize.models.reminders.findAll()

		for (const remind of reminders) {
            if (this.queued.has(remind.id)) continue;

			if ((remind._end ? remind._end : 0) < Date.now()) {
                this.finish(remind);
            } else {
                this.continue(remind);
            }
		}
	}
}