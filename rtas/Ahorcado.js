"use strict";
var FeliStd=require('../FeliStd.js');
var Ahorcado=module.exports;

/** \todo Pasar a base de datos. **/
Ahorcado.palabras=[
   5,{palabra:'ABAD'},
   2,{palabra:'ABIA'},
  50,{palabra:'AMAR'},
  50,{palabra:'AMEN'},
  50,{palabra:'AMES'},
  50,{palabra:'AMOR'},
 120,{palabra:'ANAL'},
  80,{palabra:'ANIL'},
  80,{palabra:'ANÍS'},
 120,{palabra:'ANOS'},
  70,{palabra:'ASAR'},
  30,{palabra:'ASIR'},
  90,{palabra:'ATAR'},
   5,{palabra:'AVAL'},
  50,{palabra:'AVES'},
   5,{palabra:'AVÍA'},
   5,{palabra:'AVIÉ'},
   5,{palabra:'AVÍO'},
  45,{palabra:'BOBA'},
  45,{palabra:'BOBO'},
  50,{palabra:'BOCA'},
  40,{palabra:'BODA'},
  35,{palabra:'BOLA'},
  25,{palabra:'BOLO'},
  35,{palabra:'BONO'},
   5,{palabra:'BORO'},
  25,{palabra:'BOTÁ'},
  25,{palabra:'BOTÉ'},
  35,{palabra:'BOTÓ'},
  50,{palabra:'CACA'},
   7,{palabra:'CADA'},
  60,{palabra:'CAGA'},
   3,{palabra:'CAÍA'},
  50,{palabra:'CAJA'},
   4,{palabra:'CALA'},
  99,{palabra:'CAMA'},
   6,{palabra:'CANA'},
  25,{palabra:'CAPA'},
  80,{palabra:'CARA'},
 120,{palabra:'CAFÉ'},
  50,{palabra:'CASA'},
  10,{palabra:'CASÉ'},
  20,{palabra:'CASI'},
  10,{palabra:'CASO'},
   4,{palabra:'CATA'},
   2,{palabra:'CAYÁ'},
   2,{palabra:'CAYÓ'},
   4,{palabra:'CAZA'},
  50,{palabra:'CECA'},
  10,{palabra:'CEDE'},
  20,{palabra:'CEDÍ'},
  50,{palabra:'CESA'},
  10,{palabra:'CESE'},
  50,{palabra:'CESO'},
  50,{palabra:'CODA'},
 150,{palabra:'COLA'},
  70,{palabra:'COMA'},
  20,{palabra:'COMÉ'},
  20,{palabra:'COMÍ'},
  50,{palabra:'COMO'},
  50,{palabra:'CONO'},
  50,{palabra:'CORO'},
  70,{palabra:'COSO'},
 150,{palabra:'CULO'},
  30,{palabra:'LACA'},
  30,{palabra:'LADO'},
  50,{palabra:'LAGO'},
  50,{palabra:'LANA'},
  50,{palabra:'LATA'},
  30,{palabra:'LAVA'},
  15,{palabra:'LAVÉ'},
  20,{palabra:'LAVO'},
  15,{palabra:'LAXA'},
  25,{palabra:'LAZO'},
  30,{palabra:'LEÑA'},
  50,{palabra:'LOCA'},
  50,{palabra:'LOCO'},
  30,{palabra:'LOGO'},
  40,{palabra:'LODO'},
  30,{palabra:'LOMO'},
  50,{palabra:'LORO'},
  30,{palabra:'LUCA'},
  30,{palabra:'LUCE'},
  40,{palabra:'MOCO'},
  30,{palabra:'MODO'},
  20,{palabra:'MOFA'},
  20,{palabra:'MOFÓ'},
  20,{palabra:'MOJO'},
  20,{palabra:'MOLÓ'},
  50,{palabra:'MONO'},
  30,{palabra:'MOÑO'},
  20,{palabra:'MORO'},
  30,{palabra:'MOTA'},
  50,{palabra:'MOTO'},
  25,{palabra:'MOZO'},
  40,{palabra:'MUDA'},
  30,{palabra:'MUFA'},
  30,{palabra:'MUGE'},
  30,{palabra:'MUGÍ'},
   5,{palabra:'MUJA'},
   5,{palabra:'MUJO'},
  40,{palabra:'MULA'},
  40,{palabra:'MULO'},
  50,{palabra:'MURO'},
  30,{palabra:'MUTÓ'},
  20,{palabra:'MUTA'},
  20,{palabra:'OCAS'},
  35,{palabra:'OROS'},
  50,{palabra:'OJOS'},
  20,{palabra:'PARÁ'},
  20,{palabra:'PARÉ'},
  40,{palabra:'PARO'},
  50,{palabra:'PATA'},
  50,{palabra:'PATO'},
  20,{palabra:'PITA'},
 150,{palabra:'PITO'},
  50,{palabra:'PASO'},
  10,{palabra:'PESÉ'},
  30,{palabra:'PESA'},
  50,{palabra:'PESO'},
  10,{palabra:'PESÓ'},
 130,{palabra:'PETE'},
  10,{palabra:'PETO'},
  50,{palabra:'PERA'},
  20,{palabra:'PORO'},
  30,{palabra:'POTO'},
   9,{palabra:'PUJO'},
  50,{palabra:'PURO'},
 130,{palabra:'PUTO'},
  50,{palabra:'SEDA'},
  20,{palabra:'SEDE'},
  20,{palabra:'SEDÉ'},
  40,{palabra:'SEDO'},
  50,{palabra:'VACA'},
  30,{palabra:'VOTÁ'},
  30,{palabra:'VOTÉ'},
  40,{palabra:'VOTÓ'},
 ];
 
