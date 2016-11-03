"use strict";
var Simpson={};
var FeliStd=require("../FeliStd.js"),md5=require('md5');

Simpson.laCajaOrden={'caja':1000,'pija':600,'vegetariana':600,'vegetariano':599,'dildo':500,'la':-1,'carne':-80,'vida':-100};
Simpson.lista=
   [
//    {re:/nuclear/i,rta:"A-TÓ-MI-CO, se dice A-TÓ-MI-CO."},
    {re:/nuclear/i,rta:{txt:"A-TÓ-MI-CO, se dice A-TÓ-MI-CO.",video:'Atómico'}},
    {
     re:/c[oó]mo\s+si\s+no\s+(tuvi(era|ese)|lleva(ra|se))\s+nada\s+puesto/i,
     rta:{txt:"¡...nada puesto! ¡Nada puesto!",video:'Nada puesto'}
    },
    
    {
     re:/est[uú]pid[ao]s?\s+y\ssensual(es)?/i,
     rta:{txt:"",video:'Estúpido y sensual'}
    },
    
    {
     re:/es\s+(un|1)\s+cuadrado+\s(ordinario|com[uún]|simple|sencillo)/i,
     rta:{txt:"",foto:'Cuadrado ordinario'}
    },
    
    {
     re:/((pod[eé]s|puede[n\s]?)\s+darme\s+(dinero|guita|plata|oro)\u003F|eth?ernet.*token.*ring?)/i,
     rta:{txt:"¿Puede darme dinero?",foto:'Puede darme dinero'}
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])es\s+(un|1)\s+cuadrado+\s(ordinario|com[uú]n|simple|sencillo|normal)(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Cuadrado ordinario'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])si\s+no\s+(lo\s+)?([lv]eo|miro)(\s*,+\s*|\s+)?no\s+es\s+ilegal(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'No es ilegal'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])no\s+es\s+ilegal(\s*,+\s*|\s+)?si\s+no\s+(lo\s+)?([lv]eo|miro)(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'No es ilegal'},
    },

    {
     re:/(?:^|[^a-záéíóúüñ])(m[aá]s|\+)\s*despacio.*cerebritos?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Despacio cerebrito'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])([+\-−∓±]?)\s*\d+([\.,]\d*)?(\s*e\s*[+\-−]?\s*\d+([\.,]\d*)?)?\s*[<>=+\-−∓*\/×÷±]\s*([+\-−∓±]?)\s*\d+([\.,]\d*)?(\s*e\s*[+\-−]?\s*\d+([\.,]\d*)?)?(?:[^a-záéíóúüñ]|$)/i,
     rtas:[
      17,{txt:"¡Oye, oye! …más despacio, cerebrito.",foto:'Despacio cerebrito'},
      113,{tpl:""},
      ]
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])mi\s+t(rabajo|area)\s+a(qu[ií]|c[aá])\s+(ha\s+)?((termin|finaliz)(ado|ó)|conclu([ií]do|y[oó]))(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Mi trabajo aquí 1'},
    },

    {
     re:/(?:^|[^a-záéíóúüñ])(u(ste)?d(e?s)?|vos).?\s+no\s+(han?\s+hecho|hizo|hiciste|hicieron)\s+(nada|una?(.*)?(chota|mierda|carajo|garcha|sorete))(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"Ah, ¿no?",video:'Mi trabajo aquí 2'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])gui(ñ|g?n)o[^a-záéíóúüñ]*gui(ñ|g?n)o(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",video:'Guiño guiño'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])[eé]st?o\s+ya\s+se\s+ha\s+visto(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Ya se ha visto'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])[eé]st?o\s+me\s(agrada|gusta)(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Eso me agrada'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])u(ste)?d(es)?.?\s+(es|son)\sdiab[oó]lic[ao]s?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Diabólico'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])todav[ií]a\s+sirve(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"¡Todavía sirve! ¡Todavía sirve!",foto:'Todavía sirve'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])poder(es)?\s+sexual(es)?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Poderes sexuales'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])resultados?\s+sexual(es)?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Resultados sexuales'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])robar[^a-záéíóúüñ]+c[oó]mo\s+pudi(ste|eron)(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Robar'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])habl[eaá](me|n)?\s+(m[aá]s\s|\+)\s*fuerte(\s*,\s*|\s+)que\s+(teng|llev)o\s+(una?|1)\s+toh?all(a|[oó]n)(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Toalla'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])yo\s+(cre(o|er[ií]a)|di(go|r[ií]a))\s+que\s+s[ií](?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Que sí Kent'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])(mi|[st]u)s?\s+vidas?\s+(son|es)\s+las?\s+de\s+(un[ao]?|1)s?\s+(triunfador|campe[oó]n)[ae]?s?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Triunfador'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])(es|son)\s+basura(?:[^a-záéíóúüñ]|$)/i,
     rta:{tpl:"Claro, señor ${Nom}, todo es basura…",foto:'Basura'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])([ltm]es?|nos)\s+preocupan?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"Me preocupan más las pirañas.",foto:'Pirañas'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])(a(?:[jmrst]|gu|ir|l[eiz]|nd|oj|se|)|me)[aá]v(amos)(?:[^a-záéíóúüñ]|$)/i,
     rta:{tpl:"¿…${1}áb${2} con ve chica?, ¡mono tonto, estúpido!",foto:'Mono tonto'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])vengan\s+de\s+a\s+(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",video:'Vengan.gif'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])hay\s+tabla(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Tabla'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])detector(es)?\s+de\s+sarcasmos?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Sarcasmo'},
    },

    {
     re:/(?:^|[^a-záéíóúüñ])(tiene(s|n)?|ten[eé]s)\s+toda\s+(mi|nuestra)\s+atenci[oó]n(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",video:'Atención'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])(te|l[ao]s)\s+condecor(o|amos)\s+con\s+([eé]st?[ae]|un[ao]?)s?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Vela perfumada'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])(aqu[ií]|ac[aá])\s+([tl]es?\s+)?(est[aá]|tiene[sn]|ten([eé]s?|go|emos))\s+[st]u\s+cariñito(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",video:'Cariñito'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])(kill\s+it\s+with\s+fire)|quer[ií]as?\s+fuego+\u003F(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",video:'Fuego'},
    },

    {
     re:/(?:^|[^a-záéíóúüñ])qu[ií]tate\s+(t[uú]|vos)(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",video:'Quítate tú'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])(trabaj|labur)amos(\s*,\s*|\s+)y\s+nos\s+divertimos(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",video:'Trabajamos'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])cama\s+arriba(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",video:'Cama arriba'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ])nube\s+arriba(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Nube arriba'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])\s*a menos que(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"A menos que…",foto:'A menos que'},
    },
    {
     re:/(?:^|\s+)parec[eé]s\s+(?:ser\s+)?(?:raza|copado)(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"A veces pareces ser raza, y luego te juntas con un lameloide… Te caes, y te levantas.",foto:'ser raza'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])(?:el|los)\s+misterios?\s+de\s+la\s+vida(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"Ah, los misterios de la vida…",foto:'misterios'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])te\s+entiendo(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"Ah, te entiendo mi viejo…",foto:'Te entiendo'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])Alf\s*.*[^a-záéíóúüñ]+fichas?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"¿Te acuerdas de Alf? Volvió… y en forma de fichas…",foto:'Alf fichas'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])soy[^a-záéíóúüñ]+(?:una|1)[^a-záéíóúüñ]amenaza(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"Soy una amenaza…",foto:'Amenaza'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])(a(?:poyo|pruebo)[^a-záéíóúüñ]+la[^a-záéíóúüñ]+mo[cs]i[oó]n|con[^a-záéíóúüñ]+(?:toda[^a-záéíóúüñ]+)violencia)(?:[^a-záéíóúüñ]|$)/i,
     rtas:
      [
       10,{txt:"Apoyo la moción, con toda violencia…",foto:'Apoyo moción guiño'},
       10,{txt:"Apoyo la moción, con toda violencia…",foto:'Apoyo moción arma'},
      ]
    },
    {
     re:/(?:^|[^a-záéíóúüñ])(h?a[cs]erti[vb]o|paradigm(?:a|[aá]tico))s?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"Disculpen, pero 'asertivo' y 'paradigma' son palabras que la gente tonta usa para parecer importante…",foto:'asertivo'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])comer\s+(?:1|una)\s+naranja(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'comer una naranja'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])\s*([a-záéíóúüñ\s]*[a-záéíóúüñ])\s*es\s+[a-záéíóúüñ\s,]*cruel(?:[^a-záéíóúüñ]|$)/i,
     rtas:
      [
       10,{tpl:"Ay, según tú todo es cruel: $1 es cruel, jalarle la cola es cruel, ¡gritarle en las orejas es cruel! ¡Todo para ti es cruel! Pues perdóname por ser tan cruel…",foto:'cruel'},
       10,{tpl:"Ay, según tú todo es cruel: encadenarlo en el jardín es cruel, $1 es cruel, ¡gritarle en las orejas es cruel! ¡Todo para ti es cruel! Pues perdóname por ser tan cruel…",foto:'cruel'},
       10,{tpl:"Ay, según tú todo es cruel: encadenarlo en el jardín es cruel, jalarle la cola es cruel, ¡$1 es cruel! ¡Todo para ti es cruel! Pues perdóname por ser tan cruel…",foto:'cruel'},
      ],
    },
    {
     re:/(?:^|[^a-záéíóúüñ])\s*([a-záéíóúüñ\s]*[a-záéíóúüñ])\s*es\s+[a-záéíóúüñ\s,]*gay(?:[^a-záéíóúüñ]|$)/i,
     rtas:
      [
       10,{tpl:"Ay, según tú todo es gay: escuchar Bruno Mars es gay, ponerme camisas floreadas es gay, chupar pija es gay, ¡$1 es gay! ¡Todo para ti es gay! Pues perdóname por ser tan gay…",foto:'cruel'},
       10,{tpl:"Ay, según tú todo es gay: escuchar Bruno Mars es gay, ponerme camisas floreadas es gay, ¡$1 es gay! ¡Todo para ti es gay! Pues perdóname por ser tan gay…",foto:'cruel'},
       10,{tpl:"Ay, según tú todo es gay: escuchar Bruno Mars es gay, chupar pija es gay, ¡$1 es gay! ¡Todo para ti es gay! Pues perdóname por ser tan gay…",foto:'cruel'},
       10,{tpl:"Ay, según tú todo es gay: escuchar Bruno Mars es gay, entregar el orto es gay, ¡$1 es gay! ¡Todo para ti es gay! Pues perdóname por ser tan gay…",foto:'cruel'},
       10,{tpl:"Ay, según tú todo es gay: escuchar Bruno Mars es gay, que me rompan la cola es gay, ¡$1 es gay! ¡Todo para ti es gay! Pues perdóname por ser tan gay…",foto:'cruel'},
       10,{tpl:"Ay, según tú todo es gay: escuchar Bruno Mars es gay, degustar lechita es gay, ¡$1 es gay! ¡Todo para ti es gay! Pues perdóname por ser tan gay…",foto:'cruel'},
      ],
    },
    {
     re:/(?:^|[^a-záéíóúüñ])es\s+[a-záéíóúüñ\s,]*cruel(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"Ay, según tú todo es cruel: encadenarlo en el jardín es cruel, jalarle la cola es cruel, ¡gritarle en las orejas es cruel! ¡Todo para ti es cruel! Pues perdóname por ser tan cruel…",foto:'cruel'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])ens[eé]g?[nñ]anos\s+a\s+(ama|quere|co[gj]e|garcha)r(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Enséñanos a amar'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])es\s+y\s+no\s+es(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"Es y no es, usted me entiende…",foto:'Es y no es'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])(eso\s+d(igo|ecimos)\s+(yo|nosotros)|as[ií]\s+est[aá]\s+la\s+cosa)(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"Eso digo yo, pero así está la cosa…",foto:'Eso digo yo'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])estepicursor(?:[^a-záéíóúüñ]|$)|^[\s\.…]+$/i,
     rta:{txt:"",foto:'Estepicursor'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])e+xaa+cto+(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"Exaaacto… ¡ouch!",foto:'Exaaacto'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])explic[aá](?:[lmt]e|nos|les|)\s+t[uú]s?\s+([a-záéíóúüñ]+)(?:[^a-záéíóúüñ]|$)/i,
     rta:{tpl:"Explica tu $1, jovencito.",foto:'Explica tu maqueta'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])exprimir\s+cada\s+([a-záéíóúüñ]+)(?:[^a-záéíóúüñ]|$)/i,
     rta:{tpl:"¡Exprimir cada $1!",foto:'Exprimir cada centavo'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])fernet\s+(?:con|y|\+|m[aá]s)\s+(pe[cp]?si|manaos)(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Fernet con Pepsi'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])caras?\s+nuevas?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"Veo muchas caras nuevas… pero como dice el dicho: ¡Abajo lo viejo, arriba el núcleo!",foto:'caras nuevas'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])cargar?\s+(?:de\s+)?(?:la\s+)?sube(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'SUBE bien cargada'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])(?:1|una?)\s+poc[ao]\s+de\s+(esto|aquello)(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"…un poco de esto, un poco de aquello…",foto:'Un poco de esto'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])(ah[ií]|entonces|fue\s+cuando|y)\s+me\s+enoj[eé](?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Y ahí fue cuando me enojé'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])ah[ií]\s+a?bajo(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Y me refiero ahí abajo'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])(lo[^a-záéíóúüñ]+juro([^a-záéíóúüñ]|$)|juro[^a-záéíóúüñ]+que\s+[a-záéíóúüñ])/i,
     rta:{txt:"¿Lo jurás ante el pergamino sagrado, y que sino se te hinche el estómago y se te caiga el cabello de la cabeza?",foto:'Juramento magio'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])venga\s+el\s+(l[íi]quido|s[óo]lido|gas)(?:[^a-záéíóúüñ]|$)/i,
     rta:{tpl:"—Señor ${Nom}, entienda que esto puede provocar pérdida de cabello y ligero retraso mental. —¡Sí, venga el $1!",foto:'Venga el líquido'},
    },
    {
     re:/^[^a-záéíóúüñ]*m+e+n+d+o+z+a+[^a-záéíóúüñ]*$/i,
     rta:{txt:"",foto:'Mendozaaa'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])mi\s+diagn[oó]stico[^a-záéíóúüñ]+(un[oa]?s?)\s+(mal[ao]?s?)\s+([a-záéíóúüñ]+)(?:[^a-záéíóúüñ]|$)/i,
     rta:{tpl:"Mi diagnóstico, $1 $2 $3…",foto:'Mi diagnóstico'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])qu[eé]\s+clase\s+de\s+(hombre|m[aá]quina|mujer|bot|cylon|mascota|persona|chic[ao]|bolud[ao]|perr[ao]|gat[ao])e?s?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"",foto:'Qué clase de hombre'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])a?d[oó]nde\s*est(?:ar)?[aá]n?\s+((?:mi|tu|su)s?)\s+([a-záéíóúüñ]+)\s*(?:[^a-záéíóúüñ]|$)/i,
     rta:{tpl:"¿Dónde está $1 $2? ¿Dónde está $1 $2?",foto:'Mi hamburguesa'}
    },
    {
     re:/(?:^|[^a-záéíóúüñ])a?d[oó]nde\s*est(?:ar)?[aá]n?\s+(@?[a-záéíóúüñ]+)\s*(?:[^a-záéíóúüñ]|$)(?:[^a-záéíóúüñ]|$)/i,
     rta:{tpl:"¿Dónde está $1? ¿Dónde está $1?",foto:'Mi hamburguesa'}
    },
    {
     re:/(?:^|[^a-záéíóúüñ])ya\s+llegu[eé](?:[^a-záéíóúüñ]|$)|^[^a-záéíóúüñ]*llegu[eé][^a-záéíóúüñ]*$/i,
     rta:{txt:"¿Qué? ¿Tan temprano?",foto:'Tan temprano'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ])tan\s+temprano(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"¡Sí!",foto:'Tan temprano'},
    },
    {
     re:/#(req(uest)?|pedido|feature|add|agregar|añadir)(a|to|for|para)?feli(pe)?(?:[^a-záéíóúüñ]|$)/i,
     rtas:[
       10,{video:"Máquina de escribir",txt:"Bien, su petición es muy interesante; así que voy a transcribirla en mi máquina de escribir invisble…"},
       10,{foto:"Máquina invisible",tpl:"Bien, su petición es muy interesante señor Pelmaz… digo ${Nom}. Así que voy a transcribirla en mi máquina de escribir invisble…"},
      ],
    },
    {
     re:/(?:^|[^a-záéíóúüñ])(un|el|los)\s+juegos?\s+perfectos?(?:[^a-záéíóúüñ]|$)/i,
     rta:{txt:"¿Alguien mencionó un juego perfecto?",foto:'juego perfecto'},
    },
    
    {
     re:/(?:^|[^a-záéíóúüñ\s]+)\s*(?:mi\s+)?(qu[eé]|qui[ée]n(?:es)?|no|[a-záéíóúüñ\-_]+mente|a+[hcl]?[aáií]+|pero|ya|igual|distinto|peor|est?o|y|ahora|despu[eé]s|a?s[ií]|c[óo]mo|cu[aá]ndo|d[oó]nde|siempre|nunca)\s+(?:no\s+)?es\s+([a-záéíóúüñ\-]+)\s*(?:[^a-záéíóúüñ\s]|$)/i,
     rta:{tpl:""},
    },
    {
     re:/(?:^|[^a-záéíóúüñ\s]+)\s*(?:mis?\s+)?(@?[a-záéíóúüñ\-\d]+)\s+(?:no\s+)?es\s+(qu[eé]|qui[eé]n(?:es)?|d[oó]nde)\s*(?:[^a-záéíóúüñ\s]|$)/i,
     rta:{tpl:"",foto:''},
    },
    {
     re:/(?:^|[^a-záéíóúüñ\s]+)\s*(yo)\s+(?:no\s+)?soy\s+([a-záéíóúüñ\-]+)\s*(?:[^a-záéíóúüñ\s]|$)/i,
     rta:{tpl:"¡Mi ${Nom} no es $2! Podrá ser mentiroso, puerco, idiota, $2, pero nunca una estrella de porno…",foto:'no es comunista'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ\s]+)\s*(?:mis?\s+)?([eé]l|ellos|eso)\s+(?:no\s+)?(es|son)\s+([a-záéíóúüñ\-]+)\s*(?:[^a-záéíóúüñ\s]|$)/i,
     rta:{tpl:"¡…$1 no $2 $3! Podrá ser mentiroso, puerco, idiota, $2, pero nunca una estrella de porno…",foto:'no es comunista'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ\s]+)\s*([a-záéíóúüñ\-_]+[aei]r)\s+(?:no\s+)?es\s+([a-záéíóúüñ\-_]+)\s*(?:[^a-záéíóúüñ\s]|$)/i,
     rta:{tpl:"¡$1 no es $2! Podrá ser mentir, pajearse, $2, pero nunca actuar en una porno…",foto:'no es comunista'},
    },
    {
     re:/(?:^|[^a-záéíóúüñ\s]+)\s*([a-záéíóúüñ\-_]*[aei]r)\s+(?:no\s+)?es\s+([a-záéíóúüñ\-_]+)\s*(?:[^a-záéíóúüñ\s]|$)/i,
     rta:{tpl:"",foto:''},
    },
    // Para el resto de los casos:
    {
     re:/(?:^|[^a-záéíóúüñ\s]+)\s*(?:mis?\s+)?(@?[a-záéíóúüñ\-\d]+)\s+(?:no\s+)?es\s+([a-záéíóúüñ\-_]+)\s*(?:[^a-záéíóúüñ\s]|$)/i,
     rta:{tpl:"¡Mi $1 no es $2! Podrá ser mentiroso, puerco, idiota, $2, pero nunca una estrella de porno…",foto:'no es comunista'},
    },

    {
     re:/(?:\$|d[oó]lar(?:ucos?)?e?s?)[\s0]*[1-9]\s*[\d]\s*[\d]\s*[\d]|[1-9]\s*[\d]\s*[\d]\s*[\d][\s\d]*(?:\$|d[oó]lar(?:ucos?)?e?s?)/i,
     rta:{tpl:"Me duelen los bolsillos…",foto:'Duelen los bolsillos'},
    },
    {
     re:/d[oó]lar(?:ucos?)?(?:es)?\s*compran?\s*muchos?/i,
     rta:{tpl:"¡Explica cómo!",foto:'Yo quería maní'},
    },
    {
     re:/(\d+) d[oó]lar(?:ucos?)?(?:es)?/i,
     rta:{tpl:"¿$1 dólares? ¡Yo quería maní!",foto:'Yo quería maní'},
    },

    { // Entra <md><palabra> y <md><palabra>, sólo puede haber espacios o guiones
     re:/(el|las?|los|mis?|tus?|sus?|un(?:os|as?)?)\s+([a-zñáéíóúü]+)[,…\s\-]+(el|las?|los|mis?|tus?|sus?|un(?:os|as?)?)\s+([a-zñáéíóúü]+)\s*(?:[^a-zñáéíóúü]|$)/i,
     fnRta:[Simpson,'rtaLaCaja1'], // Pero la función verifica que sean iguales.
    },
    { // Entre <md><palabra> y <md><palabra> debe haber o (aunque puede haber espacios y comas)
     re:/(el|las?|los|mis?|tus?|sus?|un(?:os|as?)?)\s+([a-zñáéíóúü]+)[,…\s\-]+o[,…\s\-]+(el|las?|los|mis?|tus?|sus?|un(?:os|as?)?)\s+([a-zñáéíóúü]+)\s*(?:[^a-zñáéíóúü]|$)/i,
     fnRta:[Simpson,'rtaLaCaja2'],
    },
