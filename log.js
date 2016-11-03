var FS=require('fs');
module.exports=function(filename,duplicate_to_console,per_day_log)
 {
  var fn,ws;
  // Devuelve la fecha en formato YYYYMMDD.
  var day=function()
   {
    var nw=new Date();
    var mm=nw.getMonth()+1,
        dd=nw.getDate();
    return [nw.getFullYear(), mm>9?'':'0', mm, dd>9?'':'0',dd].join('');
   };
  // Devuelve el nombre de archivo de log, incluyendo fecha si corresponde.
  var dayfn=function() {return per_day_log?[filename,'.',day(),'.log'].join(''):filename};
  // Actualiza el nombre de archivo actual, y el objeto WriteStream correspondiente.
  var upd=function() {fn=dayfn();ws=FS.createWriteStream(fn,{flags:'a'});};
  
  // Inicia el archivo:
  upd();

  this.log=function()
   {
    // Si corresponde, pasar los argumentos a console
    if(duplicate_to_console) console.log.apply(console,arguments);
    
    // Comprueba archivo, si es otro, lo cambia
    if(per_day_log&&(dayfn()!=fn)) upd();
    
    // Crea un array con los argumentos
    var args=[].slice.apply(arguments);
    // Le antepone el tiempo actual (nota: no puede usarse concatenado a lo anterior, porque devuelve el argumento y no el objeto)
    args.unshift(Date.now());
    ws.write([JSON.stringify(args),",\n"].join(''));
   };
 };