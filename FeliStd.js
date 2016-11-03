"use strict";
var FeliStd=module.exports;

var hazTplVars_directos={
  'msgId':       ['message_id'],
  'msgCnt':      ['message_id'],
  'Nom':         ['from','first_name'],
  'Ape':         ['from','last_name'],
  'grpname':     ['chat','username'],
  'rep_id':      ['reply_to_message','message_id'],
  'rep_grpname': ['reply_to_message','chat','username'],
 };

var hazTplVars_ejecutar={
  'MoteCursi':['./rtas/FelipeExtra.js',['MoteCursi'],[]],
 };
FeliStd.recorrerRutaObjeto=function(objeto,ruta,def)
   {
    for(var i=0;i<ruta.length;i++)
     if(('object'==typeof(objeto))&&(ruta[i] in objeto))
      objeto=objeto[ruta[i]];
     else return def;
      return objeto;
    };

/** \brief Convierte un array en una función.
 * \todo Cambiar scope.
 **/
FeliStd.indFn=function(a)
 {
  if('function'==typeof(a)) return a;
  if(a instanceof Array)
   {
    var b=a.slice(), // Hace una copia, para no bardear el array original.
        o=b.shift();
    if('string'==typeof(o))
     try
      {
       var mn=o;
       o=require(mn);
       if(!o) console.log('No pudo abrirse el módulo ',mn);
      } catch(e) {console.log('No pudo abrirse el módulo ',o,', error: ',e);}
    return FeliStd.recorrerRutaObjeto(o,b);
   }
  return undefined;
 };

/**
 * 
 **/
FeliStd.fnCbiaTuMi=function(posesivo)
 {
  var r;
  if(r=/^(tu|mi)(s?)$/.exec(posesivo)) return ('tu'==r[1]?'mi':'tu')+r[2];
  return posesivo;
 };
/** \brief Recorre una <lista>, los textos los deja como está, pero los arrays
 * los usa como ruta para recorrer el <objeto> (<def> si no lo encuentra).
 **/
FeliStd.formatearRecorriendo=function(objeto,lista,def)
 {
  var resultado=[];
  for(let elemento of lista)
   resultado.push(
     ('string'==typeof(elemento))?elemento
     :FeliStd.recorrerRutaObjeto(objeto,elemento,def));
  return resultado.join('');
 }
/** \todo Función para incorporar más archivos con rutas e ids. **/

var
   photos_paths=require('./photos.paths.js'),
   photos_ids  =require('./photos.ids.js');
 /**
  \brief Función por defecto para buscar una respuesta entre varias.
  
  Toma como primer parámetro una serie de número y objeto. El número indica la probabilidad del objeto.
  Si la cantidad de elementos es par, el número debe ser sobre la suma del total de números;
  si es impar, es sobre el último número. En el 1º caso, es convertido en el 2º a la primera ejecución.
  Por ejemplo, [10,'uno',10,'dos',20,'tres'] es convertido en [10,'uno',20,'dos',40,'tres',40]
 **/
FeliStd.defRta=function(lista,def)
   {
    var l=lista.length;
    if(0==lista.length%2) // Si la cantidad es par, convierte.
     {
      lista[l]=0;
      var x;
      for(var i=0;i<l;i+=2)
       lista[l]=lista[i]+=lista[l];
     }
    else l--; // Siempre apunta al último objeto.
    var n=Math.floor(Math.random()*lista[l]);
    for(var i=0;i<l;i+=2)
     if(n<lista[i]) return lista[i+1];
    return def;
   };

