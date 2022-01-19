const sql = require('mysql');
const { mysql } = require('./config.json');
const connection = sql.createPool({host:mysql.host, user:mysql.user, password:mysql.password, database:mysql.database, connectionLimit:10});



module.exports = {
    startCollection(message, client, embed){
        let reacted = [];
        message.react("🟢");
        message.react("🔴");
        message.react("🟠");
        // collector = message.createReactionCollector(filter, { dispose: true });
        collector = message.createMessageComponentCollector({ componentType: 'BUTTON' });

        collector.on('collect', (r,u) => collected(r,u,message,collector,embed,reacted));
    }
};

const filter = (reaction) => {
    return (reaction.emoji.name == "🟢" || reaction.emoji.name == "🔴" || reaction.emoji.name == "🟠") && !reaction.me;
}

function collected(reaction, user, message, collector, embed, reacted){
    connection.query(`SELECT * FROM players WHERE discord = ${user.id}`, function (error, results, fields) {
        let r = results[0];
        if(reacted.includes(user.id)){
            let obj = embed.fields.find((o, i)=>{
                if(o.name.includes(r.name)){
                    embed.fields[i] = { name: `${r.img} ${r.name}`, value: reaction.emoji.name, inline:true}
                    message.edit(embed)
                    return
                }
            });
        } else {
            if(error) return
            embed.addField(`${r.img} ${r.name}`, reaction.emoji.name, true)
            reacted.push(user.id);
            message.edit(embed)
        }
    });
}







//TODO: Crash handling - reacquire all reactions when bot has died