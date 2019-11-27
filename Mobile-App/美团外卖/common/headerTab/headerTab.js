(function(){

	var itemTemp = '<a class="$key tab-item" href="../$key/$key.html">'+
		'$text'+
	'</a>';

	function init(){
		var items = [{key:'menu',text:'点菜'},{key:'comment',text:'评价'},{key:'restanurant',text:'商家'}];

		var str = '';

		items.forEach(function(item,index){
			str += itemTemp
			.replace(/\$key/g,item.key)
			.replace('$text',item.text);
		});

		$('.tab-bar').append(str);

		//通过当前页面的url 来确定key值
		var arr = window.location.pathname.split('/');
		var page = arr[arr.length -1].replace('.html','');

		//通过key值设置 选中状态
		$('a.'+page).addClass('active');
	}	

	init();
})();