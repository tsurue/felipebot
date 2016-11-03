var FeliCalc=module.exports;
var RE1=/(\s*([+\-]?)\s*(\d+(?:\.\d*)?)(\s*e\s*([+\-]?\s*\d+(?:\.\d*)?))?|\s*[\(-\+\-\/\^]\s*)+/i;
var RE2=/\s*([+\-]?)\s*(\d+(?:\.\d*)?)(?:\s*e\s*([+\-]?\s*\d+(?:\.\d*)?))?|\s*([\(-\+\-\/\^])\s*/gi;
FeliCalc.rtaCalc=function(coinc,ctx)
 {
  var capt=coinc.captura[coinc.captura.length-1];
  capt=RE1.exec(capt)[0];
  var a,tk=[];
  RE2.lastIndex=0;
  while(a=RE2.exec(capt))
   {
    tk.push(a);
   }
  return {
    parse_mode:'HTML',
    txt:['<pre>',JSON.stringify(tk),'</pre>'].join(''),
   };
 };