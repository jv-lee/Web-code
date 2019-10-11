(function($){
	'use strict'

	var $search = $('.search'),
		$input = $search.find('.search-inputbox'),
		$btn = $search.find('.search-btn'),
		$layer = $search.find('.search-layer');

	//验证
	$btn.on('click',function(){
		//空字符验证
		if($.trim($input.val()) === ''){
			return false;
		}
	});

	
	

	//自动完成
	$input.on('input',function(){
		var url = "https://suggest.taobao.com/sug?code=utf-8&_ksTS=1570786324192_819&callback=jsonp820&k=1&area=c2c&bucketid=10&q="
		+ encodeURIComponent($.trim($input.val()));

		$.ajax({
			url:url,
			timeout:5000,
			dataType:'jsonp'
		}).done(function(data){
			console.log(data);
			var html = '',
				dataNum = data['result'].length,
				maxNum = 10;

				//没有搜索到提示数据
				if (dataNum === 0) {
					$layer.hide().html('');
					return;
				}

				for (var i = 0; i < dataNum; i++) {
					if (i>=maxNum)break;

					html += '<li class="search-layer-item text-ellipsis">'+data['result'][i][0]+'</li>';
				}
				$layer.html(html).show();
		}).fail(function (){
			console.log('request fail. . .')
			$layer.hide().html('');
		}).always(function(){
			console.log('why always me!');
		});
	});

}(jQuery));