var last_focus_index = 0;
var mainfocus = 0;
var item_count = 0;
//number of footers
var button_count = 2;

var platforms = [
    "webos",
    "tizen"
]

//by default it is webos
var currentPlatform = "react";
   
var root = ""
var deviceAgent = navigator.userAgent.toLowerCase();
var paths;
var scrollByLength = 45;
var topIndex = 1;
var botIndex = 0;
var offsetLocation = window.scrollY;
var famousIframe = document.createElement('iframe')

document.getElementById("overlayMaster").appendChild(famousIframe)
famousIframe.frameBorder = 0;
famousIframe.id = "sheep";
document.getElementById("foo").focus();


setTimeout(function(){
    //For testing any functions

}, 500);



// console.log(window.parent)
// if(window.webOS)
// {   
//     if(window.webOS.platform.tv)
//     {
//         console.log("matches")
        
//         currentPlatform = platforms[0];
//     }
// } else if (deviceAgent.match(/(tizen)/))
// {
//     currentPlatform = platforms[1];
// }

TVOpsInit();

async function setFocusElement(e) {
	// console.log("setFocusElement : keyCode : " + e.keyCode);
	// console.log("mainfocus = " + mainfocus);

	switch (e.keyCode) {
		case TvKeyCode.KEY_ENTER:
            var link;
            var hrefDesc = $("#id"+mainfocus).attr("href");
            console.log(JSON.stringify($("#id"+mainfocus).attr("href")))

            if(hrefDesc == "refresh")
            {
                console.log("refresh");
                Refresh();
                return;
            }

            if(hrefDesc == "delete_cache")
            {
                console.log("Delete cache");
                DeleteCache();
                return;
            }

            var targetLink = "";

            console.log($("#id"+mainfocus).attr("href"));
            targetLink = $("#id"+mainfocus).attr("href");

            setTimeout(launch, 500, targetLink);
            break;
        case TvKeyCode.KEY_UP:
			if(mainfocus < item_count + 1 && mainfocus > 0){
				mainfocus = mainfocus - 1;
				hideItem(last_focus_index);
				showItem(mainfocus);
				last_focus_index=mainfocus;
			}
			break;
        case TvKeyCode.KEY_LEFT:
			if(mainfocus > item_count && mainfocus < item_count + button_count){
				if(mainfocus)
				mainfocus = mainfocus - 1;
				hideItem(last_focus_index);
				showItem(mainfocus);
				last_focus_index=mainfocus;
			}
	        break;
        case TvKeyCode.KEY_DOWN:
			if(mainfocus < item_count && mainfocus > -1){
				mainfocus = mainfocus + 1;
				hideItem(last_focus_index);
				showItem(mainfocus);
				last_focus_index=mainfocus;
			}
			break;
		case TvKeyCode.KEY_RIGHT:
			if(mainfocus > item_count - 1 && mainfocus < item_count + button_count - 1){
				mainfocus = mainfocus + 1;
				hideItem(last_focus_index);
				showItem(mainfocus);
				last_focus_index=mainfocus;
			}
            break;
    }
}

function showItem(index) {
    // console.log("Index selected: " + index);   
    // console.log("index selected: " + JSON.stringify($("#id"+mainfocus).attr("href"))) 
    var offsetChanged = false;
	$("#id" + index).addClass("ui-btn-active");
	$("#id" + index).addClass("ui-focus");
	$("#li" + index).addClass("ui-focus");
    
    botIndex = index;

    if(topIndex > botIndex)
    {
        topIndex = botIndex;
    }
    
    if(botIndex - topIndex > 12)
    {
        window.scrollBy(0, scrollByLength);
        if(offsetLocation != window.scrollY)
        {
            offsetLocation = window.scrollY;
            offsetChanged = true;
        }
        if(offsetChanged)
            topIndex++;
    } else if (botIndex - topIndex <= 3){
        window.scrollBy(0, -scrollByLength);
    }
}

function hideItem(index) {
	$("#id" + index).removeClass("ui-btn-active");
	$("#id" + index).removeClass("ui-focus");
	$("#li" + index).removeClass("ui-focus");
	if((index == item_count - 1) && $(".ui-btn-active").attr("id") && parseInt($(".ui-btn-active").attr("id").substr(2,1)) > item_count - 1){
		$(".ui-btn-active").removeClass("ui-btn-active");
	}
}

function TVOpsInit()
{
    console.log("page load complete!!!");
    item_count = $("ul[data-role='listview']").find("a").length;
    console.log(item_count);
    showItem(0);
    $(".ui-controlgroup-controls").attr("style", "width:50%");
    document.addEventListener( 'keydown', setFocusElement );
    
    if(deviceAgent.includes("tizen"))
    {   
        currentPlatform = platforms[1];
    } else if (window.webOS)
    {
        if(window.webOS.platform.tv)
        {
            console.log("matches")
            
            currentPlatform = platforms[0];
        }
    }
}

async function getPath(path) {
    var directory = path;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', directory, false); // false for synchronous request
    xmlHttp.send();
    var ret = xmlHttp.responseText;

    return ret;
}

async function writePath(path) {
    var directory = path;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', directory, false); // false for synchronous request
    xmlHttp.send();
    var ret = xmlHttp.responseText;

    return ret;
}

function launch(targetLink)
{
    //old way of opening the links
    // window.location.href = targetLink
    famousIframe.style = "left:0; top:0; display:block; z-index:10; position:absolute;";
    famousIframe.src = targetLink;
    famousIframe.height = '100%';
    famousIframe.width = '100%';
    famousIframe.contentWindow.tizen = window.tizen;
    famousIframe.focus();
    
    setTimeout(function(){
        famousIframe.contentWindow.tizen = tizen;
        console.log(famousIframe.contentWindow)

        //exterminates the main body of the dev portal
        document.getElementById("foo").remove();
    }, 1500);

    console.log("LOADING ASSIGNED")
}

function Refresh()
{
    window.location.href = "index.html";
}

async function DeleteCache()
{
    console.log("Deleted them all");
    var allLinks = document.links
    var linksList = [];
    var iframeList = [];
    var iframeHolder = document.getElementById("iframeHolder");

    for(var i = 0; i < allLinks.length; i++)
    {
        if(allLinks[i].href.startsWith("https://"))
            linksList.push(allLinks[i].href);
    }

    for(var i = 0; i < linksList.length; i++)
    {
        var iframe = document.createElement('iframe');
        iframe.src = linksList[i];
        iframe.id = linksList[i];
        iframeList.push(iframe);
        iframeHolder.appendChild(iframe);
    }

    await NukemDead();

    console.log("Done nuking");


    Refresh();

    async function NukemDead()
    {
        console.log(iframeList[0])
        for(var i = 0; i < iframeList.length; i++)
        {
            var iframe = iframeList[i];
            await sleep(50);
            iframe.contentWindow.localStorage.clear();
            await sleep(50);
            iframe.remove();
            console.log("cleared out iframe " + i + ": " + linksList[i])
        }
        await sleep (100);
        //delete the local portal cache
        localStorage.clear();
        sessionStorage.clear();
        console.log("Nuke the internal storage too")
        iframeList = null;
        await sleep(100);
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}