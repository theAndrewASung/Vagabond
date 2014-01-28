//date.js

var langArr, currLang;
var skipPrime = 5; // 31 lang, 5 = prime;
var dateFile = new fileRequest();
dateFile.onDocLoad = dateWidgetIntialize;
dateFile.makeRequest("resources/date.txt");

/**
 * dateWidgetIntialize intializes the Date Widget
 * > triggered when the date.txt file has been loaded from
 *   the server
 * > parses the loaded information into a dictionary of arrays
 *   
 **/
function dateWidgetIntialize(){
 langArr = parseDoc(dateFile.loadDock)["l"];
 for(i=0;i<langArr.length;i++){
  langArr[i][3] = getDateStr(langArr[i]);
 }
 currLang = Math.floor(Math.random()*langArr.length);
 setTimeout(cycle,2000);
}

/**
 * getDateStr converts the format string provided in the
 * language date data into the current date
 **/
function getDateStr(langDat){
 var date = new Date();
 var splitPat = new RegExp("\s*,\s*","g");
 var dateStr = langDat[3];
 langDat[4] = langDat[4].split(splitPat);
 langDat[5] = langDat[5].split(splitPat);
 langDat[6] = langDat[6].split(splitPat);
 
 //Replace the numeric date values...
 dateStr = dateStr.replace(/{y}/,date.getFullYear()).replace(/{m}/,date.getMonth()+1).replace(/{d}/,date.getDate());

 //If the months have names...
 if((/{M}/).test(dateStr)){
  dateStr = dateStr.replace(/{M}/,langDat[4][date.getMonth()]);
 }
 
 //If the weekdays have names...
 if((/{w}/).test(dateStr)){
  dateStr = dateStr.replace(/{w}/,langDat[5][date.getDay()]);
 }
 
 //If there is a non-Arabic numeral system...
 if((/{n}/).test(dateStr)){
  dateStr = dateStr.replace(/{n}/,"");
  for(j=0;j<10;j++){
   dateStr = dateStr.replace(j,langDat[6][j]);
  }
 }
 
 //If dates are expressed with a cardinal suffix...
 if((/{dc}/).test(dateStr)){
  var d = date.getDate();
  dateStr = dateStr.replace(/{dc}/,d+langDat[6][parseInt(langDat[6][0][d-1])]);
 }
 return dateStr;
}

function fadeAndReplace(){
 currLang = (currLang+skipPrime)%langArr.length;
 var e = langArr[currLang];
 $("#dateBox>div").fadeTo(1000,0,function(){
  $("#dateBox>div").html("<div>"+e[2]+"!</div>"+e[3]+"<br /><span> :"+e[0]+"::"+e[1]+": </span>");
 }).fadeTo(1000,1);
}

function cycle(){
 fadeAndReplace();
 setTimeout(cycle,10000);
}
