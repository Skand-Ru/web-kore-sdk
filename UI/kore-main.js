(function($){

    $(document).ready(function () {
        function assertion(options, callback) {
            var jsonData = {
                "clientId": options.clientId,
                "identity": options.userIdentity,
                "aud": "",
                "isAnonymous": true
            };
            //url: options.JWTUrl
            $.ajax({
                url: options.JWTUrl,
                type: 'post',
                data: JSON.stringify({
                    iss: options.clientId,
                    sub: options.userIdentity,
                    aud: "",
                    isAnonymous: true
                }),
                dataType: 'json',
                headers:{
                    'client_id':'d28df4c5608a48bca0564b795793fcd4',
                    'client_secret':'8Ec3fAFbbB434473B293d739468D9880',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                success: function (data) {
                    console.log(data.jwt);
                    options.assertion = data.jwt;
                    options.handleError = koreBot.showError;
                    options.chatHistory = koreBot.chatHistory;
                    options.botDetails = koreBot.botDetails;
                    callback(null, options);
                    setTimeout(function () {
                        if (koreBot && koreBot.initToken) {
                            koreBot.initToken(options);
                        }
                    }, 2000);
                },
                error: function (err) {
                    koreBot.showError(err.responseText);
                }
            });
        }
        function getBrandingInformation(options) {
            if (chatConfig.botOptions && chatConfig.botOptions.enableThemes) {
                var brandingAPIUrl = (chatConfig.botOptions.brandingAPIUrl || '').replace(':appId', chatConfig.botOptions.botInfo._id);
                $.ajax({
                    url: brandingAPIUrl,
                    headers: {
                        'Authorization': "bearer " + options.authorization.accessToken,
                    },
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        if(koreBot && koreBot.applySDKBranding) {
                            koreBot.applySDKBranding(data);
                        }
                        if (koreBot && koreBot.initToken) {
                            koreBot.initToken(options);
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }

        }
        function onJWTGrantSuccess(options){
            getBrandingInformation(options);
        }
        var chatConfig=window.KoreSDK.chatConfig;
        chatConfig.botOptions.assertionFn=assertion;
        chatConfig.botOptions.jwtgrantSuccessCB = onJWTGrantSuccess;
        var koreBot = koreBotChat();
        koreBot.show(chatConfig);
        $('.openChatWindow').click(function () {
            koreBot.show(chatConfig);
        });
    });

})(jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery));