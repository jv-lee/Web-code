(function(){
	//类目的模板字符串
	var itemTemp = '<div class="category-item">' +
						'<img class="item-icon" src=$url />' +
						'<p class="item-name">$name</p>' +
						'</div>';

	function initCategory(){
		//获取Category的数据
		$.get('../json/head.json',function(data){
			console.log(data);
		});
	}

	function init(){
		initCategory();
	}

	init();

})();

