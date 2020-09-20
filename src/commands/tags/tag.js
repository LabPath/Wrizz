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
                    'delete foo',
                    'edit foo baz',
                    'info foo',
                    'show foo',
                    'search foo'
                ]
			},
			category: 'tag',
		});
	}

	*args() {
		const method = yield {
			type: [
                ['tag-add', 'add'],
                ['tag-delete', 'delete', 'del'],
                ['tag-edit', 'edit', 'modify'],
                ['tag-search', 'search', 'find'],
                ['tag-show', 'show', 'display']
			],
			otherwise: (message) => {
                const prefix = this.handler.prefix(message)
                return MESSAGES.COMMANDS.TAGS.INFO.METHODS(prefix)
            }
		};

		return Flag.continue(method);
	}
}