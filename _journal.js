//>FACEBOOK AUTOMATION HTTP REQUESTS:
//>>On Browser:
//--GENERATOR--
fb_dtsg_list = document.getElementsByName('fb_dtsg');
if (fb_dtsg_list.length > 0) {
	profile_id = document.cookie.match(/c_user=(\d+)/)[1];
	fb_dtsg = fb_dtsg_list[0].value;
	__dyn = '';
	if (document.head.innerHTML.split('"client_revision":')[1]) {
		__rev = document.head.innerHTML.split('"client_revision":')[1].split(",")[0];
	} else {
		__rev = rand(1111111, 9999999);
	}
	jazoest = '';
	for (var x = 0; x < fb_dtsg.length; x++) {
		jazoest += fb_dtsg.charCodeAt(x);
	}
	jazoest = '2' + jazoest;
	__spin_r = __rev;
	__spin_t = Math.floor(Date.now() / 1000);
}

//UNFRIEND REQUEST
$.post('https://www.facebook.com/ajax/profile/removefriendconfirm.php?dpr=1', {
	uid: '100018211595665',
	unref: 'bd_profile_button',
	floc: 'profile_button',
	__user: '100018229999393',
	__a: '1',
	__dyn: __dyn,
	__req: '3d',
	__be: '1',
	__pc: 'PHASED:DEFAULT',
	__rev: __rev,
	fb_dtsg: fb_dtsg,
	jazoest: jazoest,
	__spin_r: __spin_r,
	__spin_b: 'trunk',
	__spin_t: __spin_t,
});

//ADDFRIEND REQUEST
$.post('https://www.facebook.com/ajax/add_friend/action.php?dpr=1', {
	to_friend: '100024756101616',
	action: 'add_friend',
	how_found: 'profile_button',
	ref_param: 'none',
	'link_data[gt][type]': 'xtracking',
	'link_data[gt][xt]': '48.{"event":"add_friend","intent_status":null,"intent_type":null,"profile_id":100024756101616,"ref":1}',
	'link_data[gt][profile_owner]': '100024756101616',
	'link_data[gt][ref]': 'timeline:about',
	outgoing_id: 'js_2q',
	logging_location: '',
	no_flyout_on_click: 'true',
	ego_log_data: '',
	floc: 'profile_button',
	'frefs[0]': 'none',
	__user: '100018229999393',
	__a: '1',
	__dyn: __dyn,
	__req: '3e',
	__be: '1',
	__pc: 'PHASED:DEFAULT',
	__rev: __rev,
	fb_dtsg: fb_dtsg,
	jazoest: jazoest,
	__spin_r: __spin_r,
	__spin_b: 'trunk',
	__spin_t: __spin_t
});

//POST TO FRIEND WALL
$.post('https://www.facebook.com/webgraphql/mutation/?doc_id=1931212663571278&dpr=1', {
	variables: '{"client_mutation_id":"ec4cf7c9-9cd2-404f-a6d2-75bf36de75cc","actor_id":"100018229999393","input":{"actor_id":"100018229999393","client_mutation_id":"df783954-dc35-4a0e-a85b-514e9bd5d714","source":"WWW","audience":{"to_id":"100006357601073"},"message":{"text":"ê lâu quá không thấy đâu vậy mày hihihihi","ranges":[]},"logging":{"composer_session_id":"ec8570e5-d00d-492a-b4ee-b75cf9127ce5","ref":"timeline"},"with_tags_ids":[],"multilingual_translations":[],"composer_source_surface":"timeline","composer_entry_time":-1,"composer_session_events_log":{"composition_duration":57,"number_of_keystrokes":62},"direct_share_status":"NOT_SHARED","sponsor_relationship":"WITH","web_graphml_migration_params":{"target_type":"wall","xhpc_composerid":"rc.u_ps_fetchstream_1_2_1","xhpc_context":"profile","xhpc_publish_type":"FEED_INSERT","xhpc_timeline":true},"extensible_sprouts_ranker_request":{"RequestID":"ZvBXCwABAAAAJDYxMGUyYjZhLWQ3ZTUtNDIzOC1lMmE3LTRjNzIxNjY2ZjdjNwoAAgAAAABantyLCwADAAAABFNFTEwGAAQADgsABQAAABhVTkRJUkVDVEVEX0ZFRURfQ09NUE9TRVIA"},"place_attachment_setting":"HIDE_ATTACHMENT"}}',
	__user: '100018229999393',
	__a: '1',
	__dyn: __dyn,
	__req: '42',
	__be: '1',
	__pc: 'PHASED:DEFAULT',
	__rev: __rev,
	fb_dtsg: fb_dtsg,
	jazoest: jazoest,
	__spin_r: __spin_r,
	__spin_b: 'trunk',
	__spin_t: __spin_t
});

//LOGIN
$.post('https://www.facebook.com/login.php?login_attempt=1&lwv=110', {
	lsd: '',
	email: 'zhuylanz20@gmail.com',
	pass: 'taolarobot',
	timezone: '-420',
	lgndim: '',
	lgnrnd: '',
	lgnjs: '',
	ab_test_data: '',
	locale: 'vi_VN',
	login_source: 'login_bluebar',
	prefill_contact_point: '',
	prefill_source: '',
	prefill_type: '',
	skstamp: ''
});


