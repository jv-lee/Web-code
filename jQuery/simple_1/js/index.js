$(document).ready(function(){
	$('a').click(function(){
		$('img').eq($(this).index()).css({'opacity':'1'}).siblings().css({'opacity':'0'});
	});
});