//preview.js
$(preLoad);
var NUM_PREVIEWS = 10;
var preview_index = Math.floor(Math.random()*NUM_PREVIEWS);
var preview = new fileRequest();
var p;
var motion, inMotion=false;

function preLoad(){
 //we have JS enabled! clear the bg image :P
 $("#contDisp").css({"background":"none"});

 //load-in prev/next buttons and preview box
 $("#contDisp").html("<div id=\"oldBg\" class=\"bg\"></div><div id=\"prv\" class=\"button\"><span>&lt;</span></div><div id=\"preview\"><div id=\"local\"></div><div id=\"eng\"></div><div id=\"info\"></div></div><div id=\"nxt\" class=\"button\"><span>&gt;</span></div>");

 //make all-invisible until ready to load
 $("#contDisp>div").fadeTo(0,0);
 
 //load our previews into p! (once they're loaded of course)
 preview.onDocLoad = function(){
  p = parseDoc(preview.loadDock);
  $("#oldBg").fadeTo(0,1);
  loadControl();
  switchToNext();
 };
 
 //begin loading our previews
 preview.makeRequest("resources/previews.txt"); 
}



function loadControl(){
  $(".button").fadeTo(1000,1);
  $("#prv").bind("click",manualPrev);
  $("#nxt").bind("click",manualNext);
}

function switchToNext(){
  if(inMotion){return;}
  var i = preview_index;
  //Build innerHTML strings
  var locStr = "<span>"+p["l"][i][0]+"</span><br />"+p["l"][i][1].replace(/\\n/g,"<br />")+"...<br /><a href=\""+p["d"][i][0]+"\">"+p["l"][i][2]+"...</a>";
  var engStr = "<span>"+p["e"][i][0]+"</span><br />"+p["e"][i][1].replace(/\\n/g,"<br />")+"...<br /><a href=\""+p["d"][i][0]+"\">Read More...</a>";
  var infoStr = "<b>"+p["d"][i][1]+" :: "+p["d"][i][2]+"</b> <br /><i>"+p["l"][i][3]+" :: "+p["e"][i][2]+"</i>";
  
  inMotion = true;
  $("#preview").fadeTo(500,0,function(){
   //Change innerHTML
   $("#preview>#local").html(locStr);
   $("#preview>#eng").html(engStr);
   $("#preview>#info").html(infoStr);
   //swap the background picture
   swapBackground(p["d"][i][3],function(){
    $("#preview").fadeTo(500,1,function(){
     inMotion = false;
     preview_index = (i+1)%NUM_PREVIEWS;
     motion = setTimeout(switchToNext,10000);
    });
   });
  });
}

function swapBackground(swapTo,callback){
  $("#bg").attr("id","oldBg");
  $("#contDisp").prepend("<div id=\"bg\" class=\"bg\" style=\"background-image:url('resources/bg/"+swapTo+".jpg');\"></div>");
  $("#oldBg").fadeTo(1000,0,function(){
   $("#oldBg").remove();
   callback();
  });
}

function manualNext(){
 if(inMotion){return;}
  clearTimeout(motion);
  switchToNext();
}

function manualPrev(){
 if(inMotion){return;}
  clearTimeout(motion);
  preview_index -=2;
  preview_index = (preview_index<0)?preview_index+NUM_PREVIEWS:preview_index;
  switchToNext();
}
