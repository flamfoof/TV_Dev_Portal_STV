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

    //Setting Refresh and Delete cache to the end of the IDs
    document.getElementById("id99").id = "id" + (paths.length);
    document.getElementById("id100").id = "id" + (paths.length + 1);

    //Creating the elements for the paths 
    CreatePathsListItems(paths, pathList);

    //Change DOM elements to TV's DOM setup
    await sleep(100);
    console.log("Starting the jquery")
    await StartInit();

    console.log("Initiate page load")
    await StartInit1();

    console.log("Starting the tvops script")
    await StartInit2();
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

async function StartInit()
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
    await sleep(200);
    header.appendChild(jsquery2)
}

async function StartInit1()
{
    //Wait for jquery to load
    await sleep(1000);
    init();
}

async function StartInit2()
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
    
    $(document).unload( unregister );
};

function CreatePathsListItems(paths, pathsList)
{

    for(var i = 0; i < paths.length; i++)
    {
        var newNode = document.createElement("li");
        newNode.id = "li" + i;

        var linkNode = document.createElement("a");
        linkNode.id = "id" + i;
        linkNode.href = root + "path/" + "build_" + currentPlatform + "/" + paths[i] + "/index.html";
        linkNode.innerHTML = paths[i]
        linkNode.style = "box-shadow:0 0;"

        if(i == 0)
        {
            linkNode.classList.add("ui-btn-active");
            linkNode.classList.add("ui-state-persist");
        }

        newNode.appendChild(linkNode);

        pathsList.appendChild(newNode);
    }
}

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