/****
 \brief Devuelve una copia del texto tpl habiéndole reemplazado $ y un número por el grupo correspondiente
 en ctx.captura. Si termina con un punto, lo ignora. Si es $. lo convierte en el símbolo $. Por ejemplo,
 si ctx.captura es ['cero','uno','dos']:
 * '¡Hola $0!' => '¡Hola cero!'
 * 'Son $.$1, $0..' => 'Son $uno, cero.'
 \todo Obtener algunas variables del contexto.
 * ${Nom} Primer nombre con primera letra mayúscula y el resto minúscula.
****/
FeliStd.defTpl=function(tpl,coinc,ctx)
   {
    return tpl
     // Reemplaza el signo pesos seguido de un número (y opcionalmente un punto)
     //.replace(/\$(\d+).?/gi,function(s,i){return (i in ctx.captura)?ctx.captura[i]||'':'';})
     .replace
      ( // replace:
       /\$(\d+)\.?|\$\{([^\{\}]*)\}/gi, // expresión regular, captura $0, $0., ${algo}...
       function(s,i,j)
        {
         i=i||j; // Si no se indica como número $0. lo toma de los corchetes ${0}
         s=FeliStd.recorrerRutaObjeto(ctx,['tpl_vars',i],'');
         s=FeliStd.recorrerRutaObjeto(ctx,['captura',i],s);
         return s;
        }
      )
     // Reemplaza $. por $, así $.0 se convierte en $0 y $.. en $.
     .replace('$.','$$');
   };

/****
 \brief Dado un contexto y un objeto con varias coincidencias, devuelve la respuesta, o null.
 Resumen:
 * Busca si se especificó un valor en fnRta.
 ** Si es array, lo convierte en función.
 * Si no hay función:
 ** Si hay un valor en rta, lo devuelve; sino, devuelve null.
 * Si es función, la ejecuta, para obtener una única respuesta.
 * Si no hay respuesta, devuelve null.
 * Si hay un valor en Tpl:
 ** Si hay un valor en fnTpl, lo usa como función.
 ** Si no hay un valor en fnTpl, usa una función propia.
 ** Llama a la función con Tpl, coinc y ctx, y espera que devuelva un texto.
 ** Guarda ese texto como respuesta.
 * \todo defTpl definida en contexto
 * \todo Función que obtiene función dado un parámetro que puede ser un una función, un nombre (busca en una lista) o una por defecto.
****/
FeliStd.buscaRespuesta=function(coinc,ctx)
   {
    var rtas,resp=[],fn;
//console.log('Prueba coinc.fnRta ',coinc.fnRta,':',t);
    if('fnRta' in coinc)
     fn=FeliStd.indFn(coinc.fnRta);
     
    if(fn)
     {
      if('function'==typeof(fn))
       rtas=fn(coinc,ctx);
      else
       throw {mensaje:'fnRta es de tipo incompatible: ',tipo:typeof(fn),fnRta:coinc.fnRta,fn:fn};
     }
    else
     rtas=('rtas' in coinc)?FeliStd.defRta(coinc.rtas):coinc.rta;

    if(!rtas) return null;
    
    if(!(rtas instanceof Array)) rtas=[rtas];
    for(let rta of rtas)
     resp.push(FeliStd.procRta(rta,coinc,ctx));

    return resp;
   };
FeliStd.procRta=function(rta,coinc,ctx)
 {
  if('object'!=typeof(rta)) rta={txt:rta};
    // Si se define tpl (template=plantilla), define el texto en base a eso.
    // Si no se define la función fnTpl, usa una por defecto (defTpl).
  if('tpl' in rta)
   rta.txt=(('fnTpl' in rta)?rta.fnTpl:FeliStd.defTpl)(rta.tpl,coinc,ctx);
  return rta;
 };
FeliStd.getPhotoId=function(id)
   {
    if(id in photos_ids)   return /*FeliStd.*/photos_ids[id];
    if(id in photos_paths) return 'fotos/'+/*FeliStd.*/photos_paths[id];
    console.log('No se encontró foto '+id);
    return '';
   };

/****
\brief Generador que busca por cada objeto obj en lista, coincidencias con ctx.mensaje usando la expresión regular obj.re.
Puede usarse en:
 for(let coincidiencia of buscaCoincidencias(lista,ctx))
o
 var busq=buscaCoincidencias(lista,ctx);
 ...
 busq.next().value;

****/
FeliStd.buscaCoincidencias=function*(lista,ctx)
   {
    for(let obj of lista)
     {
      if(!('re' in obj)) continue;
      obj.re.lastIndex=0;
      ctx.captura=obj.captura=ctx.mensaje.match(obj.re);
      if(obj.captura) yield obj;
     }
    return {done:true};
   };

