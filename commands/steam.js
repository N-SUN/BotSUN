const Discord = require('discord.js');
const fs = require('fs');
const cooldown = new Set();

module.exports.run = async (client, msg, args, config) => {
    if(cooldown.has(msg.author.id)) {
        msg.reply(`:alarm_clock: Vous pourrez regénérer dans ${config.COOLDOWN} minutes.`)
            .then((m) => {
                msg.delete();

                setTimeout(() => {
                    m.delete();
                }, 5000);
            });
    } else {
        fs.readFile('./accounts/steam.txt', 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];

            fs.writeFile('./accounts/steam.txt', lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });

            let embed = new Discord.RichEmbed()
            .setTitle('Voici votre nouveau compte Steam !')
            .setDescription(`\`\`\`${account} | Gen by NightGen\`\`\` \nSouvenez-vous que vous utilisez un générateur gratuit et sans pub, donc si un compte ne fonctionne pas veuillez en regénérer un autre.`)
            .setThumbnail('')
            .setImage('')
            .setColor("#363940")
            .setFooter('NightGen')
            .setTimestamp();

            msg.author.send(embed);

            msg.reply(':white_check_mark: Votre compte Steam vient d\'etre généré en MP!')
                
                .then(m => {
                    setTimeout(() => {
                        m.delete();
                    }, 90000000);
                });

            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, config.COOLDOWN * 1000);
        });
    }
};

module.exports.help = {
    name: `steam`,
    description: `Sends you a Steam account!`
};