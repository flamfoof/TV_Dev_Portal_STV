var backEventListener = null;
var platforms = [
    "webos",
    "tizen"
]

var currentPlatform = "";
   
var root = ""
var deviceAgent = navigator.userAgent.toLowerCase();
var paths;
var header;

currentPlatform = platforms[0];

if(deviceAgent.match(/(webos)/))
{
    currentPlatform = platforms[0];
} else if (deviceAgent.match(/(tizen)/))
{
    currentPlatform = platforms[1];
}




setTimeout(Start, 550);

async function Start()
{
    //rootLink.txt contains the address to the s3 bucket
    root = await getPath ("rootLink.txt");
    
    //can get the local paths through pastebin or any online text editor
    paths = await getPath("pathLocation.txt");
    paths = await getPath(paths.toString());
    paths = paths.split("\n");

    var pathList = document.getElementById("path-list");

    console.log(pathList)
    console.log(paths)

    for(var i = 0; i < paths.length; i++)
    {
        var newNode = document.createElement("li");
        newNode.id = "li" + i;

        var linkNode = document.createElement("a");
        linkNode.id = "id" + i;
        linkNode.href = root + "path/" + "build_" + currentPlatform + "/" + paths[i] + "/index.html";
        // linkNode.href = "index.html";
        linkNode.innerHTML = paths[i]
        linkNode.style = "box-shadow:0 0;"

        newNode.appendChild(linkNode);

        pathList.appendChild(newNode);
    }

    console.log(pathList);
    //Change DOM elements to TV's DOM setup
    StartInit();
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

function StartInit()
{
    console.log("Start Init");
    header = document.head;
    var jsquery1 = document.createElement("script");
    jsquery1.type = "text/javascript";
    jsquery1.src = "./js/jquery-1.9.1.js";
    var jsquery2 = document.createElement("script");
    jsquery2.type = "text/javascript";
    jsquery2.src = "./js/jquery.mobile-1.3.2.js";
    
    header.appendChild(jsquery1)
    header.appendChild(jsquery2)
    
    setTimeout(StartInit1, 50)
}

function StartInit1()
{
    // var tvop = document.createElement("script");
    // tvop.type = "text/javascript";
    // tvop.src = "./js/TVOperation.js"
    // header.appendChild(tvop)
    $(document).bind( 'pageinit', init );
    setTimeout(StartInit2, 500);
}

function StartInit2()
{
    var header = document.head;
    var tvop = document.createElement("script");
    tvop.type = "text/javascript";
    tvop.src = "./js/TVOperation.js";
    header.appendChild(tvop);
}


//Initialize function
var init = function () {
    // register once
    if ( backEventListener !== null ) {
        return;
    }
    
    // TODO:: Do your initialization job
    console.log("init() called");

    
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
    setTimeout(function(){document.addEventListener( 'keydown', setFocusElement );$(document).unload( unregister );}, 800);
	
    
};

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
}