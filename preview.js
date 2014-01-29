//preview.js
//this file makes use of code from loadFile.js

/**
 *  @var NUM_PREVIEWS	constant for when the number of previews in preview text is updated
 *  @var preview_index	the index of the current preview to display
 *  @var preview	the fileRequest object that loads the previews asynchronously from the page
 *  @var p		holds outputted data from preview
 *  @var motion		holds the setTimeout object to be cleared if in need of interrupting cycle
 *  @var inMotion	boolean to lock functions if currently switching between 
 **/
$(preLoad);
var NUM_PREVIEWS = 8;
var preview_index = Math.floor(Math.random()*NUM_PREVIEWS);
var preview = new fileRequest();
var p;
var motion, inMotion=false;

/**
 * preLoad() is triggered with the document body's 'load' event
 * to begin the intialization of the preview widget on the index
 * page; preLoad loads the back and forth controls
 *   
 **/
function preLoad(){
 //We have JS enabled! Clear the background image and prepare for the preview display
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

/**
 * loadControl() loads the forward and backwards buttons for
 * the previews in the header
 **/
function loadControl(){
  $(".button").fadeTo(1000,1);
  $("#prv").bind("click",manualPrev);
  $("#nxt").bind("click",manualNext);
}

/**
 * switchToNext() is a self-repeating function that transitions
 * from the current preview to the next preview
 **/
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
   //Swap the background picture
   swapBackground(p["d"][i][3],function(){
    $("#preview").fadeTo(500,1,function(){
     inMotion = false;
     preview_index = (i+1)%NUM_PREVIEWS;
     motion = setTimeout(switchToNext,10000);
    });
   });
  });
}

/**
 * swapBackground swaps the div holding the background image 
 * of the current the preview to a new one that has the image
 * of the upcoming preview
 * @arg	swapSrc		is the name of the background image of the 
 *			upcoming preview
 * @arg callback	is the function to callback after the
 *			background images is swapped
 **/
function swapBackground(swapSrc,callback){
  $("#bg").attr("id","oldBg");
  $("#contDisp").prepend("<div id=\"bg\" class=\"bg\" style=\"background-image:url('resources/bg/"+swapSrc+".jpg');\"></div>");
  $("#oldBg").fadeTo(1000,0,function(){
   $("#oldBg").remove();
   callback();
  });
}

/**
 * manualNext() interrupts the natural cycle and changes the 
 * preview screen from the current to the next preview
 **/
function manualNext(){
 if(inMotion){return;}
  clearTimeout(motion);
  switchToNext();
}

/**
 * manualPrev() interrupts the natural cycle and changes the 
 * preview screen from the current to the previous preview
 **/
function manualPrev(){
 if(inMotion){return;}
  clearTimeout(motion);
  preview_index -=2;
  preview_index = (preview_index<0)?preview_index+NUM_PREVIEWS:preview_index;
  switchToNext();
}
