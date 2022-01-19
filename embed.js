const { MessageEmbed } = require('discord.js');

module.exports = {
	execute(message) {
        return buildEmbed();
	},
};

function buildEmbed(){//Generates the basic embed without any dynamic data
    const embed = new MessageEmbed()
        .setTitle('D&D Attendance')
        .setURL('https://Downcorp.tf')
        .setColor('e45817')
        .setDescription('Click below to confirm attendance \n\n__**Important info**__\nWhere: [**Foundry**](https://Downcorp.tf)')
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/attachments/828386506824482816/830906753360068668/e8e192e5-59bf-428b-a523-03f483548d2b-profile_image-300x300.png')
    
    return embed;

}