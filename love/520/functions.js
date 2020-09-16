/*
 * http://www.mycodes.net
 */

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(){
	var days = 0-moment('2020-09-06').diff(new Date(), 'days')
	var hours = 0-moment('2020-09-06').diff(new Date(), 'hours') - 24*days;
	var minute = 0-moment('2020-09-06').diff(new Date(), 'minute') - 24*60*days-hours*60;
	var seconds = 0-moment('2020-09-06').diff(new Date(), 'seconds')- 24*60*60*days-hours*60*60-minute*60;

	var result = "第 <span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + format(hours) + "</span> 小时 <span class=\"digit\">"
		+ format(minute) + "</span> 分钟 <span class=\"digit\">" + format(seconds) + "</span> 秒";
	$("#clock").html(result);
}

function format(n) {
	if(n < 10) {
		return '0' + n
	}
	return n;
}