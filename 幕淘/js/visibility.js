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
        $elem.data('visibility', true).trigger('start').show();
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
                $elem.trigger('resume');
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
                $elem.addClass('transition');
                init($elem, function() {
                    $elem.addClass('fadeOut');
                });
            },
            show: function($elem) {
                show($elem, function() {
                    //先解绑，再绑定一次事件
                    $elem.off(transition.end).one(transition.end, function() {
                        $elem.trigger('resume');
                    });
                    setTimeout(function() {
                        $elem.removeClass('fadeOut');
                    }, 20);

                });

            },
            hide: function($elem) {
                hide($elem, function() {
                    $elem.off(transition.end).one(transition.end, function() {
                        $elem.hide().trigger('stop');
                    });
                    setTimeout(function() {
                        $elem.addClass('fadeOut');
                    }, 20);

                });

            }
        },
        slideUpDown: {
            init: function($elem) {
                $elem.height($elem.height());
                $elem.addClass('transition');
                init($elem, function() {
                    $elem.addClass('slideUpDownCollapse');
                });
            },
            show: function($elem) {
                show($elem, function() {
                    //先解绑，再绑定一次事件
                    $elem.off(transition.end).one(transition.end, function() {
                        $elem.trigger('resume');
                    });
                    setTimeout(function() {
                        $elem.removeClass('slideUpDownCollapse');
                    }, 20);

                });
            },
            hide: function($elem) {
                hide($elem, function() {
                    $elem.off(transition.end).one(transition.end, function() {
                        $elem.hide().trigger('stop');
                    });
                    setTimeout(function() {
                        $elem.addClass('slideUpDownCollapse');
                    }, 20);

                });
            }
        },
        slideLeftRight: {
            init:function($elem){

            },
            show: function($elem) {

            },
            hide: function($elem) {

            }
        },
        fadeSlideUpDown: {
            init:function($elem){

            },
            show: function($elem) {

            },
            hide: function($elem) {

            }
        },
        fadeSlideLeftRight: {
            init:function($elem){

            },
            show: function($elem) {

            },
            hide: function($elem) {

            }
        }
    };
    var js = {
        fade: {
            show: function() {

            },
            hide: function() {

            }
        },
        slideUpDown: {
            show: function() {

            },
            hide: function() {

            }
        },
        slideLeftRight: {
            show: function() {

            },
            hide: function() {

            }
        },
        fadeSlideUpDown: {
            show: function() {

            },
            hide: function() {

            }
        },
        fadeSlideLeftRight: {
            show: function() {

            },
            hide: function() {

            }
        }
    };