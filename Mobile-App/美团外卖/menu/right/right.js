(function(){

	//右侧类目item模板字符串
	var itemTemp = '</div class="menu-item">'+
						'<img class="img" src=$picture />'+
						'<div class="menu-item-right">'+
							'<p class="item-title">$name</p>'+
							'<p class="item-desc">$description</p>'+
							'<p class="item-zan">$praise_content</p>'+
							'<p class="item-price">￥$min_price<span class="unit">/$unit</span></p>'+
						'</div>'+
						'<div class="select-content">'+
							'<div class="minus"></div>'+
							'<div class="count">$chooseCount</div>'+
							'<div class="plus"></div>'+ 
						'</div>'+
					'</div>';

	var rightListInnerNode = $('.right-list-inner');
	var rightTitleNode = $('.right-title');

	//渲染右侧item
	function initRrightList(list){
		rightListInnerNode.html('');

		list.forEach(function(item,index){
			var str = itemTemp
						.replace('$picture',item.picture)
						.replace('$name',item.name)
						.replace('$description',item.description)
						.replace('$praise_content',,item.praise_content)
						.replace('$min_price',,item.min_price)
						.replace('$unit',item.unit)
						.replace('$chooseCount',item.chooseCount);

			var $target = $(str);
			$target.data('itemData',item);

			rightListInnerNode.append($target);
		});
	}

	//渲染右侧title
	function initRightTitle(str){
		rightTitleNode.text(str);
	}

	function init(data){
		initRrightList(data.spus || []);
		initRightTitle(data.name);
	}

	window.Right = {
		refresh:init
	}


})();