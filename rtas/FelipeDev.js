"use strict";
var FelipeDev=module.exports;
var FeliStd=require('../FeliStd.js');

var formateaFecha=function(fecha)
 {
  try
   {
    var dt=new Date(1000*(fecha-3*60*60));
    var mm=dt.getUTCMonth()+1,
        dd=dt.getUTCDate(),
        hh=dt.getUTCHours(),
        ii=dt.getUTCMinutes(),
        ss=dt.getUTCSeconds();
        
    return [dd>9?'':'0',dd,'/', mm>9?'':'0', mm,'/',dt.getUTCFullYear(),' ',
            hh>0?'':'0',hh,':', ii>9?'':'0', ii,':', ss>9?'':'0',ss].join('');
    
   } catch(e) {
    console.log('Error al formatear fecha ',fecha,', e:',e);
    return undefined;
   }
 };
 
var RE=/(?:"((?:[^"\\]+|\\.)*)")|([{\[])|([}\]])|(:)|([+-]?\d+(?:\.\d*)?(?:e[+-]?\d+(?:\.\d*)?)?|0x\d+|true|false)|(,)/gi;
FelipeDev.JSONbeauty=function(o)
 {
  var match,r=[],retorna=[],indentado=0,tag='b',antEspecial=false,
      comentario='',tags=0;
  var s=('string'==typeof(o))?o:JSON.stringify(o);
  RE.lastIndex=0;
  
  while(match=RE.exec(s))
   r.push(match.map((el,i)=>{
     // Si hay demasiados tags, abre un nuevo mensaje.
     if(90<tags)
      {
       retorna.push(r.join(''));
       r=[];
       tags=0;
      }
     if(undefined===el) return '';
     var tmp=[el],desindentado=0,
      nuevaLínea=false,
      nuevoEspecial=false;
     
     switch(i)
      {
       case 1: //texto sin comillas
        nuevaLínea= ('b'==tag);
        tmp=['"<',tag,'>',el.replace(/&/gi,'&amp;').replace(/</gi,'&lt;').replace(/>/gi,'&gt;'),'</',tag,'>"'];
        tags++;
        if(nuevaLínea)
         switch(el)
          {
           case 'date': nuevoEspecial=1; break;
           case 'username': nuevoEspecial=2; break;
           case '': nuevoEspecial=3; break;
          }
        //finDeLínea=false; // Nunca hay fin de línea
        break;

       case 2: //abre
        //tmp=[el];
        indentado++;
        desindentado++;
        tag='b'; // El siguiente texto va en bastardilla (es un índice)
        nuevaLínea= ('b'==tag);
        //finDeLínea=true; // Siempre hay fin de línea
        break;

       case 3: //cierra
        if(indentado) indentado--; // Decrementa el identado;
        nuevaLínea=true;
        //finDeLínea=true; // Siempre hay fin de línea
        //tmp=[el];
        break;
        
       case 4: //:
        // El siguiente texto va en cursiva.
        tag='i';
        //tmp=[el];
        nuevaLínea=false;
        //finDeLínea=false; // Nunca hay fin de línea
        break;

       case 5: //número
         nuevaLínea= ('b'==tag);
         //además de comillas o bastardilla, va como código?
         tmp=['<',tag,'>',el,'</',tag,'>'];
         tags++;
         if(1==antEspecial)
          {
           comentario+=formateaFecha(el);
           antEspecial=false;
          }
        break;

       case 6: //coma
        tag='b';
        //tmp=[el];
        nuevaLínea=false;
        //finDeLínea=true; // Siempre hay fin de línea
        break;

       default: //0 (todo el match, lo ignora).
        nuevaLínea=false;
        return '';
      }
     if(nuevaLínea)
      {
       tmp.unshift('</code>');
       tmp.unshift.apply(tmp,Array((indentado-desindentado)%12).fill(' '));
       tmp.unshift('<code>');
       tags++;
       tmp.unshift("\n"); // Fin de línea anterior
       if(comentario) // Si había quedado un comentario, lo agrega antes de esta línea
        {
         tmp.unshift(' // ',comentario);
         comentario='';
        }
      }
     //if(finDeLínea) tmp.push("\n"); // Fin de línea
     if(nuevoEspecial) antEspecial=nuevoEspecial;
     return tmp.join('');
    }).join(''));
  if(r.length) retorna.push(r.join(''));
  return retorna;
 };

/** \brief Envía contexto del mensaje. **/
FelipeDev.rtaDebugRep=function(coinc,ctx)
 {
  var rep=FeliStd.recorrerRutaObjeto(ctx,['message','reply_to_message']);
  if(!rep) return {txt:'¿Cuál mensaje? Usá responder para que yo sepa.'};
  var rtas=FelipeDev.JSONbeauty(rep);
  if(1==rtas.length) return {txt:rtas[0],parse_mode:'HTML'};
  rtas=rtas.map((rta,i)=>{
    var o={txt:rta,parse_mode:'HTML'};
    if(i) o.reply_to_message_id=null;
    return o;
   });
  return rtas;
 };

