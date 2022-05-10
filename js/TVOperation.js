var last_focus_index = 0;
var mainfocus = 0;
var item_count = 0;
var button_count = 3;

var platforms = [
    "webos",
    "tizen"
]

var currentPlatform = "";
   
var root = ""
var deviceAgent = navigator.userAgent.toLowerCase();
var paths;

if(deviceAgent.match(/(webos)/))
{
    currentPlatform = platforms[0];
} else if (deviceAgent.match(/(tizen)/))
{
    currentPlatform = platforms[1];
}

async function setFocusElement(e) {
	console.log("setFocusElement : keyCode : " + e.keyCode);
	console.log("mainfocus = " + mainfocus);
	switch (e.keyCode) {
		case TvKeyCode.KEY_ENTER:
            var link;
            var linkRoot = $("#id"+mainfocus).attr("href").replace("index.html", "");
            var innerHTMLNodes = await getPath($("#id"+mainfocus).attr("href"));
            // innerHTMLNodes = innerHTMLNodes.replace('<script defer="defer" src="./static/js/main.2fc20282.js"></script>', '<script type="text/javascript" src="./static/js/main.2fc20282.js"></script>')
            
            var targetLink = "https://tvapps-hd.s3.amazonaws.com/path/build_tizen/SMTV-500/index.html";

            //due to innerHTMLNodes not having a replaceAll() function, this will do...........
            for(var i = 0; i < 10; i++)
            {
                innerHTMLNodes = innerHTMLNodes.replace("./static", linkRoot + "static");
            }
            
            //Trying ways to store the modified file since DOM modifications not working.
            switch(currentPlatform)
            {
                case "webos":
                    break;
                case "tizen":
                    // try{
                        // var localRoot = tizen.filesystem.toURI("wgt-private-tmp");

                        // // function errorCallback(error)
                        // // {
                        // //   console.log("An error occurred, during directory listing: " + error.message);
                        // // }
                        
                        // // function successCallback(files, path)
                        // // {
                        // //     console.log("wtf")
                        // //   console.log("Found directories in " + path + " directory:");
                        // //   for (var i = 0; i < files.length; i++)
                        // //   {
                        // //     console.log(files[i]);
                        // //   }
                        // // }
                        // // tizen.filesystem.listDirectory(localRoot, successCallback, errorCallback);
                        
                        // console.log(localRoot + "/dummy.html");
                        
                        // var fileHandleWrite = tizen.filesystem.openFile(localRoot + "/dummy.html", 'r');
                        // // tizen.filesystem.deleteFile(localRoot+ "/dummy.html")
                        // console.log('File opened for writing');
                        

                        // var stringToWrite = 'example string';
                        // fileHandleWrite.writeString(innerHTMLNodes);
                        
                        // console.log(fileHandleWrite.readString())
                        // targetLink = localRoot + "/dummy.html"


                    // } catch(e)
                    // {
                    //     console.log("Tried to read file from tizen: " + e)
                    // }
                    break;
                default:
                    console.log("Nothing??")
                    break;
            }
            


            console.log($("#id"+mainfocus).attr("href"));
            targetLink = $("#id"+mainfocus).attr("href");
            console.log(innerHTMLNodes);
            

            //Set the link element to the retrieved index.html's dom
            link = document.implementation.createHTMLDocument("SelectTV").documentElement;
            // link.innerHTML = innerHTMLNodes;
            
            //Checking if the data is correct
            console.log(link.querySelector("body"));
            // document.querySelector("body").innerHTML = link.querySelector("body").innerHTML;
            
            //Replacing the current doc's dom with the index.html's from the server.
            document.documentElement.removeChild(document.head);
            document.documentElement.removeChild(document.body);
            document.documentElement.appendChild(link.querySelector("head"))
            document.documentElement.appendChild(link.querySelector("body"))
            
            // window.location.href = $("#id"+mainfocus).attr("href");
            console.log($("#id"+mainfocus).attr("href"))
            setTimeout(launch, 1500, targetLink);
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
	$("#id" + index).addClass("ui-btn-active");
	$("#id" + index).addClass("ui-focus");
	$("#li" + index).addClass("ui-focus");
}

function hideItem(index) {
	$("#id" + index).removeClass("ui-btn-active");
	$("#id" + index).removeClass("ui-focus");
	$("#li" + index).removeClass("ui-focus");
	if((index == item_count - 1) && $(".ui-btn-active").attr("id") && parseInt($(".ui-btn-active").attr("id").substr(2,1)) > item_count - 1){
		$(".ui-btn-active").removeClass("ui-btn-active");
	}
}

$(document).ready(function(){
     console.log("page load complete!!!");
	 item_count = $("ul[data-role='listview']").find("a").length;
	 console.log("li count = " + item_count);
	 showItem(0);
	 $(".ui-controlgroup-controls").attr("style", "width:50%");
});

//ui-btn-active km_focusable


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
    window.location.href = targetLink;
}