/****
    {
     re:/(?:^|[^a-záéíóúüñ])(?:[^a-záéíóúüñ]|$)/i,
     rta:{tpl:"",foto:''},
     rtas:
      [
       10,{tpl:"",foto:''},
       10,{tpl:"",foto:''},
      ]
    },
    
****/
   ];

Simpson.rtaLaCaja1=function(coinc,ctx)
 {
  var r=coinc.captura;
  // Esta función sólo aplica cuando ambos textos son idénticos:
  // r[1] (era 1º md) se convierte en el 1º texto completo ('un lavarropas','',…)
  // pero invirtiendo el md si corresponde (mi<->tu)
  r[1]=[FeliStd.fnCbiaTuMi(r[1]),' ',r[2]].join('');
  // r[3] (era 2º md) se convierte en el 2º texto completo ('un lavarropas','',…)
  // pero invirtiendo el md si corresponde (mi<->tu)
  r[3]=[FeliStd.fnCbiaTuMi(r[3]),' ',r[4]].join('');
  if(r[1].toLowerCase()!=r[3].toLowerCase()) return null;
  r[1]=FeliStd.fnCbiaTuMi(r[1]);
  return {
    foto:'La caja',
    txt: ['¡',r[1].charAt(0).toUpperCase(),r[1].substr(1),', ',r[3],'!'].join('')
   };
 };

