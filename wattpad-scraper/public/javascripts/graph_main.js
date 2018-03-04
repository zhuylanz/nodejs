let main_vue = new Vue({
	el : '#vue-region',

	data : {

	},

	methods : {
		
	}

});


//Graph API//
let fbInited = false;

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
	FB.init({
		appId      : '151517752267977',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.12'
	});

	FB.AppEvents.logPageView();

	FB.getLoginStatus(function(res) {
		fbInited = true;
		socket.emit('fb-login', res, fn => {console.log(fn)});

		if (res.status === 'connected') {
			// $('#btn-login').remove();
		} else if (res.status === 'not_authorized') {


		} else {

		}

	});

};

function fbEnsureInit(callback) {
	if(!fbInited) {
		setTimeout(function() {fbEnsureInit(callback);}, 50);
	} else {
		if(callback) {
			callback();
		}
	}
}

//Graph API//


//Socket IO//
let socket = io('/graph');
//Socket IO//

$(document).ready(function() {


	let app_id = '151517752267977';
	let app_scope = 'pages_messaging,public_profile,email,user_likes,user_posts,publish_actions,user_photos,manage_pages,publish_pages,read_page_mailboxes,pages_show_list,pages_manage_cta,pages_manage_instant_articles,ads_management,ads_read';
	let app_uri = 'http://localhost:3214/graph'

	function RequestLogin() {
		window.location = 'https://graph.facebook.com/oauth/authorize?client_id=' + app_id + '&scope=' + app_scope + '&redirect_uri=' + app_uri
	}

	function test() {
		// window.location = 'https://www.facebook.com/dialog/feed?app_id=151517752267977&display=page&caption=An%20example%20caption&link=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=http://localhost:3214/graph&to=100001350407726'
		FB.ui({
			method: 'share',
			link: 'https://developers.facebook.com/docs/',
			caption: 'An example caption',
			to: '100001350407726',
		}, function(response){});
	}

	// $('#btn-login').on('click', RequestLogin);
	$('#btn-login').on('click', test);

});
