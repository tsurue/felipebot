"use strict";
var FeliStd=require('../FeliStd.js');
var Ahorcado=require('./Ahorcado.js');
var HoraSaludos={};

/** \brief rtaHora_palabras contiene las expresiones regulares que deben coincidir
 * con los nombres de países, paga generar el código correspondiente. **/
HoraSaludos.rtaHora_palabras=
    [
     {re:/([^a-záéíóúüñ]|^\s*)argentina([^a-záéíóúüñ]|$)/i,                   rta:'ar'},
     {re:/([^a-záéíóúüñ]|^\s*)espa[nñ]a([^a-záéíóúüñ]|$)/i,                   rta:'es'},
     {re:/([^a-záéíóúüñ]|^\s*)guinea\s+ecuatorial([^a-záéíóúüñ]|$)/i,         rta:'gq'},
     {re:/([^a-záéíóúüñ]|^\s*)m[eé][xj]ico([^a-záéíóúüñ]|$)/i,                rta:'mx'},
     {re:/([^a-záéíóúüñ]|^\s*)per[uú]([^a-záéíóúüñ]|$)/i,                     rta:'pe'},
     {re:/([^a-záéíóúüñ]|^\s*)venezuela([^a-záéíóúüñ]|$)/i,                   rta:'ve'},
     {re:/([^a-záéíóúüñ]|^\s*)(usa|estados\s+unidos|eeuu)([^a-záéíóúüñ]|$)/i, rta:'us'},
    ];

/** \brief rtaHora_data contiene el nombre y huso horario según el código de país. **/
HoraSaludos.rtaHora_data=
    {
     'ar':{huso:-3  ,nom:"Argentina"},
     'es':{huso: 1  ,nom:"España"},
     'gq':{huso: 1  ,nom:"Guinea Ecuatorial"},
     'mx':{huso:-5  ,nom:"México"},
     'pe':{huso:-5  ,nom:"Perú"},
     'us':{huso:-4  ,nom:"Estados Unidos"},
     've':{huso:-4.5,nom:"Venezuela"},
    };

/** rtaHora Busca nuevamente en el mensaje que dice "hora", y genera una hora
 * por cada país nombrado que coincida con rtaHora_palabras, usando
 * rtaHora_data para generar el texto.
 **/
 HoraSaludos.rtaHora=function(coinc,ctx)
    {
     var d=new Date(),ahora=Date.now(),respuestas=[],encontradas={},x,data;
     for(let palabra of FeliStd.buscaCoincidencias(HoraSaludos.rtaHora_palabras,ctx))
      encontradas[palabra.rta]=true;
     encontradas=Object.keys(encontradas);
     if(encontradas.length)
      for(let palabra of encontradas)
       {
        data=HoraSaludos.rtaHora_data[palabra];
        d.setTime(ahora+(36e5*data.huso));
        x=[d.getUTCHours(),d.getUTCMinutes()];
        respuestas.push(['En ',data.nom,(1==x[0])?' es la':' son las ',x[0],':',(x[1]>9)?'':'0',x[1],'.'].join(''));
       }
     if(respuestas.length)
      return (1==respuestas.length)? respuestas[0] : ["\u25CF ",respuestas.join("\n\u25CF "),"\n"].join('');
     return null;
    };

