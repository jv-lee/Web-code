(function() {

    //顶部模版字符串
    var itemTopTemp =
        '<div class="choose-content hide">' +
        '<div class="content-top">' +
        '<div class = "clear-car">清空购物车</div>' +
        '</div>' +
        '</div>';

    //底部模版字符串
    var itemBottomTemp =
        '<div class="bottom-content hide">' +
        '<div class="shop-icon">' +
        '<div class = "dot-num hide"></div>' +
        '</div>' +
        '<div class="price-content">' +
        '<p class="total-price">¥<span class="total-price-span">0</span></p>' +
        '<p class="other-price">另需配送&nbsp;¥<span class="shipping-fee">0</span></p>' +
        '</div>' +
        '<div class="submit-btn">去结算</div>' +
        '</div>';

    var $strTop = $(itemTopTemp);
    var $strBottom = $(itemBottomTemp);

    //改变
    function changeShippingPrice(str){
        $strBottom.find('.shipping-fee').text(str);
    }

    //改变总价
    function changeTotalPrice(str){
        $strBottom.find('.total-price-span').text(str);
    }

    //渲染购物车顶部
    function renderItems() {
        //清除数据
        $strTop.find('.choose-item').remove();

        var list = window.food_spu_tags || [];
        console.log(list);
        var temp =
            '<div class="choose-item">' +
            '<div class="item-name">$name</div>' +
            '<div class="price">¥<span class="total">$price</span>' +
            '</div>' +
            '<div class="select-content">' +
            '<div class="minus"></div>' +
            '<div class="count">$chooseCount</div>' +
            '<div class="plus"></div>' +
            '</div>';
        var totalPrice = 0;
        list.forEach(function(item) {
            item.spus.forEach(function(_item) {
                //如果有选中菜品数量大于0 开始渲染数据
                if (_item.chooseCount > 0) {
                    var price = _item.min_price * _item.chooseCount;
                    var row = temp
                        .replace('$name', _item.name)
                        .replace('$price', price)
                        .replace('$chooseCount', _item.chooseCount);
                        totalPrice += price;
                        var $row = $(row);
                        $row.data('itemData',_item);

                        $strTop.append($row);
                }
            });

            //改变总价
            changeTotalPrice(totalPrice);

            //改变红点个数
            changeDot();
        });
    }

    //渲染数量红点
    function changeDot(){
        //先获取所有的count元素
        var $count = $strTop.find('.count');
        var total = 0;

        //便利获取所有count的值相加
        for(var i = 0;i<$count.length;i++){
            total += parseInt($($count[i]).text());
        }

        if (total > 0) {
            $('.dot-num').show().text(total);
        }else{
            $('.dot-num').hide();
        }
    }

    function addClick() {
        $('.shop-bar').on('click','.shop-icon',function(){
            //显示隐藏
            $('.mask').toggle();
            $strTop.toggle();
        });
        $strTop.on('click','.plus',function(e){
            var $count = $(e.currentTarget).parent().find('.count');
            $count.text(parseInt($count.text() || '0')+1);

            var $item = $(e.currentTarget).parents('.choose-item').first();

            var itemData = $item.data('itemData');

            itemData.chooseCount = itemData.chooseCount + 1;

            renderItems();

            //找到当前的右侧详情的数据进行联动
            $('.left-item.active').click();
        });
        $strTop.on('click','.minus',function(e){
            var $count = $(e.currentTarget).parent().find('.count');

            if ($count.text() == 0)return;
            $count.text(parseInt($count.text() || '0')- 1);

            var $item = $(e.currentTarget).parents('.choose-item').first();

            var itemData = $item.data('itemData');

            itemData.chooseCount = itemData.chooseCount - 1;

            renderItems();

            //找到当前的右侧详情的数据进行联动
            $('.left-item.active').click();
        });
    }

    function init(data) {
        $('.shop-bar').append($strTop);
        $('.shop-bar').append($strBottom);
        addClick();
    }
    init();

    window.ShopBar = {
        renderItems: renderItems,
        changeShippingPrice:changeShippingPrice
    }
})();