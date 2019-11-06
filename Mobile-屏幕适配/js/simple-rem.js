(function(){
	'use strict';

		//1rem = viewWidth / 18.75(固定值 为了结果值整除方便)
		setRemUnit();

		window.addEventListener('resize',setRemUnit);

		function setRemUnit(){
			var docEl = document.documentElement;
			var ratio = 18.75;
			var viewWidth = docEl.getBoundingClientRect().width || window.innerWidth;
			docEl.style.fontSize = viewWidth / ratio + 'px';

			console.log('ratio:'+ratio);
			console.log('viewWidth:'+viewWidth);
			console.log('fontSize:'+(viewWidth/ratio));
		}	
})();
