//staff.js

// For the cool header pictures
function loadHead(){
  $("#contDisp").prepend("<table><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>");
  $("#contDisp>table>tbody").children().eq(2).children().eq(4).prepend("<div></div>");
}
loadHead();


// For the alums 
var prevMem = new fileRequest();
prevMem.onDocLoad = intializeOldMem;
prevMem.makeRequest("resources/staff/oldMem.txt");

var oldMemDat;

function intializeOldMem(){
 $("#contMain").append("<div class='heading'>previous members of the staff</div>Meet some of the previous members of the awesome Vagabond Staff!<br /><div id='oldMemHolder'></div>");
 oldMemDat = parseDoc(prevMem.loadDock)["m"];
 for(i=0;i<oldMemDat.length;i++){
  $("#oldMemHolder").append("<div class='oldMem' style=\"background-image:url('resources/staff/oldMem/"+oldMemDat[i][0]+".jpg')\" id=\"om"+i+"\"'></div>");
 }
 $(".oldMem").mouseenter(dataBox);
 $(".oldMem").mouseleave(destroyDataBox);
}

function dataBox(e){
  var i = parseInt(e.target.getAttribute("id").match(/[0-9]+/));
  $("#om"+i).html("<div class=\"dat\" id=\"omi"+i+"\"><b>"+oldMemDat[i][1]+"</b><br /><i>"+oldMemDat[i][2]+"</i><br /><span>"+oldMemDat[i][3]+"</span></div>");

}
function destroyDataBox(e){
  var i = parseInt(e.target.getAttribute("id").match(/[0-9]+/));
  $("#omi"+i).fadeTo(100,0);
}
