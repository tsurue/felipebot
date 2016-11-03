"use strict";
var FelipeExtra=module.exports,
    FeliStd=require('../FeliStd.js');

FelipeExtra.lista=
 [
  {
   re:/(^|[^a-záéíóúüñ])felipe($|[^a-záéíóúüñ])/i,
   fnRta:[FeliStd,'rtasRE'],
   rtas:
    [
     {
      re:/(?:^|[^a-záéíóúüñ])m+e*n*sa*[gj][^\d]*([+-]?\d+(?:\.\d*)?(?:e[+-]?\d+)?)/i,
      fnRta:[FelipeExtra,'rtaRpMsg'],
     },
     {
      re:/(?:^|[^a-záéíóúüñ])c(?:[oó]|ue)nt[aá](?:r|[lmt]e|no)?s?.*m+e*n*sa*[gj]|m+e*n*sa*[gj].*c(?:[oó]|ue)nt[aá](?:r|[lmt]e|no)?s?/i,
      rtas:
       [
        10,{parse_mode:'HTML',tpl:"Vamos poooooooor <b>${msgCnt} mensajuchos</b>."},
        10,{parse_mode:'HTML',tpl:"Vamoooos poooor <b>${msgCnt} mensajuchos</b>."},
        10,{parse_mode:'HTML',tpl:"Vamos por los <b>${msgCnt} mensajitos</b>, ${MoteCursi}."},
       ],
     },
     {
      re:/(?:^|[^a-záéíóúüñ])calc(?:ul[aá](?:r|[tlm]e|no)?s?)?(.*)/i,
      fnRta:['./rtas/FeliCalc.js','rtaCalc'],
     },
     {
      re:/(gra+[csx]i+(a+s+|e+l+a+)|te\s+.*a+g+r+a+d+e+[sz]+c+o+)/i,
      rtas:[
        10,{tpl:"¡De nada, ${Nom}! :)"},
        1,{tpl:"¡De nadia, ${Nom}! :)"},
        5,{tpl:"¡Gracias a vos, ${MoteCursi}! ;)"},
       ]
     },
    ]
  },
  {
   re:/^[^a-záéíóúüñ]*felipe(?:[^a-záéíóúüñ].*)?\s+grit[aá](?:me|nos|les?|te)?\s+(.*[^\s])\s*$/i,
   fnRta:[FelipeExtra,'rtaGritar'],
   rtas: {fn:[FelipeExtra,'gritar2'], parse_mode:'HTML'},
  },
  {
   re:/^\s*felipe\s*burl[aá](?:me|nos|les?|te)?\s+(?:de\s+)?(.*)/i,
   fnRta:[FelipeExtra,'rtaBurla'],
   rtas: {fn:[FelipeExtra,'burla1'], video: 'Burla', parse_mode:'HTML'},
  },
  {
   re:/^[\s\.,…\-¡!:]*felipe(?:\s*,)?\s+m[aá]t[aá](?:l[oa]s?)?\s+a\s+([^\.,…\-¡!:]*[^\s\.,…\-¡!:])\s*(?:[\.,…\-¡!:]|$)/i,
   rtas:
    [
      8,{'foto':'Muere1','txt':"Hasta la vista, baby!"},
      8,{'foto':'Muere1','tpl':"Hasta la vista, ${1}…"},
     10,{'foto':'Muere2','txt':"¡Ay! Pero mira esa cara de perro regañado, él ya entendió, hay que darle dinero."},
     10,{'foto':'Muere2','tpl':"¡Ay, ${Nom}! Pero mirá esa cara de perro regañado, ${1} ya entendió, hay que darle guita."},
     10,{'foto':'Muere3','txt':"No sé quien eres, no sé lo que buscas, pero te encontraré y te mataré."},
      8,{'foto':'Muere4','txt':"¡PEW PEW!"},
      8,{'foto':'Muere5','txt':"¡PEW PEW PEW!"},
    ]
  },
  {
   re:/^\s*felipe\s+m[aá]t[aá]l[oa]s?(\s+a)?\s*$/i,
   rta:{txt:"¡Dale!... ¿Pero a quién?"},
  },

    {
     re:/^\s*felipe(\s*,\s*|s+)(?:dec[ií]|di)(?:me|nos|les?|te)?($|[^a-záéíóúüñ])/i,
     rta:{txt:"",foto:'Oblígame'},
    },
    
 ];
FelipeExtra.gritar1=function(texto)
 {
  var bloques=texto.split(/([^a-záéíóúüñc]+)/i); // Divide en palabras
  for(var i=0;i<bloques.length;i++)
   {
    var bloque=bloques[i];
    // Procesa sólo 1/3 de los bloques (palabra/símbolos)
    if(Math.random()>0.3) continue;
    var r=bloque.match(/^(.*)([áéíóú])([^áéíóú]*)$/i);
    if(r)
     bloques[i]=[r[1],Array(3+Math.floor(Math.random()*Math.random()*6)).join(r[2]),r[3]].join('');
    else
     {
      // Rompe en pseudosílabas
      var sils=bloque.match(/((^[^aeiouáéíóúü]+)?([iu][aeo]|[aeo][iu]|[iu][áéó]|[aeiouáéíóúü])([^aeiouáéíóúü]*))/gi);
      if(!sils) continue;
      var nsil=/[aeiouüns]/.test(bloque.charAt(bloque.length-1))?2:1;
      nsil=sils.length-nsil;
      if(nsil<0) nsil=0;
      var gritando=sils[nsil].match(/^(.*)([aeiouüy])([^aeiouüy]*)$/i);
      // Recombinar
      sils[nsil]=[gritando[1],Array(3+Math.floor(Math.random()*Math.random()*6)).join(gritando[2]),gritando[3],].join('');
      bloques[i]=sils.join('');
     } // if(r) else…
   } //for(let bloque of bloques)
  return bloques.join(''); 
 };

