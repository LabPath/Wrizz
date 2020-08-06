import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';
import { PGSQL } from '../../utils/postgresql';

export default class Alias extends Command {
	constructor() {
		super('tag-alias', {
            aliases: ['alias', 'pseudo'],
			category: 'tag',
			description: {
				content: MESSAGES.COMMANDS.TAGS.ALIAS.DESCRIPTION,
				usage: '<--[add|del]> <name> <alias>',
				examples: ['--add stupid stoopid', '--del stewpid stupid'],
			},
			flags: ['--add', '--del'],
		});
	}

	*args() {
		const tag = yield {
			type: 'tag',
			prompt: {
				start: message => MESSAGES.COMMANDS.TAGS.ALIAS.ADD(message.author),
				retry: (message, { phrase }) => MESSAGES.COMMANDS.TAGS.ALIAS.ERR_EXISTS2(message.author, phrase)},
		};

		const add = yield {
			match: 'flag',
			flag: '--add',
		};

		const del = yield {
			match: 'flag',
			flag: '--del',
		};

		const alias = yield add ? {
            match: 'rest',
            type: 'existingTag',
            prompt: {
                start: message => MESSAGES.COMMANDS.TAGS.ALIAS.NAME(message.author),
                retry: (message, { phrase }) => MESSAGES.COMMANDS.TAGS.ALIAS.ERR_EXISTS(message.author, phrase)
            },
        } : {
            match: 'rest',
            type: 'string',
            prompt: {
                start: message => MESSAGES.COMMANDS.TAGS.ALIAS.DELETE(message.author),
                retry: (message, { phrase }) => MESSAGES.COMMANDS.TAGS.ALIAS.ERR_EXISTS2(message.author, phrase)
            },
        };

		return { tag, alias, add, del };
	}

	async exec(message, { tag, alias, add, del }) {
		if (add) {
			if (alias.length > 32) return message.util.reply(MESSAGES.COMMANDS.TAGS.ALIAS.ERR_LENGTH);
            tag.aliases.push(alias);
		} else if (del) {
            const index = tag.aliases.indexOf(alias);
            tag.aliases.splice(index, 1);
		} else {
			return message.util.reply(MESSAGES.COMMANDS.TAGS.ALIAS.ERR_FLAGS);
        }

		await PGSQL.TAGS.ALIAS(tag)

		return message.util.reply(MESSAGES.COMMANDS.TAGS.ALIAS.SUCCESS(tag.name, alias, add));
	}
}