//loadFile.js

/**
 * The fileRequest object is used to make a request for a certain
 * file. Multiple fileRequests can thus make asynchronous requests
 * for multiple files.
 **/

function fileRequest(){
 /**
  * @var httpRequest: httpRequest object used as pathway for 
  *                   XMLHttpRequest/ActiveX communication
  * @var loadState:   state of the loading process:
  *                   0 = httpRequest not set up
  *                   1 = load error
  *                   2 = load ready
  * @var loadDock:    Holds information loaded by httpRequest
  *                   (only valid if loadState = 2)
  * @var onDocLoad:   The function to be called when the file
  *                   has been loaded
  **/
 this.httpRequest = null;
 this.loadState = 0;
 this.loadDock = null;
 this.onDocLoad = function(){};

 /**
  * makeRequest begins an asynchronous request to server
  * @param filename:  the name/path of the file to request
  * 
  * Note: this function does not throw an error but can 
  *       forward errors to onDocLoad
  **/
 this.makeRequest = makeRequest;
 /**
  * __docLoad specifies a callback function for when a document
  * has been loaded via makeRequest() [private function, not to be called]
  * @param callback:  the function to execute once a document is loaded
  * 
  * @throws:          error if the document fails to load
  **/
 this.__docLoad=__docLoad;
}

function makeRequest(filename){
 if(window.XMLHttpRequest){
  this.httpRequest = new XMLHttpRequest();
 }else if(window.ActiveXObject){
  try{
   this.httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
  }catch(e){
   try{
    this.httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
   }catch(e){this.loadState = 1; return;}
  }
 }else{this.loadState = 1; return;}
 
 if(!this.httpRequest){this.loadState = 1; return;}
 this.httpRequest.onreadystatechange = (function(){
  if(this.httpRequest.readyState===4){
   if(this.httpRequest.status===200){
    this.loadState = 2;
    this.loadDock = this.httpRequest.responseText;
   }
   else if(this.httpRequest.status%100>2){
    this.loadState = 1;
    return;
   }
  }
 }).bind(this);
 this.httpRequest.open('GET',filename,'true');
 this.httpRequest.send(null);
 this.__docLoad(this.onDocLoad);
}

function __docLoad(callback){
 if(this.loadState == 0){
  var n = setTimeout(__docLoad.bind(this,callback),1);
 }else if(this.loadState == 1){
  throw new Error("Document could not be loaded via XMLHttpRequest");
 }else {
  try{
   callback();
  }catch(e){}
 }
}

/**
 * parseDoc parses received data into dictionaries of arrays
 * @param doc:    the document to be parsed into an array
 * @return        a dictionary with tag names as keys and
 *                an array of entries corresponding to those
 *                tags
 **/
function parseDoc(doc){
 var commentPattern = /\|\*.*\*\|/g, tagPattern = /\s*(\|[a-z]+)\|\s*/g, arrPattern = /\s*\|\|\s*/g;
 var noCommentsDoc = doc.replace(commentPattern,"");
 var parts = noCommentsDoc.split(tagPattern);
 var parsedDoc = {};
 for(i=1;i<parts.length;i++){ //i=1, ignore header information
  if(parts[i][0] == "|"){//is a tag
   if(parsedDoc[parts[i][1]]==null){
    parsedDoc[parts[i][1]] = new Array();
   }
   parsedDoc[parts[i][1]].push(parts[++i].split(arrPattern));
  }
 }
 return parsedDoc;
}

function loading(obj,index){
 if(index == null) index = 0;
 var lstr = "--/--/".substring(index,index+4);
 $(obj).html(lstr+" Loading "+lstr);
 var timer = setTimeout(function(){loading(obj,(index+1)%3);},500);
 return timer;
}
