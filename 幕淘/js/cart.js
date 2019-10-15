(function($){
	'use strict';

	var json = [
	{
		'image':'../image/cart/1.png',
		'title':'adidas 阿迪达斯 训练 男子',
		'price':'335',
		'count':'1'
	},
	{
		'image':'../image/cart/1.png',
		'title':'adidas 阿迪达斯 训练 男子',
		'price':'335',
		'count':'1'
	},
	{
		'image':'../image/cart/1.png',
		'title':'adidas 阿迪达斯 训练 男子',
		'price':'335',
		'count':'1'
	},
	{
		'image':'../image/cart/1.png',
		'title':'adidas 阿迪达斯 训练 男子',
		'price':'335',
		'count':'1'
	},
	{
		'image':'../image/cart/1.png',
		'title':'adidas 阿迪达斯 训练 男子',
		'price':'335',
		'count':'1'
	}];

	function Cart(elem,options){
		this.$elem = $(elem);
		this.options = options;

		this.$cartContainer = this.$elem.find('.cart-container');

		//设置购物车列表布局
		this.$layer = this.$elem.find('.cart-layer');

		//设置购物车列表
		this.$list = this.$layer.find('.cart-layer-list');

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
		this.$elem.hover($.proxy(this.showLayer,this),$.proxy(this.hideLayer,this));
	}
	Cart.prototype.getData = function(){
		var self = this;
		this.loadingLayer();

		// if(this.jqXHR) this.jqXHR.abort();

  //       this.jqXHR = $.ajax({
  //           url: this.options.url,
  //           timeout: 5000,
  //           dataType: 'jsonp'
  //       }).done(function(data) {
  //       	//事件通知  参数传递使用数组的方式
  //           self.$elem.trigger('cart-getData', [data]);
  //       }).fail(function() {
  //           self.$elem.trigger('cart-noData');
  //       }).always(function(){
  //       	//请求结束 清空连接对象
  //       	self.jqXHR = null;
  //       });
		  setTimeout(function(){
		  	self.$elem.trigger('cart-getData',[json]);
		  },1000);

	};
	//显示购物车列表
    Cart.prototype.showLayer = function() {
        this.$layer.showHide('show');
        this.getData();
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
        console.log(html);
        this.$layer.css({
        	'height':'376px'
        })
        this.$layer.html(html);
    	//设置初始化填充状态
    	// this.laoded = !!html;
    }

    //创建购物车列表 jQuery插件
    $.fn.extend({
    	cart:function(option,value){
    		return this.each(function(){
    			var $this = $(this),
                    cart = $this.data('cart'),
                    options = $.extend({}, Cart.DEFAULTS, $this.data(), typeof option === 'object' && option);

                if (!cart) {
                    $this.data('cart', cart = new Cart($this, options));
                }

                //对外界提供可调用内部方法
                if (typeof cart[option] === 'function') {
                    cart[option](value);
                }
    		});
    	}
    });


}(jQuery));