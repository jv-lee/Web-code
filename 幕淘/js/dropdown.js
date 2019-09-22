//内部作用域封装 ，自我调用
(function($) {
    'use strict';

    //下拉菜单通用函数
    function dropdown(elem) {
        var $elem = $(elem),
            activeClass = $elem.data('active') + '-active';

        $elem.hover(function() {
            $elem.addClass(activeClass);
        }, function() {
            $elem.removeClass(activeClass);
        });
    }

    $.fn.extend({
        dropdown: function() {
            return this.each(function() {
                dropdown(this);
            });
        }
    });

})(jQuery);