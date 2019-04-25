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

    for (var k in screenAnimateElements) {
        setScrrenAnimateInit(k);
    }

    //滑动显示每一屏幕动画
    window.onscroll = function() {
        var top = document.documentElement.scrollTop;
        console.log(top);

        if (top > 1) {
            playScrrenAnimateDone('.screen-1');
            addNavActive(0);
        }

        if (top > 80) {
        	EleUtil.addCls(EleUtil.getEle('.menu'),'menu-animate-init');
        } else {
            EleUtil.delCls(EleUtil.getEle('.menu'),'menu-animate-init');
        }

        if (top > (640 - 100) * 1) {
            playScrrenAnimateDone('.screen-2');
            addNavActive(1);
        }

        if (top > (640 - 100) * 2) {
            playScrrenAnimateDone('.screen-3');
            addNavActive(2);
        }

        if (top > (640 - 100) * 3) {
            playScrrenAnimateDone('.screen-4');
            addNavActive(3);
        }

        if (top > (640 - 100) * 4) {
            playScrrenAnimateDone('.screen-5');
            addNavActive(4);
        }
    };

    // 双向导航绑定设置
    var navItems = document.querySelectorAll('.header-nav-item');
    var menuItems = document.querySelectorAll('.menu-item');

    //设置点击选中样式
    var addNavActive = function(index) {
        for (var i = 0; i < navItems.length; i++) {
            EleUtil.delCls(navItems[i], 'header-nav-item-active');
        }
        EleUtil.addCls(navItems[index], 'header-nav-item-active');

        for (var i = 0; i < menuItems.length; i++) {
            EleUtil.delCls(menuItems[i], 'menu-item-active');
        }
        EleUtil.addCls(menuItems[index], 'menu-item-active');
    };
    addNavActive(0);

    //设置导航栏点击 跳转及修改样式
    var setNavJump = function(i, items) {
        var item = items[i];
        item.onclick = function() {
            addNavActive(i);
            document.documentElement.scrollTop = (i * 640);
        };
    };
    for (var i = 0; i < navItems.length; i++) {
        setNavJump(i, navItems);
        setNavJump(i, menuItems);
    }


    // var setNavActive = function(index,items){
    // 	items[index].onmouseover = function(){
    // 		items[index].style.left = (index*104)+ "px";
    // 	};

    // 	var activeIndex = 0;
    // 	items[index].onmouseout = function(){

    // 	};
    // };

    setTimeout(function() {
        playScrrenAnimateDone('.screen-1');
    }, 200);

});