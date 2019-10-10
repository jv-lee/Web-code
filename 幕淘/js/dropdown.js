//内部作用域封装 ，自我调用
(function($) {
    'use strict';

    function Dropdown($elem, options) {
        //对象成员变量
        this.$elem = $elem;
        this.options = options;
        this.$layer = this.$elem.find('.dropdown-layer');
        this.activeClass = options.active + '-active';

        this._init();
    }
    //默认参数 常量
    Dropdown.DEFAULUTS = {
        event: 'hover', //事件参数 （click）
        css3: false, //是否使用css3动画
        js: false, //是否使用js动画
        animation: 'fade', //动画类型
        delay: 0, //延迟加载
        active: 'dropdown' //绑定元素class
    };
    Dropdown.prototype._init = function() {
        var self = this;
        //绑定showHide功能
        this.$layer.showHide(this.options);

        //监听事件
        this.$layer.on('start resume pause stop', function(e) {
            //转发事件给绑定元素
            self.$elem.trigger('dropdown-' + e.type);
        });

        //点击事件 使用阻止冒泡，设置点击document隐藏

        if (this.options.event === 'click') {
            this.$elem.on('click', function(e) {
                self.show();
                e.stopPropagation();
            });
            $(document).on('click', $.proxy(this.hide, this));
        } else {
            //通过代理修改show函数中的this ，将内部this修改为外部作用域dropdown对象
            this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this));
        }
    };
    //在原型中创建 show/hide函数 防止多次new对象实例 产生不必要的内存空间
    Dropdown.prototype.show = function() {
        var self = this;
        //设置延时加载判断
        if (this.options.delay) {
            this.timer = setTimeout(function() {
                _show();
            }, this.options.delay);
        } else {
            _show();
        }

        function _show() {
            self.$elem.addClass(self.activeClass);
            self.$layer.showHide('show');
        }
    };

    Dropdown.prototype.hide = function() {
        if (this.options.delay) {
            clearTimeout(this.timer);
        }
        this.$elem.removeClass(this.activeClass);
        this.$layer.showHide('hide');
    };

    // 通过 jquery 将函数添加为插件方法
    $.fn.extend({
        dropdown: function(option) {
            return this.each(function() {
                var
                    $this = $(this),
                    dropdown = $this.data('dropdown'),
                    //option -> $(this).data() -> DEFAULTS -> {} 向前覆盖对象,同名属性覆盖原则
                    options = $.extend({}, Dropdown.DEFAULUTS, $this.data(), typeof option === 'object' && option);
                if (!dropdown) {
                    $this.data('dropdown', dropdown = new Dropdown($this, options));
                }

                // 如果传入的是字符串， 判断是否有该函数 ，执行
                if (typeof dropdown[option] === 'function') {
                    dropdown[option]();
                }
            });
        }
    });

})(jQuery);