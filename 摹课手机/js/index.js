// 获取单个元素 根据calss
var getEle = function(selector){
	return document.querySelector(selector);
}

//获取多个元素 根据class
var getAllEle = function(selector){
	return document.querySelectorAll(selector);
}

//获取元素样式
var getCls = function(element){
	return element.getAttribute('class');
}

//设置元素样式
var setCls = function(element,cls){
	return element.setAttribute('class',cls);
}

//为元素添加样式
var addCls = function(element,cls){
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) === -1) {
		setCls(element,baseCls +" " +cls);
	}
}

//为元素删除样式
var delCls = function(element,cls){
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) != -1) {
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
	}
}


//初始化动画样式 init
var screenAnimateElements = {
	'.screen-1':[
		'.screen-1-heading',
		'.screen-1-phone',
		'.screen-1-shadow'
	],
	'.screen-2':[
		'.screen-2-heading',
		'.screen-2-phone',
		'.screen-2-subheading',
		'.screen-2-point'
	],
	'.screen-3':[
		'.screen-3-heading',
		'.screen-3-phone',
		'.screen-3-subheading',
		'.screen-3-features'
	],
	'.screen-4':[
		'.screen-4-heading',
		'.screen-4-subheading',
		'.screen-4-type-item-1',
		'.screen-4-type-item-2',
		'.screen-4-type-item-3',
		'.screen-4-type-item-4'
	],
	'.screen-5':[
		'.screen-5-heading',
		'.screen-5-bg',
		'.screen-5-subheading',
	]

};

//设置屏幕元素动画 为初始状态
var setScrrenAnimateInit = function(screenCls){
	var screen = document.querySelector(screenCls); //获取当前屏幕的元素
	var animateElements = screenAnimateElements[screenCls];
	for (var i = 0; i < animateElements.length; i++) {
		var element = document.querySelector(animateElements[i]);
		var baseClas = element.getAttribute('class');
		element.setAttribute('class',baseClas + ' '+animateElements[i].substr(1)+'-animate-init');
	}
}

//设置播放屏内元素动画	
var playScrrenAnimateDone = function(screenCls){
	var screen = document.querySelector(screenCls); //获取当前屏幕的元素
	var animateElements = screenAnimateElements[screenCls];
	for (var i = 0; i < animateElements.length; i++) {
		var element = document.querySelector(animateElements[i]);
		var baseClas = element.getAttribute('class');
		element.setAttribute('class',baseClas.replace('-animate-init','-animate-done'));
	}
}

window.onload = function(){

	for(var k in screenAnimateElements){
		setScrrenAnimateInit(k);
	}

}

//滑动显示每一屏幕动画
window.onscroll = function(){
	var top = document.body.scrollTop;
	console.log(top);

	if (top > 1) {
		playScrrenAnimateDone('.screen-1');
	}

	if (top > 800*1) {
		playScrrenAnimateDone('.screen-2');	
	}

	if (top > 800*2) {
		playScrrenAnimateDone('.screen-3');	
	}

	if (top > 800*3) {
		playScrrenAnimateDone('.screen-4');	
	}

	if (top > 800*4) {
		playScrrenAnimateDone('.screen-5');	
	}			
}
