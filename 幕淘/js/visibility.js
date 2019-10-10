//动画显示隐藏元素 封装模块
(function($){
    'use strict';

        //引入全版本兼容 transitionend 事件监听
    var transition = window.mt.transition;

    //通用初始化函数
    function init($elem, hiddenCallback) {
        if ($elem.is(':hidden')) {
            $elem.data('visibility', false);
            if (typeof hiddenCallback === 'function') {
                hiddenCallback();
            }
        } else {
            $elem.data('visibility', true);
        }
    }
    //通用显示函数
    function show($elem, showCallback) {
        if ($elem.data('visibility')) {
            return;
        }
        $elem.data('visibility', true).trigger('start');
        if (typeof showCallback === 'function') {
            showCallback();
        }
    }
    //通用隐藏函数
    function hide($elem, hiddenCallback) {
        if (!$elem.data('visibility')) {
            return;
        }
        $elem.data('visibility', false).trigger('pause');
        if (typeof hiddenCallback === 'function') {
            hiddenCallback();
        }
    }
    
    //普通 显示隐藏
    var silent = {
        //使用通用初始化函数，初始化控件
        init: init,

        //设置接口回调函数
        show: function($elem) {
            show($elem, function() {
                $elem.trigger('resume').show();
            });
        },
        hide: function($elem) {
            hide($elem, function() {
                $elem.hide().trigger('stop');
            });
        }
    };
    //css3 动画方式 显示隐藏
    var css3 = {
        fade: {
            init: function($elem) {
                css3._init($elem,'fadeOut');
            },
            show: function($elem) {
                css3._show($elem,'fadeOut');
            },
            hide: function($elem) {
                css3._hide($elem,'fadeOut');
            }
        },
        slideUpDown: {
            init: function($elem) {
                $elem.height($elem.height());
                css3._init($elem,'slideUpDownCollapse');
            },
            show: function($elem) {
                css3._show($elem,'slideUpDownCollapse');
            },
            hide: function($elem) {
                css3._hide($elem,'slideUpDownCollapse');
            }
        },
        slideLeftRight: {
            init: function($elem) {
                $elem.width($elem.width());
                css3._init($elem,'slideLeftRightCollapse');
            },
            show: function($elem) {
                css3._show($elem,'slideLeftRightCollapse');
            },
            hide: function($elem) {
                css3._hide($elem,'slideLeftRightCollapse');
            }
        },
        fadeSlideUpDown: {
            init: function($elem) {
                $elem.height($elem.height());
                css3._init($elem,'fadeOut slideUpDownCollapse');
            },
            show: function($elem) {
                css3._show($elem,'fadeOut slideUpDownCollapse');
            },
            hide: function($elem) {
                css3._hide($elem,'fadeOut slideUpDownCollapse');
            }
        },
        fadeSlideLeftRight: {
            init: function($elem) {
                $elem.width($elem.width());
                css3._init($elem,'fadeOut slideLeftRightCollapse');
            },
            show: function($elem) {
                css3._show($elem,'fadeOut slideLeftRightCollapse');
            },
            hide: function($elem) {
                css3._hide($elem,'fadeOut slideLeftRightCollapse');
            }
        }
    };
    //css3 通用函数
    css3._init = function($elem,className){
        $elem.addClass('transition');
        init($elem,function(){
            $elem.addClass(className);
        });
    };
    css3._show = function($elem,className){
        show($elem, function() {
            //先解绑，再绑定一次事件
            $elem.show().off(transition.end).one(transition.end, function() {
                $elem.trigger('resume');
            });
            setTimeout(function() {
                $elem.removeClass(className);
            }, 20);
        });
    };
    css3._hide = function($elem,className){
        hide($elem, function() {
            $elem.off(transition.end).one(transition.end, function() {
                $elem.hide().trigger('stop');
            });
            setTimeout(function() {
                $elem.addClass(className);
            }, 20);
        });
    };
    var js = {
        fade: {
            init:function($elem){
                js._init($elem);
            },
            show: function($elem) {
                js._show($elem,'fadeIn');
            },
            hide: function($elem) {
                js._hide($elem,'fadeOut');
            }
        },
        slideUpDown: {
            init:function($elem){
                js._init($elem);
            },
            show: function($elem) {
                js._show($elem,'slideDown');
            },
            hide: function($elem) {
                js._hide($elem,'slideUp');
            }
        },
        slideLeftRight: {
            init:function($elem){
                js._optionsInit($elem,{
                        'width':0,
                        'padding-left':0,
                        'padding-right':0,
                    });
            },
            show: function($elem) {
                js._optionsShow($elem);
            },
            hide: function($elem) {
                js._optionsHide($elem,{
                        'width':0,
                        'padding-left':0,
                        'padding-right':0,
                    });
            }
        },
        fadeSlideUpDown: {
            init:function($elem){
                js._optionsInit($elem,{
                        'opacity':0,
                        'height':0,
                        'padding-top':0,
                        'padding-bottom':0,
                    });
            },
            show: function($elem) {
                js._optionsShow($elem);
            },
            hide: function($elem) {
                js._optionsHide($elem,{
                        'opacity':0,
                        'height':0,
                        'padding-top':0,
                        'padding-bottom':0,
                });
            }
        },
        fadeSlideLeftRight: {
            init:function($elem){
                js._optionsInit($elem,{
                        'opacity':0,
                        'width':0,
                        'padding-left':0,
                        'padding-right':0,
                    })
            },
            show: function($elem) {
                js._optionsShow($elem);
            },
            hide: function($elem) {
                js._optionsHide($elem,{
                        'opacity':0,
                        'width':0,
                        'padding-left':0,
                        'padding-right':0,
                });
            }
        }
    };
    //js 通用函数
    js._init = function($elem,callback){
        $elem.removeClass('transition');
        init($elem,callback);
    };
    js._show = function($elem,mode){
        show($elem,function(){
            $elem.stop()[mode](function(){
                $elem.trigger('resume');
            });
        });
    };
    js._hide = function($elem,mode){
        hide($elem,function(){
            $elem.stop()[mode](function(){
                $elem.trigger('stop');
            })
        });
    };
    //js 自定义参数通用函数
    js._optionsInit = function($elem,options){
        var styles = {};

        for(var op in options){
            styles[op] = $elem.css(op);
        }
        $elem.data('styles',styles);

        js._init($elem,function(){
            $elem.css(options);
        });
    };
    js._optionsShow = function($elem){
        $elem.show().stop().animate($elem.data('styles'),function(){
            $elem.trigger('resume');
        })
    };
    js._optionsHide = function($elem,options){
        $elem.stop().animate(options,function(){
            $elem.hide().trigger('pause');
        });
    };

    //默认参数
    var defaults = {
        css3:false,
        js:false,
        animation:'fade'
    };
    function showHide($elem,options){
        var mode = null;

        //获取动画类型
        if (options.css3 && transition.isSupport) {
            //css3 transition
            mode = css3[options.animation] || css3[defaults.animation];
            console.log('options css3');
        }else if(options.js){
            //js animation
            mode = js[options.animation] || js[defaults.animation];
            console.log('options js');
        }else{
            //no animation
            mode = silent;
            console.log('options silent');
        }

        //初始化操作
        mode.init($elem);
        //根据动画类型 初始化 与 返回 显示隐藏函数对象
        return {
            //通过代理传参 在未调用函数之前 先传入参数
            show:$.proxy(mode.show,this,$elem),
            hide:$.proxy(mode.hide,this,$elem)
        };
    }


    //jQuery 插件方式
    $.fn.extend({
        showHide:function(option){
            return this.each(function(){
                var $this = $(this),
                    options = $.extend({},defaults,typeof option === 'object' && option),
                    mode = $this.data('showHide');

                    //首次执行 只获取一次
                    if(!mode){
                        $this.data('showHide',mode = showHide($this,options))    
                    }

                //传入字符串 调用函数
                if (typeof mode[option] === 'function') {
                    mode[option]();
                }
            });
        }
    });

    //原生模块化 返回对象的方式
    // window.mt = window.mt || {};
    // window.mt.showHide = showHide;
})(jQuery);