FelipeExtra.gritar2=function(respuesta)
 {
  var rnd1=3+Math.floor(Math.random()*Math.random()*5);
  return [
    "<b>",
    Array(rnd1).join("¡"),
    respuesta.toUpperCase()
     //.replace(/[\*_]+/gi,'')
     .replace(/[AEIOUÁÉÍÓÚÜ]+/gi,
      function(s)
       {
        return Array(3+Math.floor(Math.random()*Math.random()*5)).join(s.charAt(0));
       })
     // Reemplaza <, >, & para que no haya problema con HTML
     .replace(/&/gi,'&amp;').replace(/</gi,'&lt;').replace(/>/gi,'&gt;'),
    Array(rnd1).join("!"),"</b>"].join('');
 };
FelipeExtra.burla1=function(texto)
 {
  return texto.replace(/&/gi,'&amp;').replace(/</gi,'&lt;').replace(/>/gi,'&gt;')
   // Reemplaza la c de ca, co, cu por qu
   .replace(/[C]([AOÁÓÀÒaoáóàòUÚÙuúù])/g,'Q<0>$1')
   .replace(/[c]([AOÁÓÀÒaoáóàòUÚÙuúù])/g,'q<1>$1')
  // Salva la 'u de' 'qui', 'que', 'gue' y 'gui' para no ser reemplazada
   .replace(/([QqGg])U([EeIiÉéÍíÈèÌì])/g,'$1<0>$2')
   .replace(/([QqGg])u([EeIiÉéÍíÈèÌì])/g,'$1<1>$2')
  // Si es GA, GO, o GU (pero no si sigue E o I, porque ya fue convertida), agrega U
   .replace(/([G])([AOÁÓÀÒaoáóàòUÚÙuúù])/g,'$1<0>$2')
   .replace(/([g])([AOÁÓÀÒaoáóàòUÚÙuúù])/g,'$1<1>$2')
   // Reemplaza vocales mayúscula por 'I', conservando tilde
   .replace(/[AEOUÜ]/g,'I').replace(/[ÁÉÓÚÀÈÌÒÙ]/g,'Í')
   // Reemplaza vocales minúscula por 'i', conservando tilde
   .replace(/[aeouü]/g,'i').replace(/[áéóúàèìòù]/g,'í')
   // Restaura u transformadas
   .replace(/<0>/g,'U').replace(/<1>/g,'u')
   // Añade bastardilla.
   /*.replace(/^(.*)$/gi,'<i>$1</i>')*/;
 };
FelipeExtra.rtaBurla=function(coinc,ctx)
 {
  return {'txt':FelipeExtra.burla1(coinc.captura.pop()),'video':'Burla',parse_mode:'HTML'};
 };
FelipeExtra.rtaGritar=function(coinc,ctx)
 {
  return {'txt':FelipeExtra.gritar2(coinc.captura.pop()),parse_mode:'HTML'};
 };

FelipeExtra.MoteCursi=function()
 {
  return FeliStd.defRta(
    [10,'cosita',
     10,'churri',
     10,'gordi',
     10,'bichi',
     10,'amorcis',
     10,'mi osito cariñosito',
     10,'cielito mío',
     10,'cuqui',
     10,'chuchi'
    ]);
 };
FelipeExtra.rtaRpMsg=function(coinc,ctx)
 {
  //var número=Math.round(parseFloat(/[+-]?\d+(\.\d*)?(e[+-]?\d+)?/gi.exec(ctx.mensaje)));
  var número=coinc.captura[coinc.captura.length-1];
  número=parseFloat(número);
  número=Math.round(número);
  número=isNaN(número)?'':número;
  ctx.tpl_vars.número=número;
  if(número<1)
   return {'video':'BigBang',tpl:"Mepa que te adelantaste un toque, ${Nom}…"};
  var msgId=ctx.tpl_vars.msgId;
  if(número>msgId+1)
   return {txt:"Preparame el DeLorean que ahora te averiguo.",foto:'Volver al futuro'};
  var o={
    tpl:"Literalmente, <b>este mensaje</b> es el ${rep_lnk_a}número ${número}${/rep_lnk_a}.",
    parse_mode:'HTML',
   };
  if(número<=msgId)
   {
    FeliStd.poneLnkInfo(número,ctx.tpl_vars.grpname,ctx.tpl_vars);
    o.tpl="Este mensaje es el ${rep_lnk_a}número ${número}${/rep_lnk_a}.";
    o.reply_to_message_id=número;
   }
  return o;
 };
/*
FelipeExtra.tpl_funs=
 {
  
 };
*/

