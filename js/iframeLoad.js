setTimeout(Start, 550);

async function Start()
{
    var portalUrl = await getPath("portalLocation.txt");
    var iframeTarget = document.getElementById("iframeHolder");
    iframeTarget.setAttribute("src", portalUrl);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPath(path) {
    var directory = path;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', directory, false); // false for synchronous request
    xmlHttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xmlHttp.send();
    var ret = xmlHttp.responseText;

    console.log(ret);

    return ret;
}