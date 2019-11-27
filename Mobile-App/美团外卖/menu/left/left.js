(function() {

    //左侧类目item模版字符串
    var itemTemp = '<div class="left-item">' +
    								'<div class="item-text">$getItemContent</div>'+
    						    '</div>';

    function getList(){
    	$.get('../json/food.json',function(data){
    			console.log(data);
    	});
    }

    function init(){
    	getList();
    }

    init();

})();