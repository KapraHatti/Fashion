
var googleUser = {};
var UserType = '';

function SetUserType(value)
{
    UserType = value;
}

var glLogin = function () {
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: '967877955436-8slautdlns1sgo28d1uqipc4m2bl7rt0.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            //scope: 'profile email'
        });
        attachSignin(document.getElementById('btnGoogle'));
        attachSignin(document.getElementById('btnGoogleEx'));
    });
};

function attachSignin(element) {
    auth2.attachClickHandler(element, {},
        function (googleUser) {
            var profile = googleUser.getBasicProfile();
            var id_token = googleUser.getAuthResponse().id_token;
            PostData(id_token, 1);
        }, function (error) {});
}

//glLogin();

function fbLogin() {
    FB.login(function (response) {
        statusChangeCallback(response);
    }, { scope: 'email' });
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        PostData(response.authResponse.accessToken, 2);
    } 
}

window.fbAsyncInit = function () {
	FB.init({ appId: Token, cookie: true, xfbml: true, version: 'v2.9' });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function PostData(TokenID, SocialID) {
    $.ajax({
        type: "POST",
        url: "/signupother.aspx/AuthenticateUser",
        data: '{TokenID: "' + TokenID + '", SocialID: "' + SocialID + '", UserType: "' + UserType + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
        	window.location.href = response.d;
        },
        failure: function (response) {
            alert(response.d);
        }
    });
}

function OnSuccess(response) {
	window.location.href = "/signupother.aspx?asdasd";
	if (response != null & response.d != '') {
        	window.location.href = response.d;
    }
}
