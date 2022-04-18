var backEventListener = null;
var platforms = [
    "webos",
    "tizen"
]

var currentPlatform = "";
   
var root = ""
var deviceAgent = navigator.userAgent.toLowerCase();
var webOS = deviceAgent.match(/(webos)/);
var tizen = deviceAgent.match(/(tizen)/);
var paths;

if(deviceAgent.match(/(webos)/))
{
    currentPlatform = platforms[0];
} else if (deviceAgent.match(/(tizen)/))
{
    currentPlatform = platforms[1];
}
    

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
}

async function Start()
{
    root = await getPath (String(Document.dir).replace("undefined", "") + "rootLink.txt");
    paths = await getPath (new URL(document.URL).toString().replace("index.html", "") + "/paths.txt");

    


}


async function getPath(path) {
    var directory = path;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', directory, false); // false for synchronous request
    xmlHttp.send();
    var ret = xmlHttp.responseText;

    console.log(ret);

    return ret;
}


  
//Initialize function
var init = function () {
    // register once
    if ( backEventListener !== null ) {
        return;
    }
    
    // TODO:: Do your initialization job
    console.log("init() called");

    Start()
    
    var backEvent = function(e) {
        if ( e.keyName == "back" ) {
            try {
                if ( $.mobile.urlHistory.activeIndex <= 0 ) {
                    // if first page, terminate app
                    unregister();
                } else {
                    // move previous page
                    $.mobile.urlHistory.activeIndex -= 1;
                    $.mobile.urlHistory.clearForward();
                    window.history.back();
                }
            } catch( ex ) {
                unregister();
            }
        }
    }
    
    // add eventListener for tizenhwkey (Back Button)
    document.addEventListener( 'tizenhwkey', backEvent );
    backEventListener = backEvent;
	document.addEventListener( 'keydown', setFocusElement );
};

$(document).bind( 'pageinit', init );
$(document).unload( unregister );
