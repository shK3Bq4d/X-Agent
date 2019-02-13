var bHO;

var ff40 = {
    appVersion:        '5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1',
    userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1'
    };

var ie10 = {
    appVersion:        '5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)',
    userAgent: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)'
}
var lynx =   {
    appVersion:'2.8.7rel.2',
    userAgent: 'Lynx/2.8.7rel.2 libwww-FM/2.14 SSL-MM/1.4.1 OpenSSL/1.0.0a'
};
var chrome71linux = {
    appVersion:         "5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/71.0.3578.80 Chrome/71.0.3578.80 Safari/537.36",
    userAgent:  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/71.0.3578.80 Chrome/71.0.3578.80 Safari/537.36"
};
var chrome70win = {
    appVersion:         "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
    userAgent:  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
};
var chrome71macos = {
    appVersion:         "5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
    userAgent:  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
};

function get_bHO(host)
{
    bHO = navigator;
    if (false);
    else if (/^mail.nagra.com$/.test(host))          bHO = ff40;
    else if (/^www.whatismybrowser.com$/.test(host)) bHO = lynx;
    else if (/^web.whatsapp.com$/.test(host))        bHO = chrome70win;
    else if (/^.*\.apple\.com$/.test(host))          bHO = chrome71macos;

    return bHO;
}


var requestFilter = {
    urls: [
        "<all_urls>"
    ]
};

function host_from_url(url) {
    var bM = /^[^:]+:\/\/([^\/]+?)(?::\d+)?(?:\/.*)$/.exec(url);
    if (bM)
    {    return bM[1];
    }
    return url;
}

var b;
try
{    b =
        chrome &&
        chrome.webRequest &&
        chrome.webRequest.onBeforeSendHeaders &&
        chrome.webRequest.onBeforeSendHeaders.addListener
        ;
}
catch (e)
{    b = false;
}

if (b)
{
    chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
        var headers = details.requestHeaders;
        for(var i = 0, l = headers.length; i < l; ++i) {
            if( headers[i].name == 'User-Agent' ) {
                break;
            }
        }
        if(i < headers.length) {
            headers[i].value = get_bHO(host_from_url(details.url))['userAgent'];
        }
        return {requestHeaders: headers};
    }, requestFilter, ['requestHeaders','blocking']);
}
