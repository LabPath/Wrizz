import { Command, Flag } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';

export default class Tag extends Command {
	constructor() {
		super('tag', {
			aliases: ['tag'],
			description: {
				content: MESSAGES.COMMANDS.TAGS.DESCRIPTION,
				usage: '<method> <arguments>',
				examples: [
                    'add foo bar',
                    'alias --add foo fu',
                    'alias --del foo fee',
                    'delete foo',
                    'edit foo baz',
                    'search foo'
                ]
			},
			category: 'tag',
		});
	}

	*args() {
		const method = yield {
			type: [
                ['tag-add', 'add', 'create'],
                ['tag-alias', 'alias', 'pseudo'],
                ['tag-delete', 'delete', 'del', 'remove'],
                ['tag-edit', 'edit', 'modify'],
                ['tag-search', 'search', 'find'],
                ['tag-show', 'show', 'display', 'view']
			],
			otherwise: message => {
                const prefix = this.handler.prefix(message)
                return MESSAGES.COMMANDS.TAGS.INFO(prefix)
            }
		};

		return Flag.continue(method);
	}
}