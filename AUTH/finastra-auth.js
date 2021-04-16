var urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('authURL')) {
    var windowOpen = urlParams.get('authURL') + '&client_id=' + urlParams.get('client_id') + '&redirect_uri=' + urlParams.get('redirect_uri') + '&scope=' + urlParams.get('scope');
    console.log(windowOpen);
    // var windowOpen = urlParams.get('authURL') + '&client_id=' + urlParams.get('client_id') +&redirect_uri='+urlParams.get('redirect_uri');
    if (windowOpen !== "" && windowOpen !== undefined) {
        var childWindow = window.open(windowOpen, '', 'height=570,width=520');
        var myinterval = setInterval(function () {
            redirectionSuccessfull();
        }, 1500);
    }
}

function redirectionSuccessfull() {
    var success = (childWindow.location.href.split("#")[1] || "");
    if (success === 'success') {
        childWindow.close();
        window.location.href = '/bankingsolution/UI/'
        clearInterval(myinterval);
        //   excutingChatWindow();
    }
}