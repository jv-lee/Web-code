(function($){
	'use strict'

	var $search = $('.search'),
		$form = $search.find('.search-form'),
		$input = $search.find('.search-inputbox'),
		$btn = $search.find('.search-btn'),
		$layer = $search.find('.search-layer');

	//验证
	$form.on('submit',function(){
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

				//没有搜索
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

	//处理事件冲突，input获取焦点时显示提示内容， 因为失去焦点事件与click冲突， 所以直接使用document绑定最上层点击事件来隐藏，通过input拦截点击冒泡来取消事件传递
	$input.on('focus',function(){
		$layer.show();
	}).on('click',function(){
		return false;
	});
	$(document).on('click',function(){
		$layer.hide();
		return 
	});

	//代理事件通过事件冒泡拦截的方式 来控制生效的点击
	$layer.on('click','.search-layer-item',function(){
		//获取当前的搜索提示内容item的内容 填充到input
		$input.val(removeHtmlTags($(this).html()));
		$form.submit();
		$input.parents('form').submit();
	})

	function removeHtmlTags(str){
		return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g,"");
	}

}(jQuery));