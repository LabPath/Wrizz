/**
 * @param {Object} message Discord.js Message object
 * @param {Array} pages An array of MessageEmbeds to paginate
 * @param {Array} emojis An array of emojis to use for the nav buttons
 * @param {number} timeout Time in ms until the page becomes static
 */

export default paginate = async (message, pages, emojis = ['◀️', '▶️'], timeout = 120000) => {
	if (!message && !message.channel) throw new Error('Channel is inaccessible.');
	if (!pages) throw new Error('Pages are not given.');
    if (emojis.length !== 2) throw new Error('< 2 emojis provided');
    
    let page = 0;
    
	const msg = await message.channel.send(pages[page].setFooter(`Page ${page + 1} / ${pages.length}`));
    for (const emoji of emojis) await msg.react(emoji);
    
    const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && !user.bot
    const reactionCollector = msg.createReactionCollector(filter, { time: timeout });
    
	reactionCollector.on('collect', reaction => {
        reaction.users.remove(message.author);
        
		if (reaction.emoji.name = emojis[0]) {
                page = page > 0 ? --page : pages.length - 1;
        } else if (reaction.emoji.name === emojis[1]) {
                page = page + 1 < pages.length ? ++page : 0;
        }
		msg.edit(pages[page].setFooter(`Page ${page + 1} / ${pages.length}`));
    });
    
	reactionCollector.on('end', () => msg.reactions.removeAll());
	return msg;
};