//自动执行匿名函数
(function(){


    /**
	 * 实现画圆和画线:
	 * 1、添加事件touchstart、touchmove、touchend
	 * 2、touchstart判断是否点击的位置处于圆内getPosition，处于则初始化lastPostion、restPosition
	 * 3、touchmove做的就是：画圆drawPoint和划线drawLine
	 */
	//在window上挂在canvasLock对象 提供可以new的操作
	window.canvasLock =function(obj){
		this.height = obj.height;
		this.width = obj.width;
		this.chooseType = obj.chooseType;
	};

	//初始化dom元素
	canvasLock.prototype.initDom = function(){
		var warp = document.createElement('div');
		var str = '<h4 id="title" class="title">绘制解锁图案</h4>';
		warp.setAttribute('style','position: absolute;top:0;left:0;right:0;bottom:0;')

		var canvas = document.createElement('canvas');
		canvas.setAttribute('id','canvas');
		canvas.style.cssText = 'background-color:#305066;display:inline-block;margin-top:15px';

		warp.innerHTML = str;
		warp.appendChild(canvas);

		//创建canvasLock对象的宽高 , 传入则使用传入的宽高，未传入直接使用300
		var width = this.width || 300;
		var height = this.height || 300;

		document.body.appendChild(warp);

		//通过属性设置宽高
		canvas.width = width;
		canvas.height = height;
	};

	//用于解锁点圆形的函数
	canvasLock.prototype.drawCircle = function(x,y){
		this.ctx.strokeStyle = "#CFE6FF";
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		this.ctx.arc(x,y,this.r,0,Math.PI*2,true);
		this.ctx.closePath();
		this.ctx.stroke();
	};

	//创建解锁点的坐标 9个解锁点
	canvasLock.prototype.createCircle = function(){
		var n = this.chooseType;
		var count = 0;
		this.r = this.ctx.canvas.width / (2+4*n);//计算公式

		//获取9个圆的中心坐标点
		this.lastPoint = [];
		this.arr = [];
		this.restPoint = [];
		var r = this.r;
		//双重循环 传入每行3个远点 r=3 ， 循环9次获取9个中心坐标点
		for(var i = 0;i<n;i++){
			for(var j = 0;j<n;j++){
				count++;
				var obj = {
					x:j*4*r+3*r,
					y:i*4*r+3*r,
					index:count
				}
				this.arr.push(obj);
			}
		}

		this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx,canvas.height);
		for(var i = 0;i<this.arr.length;i++){
			//画圆
			this.drawCircle(this.arr[i].x,this.arr[i].y);
		}
	};

	//初始化函数 提供给外部调用
	canvasLock.prototype.init = function(){
		this.initDom();
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');
		this.touchFlag = false;
		//确定半径，确定每一个圆的中心坐标点
		this.createCircle();
		this.bindEvent();
	};

	canvasLock.prototype.bindEvent =function(){
		var self = this;
		this.canvas.addEventListener("touchstart",function(e){
			//touchstart判断是否点击的位置处于圆内getPosition，处于则初始化lastPostion、restPosition

			var po = self.getPosition(e);
			//判断是否在圆内的原理:多出来的这条x/y < r(半径) , 在圆内
			//判断 点击位置的x位置 减去 循环9个圆的中心点x坐标， 如果小于圆的半径r ， 则为点击区域在圆内
			//判断 点击位置的y位置 减去 循环9个圆的中心点y坐标， 如果小于圆的半径r ， 则为点击区域在圆内
			for(var i = 0;i < self.arr.length;i++){
				if(Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) <self.r){
					self.touchFlag = true;
					//存储当前点击的圆的 圆心坐标
					self.lastPoint.push(self.arr[i]);
					self.restPoint.splice(i,1);
					break;
				}
			}

		},false);

		this.canvas.addEventListener("touchmove",function(e){
			//当前位置为9个圆点之一
			if(self.touchFlag){
				self.update(self.getPosition(e));
			}
		},false);

		this.canvas.addEventListener("touchend",function(e){

		},false);		
	};

	//更新当前解锁状态
	canvasLock.prototype.update =function(po){
		//核心变换方法在touchmove时调用
		this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);

		//重新绘制9个解锁圆点
		for(var i =0;i<this.arr.length;i++){
			this.drawCircle(this.arr[i].x,this.arr[i].y);
		}

		this.drawPoint();//每帧画痕迹
		this.drawLine(po);//每帧画圆心
	};

	//解锁轨迹
	canvasLock.prototype.drawLine = function(po,lastPoint){

	};

	//初始化圆心
	canvasLock.prototype.drawPoint = function(){
		for(var i = 0;i<this.lastPoint.length;i++){
			this.ctx.fillStyle = '#CFE6FF';
			this.ctx.beginPath();
			this.ctx.arc(this.lastPoint[i].x,this.lastPoint[i].y,this.r / 2,0,Math.PI * 2,true);
			this.ctx.closePath();
			this.ctx.fill();
		}
	};

		//获取touch点相对于canvas的坐标
	canvasLock.prototype.getPosition = function(e){
		//rect.top/left/right/bottom 为 当前画布矩形 的左上右下 离屏幕的边距 从画布的边开始到屏幕边缘
		//clientX/Y 为 当前画布内点击的位置 离屏幕的编剧 从画布点击的位置开始到屏幕的边缘
		var rect = e.currentTarget.getBoundingClientRect();
		var po = {
			//假设离屏幕100 ， 点击了矩形150的位置 ， clientx - rect.left = 50
			x:(e.touches[0].clientX - rect.left),
			y:(e.touches[0].clientY - rect.top)
		};
		return po;
	};

})();