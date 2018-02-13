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
		console.log(res);
		if (res.status === 'connected') {

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

fbEnsureInit(function(){FB.api('/113124472034820', (res) => {console.log(res)});});
//Graph API//


$(document).ready(function() {


	let app_id = '151517752267977';
	let app_scope = 'pages_messaging,public_profile,email,user_likes,user_posts,publish_actions,user_photos,manage_pages,publish_pages,read_page_mailboxes,pages_show_list,pages_manage_cta,pages_manage_instant_articles,ads_management,ads_read';
	let app_uri = 'http://localhost:3214/graph'

	function RequestLogin() {
		window.location = 'https://graph.facebook.com/oauth/authorize?client_id=' + app_id + '&scope=' + app_scope + '&redirect_uri=' + app_uri
	}

$('#btn-login').on('click', RequestLogin);

});
