import { sequelize } from '../models/index'
import { Op } from 'sequelize';

export default class RemindChecker {
	constructor(client, { checkRate = 5 * 60 * 1000 } = {}) {
        this.checkRate = checkRate;
        this.client = client
        this.queued = new Map()
	}

    async add(remind) {
        await sequelize.models.reminders.create({
            guildID: remind.guildID,
            channelID: remind.channelID,
            userID: remind.userID,
            reference: remind.reference,
            content: remind.content,
            startAt: remind.startAt,
            endAt: remind.endAt,
        })

        console.log(remind)
        if ((remind.endAt ? remind.endAt : 0) < Date.now() + this.checkRate) this.continue(remind);
    }

	async finish(remind) {
        // const guild = this.client.guilds.cache.get(remind.guildID)
        // const channel = guild.channels.cache.get(remind.channelID)
        const user = this.client.users.cache.get(remind.userID)

        try {
            user.send(remind.content)
        } catch (err) {
            return // channel.send(remind.content)
        }

		const schedule = this.queued.get(remind.id);
		if (schedule) {
            this.client.clearTimeout(schedule);
            return this.queued.delete(remind.id);
        }

        await sequelize.models.reminders.destroy({
            where: {
                [Op.and]: [{ id: remind.id }, { userID: remind.userID }]
            }
        })
	}

	async forget(remind) {
		const schedule = this.queued.get(remind.id);
		if (schedule) this.client.clearTimeout(schedule);
		this.queued.delete(remind.id);

        await sequelize.models.reminders.destroy({
            where: {
                [Op.and]: [{ id: remind.id }, { userID: remind.userID }]
            }
        })
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