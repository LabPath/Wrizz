  
import { Inhibitor } from 'discord-akairo';

export default class ModFeatures extends Inhibitor {
	constructor() {
		super('modFeatures', {
			reason: 'modFeatures',
		});
	}

	exec(message) {
		if (message.util.parsed.command.categoryID !== 'mod') {
			return false;
        }
        
		if (!this.client.settings.get(message.guild, 'modFeatures')) {
			return true;
        }
        
		return false;
	}
}