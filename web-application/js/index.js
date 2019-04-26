onReady(function() {
    var screenAnimateElements = {
        ".screen-1": [
            '.screen-1-heading',
            '.screen-1-subheading',
            ".header"
        ],
        ".screen-2": [
            ".screen-2-heading",
            ".screen-2-subheading",
            ".screen-2-person",
            ".screen-2-rocet"
        ],
        ".screen-3": [
            ".screen-3-icon",
            ".screen-3-content-heading",
            ".screen-3-content-subheading",
            ".type-1",
            ".type-2",
            ".type-3",
            ".type-4",
            ".type-5"
        ],
        ".screen-4": [
            ".screen-4-heading",
            ".screen-4-subheading",
            ".screen-4-commands"
        ],
        ".screen-5": [
            ".screen-5-heading",
            ".screen-5-subheading",
            ".screen-5-icon"
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

    //初始化动画
    for (var k in screenAnimateElements) {
        setScrrenAnimateInit(k);
    }

    //滑动显示每一屏幕动画
    window.onscroll = function() {
        var top = document.documentElement.scrollTop;
        console.log(top);

        //设置右侧菜单动画初始化
        if (top > 80) {
            EleUtil.addCls(EleUtil.getEle('.menu'),'menu-animate-init');
        } else {
            EleUtil.delCls(EleUtil.getEle('.menu'),'menu-animate-init');
        }

        if (top > 1) {
            playScrrenAnimateDone('.screen-1');
            addNavActive(0);
        }

        if (top > 1 || top < 540) {
            addTipActive(0);
        }

        if (top > (640 - 100) * 1) {
            playScrrenAnimateDone('.screen-2');
            addNavActive(1);
            addTipActive(1);
        }

        if (top > (640 - 100) * 2) {
            playScrrenAnimateDone('.screen-3');
            addNavActive(2);
            addTipActive(2);
        }

        if (top > (640 - 100) * 3) {
            playScrrenAnimateDone('.screen-4');
            addNavActive(3);
            addTipActive(3);
        }

        if (top > (640 - 100) * 4) {
            playScrrenAnimateDone('.screen-5');
            addNavActive(4);
            addTipActive(4);
        }
    };

    // 双向导航绑定设置
    var typeItems = document.querySelectorAll('.screen-3-content-types-item');
    var navItems = document.querySelectorAll('.header-nav-item');
    var menuItems = document.querySelectorAll('.menu-item');
    var tip = document.querySelector(".header-nav-tip");
    var currentIndex = 0;

    //设置tip选中样式
    var addTipActive = function(index){
        tip.style.left = (index * 104) + "px";
    };

    //设置点击选中样式
    var addNavActive = function(index) {
        for (var i = 0; i < menuItems.length; i++) {
            EleUtil.delCls(menuItems[i], 'menu-item-active');
        }
        EleUtil.addCls(menuItems[index], 'menu-item-active');
    };
    addNavActive(0);


    //导航栏item设置点击事件监听方法
    var setNavClickListener = function(i, items) {
        var item = items[i];
        item.onclick = function() {
            currentIndex = i;
            addNavActive(i);
            document.documentElement.scrollTop = (i * 640);
        };
    };


    //导航栏item鼠标移动设置监听方法
    var setNavMouseoverListener = function(index,items){
    	items[index].onmouseover = function(){
            addTipActive(index);
    	};

    	items[index].onmouseout = function(){
            addTipActive(currentIndex);
    	};
    };

    // 循环设置所有导航item 点击设置页面scrollTop属性
    for (var i = 0; i < navItems.length; i++) {
        setNavClickListener(i,navItems);
        setNavClickListener(i, menuItems);
    }

    //设置鼠标滑入滑出 下标移动
    for (var i = 0; i < navItems.length; i++) {
        setNavMouseoverListener(i,navItems);
    }

    setTimeout(function() {
        playScrrenAnimateDone('.screen-1');
    }, 200);

});