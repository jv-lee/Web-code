(function() {
    //商家详情模版字符串
    var itemTemp =
        '<div class="r-item-content">' +
     	   '<img class="item-img" src=$pic_url />' +
        	'$brand' +
        	'<div class="item-info-content">' +
        		'<p class="item-title">$name</p>' +
        		'<div class="item-desc clearfix">' +
        			'<div class="item-score">$wm_poi_sorce</div>' +
        			'<div class="item-count">月售$monthNum</div>' +
        			'<div class="item-distance">&nbsp;$distance</div>' +
        			'<div class="item-time">$mt_delivery_time&nbsp;|</div>'+
        		'</div>'+
        		'<div class="item-price">'+
        			'<div class="item-pre-price">$min_price_tip</div>'+
        		'</div>'+
        		'<div class="item-others">'+
        			'$others'+
        		'</div>'+
        	'</div>' +
        '</div>';

        var listNode = $('.list-wrap');

      //获取商家数据
     function getList(){
     	$.get('../json/homelist.json',function(data){
     		console.log(data);
     		var list = data.data.poilist || [];

     		initContentList(list);
     	});
     }

     //渲染是否是新到热门/品牌标签
     function getBrand(data){
     	if (data.brand_type) {
     		return '<div class="brand brand-pin">品牌</div>';
     	}else{
     		return '<div class="brand brand-xin">新到</div>';
     	}
     }

      //渲染月售
     function getMonthNum(data){
     	var num = data.month_sale_num;

     	if (num > 999) {
     		return '999+';
     	}else{
     		return num;
     	}
     }

     //渲染商家活动
     function getOthers(data){
     	var array = data.discounts2;
     	var str = '';
     	array.forEach(function(item,index){
     		//内部的商家活动模版字符串
     		var _str = '<div class="other-info">'+
     		'<img src=$icon_url class="other-tag" />'+
     		'<p class="other-content">$info</p>'+
     		'</div>';

     		//数据替换
     		_str = _str.replace('$icon_url',item.icon_url)
     						.replace('$info',item.info);
     		//累加item				
     		str += _str;
     	});
     	return str;
     }

     //渲染列表数据
     function initContentList(list){
     	list.forEach(function(item,index){
     		var str = itemTemp
     		.replace('$pic_url',item.pic_url)
     		.replace('$name',item.name)
     		.replace('$distance',item.distance)
     		.replace('$min_price_tip',item.min_price_tip)
     		.replace('$mt_delivery_time',item.mt_delivery_time)

     		.replace('$brand',getBrand(item))

     		.replace('$monthNum',getMonthNum(item))

			.replace('$others',getOthers(item));

     		listNode.append(str);
     	});
     }

    function init() {
    	getList();
    }

    init();
})();