FeliStd.rtasRE=function(coinc,ctx)
 {
  return FeliStd.procesaLista(coinc.rtas,ctx);
 };
  
FeliStd.procesaLista=function(lista,ctx)
   {
    var respuestas=[];
    for(let coincidencia of FeliStd.buscaCoincidencias(lista,ctx))
     {
      var rta=FeliStd.buscaRespuesta(coincidencia,ctx);
      if(!rta) continue;
      if(!(rta instanceof Array))
       {
        if('object'!=typeof(rta)) rta={txt:rta};
        rta=[rta];
       }
      if(/*rta.varias||*/ctx.varias||false)
       respuestas=respuestas.merge(rta);
      else
       return rta;
      }
     return respuestas.length?respuestas:null;
    };

FeliStd.rta1Campo=function(coinc,ctx)
 {
  var fn =FeliStd.indFn(FeliStd.recorrerRutaObjeto(coinc,['rtas','fn'])),
      cap=FeliStd.recorrerRutaObjeto(coinc,['captura'],null);
  if(!fn) return null;
  // Llama a la función para obtener el texto:
  var o=fn(cap),
      // Obtiene el valor de parse_mode
      parse_mode=FeliStd.recorrerRutaObjeto(coinc,['rtas','parse_mode']);
  
  // Lo guarda en texto o plantilla:
  if('tpl'==FeliStd.recorrerRutaObjeto(coinc,['rtas','modo']))
   o={tpl:o};
  else
   o={txt:o};
   
  // Actualiza el modo de parseo, si se indica
  if(parse_mode) o.parse_mode=parse_mode;

  // Devuelve el objeto:
  return o;
 };

/** \brief Envía contexto del mensaje. **/
FeliStd.rtaDebugRep=function(coinc,ctx)
 {
  var rep=FeliStd.recorrerRutaObjeto(ctx,['message','reply_to_message']);
  if(!rep) return {txt:'¿Cuál mensaje? Usá responder para que yo sepa.'};
  return {
    txt: [
      '<pre>',
      JSON.stringify(rep).replace(/&/gi,'&amp;').replace(/</gi,'&lt;').replace(/>/gi,'&gt;'),
      '</pre>'].join(''),
    parse_mode:'HTML',
  };
 }

FeliStd.poneLnkInfo=function(msg_id,chat_name,o)
 {
  if(!o||(typeof(o)!='object')) o={};
  if(!msg_id) return o;
  
  //Enlace, válido o no
  o.rep_lnk_txt=[
    'telegram.me/',
    (chat_name)?chat_name:'NOMBRE_DEL_GRUPO',
    '/',msg_id
   ].join('');
     
  if(chat_name)
     {
      //Enlace válido:
      o.rep_lnk_ok=['telegram.me/',chat_name,'/',msg_id].join(''); //URL
      o.rep_lnk_a=['<a href="',o.rep_lnk_ok,'">'].join(''); //<a>
      o['/rep_lnk_a']='</a>';
     } //:if(chat_name)
  
  return o;
 };

/** \brief Devulve el módulo, o un valor por defecto. **/
FeliStd.dameMódulo=function(nombreMódulo,def)
 {
  try
   {
    var módulo=require(nombreMódulo);
    return módulo;
   } catch(e) {
    console.log('Error al cargar módulo ',nombreMódulo,', e:',e);
    return def;
   }
 };

