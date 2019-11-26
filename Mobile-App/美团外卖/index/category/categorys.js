(function() {
    //类目的模板字符串
    var itemTemp = '<div class="category-item">' +
        '<img class="item-icon" src=$url />' +
        '<p class="item-name">$name</p>' +
        '</div>';

    var categoryContentNode = $('.category-content');

    //根据数据绘制分类元素
    function initCategory() {
        //获取Category的数据
        $.get('../json/head.json', function(data) {
            console.log(data);
            //取前8个数据
            var list = data.data.primary_filter.splice(0, 8);
            list.forEach(function(item, index) {
                var str = itemTemp.replace('$url', item.url).replace('$name', item.name);
                categoryContentNode.append(str);
            });
        });
    }

    //绑定item的点击事件
    function addClick(){
        categoryContentNode.on('click','.category-item',function(){
            alert(1);
        });
    }

    function init() {
        initCategory();
        addClick();
    }

    init();

})();