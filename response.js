var Log         = require('./log.js'),
    Config      = require('./Config.js'),
    TelegramBot = require('telegram-bot-api'),
    FeliStd     = require('./FeliStd.js'),
    Auditoria   = require('./Auditoria.js');
var bot,
    errLog=console,msgLog=console,rtaLog=console,
    rtaModulo={},
    rtaModulos=[
      {name:'FelipeExtra',src:'./rtas/FelipeExtra.js'},
      {name:'Simpson',src:'./rtas/Simpson.js'},
      {name:'HoraSaludos',src:'./rtas/HoraSaludos.js'},
     ];

try {errLog=new Log('logs/err',1,1);} catch(e) {console.log('Error al crear errLog: ',e);}
try {msgLog=new Log('logs/msg',0,1);} catch(e) { errLog.log('Error al crear msgLog: ',e);}
try {rtaLog=new Log('logs/rta',1,1);} catch(e) { errLog.log('Error al crear rtaLog: ',e);}

process.on('uncaughtException', function (err) {
  errLog.log(err.stack);
  console.log("Node NOT Exiting...");
});

try {bot = new TelegramBot(Config.bot);} catch(e) {errLog.log('Error al iniciar TelegramBot: ',e);process.exit(1);}

/**
 * \todo Cargar desde un array, informar en el error cuál es.
 **/
try
 {
  for(var i=0;i<rtaModulos.length;i++)
   {
    var modulo=rtaModulos[i];
    modulo.i=i;
    modulo.obj=require(modulo.src);
    rtaModulo[modulo.name]=modulo;
   }
   
 } catch(e) {
  errLog.log('Error al cargar módulo ',i,' ',modulo,':',e);
  process.exit(2);
 }

/** \todo Comando que devuelva desde hace cuánto está corriendo. **/
var FelipeInicia=Date.now()/1000;
var FelipeIgnora=FelipeInicia-10*60;
var FelipeIgnoraCuenta=0,      // Cuenta parcial, que se resetea cada vez que envía a consola.
    FelipeIgnoraCuentaTotal=0; // Cuenta total, que acumula cada vez que envía a consola el parcial.

errLog.log('Iniciando a Felipe, t=',FelipeInicia,', ignorando t<',FelipeIgnora);

  //para escribir en consola
  //var pedir = 0;
  //var hora;
  var random1, random2, random3;
  var respuesta;
  var mensaje ="";
  var num1="";
  var opinaFoto=['¡Le doy!',
                 '¡Apa!',
                 'Mmmm...',
                 'KHÉ?',
                 'Esto ya se ha visto...',
                 'Oh, sí...',
                 'This',
                 '¡Le entro como chileno a la wea!'];
  var olvida=['¡Mirá ese alzhéimer, papá!',
              'Mepa que tenés que aflojar con las pasti...',
              'Y pensaba que yo estaba mal jaja.',
              'Ah bueeeeeeeno...'
             ];
  var sinalias=['rompecorazones',
                'sr. incógnita',
                'mr. inrastreable',
                '¿te escondés?'];