Ahorcado.partidas={};

Ahorcado.hazMascara=function(palabra)
 {
  // return Array(palabra.palabra.length+1).join('_').split('');
  return Array(palabra.palabra.length).fill('_');
 };

Ahorcado.hazLetras=function(palabra)
 {
  var letras={},contador=0,
      pal=palabra.palabra
        .toUpperCase().replace(/[ÁÀ]/g,'A').replace(/[ÉÈ]/g,'E')
        .replace(/[ÍÌ]/g,'I').replace(/[ÓÒ]/g,'O').replace(/[ÚÜÙ]/g,'U');

  for(var i=0;i<pal.length;i++)
   {
    var letra=pal.charAt(i);
    if(letra in letras) letras[letra].push(i);
    else
     {
      letras[letra]=[i];
      contador++;
     }
   }
 letras['#']=contador;
 return letras;
 };

Ahorcado.iniciarPartida=function(partida)
 {
  partida.estado=1;
  partida.usadas=[];
  partida.palabra=FeliStd.defRta(Ahorcado.palabras,'');
  //partida.usadas=[];
  partida.letras=Ahorcado.hazLetras(partida.palabra);
  //El primer número debe ser >= 27 / segundo número. Por ejemplo: 9-26/3=1,9-27/3=0
  partida.vidas=9-Math.floor(partida.letras['#']/3);
  partida.libres='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  /* // NO habilitar, quita las letras que usa la palabra
  for(var i in partida.letras)
   {
    var p=partida.libres.indexOf(i);
    if(p>=0) partida.libres.splice(p,1);
   }
  */
  partida.máscara=Ahorcado.hazMascara(partida.palabra);
  console.log('Partida de ahoracado iniciada:',partida);
  return {
    parse_mode:'HTML',
    tpl:"Bueno… juguemos al <b>ahorcado</b>, la palabra tiene ${letras} letras.",// Para jugar responder algún <i>telegrama</i> del juego con la letra a adivinar.
   };
 };
 
Ahorcado.respuestasIniciado=[
     50,{tpl:"Todavía no se arriesgó ninguna letra, la palabra es algo así: ${máscara}.",parse_mode:'HTML'},
     50,{tpl:"La palabra es algo como ${máscara}, y hay ${vidas} oportunidades para errar.",parse_mode:'HTML'},
    ];
Ahorcado.respuestasContinuar1=[
     50,{tpl:"Por ahora venimos con la palabra ${máscara}, quedan ${vidas} oportunidades. La única letra que salió es la ${usadas}.",parse_mode:'HTML'},
     50,{tpl:"Quedan ${vidas}, y por ahora sólo se usó la ${usadas}. La palabra sería ${máscara}.",parse_mode:'HTML'},
    ];
Ahorcado.respuestasContinuarV=[
     50,{tpl:"Por ahora venimos con la palabra ${máscara}, quedan ${vidas} oportunidades. Ya se usaron las letras ${usadas}.",parse_mode:'HTML'},
     50,{tpl:"Quedan ${vidas}, y por ahora se usaron las letras ${usadas}. La palabra quedaría ${máscara}.",parse_mode:'HTML'},
    ];
Ahorcado.respuestasContinuarU=[
     50,{tpl:"Por ahora venimos con la palabra ${máscara}, queda <b>una oportunidad</b>. Ya se usaron las letras ${usadas}.",parse_mode:'HTML'},
     50,{tpl:"<b>¡Última oportunidad!</b> Por ahora se usaron las letras ${usadas}; quedando así ${máscara}.",parse_mode:'HTML'},
    ];

Ahorcado.continuarPartida=function(partida)
 {
  var rta=partida.usadas.length;
  rta=(rta)?(1==rta?'respuestasContinuar1':(1==partida.vidas?'respuestasContinuarU':'respuestasContinuarV')):'respuestasIniciado';
  return FeliStd.defRta(Ahorcado[rta]);
 };

Ahorcado.agregaTplVars=function(v,partida)
 {
  v.vidas=partida.vidas;
  v.letras=partida.palabra.palabra.length;
  v.usadas=['<code>',partida.usadas.join('</code>, <code>'),'</code>'].join('');
  v.máscara=['<code>',partida.máscara.join(' '),'</code>'].join('');
  return v;
 }
