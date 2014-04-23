//header.js
//$(preLoad);
var NUM_PREVIEWS = 1;
var preview_index = Math.floor(Math.random()*NUM_PREVIEWS);
//var preview = new fileRequest();
var p =   {e: ["tears and goodbye",
               "and thus another from our world is swept to the next in a calmly passing tide\nthe world quakes beneath the tears we've wept, our solemn cries echo over the snow draped land\nall falls silent in this peaceful night - waves of the moonlit seas subside\nblinded by tears we try to find our sight, to search amongst the stars for where you now stand",
              "Finnish"],
           l: ["Kyyneleistä ja hyvästeistä",
               "niin taas yksi kuolevaisten piiristä toiseen katoaa\nkaikuu itku surevaisten, kantaa halki tyventen vesien\nkaikkialla vaietaan – ei meressä yhtä aaltoa\nkauniin yön kirkkaimmista tähdistä sinua etsien",
               "Lisää",
               "Suomi"],
           d: ["http://joom.ag/F60X/p6",
               "Karlong Chan",
               "Spring 2013",
               "plane"]
          };

var motion, inMotion=false;

function preLoad(){
 //we have JS enabled! clear the bg image :P
 $("#headerDisplay").css({"background":"none"});

 //load-in prev/next buttons and preview box


 //make all-invisible until ready to load
// $("#headerDisplay>div").fadeTo(0,0);
/* 
 //load our previews into p! (once they're loaded of course)
 preview.onDocLoad = function(){
  p = parseDoc(preview.loadDock);
  $("#oldBg").fadeTo(0,1);
  loadControl();
  switchToNext();
 };
 
 //begin loading our previews
 preview.makeRequest("resources/previews.txt"); */
// loadControl();
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
  $("#headerDisplay").prepend("<div id=\"bg\" class=\"bg\" style=\"background-image:url('resources/bg/"+swapTo+".jpg');\"></div>");
  $("#oldBg").fadeTo(1000,0,function(){
   $("#oldBg").remove();
   callback();
  });
}

//Create the controls for backwards/forwards
function createControls(){
  $(".button").fadeTo(1000,1);
  $("#prv").bind("click",manualPrev);
  $("#nxt").bind("click",manualNext);
}
//""
function manualNext(){
 if(inMotion){return;}
  clearTimeout(motion);
  switchToNext();
}

function manualPrev(){
 if(inMotion){return;}
 clearTimeout(motion);
 preview_index -=2;
 if(preview_index<0){
  preview_index = preview_index+NUM_PREVIEWS;
 }
 switchToNext();
}

function pushNextFrame(callback){
  //Push the lastFrame to become a plain deadFrame
  $(".lastFrame").removeClass("lastFrame").addClass("deadFrame").fadeTo(0,0);
  
  //Make the nextFrame visible
  $(".nextFrame").fadeTo(0,1);
  
  //Push the currentFrame to become the lastFrame
  $(".currentFrame").removeClass("currentFrame").addClass("lastFrame");
  
  //Fade out the lastFrame, i.e. what was the currentFrame
  $(".lastFrame").fadeTo(500,0,callback);
  
  //Make the nextFrame the new currentFrame
  $(".nextFrame").removeClass("nextFrame").addClass("currentFrame");
}
function homePageOverride(){
  //Override pushNextFrame system for the preview screen's use
  
  createControls();
  //LastFrame 
  
}