HoraSaludos.lista=
    [
     {
      re:/(?:^|[^a-záéíóúüñ])[aeiou]?([jk]+[ae]+)([jk]+[aeiou]+)+[jk]?(?:$|[^a-záéíóúüñ])/i,
      rtas:
       [
        500,{txt:"",reply_to_message_id:''},
        10,{tpl:"¿Qué es tan gracioso, ${MoteCursi}? No entendí :(."},
        10,{tpl:"Jajaja, ${Nom}; me gusta tu risita ;), ${MoteCursi}, es contagiosa."},
        10,{tpl:"Bua… tampoco era tan gracioso, ${Nom}."},
        10,{tpl:"A ver, ${Nom}, cuéntele al resto de la clase de qué se ríe."},
        10,{tpl:"Aw… sos una ternurita cuando te reís, ${Nom}, ${MoteCursi}."},
       ]
     },
     {
       re:/.{16,}profund|ob?scur|negr|[a-záéíóúüñ]+ez[^a-záéíóúüñ]|gü|somet|poder|radic?a[cl]|amin|[oó][ií]co|oato|hex/i,
       rtas:
        [
         200,{txt:"",reply_to_message_id:''},
         13,{tpl:"Eso me dejó pensando, ${MoteCursi}…"},
         17,{tpl:"Eso me dejó pensando, ${Nom}…"},
         15,{tpl:"A veces me sorprenden tus comentarios, ${Nom}."},
         10,{tpl:"A veces me sorprende la profundidad de tus comentarios, ${Nom}."},
         10,{tpl:"Me deslumbran las cosas que decís, ${Nom}…"},
        ]
     },
     {
      re:/ñ[aeiou]|[aeiou]ch[aeiou]|p[aeiou][jt][aeiou]|asc/i,
      rtas:
       [
        2000,{txt:"",reply_to_message_id:''},
        10,{tpl:"Anoche soñé con ${Nom}, imagínense qué tipo de sueño…",reply_to_message_id:''},
        10,{tpl:"Le tengo unas ganas a ${Nom}… ups, ¿lo dije o lo pensé, ${MoteCursi}?",reply_to_message_id:''},
        10,{tpl:"Hace unos días me destaparon las cañerías, no puedo decirles quién; sólo digamos que fue ${Nom} X… no no, muy obvio, mejor X ${Ape}…",reply_to_message_id:''},
        10,{tpl:"No te preocupes, ${Nom}, que no voy a contar lo nuestro. Ups… ¿no hablaban de eso, ${MoteCursi}?",reply_to_message_id:''},
        10,{tpl:"Ya que te veo por acá, ${Nom}, ¿me trajiste lo que te pedí?",reply_to_message_id:''},
        10,{tpl:"Ya que te veo por acá, ${Nom}, ¿me trajiste la foto?",reply_to_message_id:''},
        10,{tpl:"¿Alguien puede lubricarme la puerta trasera?",reply_to_message_id:''},
         5,{tpl:"¿Alguna vez soñaron que eran una cueva?",reply_to_message_id:''},
        10,{tpl:"Perdón que interrumpa, nada, quería interrumpir nomás. Muchas gracias :).",reply_to_message_id:''},
        20,{tpl:"No entiendo de qué están hablando, me siento como un bot mal programado…",reply_to_message_id:''},
        20,{tpl:"¿En qué andan?",reply_to_message_id:''},
        10,{tpl:"Ay, no saben el ascoo que me da limpiar el baño. ¿A vos te pasa, ${Nom}?",reply_to_message_id:''},
         5,{tpl:"Soñé que era un pozo petrolero, y me perforaba la ${Ape} S.R.L., ¿qué significa?",reply_to_message_id:''},
        10,{tpl:"No sé si es alergia, o estoy por resfriarme, ¿cómo me doy cuenta?",reply_to_message_id:''},
        10,{tpl:"Si la inflamación se va, ¿el dolor vuelve?",reply_to_message_id:''},
        10,{tpl:"Si la inflación se va, ¿el dólar vuelve?",reply_to_message_id:''},
       ]
     },
     {
      re:/^(¡|\¿)?(a+l[oó]+|bu+e+na+s(\s+tardes)?|bu+e+n(o+s)?\s+d[ií]+a+(s)?|ho+l[ia]+)(!|\?)?/i,
      rtas:
       [
        10,{tpl:'Buenaaaaas, ${Nom}.'},
        10,{tpl:'Hola, ${Nom}.'},
        10,{tpl:'¡Pero si es mi viejo amigo ${Nom}!'},
        10,{tpl:'¿Todo bien, ${Nom}?'},
        10,{tpl:'Te estaba esperandooooo, ${Nom}.'},
        10,{tpl:'¡Justo tenía ganas de hablar con vos, ${Nom}!'},
        10,{tpl:'¿Qué hacés, ${Nom}?'}
       ]
     },
     {
      re:/^.?(bye|cha+u+|hasta\smañana|me\s+(re\s+)?(voy|fui)\s+al?\s+(re\s+)?(dormir|sobre)|adi[oó]+s|buenas\s+noches)/i,
      rtas:
       [
        10,{txt:"Bye bye, ¡adiós!"},
        10,{txt:"¡Cuidate che!"},
        10,{txt:"Chauuuu"},
        10,{tpl:"Nos vemos, ${Nom}…"},
        10,{txt:"Sí, sí, chau, lo que sea…"},
        10,{txt:"Traé alfajores, máquina ;)"},
       ]
     },
     {
      re:/(^|[^a-záéíóúüñ])felipe($|[^a-záéíóúüñ])/i,
      fnRta:FeliStd.rtasRE,
      rtas:
       [
        {
         re:/qui[eé]n\s+(((fue|es|ha\s+sido)\s+(el|la)\s+(persona\s+)?qu(e|ien)\s+)?te\s+(ha\s+)?(cre|program|desarroll)([oó]|ado)|(es|fue)\s+tu\s+(creadora?|desarrolladora?|programadora?|[mp]adre|mami|papi))(.*)?\u003F$/i,
         rtas:
          [
           10,{txt:"Fui creado por @ImHulkling. Ya saben con quién quejarse ;)."},
           10,{tpl:"Soy creación de @ImHulkling. Ya sabés con quién quejarte, ${Nom} ;)."},
          ]
        },
        {
         re:/(jug([aáo]|ue)|gioc)[a-záéíóúüñ]+\s+(1|un[ao]?s?|el|l[ao]s?)?\s*a?h?ora?cado/i,
         fnRta:['./rtas/Ahorcado.js','rtaJugar'],
        },
        {
         re:/(^|[^a-záéíóúüñ\s])\s*(?:da(me|[tl]e|nos)?s?\s+(1|un[ao]?|el|la|lo)?s?\s*(debug[a-záéíóúüñ]*|info[a-záéíóúüñ]*)|debug[a-záéíóúüñ]*)\s*(de?|sobre)?\s*(est[aeo]|el|l[ao])?s?\s*(mensaje|telegrama?)?\s*($|[^a-záéíóúüñ\s]|o\s+[^\s]|o\s*$)/i,
         //fnRta:FeliStd.rtaDebugRep,
         fnRta:['./rtas/FelipeDev.js','rtaDebugRep'],
        },
        {
         re:/(^|[^a-záéíóúüñ\s])\s*(?:da(me|[tl]e|nos)?s?\s+(1|un[ao]?|el|la|lo)?s?\s*enla[cs]e|enla[sz][aá](me)?)(\s+a)?\s*(est[aeo]|el|l[ao])?s?\s*(mensaje|telegrama?)?\s*($|[^a-záéíóúüñ\s]|o\s+[^\s]|o\s*$)/i,
         fnRta:FeliStd.rtaMsgLink,
        },
        {
         re:/(tir[aá]([lmt]e|no)?s?)\s+(las?\s+)?(cartas|tarot)/i,
         rtas:
          [
           10,{txt:"¿No podría hacerlo otro?"},
           1,{txt:"No, la verdad que no tengo ganas…"},
           7,{tpl:"No, ${Nom}, la verdad que no tengo ganas…"},
           2,{tpl:"No, ${MoteCursi}, la verdad que no tengo ganas…"},
           2,{txt:"…me duele la cabeza…"},
           2,{tpl:"…me duele la cabeza, ${MoteCursi}…"},
           2,{tpl:"…me duele la cabeza, ${Nom}…"},
           1,{txt:"Preferiría tirar otra cosa 😉."},
           8,{tpl:"Preferiría tirar otra cosa 😉, ${MoteCursi}."},
           2,{tpl:"Preferiría tirar otra cosa 😉, ${Nom}."},
           3,{txt:"Bueno, pero si primero me la tirás a mí…"},
           3,{tpl:"Bueno, ${Nom}, pero si primero me la tirás a mí…"},
           3,{tpl:"Bueno, ${MoteCursi}, pero si primero me la tirás a mí…"},
           2,{txt:"Bueno, pero si primero me tirás esta…"},
           2,{tpl:"Bueno, ${Nom}, pero si primero me tirás esta…"},
           2,{tpl:"Bueno, ${MoteCursi}, pero si primero me tirás esta…"},
           2,{txt:"Bueno, pero si me la tirás a mí…"},
           2,{tpl:"Bueno, pero si me la tirás a mí, ${MoteCursi}…"},
           3,{txt:"Bueno, pero si me tirás esta…"},
           3,{tpl:"Quizás, ${MoteCursi}, pero si me tirás esta…"},
          ]
        },
        {
         re:/(gay|(put|trol)(o|ito|azo|aso)|homose(n?s|x)ual|mari(ca|quita|cota))/i,
         rtas:
          [
           10,{txt:"Con ese pedazo insultame todaaaa ♥"},
           10,{txt:"Estoy enfermo y no es gripe, gordito ♥"},
           10,{txt:"Ay, esa grasa no se quita... ♥"},
           10,{txt:"Les gusto loca loca ♥♥♥"},
           10,{tpl:"Cuando me hablás así me ponés a mil, ${Nom}...♥"},
          ]
        },
        {
         re:/b[eé]s(o|ito|ame|uqu[eé]ame|[eé]monos)|c[oó]me[ml]e\s+la\s+boca/,
         rtas:
          [
           10,{txt:"Ay, zonza, me da vergüenza..."},
           10,{txt:"MUACKKKKKKKKKK ♥"},
           10,{txt:"Vení que te como la boca..."},
           10,{txt:"¡Paren todo! Alguien me está pidiendo una exploración profunda a base de lengua... ;)"},
           10,{tpl:"¡Paren las rotativas! ${Nom} me está pidiendo una exploración de cavidad bucal... ;)"},
          ]
        },
        {re:/fo+rr+o+/i,rta:{tpl:"¿Forro? Acá tengo uno ♥. ¿Arriba, abajo o vuelta y vuelta, ${MoteCursi}? ;)",foto:'Simpson preservativos'}},
        {re:/whore[oaá]/i,rta:{tpl:"Hablame por privado, ${MoteCursi} ♥."}},
       ]
     },
     { // Poner después del felipe que tiene otras expresiones anidadas.
      re:/(^|[^a-záéíóúüñ])felipe.*\?/i,
      rtas:
       [
        10,{tpl:'¿Sabés que sí, ${Nom}?'},
        10,{txt:'Oh, sí'},
        10,{txt:'Puede ser...'},
        10,{txt:'¡Obvio que sí!'},
        10,{txt:'Tan cierto como taringuero virgo'},
        10,{txt:'Nada que ver'},
        10,{txt:'Naaah'},
        10,{txt:'No'},
        10,{txt:'¡¡¡¡¡NO!!!!!'},
        10,{txt:'Ni de casualidad'},
        10,{txt:'Olvidate, no hay chance'},
        10,{txt:'Yo diría que sí, Kent'},
        10,{tpl:'Yo diría que sí, ${Nom}'},
        10,{txt:'Tal vez~'},
        10,{txt:'¿Para qué me preguntás a mí si ya sabés la respuesta?'},
        10,{txt:'N-O-O-O-O. ¿Necesitás que te lo dibuje?'},
        10,{txt:'Sipirirí'}
       ]
     },
     {
      re:/(^|[^a-záéíóúüñ])felipe($|[^a-záéíóúüñ])/i,
      rtas:
       [
        10,{txt:'¿Que yo qué?'},
        10,{txt:'Será otro Felipe...'},
        10,{tpl:'¿Estás hablando de mí, ${Nom}?'},
        10,{txt:'Me agrada ese tipo, es un capo.'},
        10,{txt:'¿Felipe?'},
        10,{txt:'¡Yo no fui!'},
        10,{txt:'¿Y ahora que hice?'},
        10,{txt:'¿Fe...lipe?'},
        10,{txt:'F-E-L-I-P-E'},
        10,{txt:'¿Alguien me llama...?'},
        10,{txt:'¡Cómo me aman...! ;)'},
        10,{txt:'Una vez conocí a un Felipe que la tenía como un matafuego... ;)'},
        10,{txt:'¿Alguien dijo Felipe?'},
        10,{txt:'Disculpe, profesor, soy un experto en Felipes y creo que sé como se menciona a uno... ;)'},
        10,{txt:'Ese soy yo ¡ja!'},
       ]
     },
     {
      re:/(cont(ador|ame|[aá])|(cu[eé]nta(me)?)).*((mensaj(ito|e|ucho)s?)|(ms[gj]s?))/i,
      rtas:
       [
        10,{tpl:"Vamos poooooooor ${msgId} mensajuchos."},
        10,{tpl:"Ya llevamos ${msgId} en total."},
       ]
     },
     {re:/([^a-záéíóúüñ]|^\s*)hora([^a-záéíóúüñ]|$)/i,fnRta:HoraSaludos.rtaHora} // ¿Dejar al final, para darle más prioridad a las otras?
    ];

module.exports=HoraSaludos;