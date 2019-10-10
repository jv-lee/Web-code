//内部作用域封装 ，自我调用
(function($) {
    'use strict';

    function Dropdown(elem,options){
            //对象成员变量
            this.$elem = $(elem),
            this.$layer = this.$elem.find('.dropdown-layer'),
            this.activeClass = options.active + '-active';

            this.$layer.showHide(options);

            //通过代理修改show函数中的this ，将内部this修改为外部作用域dropdown对象
            this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this))

            // var self = this;
            // this.$elem.hover(function(){
            //     self.show();
            // },function(){
            //     self.hide();
            // });
    }
    //默认参数 常量
    Dropdown.DEFAULUTS = {
        css3:false,
        js:false,
        animation:'fade',
        active:'dropdown'
    };
    //在原型中创建 show/hide函数 防止多次new对象实例 产生不必要的内存空间
    Dropdown.prototype.show = function(){
            this.$elem.addClass(this.activeClass);
            this.$layer.showHide('show');
    }
    Dropdown.prototype.hide = function(){
            this.$elem.removeClass(this.activeClass);
            this.$layer.showHide('hide');
    }

    $.fn.extend({
        dropdown: function(option) {
            return this.each(function() {
                //option -> $(this).data() -> DEFAULTS -> {} 向前覆盖对象,同名属性覆盖原则
                var options = $.extend({},Dropdown.DEFAULUTS,$(this).data(),option);
                new Dropdown(this,options);
            });
        }
    });

})(jQuery);