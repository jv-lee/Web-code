// 获取单个元素 根据calss
var getEle = function(selector) {
    return document.querySelector(selector);
};

//获取多个元素 根据class
var getAllEle = function(selector) {
    return document.querySelectorAll(selector);
};

//获取元素样式
var getCls = function(element) {
    return element.getAttribute('class');
};

//设置元素样式
var setCls = function(element, cls) {
    return element.setAttribute('class', cls);
};

//为元素添加样式
var addCls = function(element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) === -1) {
        setCls(element, baseCls + " " + cls);
    }
};

//为元素删除样式
var delCls = function(element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) != -1) {
        setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
    }
};


//初始化动画样式 init
var screenAnimateElements = {
    '.screen-1': [
        '.screen-1-heading',
        '.screen-1-phone',
        '.screen-1-shadow'
    ],
    '.screen-2': [
        '.screen-2-heading',
        '.screen-2-phone',
        '.screen-2-subheading',
        '.screen-2-point'
    ],
    '.screen-3': [
        '.screen-3-heading',
        '.screen-3-phone',
        '.screen-3-subheading',
        '.screen-3-features'
    ],
    '.screen-4': [
        '.screen-4-heading',
        '.screen-4-subheading',
        '.screen-4-type-item-1',
        '.screen-4-type-item-2',
        '.screen-4-type-item-3',
        '.screen-4-type-item-4'
    ],
    '.screen-5': [
        '.screen-5-heading',
        '.screen-5-bg',
        '.screen-5-subheading',
    ]

};

//设置屏幕元素动画 为初始状态
var setScrrenAnimateInit = function(screenCls) {
    var screen = document.querySelector(screenCls); //获取当前屏幕的元素
    var animateElements = screenAnimateElements[screenCls];
    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseClas = element.getAttribute('class');
        element.setAttribute('class', baseClas + ' ' + animateElements[i].substr(1) + '-animate-init');
    }
};

//设置播放屏内元素动画	
var playScrrenAnimateDone = function(screenCls) {
    var screen = document.querySelector(screenCls); //获取当前屏幕的元素
    var animateElements = screenAnimateElements[screenCls];
    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseClas = element.getAttribute('class');
        element.setAttribute('class', baseClas.replace('-animate-init', '-animate-done'));
    }
};

//导航条双向定位
window.onload = function() {
    for (var k in screenAnimateElements) {
    	if (k==='.screen-1') {
    		continue;
    	}
        setScrrenAnimateInit(k);
    }

    var navItems = getAllEle('.header-nav-item');
    var outlineItems = getAllEle('.outline-item');

    var switchNavItemsActive = function(index) {
        for (var i = 0; i < navItems.length; i++) {
            delCls(navItems[i], 'header-nav-item-status-active');
        }
        addCls(navItems[index], 'header-nav-item-status-active');
        for (var i = 0; i < outlineItems.length; i++) {
            delCls(outlineItems[i], 'outline-item-active');
        }
        addCls(outlineItems[index], 'outline-item-active');
    };
    //默认选中第一个
    switchNavItemsActive(0);

    //滑动门特效
    var navTip = getEle('.header-nav-tip');
    console.log(navTip);
    var setTip = function(index,items){

    	items[index].onmouseover = function(){
    		navTip.style.left = (index * 70) + 'px';
    	};

    	var activeIndex = 0;
    	items[index].onmouseout = function(){
    		for (var i = 0; i < items.length; i++) {
    			if (getCls(items[i]).indexOf('header-nav-item-status-active') > -1) {
    				activeIndex = i;
    				break;
    			}
    		}
    		navTip.style.left = (activeIndex * 70) + 'px';
    	};
    };
    for (var i = 0; i < navItems.length; i++) {
    	setTip(i,navItems);
    }

    //滑动显示每一屏幕动画
    window.onscroll = function() {
        var top = document.body.scrollTop;
        console.log(top);

        if (top > 80) {
            addCls(getEle('.header'), 'header-status-back');
            addCls(getEle('.outline'), 'outline-status-in');
        } else {
            delCls(getEle('.header'), 'header-status-back');
            delCls(getEle('.outline'), 'outline-status-in');
        }

        if (top > 1) {
            playScrrenAnimateDone('.screen-1');
            switchNavItemsActive(0);
            setTip(0,navItems);
        }else{
        	switchNavItemsActive(0);
        	setTip(0,navItems);
        }

        if (top > (800 - 100) * 1) {
            playScrrenAnimateDone('.screen-2');
            switchNavItemsActive(1);
            setTip(1,navItems);
        }

        if (top > (800 - 100) * 2) {
            playScrrenAnimateDone('.screen-3');
            switchNavItemsActive(2);
            setTip(2,navItems);
        }

        if (top > (800 - 100) * 3) {
            playScrrenAnimateDone('.screen-4');
            switchNavItemsActive(3);
            setTip(3,navItems);
        }

        if (top > (800 - 100) * 4) {
            playScrrenAnimateDone('.screen-5');
            switchNavItemsActive(4);
            setTip(4,navItems);
        }
    };

    //导航条双向定位
    var setNavJump = function(i, items) {
        var item = items[i];
        item.onclick = function() {
            document.body.scrollTop = i * 800 - 80;
        };
    };

    for (var i = 0; i < navItems.length; i++) {
        setNavJump(i, navItems);
    }
    for (var i = 0; i < outlineItems.length; i++) {
        setNavJump(i, outlineItems);
    }

    setTimeout(function(){
    	playScrrenAnimateDone('.screen-1');
    },200);
    
};