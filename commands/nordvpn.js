const Discord = require('discord.js');
const fs = require('fs');
const cooldown = new Set();

module.exports.run = async (client, msg, args, config) => {
    if(cooldown.has(msg.author.id)) {
        msg.reply(`You need to wait ${config.COOLDOWN} minutes to use this command again!`)
            .then((m) => {
                msg.delete();

                setTimeout(() => {
                    m.delete();
                }, 5000);
            });
    } else {
        fs.readFile('./accounts/vpn.txt', 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];

            fs.writeFile('./accounts/vpn.txt', lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });

            let embed = new Discord.RichEmbed()
            .setTitle('Voici votre nouveau compte Nordvpn !')
            .setDescription(`\`\`\`${account} | Gen by NightGen\`\`\` \nSouvenez-vous que vous utilisez un générateur gratuit et sans pub, donc si un compte ne fonctionne pas veuillez en regénérer un autre.`)
            .setThumbnail('')
            .setImage('')
            .setColor("#363940")
            .setFooter('NightGen')
            .setTimestamp();

            msg.author.send(embed);

            msg.reply(':white_check_mark: Votre compte Nordvpn vient d\'etre généré en MP!')
                .then(m => {
                    setTimeout(() => {
                        m.delete();
                    }, 900000);
                });

            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, config.COOLDOWN * 60 * 1000);
        });
    }
};

module.exports.help = {
    name: `nordvpn`,
    description: `Sends you a Nordvpn account!`
};