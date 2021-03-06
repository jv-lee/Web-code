(function($) {
    'use strict'

    // 调用封装的下拉菜单组件
    var json = [{
            "url": "###",
            "name": "已买到的宝贝"
        },
        {
            "url": "###",
            "name": "我的足迹"
        },
        {
            "url": "###",
            "name": "我的优惠券"
        }
    ];

    //menu drapdown	
    $('.dropdown').on('dropdown-start dropdown-resume dropdown-pause dropdown-stop', function(e) {
        console.log(e.type);
        var $this = $(this);

        if (e.type == 'dropdown-start') {

            if (!$this.data('loaded')) {
                var $layer = $this.find('.dropdown-layer'),
                    html = '';

                setTimeout(function() {
                    for (var i = 0; i < json.length; i++) {
                        html += '<li><a href="' + json[i].url + '" target="_blank" class="menu-item">' + json[i].name + '</a></li>'
                    }
                    $layer.html(html);
                    $this.data('loaded', true);
                }, 1000);
            }
        }
    });
    $('.dropdown').dropdown({
        event: 'hover',
        css3: true,
        js: true,
        delay: 200,
        animation: 'slideUpDown',
        active: 'menu'
    });

    //header search
    var $headerSearch = $('#header-search');
    var html = '',
        maxNum = 10;
    $headerSearch.on('search-getData', function(e, data) {
            var $this = $(this),
            html = createHeaderSearchLayer(data, maxNum);
            $this.search('appendLayer',html);

            if (html) {
                $this.search('showLayer');
            } else {
                $this.search('hideLayer');
            }
        }).on('search-noData', function(e) {
            $(this).search('hideLayer').search('appendLayer','');
        })
        //代理事件通过事件冒泡拦截的方式 来控制生效的点击
        .on('click', '.search-layer-item', function() {
            //获取当前的搜索提示内容item的内容 填充到input
            $headerSearch.search('setinputVal',$(this).html());
            $headerSearch.search('submit');
        });
    $headerSearch.search({
        autocomplete: true,
        css3: false,
        js: false,
        animation: 'fade',
        getDataInterval:0
    });

    function removeHtmlTags(str) {
        return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g, "");
    }

    //创建搜索html结构
    function createHeaderSearchLayer(data, maxNum) {
        var html = '',
            dataNum = data['result'].length;

        //没有搜索
        if (dataNum === 0) {
            return '';
        }

        for (var i = 0; i < dataNum; i++) {
            if (i >= maxNum) break;

            html += '<li class="search-layer-item text-ellipsis">' + data['result'][i][0] + '</li>';
        }
        return html;
    }

    //Cart
    var $cart = $('.cart');
    $cart.cart({
        autocomplete:true,
        css3:true,
        js:true,
        animation:'slideUpDown'
    });
    $cart.on('cart-getData',function(e,data){
        console.log(data);
        $(this).cart('appendLayer',createCartItem(data));
    });

        //创建搜索html结构
    function createCartItem(data) {
        var html = '',
            dataNum = data.length;

        //没有搜索
        if (dataNum === 0) {
            return '';
        }
            html += '<div class="cart-layer-title">最新加入的商品</div>'+
                    '<div class="cart-layer-list">';
        for (var i = 0; i < dataNum; i++) {
            html += '<div class="cart-layer-list-item">'+
                    '<div class="cart-layer-list-item-image"></div>'+
                    '<div class="cart-layer-list-item-title">'+data[i].title+'</div>'+
                    '<div class="cart-layer-list-item-pricecount">￥'+data[i].price+' X '+data[i].count+'</div>'+
                    '<div class="cart-layer-list-item-close">X</div>'+
                    '</div>';
        }
        html += '</div>'+
                '</div>'+
                '<div class="cart-layer-footer">'+
                        '<div class="cart-layer-footer-count-des fl">共 <b>0</b> 件商品</div>'+
                        '<div class="cart-layer-footer-price-des fl">共计 <b>￥ 0.00</b></div>'+
                        '<div class="cart-layer-footer-btn fr">去购物车</div>'+
                '</div>';
        return html;
    }

}(jQuery))