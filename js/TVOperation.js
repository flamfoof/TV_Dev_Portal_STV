// import * as AWS from 'aws-sdk';
// import * as fs from 'fs';
// import * as path from 'path';

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
var scrollByLength = 50;
var topIndex = 1;
var botIndex = 0;
var offsetLocation = window.scrollY;
var famousIframe = document.createElement('iframe')
var tizenLibSet = false;

document.body.appendChild(famousIframe)
famousIframe.frameBorder = 0;
famousIframe.id = "sheep";
document.getElementById("foo").focus();

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
    
    if(botIndex - topIndex > 6)
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
/*write path to directory*/
async function writePath(path) {
    var directory = path;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', directory, false); // false for synchronous request
    xmlHttp.send();
    var ret = xmlHttp.responseText;

    return ret;
}

async function launch(targetLink)
{
    if(currentPlatform == "webos")
    {
        //old way of opening the links
        window.location.href = targetLink
    } else {
        window.location.href = targetLink
        // famousIframe.style = "display:block;";
        // famousIframe.src = targetLink;
        // // console.log(famousIframe.contentWindow.tizen)
        // $(famousIframe).on('load', function() {
        //     console.log("loaded")
        //     famousIframe.contentWindow.tizen = tizen;
        //     console.log(famousIframe.contentWindow)
        //     famousIframe.focus();

        // //     window.tizen.tvinputdevice.getSupportedKeys().forEach((e) => {
        // //         if (e.code >= '0'.charCodeAt(0) && e.code <= '9'.charCodeAt(0)) {
        // //             window.tizen.tvinputdevice.registerKey(e.name);
        // //         }
        // //         if (
        // //         [
        // //             19,
        // //             415,
        // //             10252,
        // //         ].includes(e.code)
        // //         ) {
        // //             window.tizen.tvinputdevice.registerKey(e.name);
        // //         }
        // //     });
            
        //     setTimeout(function(){
        //         //exterminates the main body of the dev portal
        //         // document.getElementById("foo").remove();
        //         document.getElementById("foo").style.display="none";
        //     }, 500)
        // })

        // asyncDownloadAWSBucketFolder(targetLink.replace("index.html", ""), 'us-east-1', tizen.filesystem.getDirName("wgt-private"))
        // })
    }
    // while(!famousIframe.contentWindow.tizen)
    // {
    //     console.log(famousIframe.contentWindow.tizen)
    //     await sleep (1);
    // }
    // console.log(famousIframe.contentWindow.tizen)
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

// async function asyncDownloadAWSBucketFolder(location, bucket, destination) {
//     const s3 = new AWS.S3();
//     console.log("destination: " + destination)
//     const params = {
//         Bucket: bucket,
//         Prefix: location
//     };
//     const objects = await s3.listObjectsV2(params).promise();
//     const promises = objects.Contents.map(async (object) => {
//         const params = {
//             Bucket: bucket,
//             Key: object.Key
//         };
//         const file = await s3.getObject(params).promise();
//         const filePath = path.join(destination, object.Key);
//         fs.writeFileSync(filePath, file.Body);
//         return filePath;
//     });
//     return Promise.all(promises);
// }

// function copyFiles(from, to)
// {
//     function errorCallback(error)
//     {
//         console.log("An error occurred, during copy operation: " + error.message);
//     }

//     function successCallback(path)
//     {
//         console.log("The file has been copied, path to copied file: " + path);
//         /* File copy can now be accessed. */
//     }

//     try
//     {
//         tizen.filesystem.copyFile(from, to, true, successCallback, errorCallback);
//     }
//     catch (error)
//     {
//         console.log("Copy operation cannot be performed: " + error.message);
//     }
// }