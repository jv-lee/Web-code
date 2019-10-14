(function($){
	'use strict';

	function Cart(elem,options){
		this.$elem = $(elem);
		this.options = options;

		this.$cartContainer = this.$elem.find('.cart-container');

		//设置购物车列表布局
		this.$layer = this.$elem.find('.cart-layer');

		//引入显示隐藏模块
        this.$layer.showHide(this.options);

        //是否使用自动显示
        if(this.options.autocomplete){
        	this.autocomplete();
        }
	}

	Cart.DEFAULTS = {
		autocomplete: false, //是否自动完成
        url: 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1570786324192_819&callback=jsonp820&k=1&area=c2c&bucketid=10&q=', //搜索地址
        css3: false,
        js: false,
        animation: 'fade',
	};

	Cart.prototype.autocomplete = function(){
		this.$cartContainer.hover($.proxy(this.showLayer,this),$.proxy(this.hideLayer,this));
	}
	Cart.prototype.getData = function(){
		console.log('getData()');
		this.loadingLayer();
	};
	//显示购物车列表
    Cart.prototype.showLayer = function() {
        this.$layer.showHide('show');
        // this.getData();
    };
    //隐藏购物车列表
    Cart.prototype.hideLayer = function() {
        this.$layer.showHide('hide');
    };
    Cart.prototype.loadingLayer = function(){
    	this.$layer.css({'height':100});
    	this.$layer.html('<div class="cart-loading">&nbsp;</div>');
    }
    Cart.prototype.emptyLayer = function(){
    	this.$layer.css({'height':100});
    	this.$layer.html('<div class="cart-empty">'+
    		'<div class="cart-empty-icon fl"></div>'+
    		'<div class="cart-empty-text fl">购物车里还没有商品<br>赶紧去选购吧！</div>'+
    		'</div>');
    }
    Cart.prototype.appendLayer = function(html){
    	this.$layer.css({'height':400});
    	this.$layer.html(html);
    	//设置初始化填充状态
    	// this.laoded = !!html;
    }

    //创建购物车列表 jQuery插件
    $.fn.extend({
    	cart:function(option){
    		return this.each(function(){
    			var $this = $(this),
                    cart = $this.data('cart'),
                    options = $.extend({}, Cart.DEFAULTS, $this.data(), typeof option === 'object' && option);

                if (!cart) {
                    $this.data('cart', cart = new Cart($this, options));
                }

                //对外界提供可调用内部方法
                if (typeof cart[option] === 'function') {
                    cart[option]();
                }
    		});
    	}
    });


}(jQuery));