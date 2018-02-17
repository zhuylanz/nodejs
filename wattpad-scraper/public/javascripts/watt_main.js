let main_vue = new Vue({
	el : '#vue-region',

	data : {
		log_watt : []
	},

	methods : {
		scrape : function() {
			socket.emit('scrape', $('#url').val(), (res) => { console.log(res); });
			$('#btn_scrape').off('click');
		},
		downloadbook : function() {
			window.open(
				'https://drive.google.com/drive/folders/1vTBJKY4Q7gx3hgTgdzGFYx9nRhTS7PIU', '_blank');
		}
	}

});

// $(function(){
//  $('#search').on('keyup', function(e){
//    if(e.keyCode === 13) {
//      var parameters = { search: $(this).val() };
//        $.get( '/searching',parameters, function(data) {
//        $('#results').html(data);
//      });
//     };
//  });
// });


let socket = io('/wattpad-scraper');

socket.on('log_watt', (logs) => {
	main_vue.log_watt = logs;
	console.log('scroll');
	$("#log-container").scrollTop($('#log-container')[0].scrollHeight);
});

socket.on('log_watt ended', (res) => {
	$('#btn_scrape').on('click', main_vue.scrape);
	$("#log-container").scrollTop($('#log-container')[0].scrollHeight);
});

$('form').on('submit', () => { return false; });
$('#url').on('keyup', function(e) {
	if(e.keyCode === 13) {
		$('#btn_scrape').click();
	}
});

$(document).ready(function() { });