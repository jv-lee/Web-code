(function() {

    //左侧类目item模版字符串
    var itemTemp = '<div class="left-item">' +
    					'<div class="item-text">$getItemContent</div>'+
    				'</div>';

    var leftBarInnerNode = $('.left-bar-inner');
    var menuInnerNode = $('.menu-inner');

    //渲染item内容
    function getItemContent(data){
        if (data.icon) {
            return '<img class="item-icon" src='+data.icon+' />'+data.name;
        }else{
            return data.name;
        }
    }

    //渲染列表
    function initContentList(list){
        list.forEach(function(item,index){
            var str = itemTemp
                        .replace('$getItemContent',getItemContent(item));

            //将item数据挂载到left-item上
            var $target = $(str);
            $target.data('itemData',item);

            //默认首项选中加载数据
            if (index == 0) {
                $target.addClass('active');
                window.Right.refresh(item);
            }

            leftBarInnerNode.append($target);
        });
    }
    
    //请求数据绘制列表                                
    function getList(){
    	$.get('../json/food.json',function(data){
                var list = data.data.food_spu_tags || [];
                //数据进行挂载
                window.food_spu_tags = data.data.food_spu_tags || [];
                initContentList(window.food_spu_tags);
    	});
    }

    function addEventListener(){
        menuInnerNode.on('click','.left-item',function(e){
            var $target = $(e.currentTarget);

            //当前选中
            $target.addClass('active');
            //同级兄弟元素删除选中
            $target.siblings().removeClass('active');

            //将数据传给右侧详情列表进行渲染
            window.Right.refresh($target.data('itemData'));
        });
    }

    function init(){
    	getList();
        addEventListener();
    }

    init();

})();