var ProcesaMensaje=function(message)
 {

try
 {

/*************** COMPROBAR MENSAJE VÁLIDO ***************/
  var msgId = FeliStd.recorrerRutaObjeto(message,['message_id']);
  if(undefined===msgId)
   {
    errLog.log('¿¡Mensaje inexistente!? ',message);
    return;
   }

  var msgFecha=FeliStd.recorrerRutaObjeto(message,['date']);
  var msgIgnora=false;
  if(msgFecha<FelipeIgnora)
   {
    FelipeIgnoraCuenta++;
    msgIgnora=true;
   }
  else if(FelipeIgnoraCuenta)
   {
    FelipeIgnoraCuentaTotal+=FelipeIgnoraCuenta;
    errLog.log('Se ignoran ',FelipeIgnoraCuenta,' mensajes antiguos, en total ',FelipeIgnoraCuentaTotal,', desde que se reinició.');
    FelipeIgnoraCuenta=0;
   }
  /** \todo Dejar el try, pero pasarlo a función independiente. **/
  /*************** ENVIAR A CONSOLA ***************/
  try
   {
    var formaMensajeLog=
     [
      "[",
      ['message_id'], "@",
      ['chat','id'],
      msgIgnora?",T=":",t=", ['date'],
      "] ",
      ['from','first_name'], " ", ['from','last_name'],
      " (", ['from','username'],"): ",
      ['text']
     ];
    msgLog.log(message);
    console.log(FeliStd.formatearRecorriendo(message,formaMensajeLog));
   } catch(e) {errLog.log('Error ',e,' capturando mensaje ',message);}

  /*************** AUDITORÍA ***************/
  try
   {
    var texto=Auditoria.msgATexto(message);
    msgSimple(/**/-126072776/*-174676504/**/, texto);
    //msgSimple(-126072776, "Envia " + message.chat.id + "#" + msgId + "#");
    msgRe(/**/-126072776/*-174676504*/, message.chat.id, msgId);
//    console.log('Auditoria: ',texto);
   } catch(e) {errLog.log('Error ',e,' generando auditoría ',texto);}

  /*************** IGNORAR ***************/
  /** \todo Lista de ignorar. **/

    if (message.from.username == "DimeKari")
        return;
    
    //Si se manda un sticker
    if (!(message.sticker === undefined))
        {
         //msg(message.chat.id, "Y yo sin stickers, ¡que picardía!");
         return;
        }
    
    /*************** SI NO HAY TEXTO, CHAU ***************/
    /***** Ya sea porque es una imagen, video, etc.… *****/
    if (message.text === undefined)
        return;

    /*************** COMANDOS: ***************/

    if(/^\/start/gi.exec(message.text))
    {
      msg(message.chat.id, "_ Hola, mi .bre es _ *Felipe* _ y soy un bot de prueba. No tengo comandos, simplemente respondo a determinadas palabras o frases ;). ¡Suerte! _");
      return;
    }

} catch(e) {
 errLog.log('Error en código viejo, parte 1: ',e);
}

/****
 * Código nuevo, usando módulos.
 ****/
var rtas=null;

if(!msgIgnora) try
 {
   
   var ctx=
    {
     mensaje:message.text,
     message:message,
     tpl_vars:FeliStd.hazTplVars(message),
    };

   for(var i=0;i<rtaModulos.length;i++)
    if(rtas=FeliStd.procesaLista(rtaModulos[i].obj.lista, ctx)) break;

   if(rtas)
    FeliStd.enviaRtas(rtas,bot,ctx);

  } catch(e) {
   errLog.log('Error nuevo:',e);
  }


/******************** CÓDIGO VIEJO: ********************/

try
 {
   if(!rtas)
    {
     
    /*************** RESPUESTA A FOTOS (CÓDIGO VIEJO) ***************/
    //Si mandan una foto
    if (!(message.photo === undefined))
        {
            //Para que no responda siempre
            random1=1+Math.floor(Math.random()*4);
            random2=opinaFoto[Math.floor(Math.random() * (opinaFoto.length))];
            if (random1 ==2)
                msgReply(message.chat.id,random2, msgId);
            return;
        }

    }

    	mensaje = message.text.toLowerCase();
    	var pattern = /^[\d]*(\.)?(\+)?(\-)?(\/)?(\H)?(\*)?(\()?[\d]+(\))?$/g;
    	    
    	    random1 = mensaje;
    	    
    	    random1=random1.replace(/ /gi,'');
    	    /*
            while (random1.indexOf(" ")>=0)
                random1=random1.replace(" ","");
    	    */

/*
    	    if (!!random1.match(pattern)){
    	        
    	            
                if (message.chat.id != 154493455)
                    return;
                
    	        calculadora(message.chat.id, mensaje, msgId);
    	        return;
    	    }
*/
            if (message.chat.id == 154493455){
                if (mensaje.substring(0,6) == "envia " && mensaje.indexOf("#") > 0){
                    random1= mensaje.substring(6, mensaje.indexOf("#"));
                    random2= message.text.substring(message.text.indexOf("#") +1);
                    
                    if (random2.indexOf("#") > 0){
                        random3= random2.substring(random2.indexOf("#") +1);
                        random2= random2.substring(0,random2.indexOf("#"));
                    
                        if (random3 == "-"){
                            msg(random1, random2);
                        }
                        else
                        {
                            msgReply(random1, random3, random2);
                        }
                        
                        return;
                        }
                    }
            }


 } catch(e) {
  errLog.log('Error en código viejo, parte 2: ',e);
 }



try
 {

    	    if(/qui[eé]n\s+soy\u003F/gi.exec(message.text)){
    	         random1 =olvida[Math.floor(Math.random() * (olvida.length))];
    	         random3 =sinalias[Math.floor(Math.random()* (sinalias.length))];
    	         
    	         respuesta = random1   + " Sos " + message.from.first_name;
    	         
    	         if (!(typeof message.from.last_name  === "undefined"))
    	            respuesta = respuesta + ' ' + message.from.last_name;
    	         
    	         if ((typeof message.from.username === "undefined"))
    	         {
    	           respuesta = respuesta + " y no tenés alias, " + random3 + " :'(";
    	         }
    	         else
    	         {
    	           respuesta = respuesta + " y tu alias es @" + message.from.username + ", " + ctx.tpl_vars.MoteCursi + " ♥.";
    	         }
    	         
    	         msgReply(message.chat.id, respuesta, msgId);
    	        return;
    	    }
/*
    	    if(/(cont(ador|ame|[aá])|(cu[eé]nta(me)?))/gi.exec(message.text)&&/((mensaj(ito|e|ucho)s?)|(ms[gj]s?))/gi.exec(message.text)){
    	        
    	        msgReply(message.chat.id, "Vamos poooooooor " + (parseInt(msgId,10)+1) +" mensajuchos.", msgId);
    	        return;
    	    }    	    
*/
 } catch(e) {
  errLog.log('Error en código viejo, parte 3: ',e);
 }

};


