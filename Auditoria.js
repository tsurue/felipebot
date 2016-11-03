"use strict";
var Auditoria={},FeliStd=require('./FeliStd.js');

var conocidos=
 {'ImHulkling':{id:154493455,de:'Vos'},
  'ImHulkling_chat':{id:-126072776},
  'Elua1':{id:16176524,de:'Pruebas️'},
  'Trial_chat':{id:-174676504},
 };
 
var conocidos_id={};

for(var usr in conocidos)
 {
  var id=FeliStd.recorrerRutaObjeto(conocidos[usr],['id']);
  if(id)
   {
    var o=JSON.parse(JSON.stringify(conocidos[usr]));
    o.username=usr;
    conocidos_id[id]=o;
   }
 }

Auditoria.msg_flags={'sticker':"Sticker",'photo':"Foto",'video':"Video",'voice':"Voz"};

/** \brief Función que convierte un mensaje en el texto para auditoría. **/

Auditoria.msgATexto=function(message)
 {
  message=JSON.parse(JSON.stringify(message)); message.auditoria={};
  
  var x=FeliStd.recorrerRutaObjeto(message,['from','id']),
      y=conocidos_id[x];
      

  if(FeliStd.recorrerRutaObjeto(y,['de'],false)) // Si tiene un apodo conocido
   message.auditoria.de=y.de; // lo asigna
  else // Sino, nombre y si hay apodo
   {
    message.auditoria.de=[['from','first_name'],' ',['from','last_name']];
    // Si hay apodo de telegram, lo agrega:
    if(y=FeliStd.recorrerRutaObjeto(message,['from','username']))
     message.auditoria.de.push([' (@',y,')'].join(''));
    // Procesa
    message.auditoria.de=FeliStd.formatearRecorriendo(message,message.auditoria.de);
   }
  
  // Agrega flags:
  message.auditoria.flags=[];
  for(var key in Auditoria.msg_flags)
     if(FeliStd.recorrerRutaObjeto(message,key)!==undefined)
      message.auditoria.flags(['[',Auditoria.msg_flags[key],']'].join(''));
  message.auditoria.flags=message.auditoria.flags.join('');

  return FeliStd.formatearRecorriendo(message,Auditoria.msgATexto.formato);
 };

/** \brief Formato usado por Auditoria.msgATexto
 * (debe definirse después de la función). **/
Auditoria.msgATexto.formato=
 [ "Chat: ", ['chat','id'],
   "\nDe: ", ['auditoria','de'],
   "\nMsg: ",['message_id'],
   "\nEnvía ", ['chat','id'],"#",['message_id'],
   "#\nHistorial: ",['text'], ['auditoria','flags']
 ];

module.exports=Auditoria;
