const aoijs = require("aoi.js")
var fs = require('fs')
const bot = new aojs.Bot({ token:process.env.token,
 prefix:"!"//Böyle bırak yada kendi prefixini yaz.
})
bot.onJoined()
bot.onLeave()
bot.onMessage()
var reader = fs.readdirSync("./komutlar/").filter(file => file.endsWith(".js"))
for(const file of reader) {    
    const command = require(`./Komutlar/${file}`)
    bot.command({
        name: command.name,
        code: command.code
    })
}

bot.command({
  name:"ping",
  code:`
  Gecikmem : $ping
  `
})

bot.status({
    text: 'Aoi.js V5 Müzik Altyapı',
    type: "PLAYING",
    status: "online",
    time: 10
})

bot.command({
  name: "çal",
  code: `$suppressErrors[Şarkı çalmazken kullanamazsın]
 $author[Müzik çalınmaya başlandı;$authorAvatar]
$description[Aranan kelime \`$message\`
Bulunan Şarkı : $get[şarkı]
Şarkı uzunluğu : $replaceText[$replaceText[$songInfo[duration];Seconds;Saniye;-1];Second;Saniye;-1]
Çalan kişi : $userTag[$authorID]]
$color[ff4543]
$setServerVar[şarkı;$authorID]
$let[şarkı;$playSong[$message;...;yes;yes;:x: \`$message\` adında bir müzik bulamadım.]]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$argsCheck[>1;Lütfen bir şarkı adı gir]
  $addCmdReactions[⏯]`

});

bot.command({
  name: "sıralama",
  code: `$author[Sıradaki Şarkılar]
 $description[
 $queue[1;10;{number} - {title}]]
$color[ff4543]
 $onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken kullanamazsın]
 $onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
 $onlyIf[$queue[1;10;{number} - {title}]!=;Sırada bir şarkı bulunmuyor]
 $suppressErrors[Şarkı çalmazken kullanamazsın]
 $addCmdReactions[📜]`

});
bot.command({
  name: "durdur",
  code: `
$addCmdReactions[⏸]
$pauseSong
$onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken kullanamazsın]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$suppressErrors[Şarkı çalmazken kullanamazsın]
`
});
bot.command({
  name: "tekrarla",
  code: `
$addCmdReactions[🔁]
$let[geç;$skipSong]
$let[şarkı;$playSong[$songInfo[title];...;yes;yes;:x: \`$songInfo[title]\` adında bir müzik bulamadım.]]
$onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken kullanamazsın]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$suppressErrors[Şarkı çalmazken kullanamazsın]
`
});

bot.command({
  name: "geç",
  code: `
$addCmdReactions[⏯]
$let[geç;$skipSong]
$onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken kullanamazsın]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$suppressErrors[Şarkı çalmazken kullanamazsın]`
});

bot.command({
  name: "çık",
  code: `
$addCmdReactions[⏹]
$djsEval[message.member.voice.channel.leave();]
$onlyIf[$voiceID[$clientID]!=;Zaten bir ses kanalında değilim]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$suppressErrors[Ses kanalından çıkamadım]
`

});

bot.command({
  name: "ses",
  code: `
$addCmdReactions[🔊]
$volume[$message]
$onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken kullanamazsın]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$suppressErrors[Şarkı çalmazken kullanamazsın]
$onlyIf[$message<=100;Maximum 100 olarak ayarlanabilir]
$onlyIf[$isNumber[$message]!=false;Bir sayı girmelisin]
$argsCheck[1;Lütfen bir ses seviyesi gir]
`
});

bot.musicStartCommand({
  channel: "$channelID",
  code: ``
});

bot.musicEndCommand({
  channel: "$channelID",
  code: ``
});

bot.command({
  name: "devam",
  code: `
$addCmdReactions[▶]
$resumeSong
$onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken kullanamazsın]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$suppressErrors[Şarkı çalmazken kullanamazsın]
`
});

bot.variables({
şarkı: "",
no: ":x:"
}) 