/** \brief Crea las variables para templates. **/
FeliStd.hazTplVars=function(message,directos)
 {
  var o={},nom; directos=directos||hazTplVars_directos;
  // Carga variables directamente desde el mensaje:
  for(nom in hazTplVars_directos)
   o[nom]=FeliStd.recorrerRutaObjeto(message,hazTplVars_directos[nom]);

  // Algunas conversiones:
  o.msgCnt++;
  
  // Intenta ejecutar funciones de módulos
  for(nom in hazTplVars_ejecutar)
   {
    var data=hazTplVars_ejecutar[nom],
//        mod=FeliStd.recorrerRutaObjeto(rtaModulo,[data[0],'obj']),
        mod=FeliStd.dameMódulo(data[0]),
        fun=false,
        err=false;
    if(!mod) err=['No pudo cargarse el módulo ',data[0],' para ',nom];
    if(!err)
     {
      fun=FeliStd.recorrerRutaObjeto(mod,data[1]);
      if(!fun) err=['No pudo cargarse la función ',data[1],' para ',nom];
     }
    if(!err)
     {
      try
       {
        o[nom]=fun.apply(mod,data[2]);
       } catch(e) {
        err=['No pudo ejecutarse la función ',data[1],' con argumentos ',data[2],' para ',nom,', e:',e];
       } //:try-catch
     } // :if
    if(err)
     console.log.apply(console,err);
   } //:for

  // Añade a o, info para armar enlace a mensaje que se responde
  // \todo Reemplazar por función para template.
  FeliStd.poneLnkInfo(o.rep_id,o.rep_grpname,o);

  return o;
 };

/** \brief Envía un enlace al mensaje. **/
FeliStd.rtaMsgLink=function(coinc,ctx)
 {
  if(!('rep_id' in ctx.tpl_vars))
   return {txt:'¿Cuál mensaje? Usá responder para que yo sepa.'};
  return {
    parse_mode:'HTML',
    tpl:"El enlace a ese mensaje sería ${rep_lnk_a}${rep_lnk_txt}${/rep_lnk_a}."
  };
 };

/** \brief Envía las respuestas a la API. **/
FeliStd.enviaRtas=function(rtas,bot,ctx)
 {
  if(!rtas||'object'!=typeof(rtas)||!('length' in rtas)) return null;
  var message=FeliStd.recorrerRutaObjeto(ctx,['message']);

  var i=0,j=0;
  
  for(var rta of rtas)
   {
    var bot_rta={}, tipo=null;
    j++;
    try
     {
      // Agrega chat_id de message.chat.id o da error por consola.
      bot_rta.chat_id=FeliStd.recorrerRutaObjeto(ctx,['chat_id']);
      if(!bot_rta.chat_id)
       bot_rta.chat_id=FeliStd.recorrerRutaObjeto(message,['chat','id']);
      if(!bot_rta.chat_id)
       {
        console.log('chat.id perdido en mensaje ',message);
        continue;
       }
     
      // Responde al mensaje anterior, a otro o a ninguno
      var msgId;
      if('reply_to_message_id' in rta)
       msgId=FeliStd.recorrerRutaObjeto(rta,['reply_to_message_id']);
      else
       msgId=FeliStd.recorrerRutaObjeto(message,['message_id']);
      if(msgId) bot_rta.reply_to_message_id=msgId;

      if('parse_mode' in rta) bot_rta.parse_mode=rta.parse_mode;
      if('reply_markup' in rta) bot_rta.reply_markup=rta.reply_markup;

      if('video' in rta)
       {
        var video=FeliStd.getPhotoId(rta.video);
        if(video)
         {
          bot_rta.video=video;
          bot_rta.caption=('txt' in rta)?rta.txt:"";
          tipo='video';
         } else {
          console.log('Video perdido',rta.video,video);
         }
       }
       
      if(!tipo&&('foto'  in rta))
       {
        var foto=FeliStd.getPhotoId(rta.foto);
        if(foto)
         {
          bot_rta.caption=('txt' in rta)?rta.txt:"";
          bot_rta.photo=foto;
          tipo='foto';
         } else {
          console.log('Foto perdida',rta.foto,foto);
         }
       }

      if(!tipo)
       {
        bot_rta.text=('txt' in rta)?rta.txt:"";
        if(('foto'   in rta)) bot_rta.text+=' [Foto perdida]';
        if(('video'  in rta)) bot_rta.text+=' [Video perdido]';
       }
       
      switch(tipo)
       {
        case 'video': bot.sendVideo(bot_rta); break;
        case 'foto':  bot.sendPhoto(bot_rta); break;
        default:      bot.sendMessage(bot_rta);
       }
      i++;
      
      console.log(['Enviado ',tipo||'texto',': '].join(''),bot_rta);

     } catch(e) {
      console.log('Error ',e,' al procesar respuesta ',rta)
     } //try…catch…
   } //for var rta of rtas
  
  return [i,j];
 };
