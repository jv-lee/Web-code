// ui-search 定义
$.fn.UiSearch = function() {
    var ui = $(this);
    //设置选择按钮点击事件  点击后显示多选项list
    $('.ui-search-selected', ui).on('click', function() {
        $('.ui-search-select-list').show();
        //将事件消费掉 为了不被body消费事件
        return false;
    });

    //给多选项list每一个item设置点击事件 点击后设置 选中项的text  通过获取当前点击的元素text 设置到选中项上 再隐藏多选项item
    $('.ui-search-select-list a', ui).on('click', function() {
        $('.ui-search-selected').text($(this).text());
        $('.ui-search-select-list').hide();
        //将事件消费掉 为了不被body消费事件
        return false;
    });

    $('body').on('click', function() {
        $('.ui-search-select-list').hide();
    })

};

// ui-tab 定义

/**
 * @param {string} header TAB组件，的所有选项卡 item
 * @param {string} content TAB组件，内容区域，所有 item
 * @param {string} focus_name 选项卡高亮样式
 */
$.fn.UiTab = function(header, content, focus_name) {
    var ui = $(this);
    var tabs = $(header, ui);
    var cons = $(content, ui);

    tabs.on('click', function() {
        var index = $(this).index();
        tabs.removeClass(focus_name).eq(index).addClass(focus_name);
        cons.hide().eq(index).show();
        return false;
    });
};

// ui-backTop
$.fn.UiBackTop = function() {
    var ui = $(this);
    var el = $('<a  class="ui-backTop" href="#0"></a>');
    ui.append(el);

    var windowHeight = $(window).height();
    $(window).on('scroll', function() {
        var top = $('body').scrollTop();
        console.log(top + ' - ' + windowHeight);
        if (top >= 200) {
            el.show();
        } else {
            el.hide();
        }
    });
    el.on('click', function() {
        $(window).scrollTop(0);
    });
};

// ui-slider
// 1.左右箭头需要能控制翻页
// 2.翻页的时候，进度点，要联动进行focus
// 3.翻到最后一页的时候，下一页需要回到 第一页，翻到第一页往回翻页时同理
// 4.进度点，在点击的时候，需要切换到对应的页面
// 5.没有点击进度点、翻页操作的时候需要进行自动关东
// 6.滚动过程中，屏蔽其他操作（自动滚动、左右翻页、进度点点击）
// 7.高级无缝滚动
$.fn.UiSlider = function() {
    var ui = $(this);

    var wrap = $('.ui-slider-wrap');
    
    var btn_prev = $('.ui-slider-arrow .left', ui);
    var btn_next = $('.ui-slider-arrow .right', ui);

    var items = $('.ui-slider-wrap .item', ui);
    var tips = $('.ui-slider-process .item', ui);

    //预定义
    var current = 0;
    var size = items.length;
    var width = items.eq(0).width();
    var enableAuto = true;

    //设置自动滚动感应
    ui
    .on('mouseover',function(){
    	enableAuto = false;
    })
    .on('mouseout',function(){
    	enableAuto = true;
    });
    
    // 具体操作
    wrap.on('move_prev', function() {
    	if (current <=0 ) {
    		current = size;
    	}
    	current = current - 1;
    	wrap.triggerHandler('move_to',current);
    })
    .on('move_next', function() {
    	if (current >= size-1) {
    		current = -1;
    	}
    	current = current + 1;
    	wrap.triggerHandler('move_to',current);
    })
    .on('move_to', function(evt, index) {
    	wrap.css('left',index*width*-1);
    	tips.removeClass('item_focus').eq(index).addClass('item_focus');
    })
    .on('auto_move',function(){
    	setInterval(function(){
    		enableAuto && wrap.triggerHandler('move_next');
    	},2000);
    })
    .triggerHandler('auto_move');

    //事件
    btn_prev.on('click', function() {
        wrap.triggerHandler('move_prev');
    });

    btn_next.on('click', function() {
        wrap.triggerHandler('move_next');
    });
    tips.on('click', function() {
        var index = $(this).index();
        wrap.triggerHandler('move_to', index);
    });
};

// 页面的脚本逻辑
$(function() {
    $('.ui-search').UiSearch();

    $('.content-tab').UiTab('.caption > .item', '.block > .item', 'item_focus');

    $('.content-tab .block .item').UiTab('.block-caption > a', '.block-content > .block-wrap', 'block-caption-item_focus');

    $('body').UiBackTop();

    $('.ui-slider').UiSlider();
});