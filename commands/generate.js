const embed = require('../embed.js')
const { MessageActionRow, MessageButton } = require('discord.js');
const interactionHandler = require('../interactionHandler.js');
const { DateTime } = require("luxon");
// const channelid = "739318167981129779";
const channelid = "159806157295321088"; //Dev channel

module.exports = {
	name: 'generate',
	description: 'Generate attendance marker',
	execute(message, args) {
        if(message.author.id !== "121328457136340992") return
        let channel = message.guild.channels.cache.get(channelid);
        let embedObject = embed.execute();
        let dt = DateTime.fromISO(args[0]);

        embedObject.description += `\nWhen: **${dt.toLocaleString(DateTime.DATE_HUGE)}**`
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('yes')
					.setStyle('SUCCESS')
                    .setEmoji('849413470671732747'),
                new MessageButton()
                    .setCustomId('maybe')
                    .setLabel('❔')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('no')
                    .setStyle('DANGER')
                    .setEmoji('849413470905827328'),
                
                new MessageButton()
                    .setURL('https://downcorp.tf/')
                    .setLabel('Foundry')
                    .setStyle('LINK'),
			);
        channel.send({ embeds: [embedObject], components: [row] })
            .then(sent => interactionHandler.startCollection(sent, message.client, embedObject))
	},
};