/** Llamada cuando le piden jugar, determina si debe empezar un juego nuevo, o seguir el anterior. **/
Ahorcado.rtaJugar=function(coinc,ctx)
 {
  var chat_id=FeliStd.recorrerRutaObjeto(ctx,['message','chat','id']);
  if(!chat_id) return {txt:'Tengo un problema, no encuentro el número de chat…'};
  var partida=FeliStd.recorrerRutaObjeto(Ahorcado,['partidas',chat_id]);
  if(!partida) partida=Ahorcado.partidas[chat_id]={
      chat_id:chat_id,
      estado:0,
     };
  var rta;
  rta=(partida.estado)?Ahorcado.continuarPartida(partida):Ahorcado.iniciarPartida(partida);
  var v=ctx.tpl_vars;
  Ahorcado.agregaTplVars(ctx.tpl_vars,partida);
  rta.reply_markup=Ahorcado.hazTeclado(chat_id);
  return rta;
 };
 
 Ahorcado.hazTeclado=function(chat_id)
  {
   var partida=FeliStd.recorrerRutaObjeto(Ahorcado,['partidas',chat_id]);
   if(!partida||1!=partida.estado) return undefined;
   var l=partida.libres.length;
   var libres=partida.libres.slice();
   if(!l) return null;
   
   var teclado=[];
   var w=8,r=Math.ceil(l/w);
   for(var i=r;i;i--)
    {
     var c=Math.floor(libres.length/i);
     teclado.push(libres.splice(0,c).map((c)=>{return {text:c,callback_data:['Ahorcado:',c].join('')}}));
    }
    
   return JSON.stringify({inline_keyboard:teclado});
  };

Ahorcado.jugarLetra=function(ctx)
 {
  ctx.partida=FeliStd.recorrerRutaObjeto(Ahorcado,['partidas',ctx.chat_id]);
  if(!ctx.partida||!ctx.partida.estado)
   return [{tpl:"Veo que apretás mucho los botoncitos, ${Nom}, eso me agrada… pero por ahora no estamos jugando a nada."}];

  var pos=ctx.partida.libres.indexOf(ctx.data);
  if(pos<0) // La letra no está libre
    return [{tpl:"La letra $1  no está disponible en esta partida, ${Nom}."}];

  pos=ctx.partida.libres.splice(pos,1); // La letra ya no está más libre.
  ctx.partida.usadas.push(pos[0]); // La añade a usadas.
  // Busca si la letra es parte de la palabra:
  if(ctx.data in ctx.partida.letras)
   {
    pos=ctx.partida.letras[ctx.data];
    for(var p of pos)
     {
      ctx.partida.máscara[p]=ctx.partida.palabra.palabra.charAt(p);
     }
    /** Restar letra, y comprobar si ganó **/
    if(--ctx.partida.letras['#']) // Si quedan letras luego de restarle ésta:
     return [{
        tpl:"¡${Nom} acertó la letra $1! La palabra quedaría ${máscara}.",
        reply_markup:Ahorcado.hazTeclado(ctx.chat_id),
      }];
     /** \todo: Contar puntos o alguna boludez porque ganó. **/
     ctx.partida.estado=0;
     return [{
        tpl:"¡${Nom} acertó la letra $1 <b>formando la palabra</b> ${máscara}! Me gusta que juegues conmigo, ${MoteCursi}…",
        reply_markup:Ahorcado.hazTeclado(ctx.chat_id),
      }];
   } else {
    /** \todo Comprobar si perdió **/
    return [{tpl:"${Nom} la pifió, la letra $1 no está en la palabra, quedan ${vidas} vidas."}];
   }
 };

var hazTplVars_directos={
  'Nom':         ['from','first_name'],
  'grpname':     ['message','chat','username'],
  'rep_id':      ['message','message_id'],
  'rep_grpname': ['message','chat','username'],
 };

Ahorcado.inline=function(data,bot,message)
 {
  var ctx=
   {
    bot:bot,
    data:data,
    message:message,
    captura:[data,data.charAt(0)],
    rep_id:FeliStd.recorrerRutaObjeto(message,['message','message_id']),
    chat_id:FeliStd.recorrerRutaObjeto(message,['message','chat','id']),
    tpl_vars:FeliStd.hazTplVars(message,hazTplVars_directos),
   };
  var rtas=Ahorcado.jugarLetra(ctx);
  Ahorcado.agregaTplVars(ctx.tpl_vars,ctx.partida);
  
  for(var rta of rtas)
   {
    rta=FeliStd.procRta(rta,null,ctx);
    
    if(ctx.rep_id&&!('reply_to_message_id' in rta))
     rta.reply_to_message_id=ctx.rep_id;
     
    if(ctx.chat_id&&!('chat_id' in rta))
     rta.chat_id=ctx.chat_id;
     
    if(!('parse_mode' in rta))
     rta.parse_mode='HTML';
   }
  if(rtas)
   FeliStd.enviaRtas(rtas,bot,ctx);
 }