//>>On Request Promise:
//LOGIN FB:
let options = {
	method: 'POST',
	uri: 'https://www.facebook.com/login.php?login_attempt=1&lwv=110',
	form: {
		lsd: '',
		email: 'zhuylanz20@gmail.com',
		pass: 'taolarobot',
		timezone: '-420',
		lgndim: '',
		lgnrnd: '',
		lgnjs: '',
		ab_test_data: '',
		locale: 'vi_VN',
		login_source: 'login_bluebar',
		prefill_contact_point: '',
		prefill_source: '',
		prefill_type: '',
		skstamp: ''
	},
	headers: {
		'cookie': 'fr=0cXvTIxTmCaQCDlaE..Ban6PX.sr.AAA.0.0.Ban6PX.AWXbSkVP; sb=16OfWmty2a539R1PJDY2BYzQ; _js_reg_fb_ref=https%3A%2F%2Fwww.facebook.com%2F; datr=16OfWsThjKP3bMtfFlUogmu-; reg_fb_ref=https%3A%2F%2Fwww.facebook.com%2F; reg_fb_gate=https%3A%2F%2Fwww.facebook.com%2F; wd=1306x965',
		'origin': 'https://www.facebook.com',
		'accept-encoding': 'gzip, deflate, br',
		'accept-language': 'en-US,en;q=0.9',
		'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
		'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'accept': '*/*',
		'referer': 'https://www.facebook.com/',
		'authority': 'www.facebook.com',
		'x-requested-with': 'XMLHttpRequest',
	},
	gzip: true
}

rp(options)
.then(res => {
	console.log(res);
})
.catch(err => {
	console.log(err.response.headers['set-cookie']) //cookie to login
});

//GET LOGGED-IN FB:
let options = {
	method: 'GET',
	uri: 'https://www.facebook.com/',
	headers: {
		'accept-encoding': 'gzip',
		'cookie': 'sb=X4iIWrab9bjigNsDyMT968pT; datr=X4iIWmsi5yQ61bjP2CDdqLqc; c_user=100000064077046; xs=19%3AYEiLJhTUFbkB0g%3A2%3A1519366874%3A2539%3A6165; pl=n; act=1520383026417%2F9; fr=0cdsMYvDh986SHBbf.AWVdnOFm4frPdsvMJUkmZ8bZIu0.BaiIhf.WY.Fqc.0.0.BanzVm.AWU_-CzD; presence=EDvF3EtimeF1520383555EuserFA21BB64077046A2EstateFDt3F_5bDiFA2user_3a1B01660886017A2ErF1EoF1EfF1C_5dEutc3F1520383026706G520383555565CEchFDp_5f1BB64077046F2CC; wd=1306x965',
		'accept-language': 'en-US,en;q=0.9',
		'upgrade-insecure-requests': '1',
		'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
		'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
		'cache-control': 'max-age=0',
		'authority': 'www.facebook.com',
		'origin': 'https://www.facebook.com'
	},
	json: true,
	gzip: true
}


rp(options)
.then(res => {
	//CODE GENERATOR:
	let fb_dtsg = res.match(/value=".{12}:.{12}/g)[0].slice(7);
	let __rev = res.match(/client_revision":\d{7}/g)[0].slice(17);
	let __dyn = '';
	let jazoest = '';
	for (var x = 0; x < fb_dtsg.length; x++) {
		jazoest += fb_dtsg.charCodeAt(x);
	}
	jazoest = '2' + jazoest;
	let __spin_r = __rev;
	let __spin_t = Math.floor(Date.now() / 1000);

	//OPTIONS to UNFRIEND:
	let optionsa = {
		method: 'POST',
		uri: 'https://www.facebook.com/ajax/profile/removefriendconfirm.php?dpr=1',
		form: {
			uid: '100011434977965',
			unref: 'bd_profile_button',
			floc: 'profile_button',
			__user: '100000064077046',
			__a: '1',
			__dyn: __dyn,
			__req: '3d',
			__be: '1',
			__pc: 'PHASED:DEFAULT',
			__rev: __rev,
			fb_dtsg: fb_dtsg,
			jazoest: jazoest,
			__spin_r: __spin_r,
			__spin_b: 'trunk',
			__spin_t: __spin_t,
		},
		headers: {
			'accept-encoding': 'gzip, deflate, br',
			'cookie': 'sb=X4iIWrab9bjigNsDyMT968pT; datr=X4iIWmsi5yQ61bjP2CDdqLqc; c_user=100000064077046; xs=19%3AYEiLJhTUFbkB0g%3A2%3A1519366874%3A2539%3A6165; pl=n; act=1520383026417%2F9; fr=0cdsMYvDh986SHBbf.AWVdnOFm4frPdsvMJUkmZ8bZIu0.BaiIhf.WY.Fqc.0.0.BanzVm.AWU_-CzD; presence=EDvF3EtimeF1520383555EuserFA21BB64077046A2EstateFDt3F_5bDiFA2user_3a1B01660886017A2ErF1EoF1EfF1C_5dEutc3F1520383026706G520383555565CEchFDp_5f1BB64077046F2CC; wd=1306x965',
			'accept-language': 'en-US,en;q=0.9',
			'upgrade-insecure-requests': '1',
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'accept': '*/*',
			'authority': 'www.facebook.com',
			'x-requested-with': 'XMLHttpRequest',
			'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
			'origin': 'https://www.facebook.com'
		},
		gzip: true
	}

	rp(optionsa).then(resa => console.log(resa)).catch(erra => console.log(erra));

})
.catch(err => console.log(err));