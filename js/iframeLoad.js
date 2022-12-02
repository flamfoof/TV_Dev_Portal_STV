setTimeout(Start, 550);

async function Start()
{
    var portalUrl = await getPath("portalLocation.txt");
//document.getElementById("iframeHolder").contentWindow.location.href="https://tvapps-hd.s3.amazonaws.com/path/build_react/Felix_test/index.html"
    var iframeTarget = document.getElementById("iframeHolder");
    iframeTarget.setAttribute("src", portalUrl);
    iframeElem.style.display = 'block';
    iframeTarget.focus();
    iframeTarget.addEventListener( "load", function(e) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        var fetchJson = fetch("https://api-services.freecast.com/auth/api/v1/watch-freecast-com/android/jwt/", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                var json = JSON.parse(result);
                iframeTarget.contentWindow.localStorage.setItem("token", json.access)
                iframeTarget.contentWindow.localStorage.setItem("refreshToken", json.refresh)
                console.log("set the storage: " + json.access)

        })
          .catch(error => console.log('error', error));
        if(iframeTarget.contentWindow.tizen == undefined)
        {
            iframeElem.style.display = 'block';
            iframeTarget.focus();
            console.log("more loaded fries");
            setTimeout(function() {
                iframeTarget.contentWindow.tizen = window.tizen;
            }, 100)
        }
    });
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