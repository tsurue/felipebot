var Config  =module.exports,
    Secretos=require('./secretos.js');
//https://github.com/mast/telegram-bot-api/
Config.bot=
 {
  token: Secretos.FelipeVerde.token,
  updates: {enabled: true}
 };
