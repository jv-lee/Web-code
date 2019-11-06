	(function(){
	'use strict';

		//获取dpr->scale = 1 /dpr  设置viewprot视口的缩放比， 根据物理像素比 dpr 来调整缩放值
		var docEl = document.documentElement,
		viewportEl = document.querySelector('meta[name="viewport"'),
		dpr = window.devicePixelRatio || 1,
		maxWidth = 540,
		minWidth = 320;
				
		dpr = dpr >= 3 ? 3:(dpr >= 2 ? 2:1);

		docEl.setAttribute('data-dpr',dpr);
		docEl.setAttribute('max-width',maxWidth);
		docEl.setAttribute('min-width',minWidth);

		var scale = 1 / dpr,
		content = 'width=device-width,initial-scale='+scale+',maximum-scale='+scale+',minimum-scale='+scale+',user-scalable=no';

		if (viewportEl) {
			viewportEl.setAttribute('content',content);
		}else{
			viewportEl = document.createElement('meta');
			viewportEl.setAttribute('name','viewport');
			viewportEl.setAttribute('content',content);
			document.head.appendChild(viewportEl);
		}

		//1rem = viewWidth / 18.75(固定值 为了结果值整除方便)
		setRemUnit();

		window.addEventListener('resize',setRemUnit);

		function setRemUnit(){
			var ratio = 18.75;
			var viewWidth = docEl.getBoundingClientRect().width || window.innerWidth;

			//设置最大值最小值限定 viewWidth
			if (maxWidth && (viewWidth / dpr > maxWidth)) {
				viewWidth = maxWidth * dpr;
			}else if(minWidth && (viewWidth / dpr < minWidth)){
				viewWidth = minWidth * dpr;
			}

			docEl.style.fontSize = viewWidth / ratio + 'px';

			console.log('ratio:'+ratio);
			console.log('viewWidth:'+viewWidth);
			console.log('fontSize:'+(viewWidth/ratio));
		}	
	})();