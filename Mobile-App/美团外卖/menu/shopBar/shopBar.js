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

    function renderItems() {
        //清除数据
        $strTop.find('.choose-item').remove();

        var list = window.food_spu_tags || [];
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
        });
    }

    function addClick() {

    }

    function init(data) {
        $('.shop-bar').append($strTop);
        $('.shop-bar').append($strBottom);
    }
    init();

    window.ShopBar = {
        renderItems: renderItems
    }
})();