Simpson.rtaLaCaja2=function(coinc,ctx)
 {
  var r=coinc.captura;
  // r[1] (era 1º md) se convierte en el 1º texto completo ('un lavarropas','',…)
  // pero invirtiendo el md si corresponde (mi<->tu)
  r[1]=[FeliStd.fnCbiaTuMi(r[1]),' ',r[2]].join('');
  // r[3] (era 2º md) se convierte en el 2º texto completo ('un lavarropas','',…)
  // pero invirtiendo el md si corresponde (mi<->tu)
  r[3]=[FeliStd.fnCbiaTuMi(r[3]),' ',r[4]].join('');
  // Si al menos uno de los dos está en la lista:
  if((r[2] in Simpson.laCajaOrden)||(r[4] in Simpson.laCajaOrden))
   {
    // El valor en la lista para cada palabra, o 0 si no está
    r[2]=(r[2] in Simpson.laCajaOrden)?Simpson.laCajaOrden[r[2]]:0; // Primera palabra
    r[4]=(r[4] in Simpson.laCajaOrden)?Simpson.laCajaOrden[r[4]]:0; // Segunda palabra
   } else { // Si ninguna de las dos está en la lista:
    // Calcula hash para ambos textos completos (el '+' es una sal):
    r[2]=md5('+'+r[1]);
    r[4]=md5('+'+r[3]);
   }
  // Compara r[2] y r[4], y elige entre los textos completos.
  r[0]=(r[2]>r[4])?r[1]:r[3];
  // Genera el texto definitivo, poniendo en mayúscula la primera letra:
  r[0]=['¡',r[0].charAt(0).toUpperCase(),r[0].substr(1),', ',r[0],'!'].join('');
  return {txt:r[0],foto:'La caja'};
 };

module.exports=Simpson;