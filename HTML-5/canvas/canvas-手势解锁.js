//自动执行匿名函数
(function() {


    /**
     * 实现画圆和画线:
     * 1、添加事件touchstart、touchmove、touchend
     * 2、touchstart判断是否点击的位置处于圆内getPosition，处于则初始化lastPostion、restPosition
     * 3、touchmove做的就是：画圆drawPoint和划线drawLine
     * 实现自动画圆的效果
     * 1、检测手势移动的位置是否处于圆内
     * 2、圆内的画则画圆 drawPoint
     * 3、已经绘制的解锁点圆，无需重复检测
     * 实现解锁成功
     * 1、检测路径是否是对的
     * 2、如果是正确的就重置，圆圈变绿
     * 3、不对也重置，圆圈变红
     * 4、重置
     */
    //在window上挂在canvasLock对象 提供可以new的操作
    window.canvasLock = function(obj) {
        this.height = obj.height;
        this.width = obj.width;
        this.chooseType = obj.chooseType;
    };

    //初始化dom元素
    canvasLock.prototype.initDom = function() {
        var warp = document.createElement('div');
        var str = '<h4 id="title" class="title">绘制解锁图案</h4>';
        warp.setAttribute('style', 'position: absolute;top:0;left:0;right:0;bottom:0;');

        var canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'canvas');
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
    canvasLock.prototype.drawCircle = function(x, y) {
        this.ctx.strokeStyle = "#CFE6FF";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.stroke();
    };

    //创建解锁点的坐标 9个解锁点
    canvasLock.prototype.createCircle = function() {
        var n = this.chooseType;
        var count = 0;
        this.r = this.ctx.canvas.width / (2 + 4 * n); //计算公式

        //获取9个圆的中心坐标点
        //用于记录当前选中点的数组
        this.lastPoint = [];
        //9个圆点数据存放数组
        this.arr = [];
        //初始化默认9个点， 为了做检测 每次选中删除
        this.restPoint = [];
        var r = this.r;
        //双重循环 传入每行3个远点 r=3 ， 循环9次获取9个中心坐标点
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                count++;
                var obj = {
                    x: j * 4 * r + 3 * r,
                    y: i * 4 * r + 3 * r,
                    index: count
                };
                this.arr.push(obj);
                //初始化默认9个点， 为了做检测 每次选中删除
                this.restPoint.push(obj);
            }
        }

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.arr.length; i++) {
            //画圆
            this.drawCircle(this.arr[i].x, this.arr[i].y);
        }
    };

    //初始化函数 提供给外部调用
    canvasLock.prototype.init = function() {
        this.initDom();
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.touchFlag = false;
        //确定半径，确定每一个圆的中心坐标点
        this.createCircle();
        this.bindEvent();
    };

    //touchstart\touchmove\touchend 只在手机上触发
    canvasLock.prototype.bindEvent = function() {
        var self = this;
        // 按下事件
        this.canvas.addEventListener("touchstart", function(e) {
            //touchstart判断是否点击的位置处于圆内getPosition，处于则初始化lastPostion、restPosition

            var po = self.getPosition(e);
            //判断是否在圆内的原理:多出来的这条x/y < r(半径) , 在圆内
            //判断 点击位置的x位置 减去 循环9个圆的中心点x坐标， 如果小于圆的半径r ， 则为点击区域在圆内
            //判断 点击位置的y位置 减去 循环9个圆的中心点y坐标， 如果小于圆的半径r ， 则为点击区域在圆内
            for (var i = 0; i < self.arr.length; i++) {
                if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
                    self.touchFlag = true;
                    //存储当前点击的圆的 圆心坐标
                    self.lastPoint.push(self.arr[i]);
                    //移除数组内第i个元素， 删除1个  - 
                    self.restPoint.splice(i, 1);
                    break;
                }
            }

        }, false);

        // 移动事件
        this.canvas.addEventListener("touchmove", function(e) {
            //当前位置为9个圆点之一
            if (self.touchFlag) {
                self.update(self.getPosition(e));
            }
        }, false);

        // 离开事件
        this.canvas.addEventListener("touchend", function(e) {
            if (self.touchFlag) {
                self.storePass(self.lastPoint);
                setTimeout(function() {
                    self.reset();
                }, 300);
            }
        }, false);
    };

    //更新当前解锁状态
    canvasLock.prototype.update = function(po) {
        //核心变换方法在touchmove时调用
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        //重新绘制9个解锁圆点
        for (var i = 0; i < this.arr.length; i++) {
            this.drawCircle(this.arr[i].x, this.arr[i].y);
        }

        this.drawPoint(); //每帧画痕迹
        this.drawLine(po); //每帧画圆心
        /*
         * 实现自动画圆的效果
         * 1、检测手势移动的位置是否处于圆内
         * 2、圆内的画则画圆 drawPoint
         * 3、已经绘制的解锁点圆，无需重复检测
         */ //遍历当前没有被选中的点
        for (var i = 0; i < this.restPoint.length; i++) {
            //检测手势是否在下一个圆内
            if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
                //绘制一个点
                this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
                //记录最后绘制的点
                this.lastPoint.push(this.restPoint[i]);
                //移除已经被绘制的点 绘制点检测
                this.restPoint.splice(i, 1);
                break;
            }
        }
    };

    //解锁轨迹
    canvasLock.prototype.drawLine = function(po) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        //画线移动到点中选中的圆心 
        this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);

        for (var i = 1; i < this.lastPoint.length; i++) {
            this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
        }
        //划线到触摸点
        this.ctx.lineTo(po.x, po.y);
        //开始绘制
        this.ctx.stroke();
        //闭合绘制
        this.ctx.closePath();
    };

    //初始化圆心
    canvasLock.prototype.drawPoint = function() {
        console.log('drawPoint()');
        for (var i = 0; i < this.lastPoint.length; i++) {
            this.ctx.fillStyle = '#CFE6FF';
            this.ctx.beginPath();
            this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fill();
        }
    };

	/*
     * 实现解锁成功
     * 1、检测路径是否是对的
     * 2、如果是正确的就重置，圆圈变绿
     * 3、不对也重置，圆圈变红
     * 4、重置
     */
    canvasLock.prototype.storePass = function() {
    	if(this.checkPass()){
    		document.getElementById('title').innerHTML = '解锁成功';
    		this.drawStatusPoint('#2CFF26');
    	}else{
    		document.getElementById('title').innerHTML = '解锁失败';
    		this.drawStatusPoint(('red'));
    	}
    };

    //检测密码
    canvasLock.prototype.checkPass = function() {
    	var p1 = '123',
    	p2 = '';
    	//遍历所有选中的点的数组 判断index值
    	for(var i = 0;i< this.lastPoint.length;i++){
    		p2 += this.lastPoint[i].index;
    	}
    	return p1 === p2;
    };

    //修改绘制点颜色
    canvasLock.prototype.drawStatusPoint = function(type){
    	for(var i = 0;i<this.lastPoint.length;i++){
    		this.ctx.strokeStyle = type;
    		this.ctx.beginPath();
    		this.ctx.arc(this.lastPoint[i].x,this.lastPoint[i].y,this.r,0,Math.PI * 2,true);
    		this.ctx.closePath();
    		this.ctx.stroke();
    	}
    };

    //重置 重新绘制初始
    canvasLock.prototype.reset = function(){
    	this.createCircle();
    };

    //获取touch点相对于canvas的坐标
    canvasLock.prototype.getPosition = function(e) {
        //rect.top/left/right/bottom 为 当前画布矩形 的左上右下 离屏幕的边距 从画布的边开始到屏幕边缘
        //clientX/Y 为 当前画布内点击的位置 离屏幕的编剧 从画布点击的位置开始到屏幕的边缘
        var rect = e.currentTarget.getBoundingClientRect();
        var po = {
            //假设离屏幕100 ， 点击了矩形150的位置 ， clientx - rect.left = 50
            x: (e.touches[0].clientX - rect.left),
            y: (e.touches[0].clientY - rect.top)
        };
        return po;
    };

})();