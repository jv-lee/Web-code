(function(){

	var itemTemp = '<a class="$key btn-item" href="../$key/$key.html">'+
	'<div class="tab-icon"></div>'+
	'<div class="tab-name">$text</div>'+
	'</a>';

	function init(){
		var items = [{key:'index',text:'首页'},{key:'order',text:'订单'},{key:'my',text:'我的'}];

		var str = '';

		items.forEach(function(item,index){
			str += itemTemp
			.replace(/\$key/g,item.key)
			.replace('$text',item.text);
		});

		$('.bottom-bar').append(str);

		//通过当前页面的url 来确定key值
		var arr = window.location.pathname.split('/');
		var page = arr[arr.length -1].replace('.html','');

		//通过key值设置 选中状态
		$('a.'+page).addClass('active');
	}	

	init();
})();