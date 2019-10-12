(function($) {
    'use strict';

    //设置缓存
    var cache = {
    	data:{},
    	count:0,
    	addData:function(key,data){
    		if(!this.data[key]){
    			this.data[key] = data;
    			this.count++;
    		}
    	},
    	readData:function(key){
    		return this.data[key];
    	},
    	deleteDataByKey:function(key){
    		delete this.data[key];
    		this.count--;
    	},
    	deleteDataByOrder:function(num){
    		var count = 0;

    		for (var p in this.data) {
    			if (count >= num) {
    				break;
    			}
    			count++;
    			this.deleteDataByKey(p);
    		}
    	}
    };

    function Search(elem, options) {
        this.$elem = $(elem);
        this.options = options;

        this.$form = this.$elem.find('.search-form');
        this.$input = this.$elem.find('.search-inputbox');
        this.$layer = this.$elem.find('.search-layer');

        this.laoded = false;

        //父类代理绑定事件 - 代理替换方法内部this指向
        this.$elem.on('click', '.search-btn', $.proxy(this.submit, this));
        if (this.options.autocomplete) {
            this.autocomplete();
        }
    }
    //默认参数
    Search.DEFAULTS = {
        autocomplete: false, //是否自动完成
        url: 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1570786324192_819&callback=jsonp820&k=1&area=c2c&bucketid=10&q=', //搜索地址
        css3: false,
        js: false,
        animation: 'fade',
        getDataInterval:200
    };
    //提交功能
    Search.prototype.submit = function() {
        if (this.getInputVal() === '') {
            return false;
        }
        this.$form.submit();
    };
    //自动提示
    Search.prototype.autocomplete = function() {
    	var timer = null;
    	var autoSelf = this;

    	console.log(autoSelf);

        //处理事件冲突，input获取焦点时显示提示内容， 因为失去焦点事件与click冲突， 所以直接使用document绑定最上层点击事件来隐藏，通过input拦截点击冒泡来取消事件传递
        this.$input
            .on('input', function(){
            	if(autoSelf.options.getDataInterval){
	            	clearTimer(timer);
	            	timer = setTimeout(function(){
	            		autoSelf.getData();
	            	},autoSelf.options.getDataInterval);	
            	}else{
            		autoSelf.getData();
            	}
            })
            .on('focus', $.proxy(this.showLayer, this))
            .on('click', function() {
                return false;
            });
        $(document).on('click',$.proxy(this.hideLayer,this));
        //引入显示隐藏模块
        this.$layer.showHide(this.options);
    };
    //获取数据
    Search.prototype.getData = function() {
        var self = this,
        inputVal = this.getInputVal();

        if(inputVal === '')return self.$elem.trigger('search-noData');

        if (cache.readData(inputVal)) return self.$elem.trigger('search-getData',[cache.readData(inputVal)]);

        if(this.jqXHR) this.jqXHR.abort();

        this.jqXHR = $.ajax({
            url: this.options.url + inputVal,
            timeout: 5000,
            dataType: 'jsonp'
        }).done(function(data) {
        	cache.addData(inputVal,data);
        	console.log(cache.data);
        	console.log(cache.count);
        	//事件通知  参数传递使用数组的方式
            self.$elem.trigger('search-getData', [data]);
        }).fail(function() {
            self.$elem.trigger('search-noData');
        }).always(function(){
        	//请求结束 清空连接对象
        	self.jqXHR = null;
        });
    };
    //显示下拉层
    Search.prototype.showLayer = function() {
        //没有内容不显示
        if (!this.laoded) return;
        this.$layer.showHide('show');
    };
    //隐藏下拉层
    Search.prototype.hideLayer = function() {
        this.$layer.showHide('hide');
    };
    //获取输入数据
    Search.prototype.getInputVal = function() {
        return $.trim(this.$input.val());
    };
    //设置输入数据
    Search.prototype.setInputVal = function(val){
    	this.$input.val(removeHtmlTags(val));

    	//删除字符串中html标签
		function removeHtmlTags(str){
			return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g,"");
		}
    };
    Search.prototype.appendLayer = function(html){
    	this.$layer.html(html);
    	//设置初始化填充状态
    	this.laoded = !!html;
    }


	//添加搜索插件
    $.fn.extend({
        search: function(option,value) {
            return this.each(function() {
                var $this = $(this),
                    search = $this.data('search'),
                    options = $.extend({}, Search.DEFAULTS, $this.data(), typeof option === 'object' && option);

                if (!search) {
                    $this.data('search', search = new Search($this, options));
                }

                if (typeof search[option] === 'function') {
                    search[option](value);
                }
            });
        }
    });

}(jQuery));