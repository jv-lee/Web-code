onReady(function (){
			var screenAnimateElements = {
			".screen-1":[
			'.screen-1-heading',
			'.screen-1-subheading',
			".header"
			],
			".screen-2":[
			".screen-2-heading",
			".screen-2-subheading",
			".screen-2-person",
			".screen-2-rocet"
			],
			".screen-3":[
			".screen-3-icon",
			".screen-3-content-heading",
			".screen-3-content-subheading",
			".type-1",
			".type-2",
			".type-3",
			".type-4",
			".type-5"
			],
			".screen-4":[
			".screen-4-heading",
			".screen-4-subheading",
			".screen-4-commands"
			],
			".screen-5":[
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
        }

        if (top > (640 - 100) * 1) {
            playScrrenAnimateDone('.screen-2');
        }

        if (top > (640 - 100)  * 2) {
            playScrrenAnimateDone('.screen-3');
        }

        if (top > (640 - 100)  * 3) {
            playScrrenAnimateDone('.screen-4');
        }

        if (top > (640 - 100)  * 4) {
            playScrrenAnimateDone('.screen-5');
        }
    };

    setTimeout(function(){
    	playScrrenAnimateDone('.screen-1');
    },200);
});