/*** FUNCIONES VIEJAS ***/
function isInt(value) {
  var x;
  return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}
function msg(chatid, mensaje){
    bot.sendMessage({
                		chat_id: chatid,
                		text: mensaje
                		,parse_mode:"Markdown"
                	    });
}
function msgSimple(chatid, mensaje){
    bot.sendMessage({
                		chat_id: chatid,
                		text: mensaje
                	    });
}
function msgReply(chatid, mensaje, mId){
    bot.sendMessage({
                		chat_id: chatid,
                		text: mensaje,
                		reply_to_message_id: mId
                	    });
}
function msgRe(chatId, chatFromid, mId){
      bot.forwardMessage({
            chat_id: chatId,
            from_chat_id: chatFromid,
            message_id: mId
        });
}
function calculadora(chatid, mensaje, mId){
  
   
   while (mensaje.indexOf("÷")>=0){
       
       mensaje = mensaje.replace("÷","/");
       
   }

   while (mensaje.indexOf(" ")>=0){
       
       mensaje = mensaje.replace(" ","");
       
   }
   
   if (mensaje.indexOf("((")>=0||mensaje.indexOf("))")>=0||mensaje.indexOf("++")>=0||mensaje.indexOf("--")>=0||mensaje.indexOf("**")>=0||mensaje.indexOf("//")>=0||mensaje.indexOf("..")>=0){
       
       msgReply(chatid, "Pará, ¿qué te pensás que soy? ¿Un bot asiático? ¡Sin símbolos dobles!", mId);
       return;
   }
   
    respuesta = eval(mensaje);
    
    if (typeof(respuesta) == "number"){
        
        if (respuesta == Infinity){
            msgReply(chatid, "¿¿¿DIVIDIR POR CERO??? ¡Animalito de Dios! ¡Par favaaaaaaaaar!", mId);
        }
        else{
            if (isInt(respuesta)){
                msgReply(chatid, respuesta.toString(), mId);
            }
            else{
               msgReply(chatid, respuesta.toFixed(2).toString(), mId); 
            }
        }
    }
        
}

errLog.log('Teóricamente, se cargó todo y quedo a la espera de nuevos mensajes…');

bot.on('message', ProcesaMensaje);
var inlineRegistrados=
 {
  "Ahorcado":{'mod':'./rtas/Ahorcado.js','fun':'inline'},
 };
bot.on('inline.callback.query',(message)=>
  {
   var data=FeliStd.recorrerRutaObjeto(message,['data']);
   msgLog.log('Inline recibido:',message);
   data=data.match(/([^:]+):(.*)/);
   data.shift();
   if(!2==data.length) {errLog.log('Inline: no hay data válido: ',data);return;}
   var inr=FeliStd.recorrerRutaObjeto(inlineRegistrados,[data[0]]);
   if(!inr) {errLog.log('Inline: no hay inline registrado: ',data[0]);return;}
   data=data[1];
   var mod=FeliStd.recorrerRutaObjeto(inr,['mod']);
   if('string'==typeof(mod))
    try
     {
      mod=require(mod);
      if(mod) inr.mod=mod;
     } catch(e) {errLog.log('No pudo cargarse el módulo ',mod,', e:',e);return;}
   var fun=FeliStd.recorrerRutaObjeto(inr,['fun']);
   var fn=FeliStd.recorrerRutaObjeto(mod,[fun]);
   if(!fn) {errLog.log('No pudo cargarse la función ',fun);return;}
   try {fn.apply(mod,[data,bot,message]);return;}
   catch(e) {errLog.log('No pudo ejecutarse la función ',fun,', e:',e);return;}
   //console.log('Recibido inline',message);
  }
 );