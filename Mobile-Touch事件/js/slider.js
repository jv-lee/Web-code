function Slider(elem, options) {
    var defaults = {
        initIndex: 0,
        speed: 300,
        hasIndicator: false
    };
    this.options = {};
    this.options.initIndex = typeof options.initIndex !== 'undefined' ? options.initIndex : defaults.initIndex;
    this.options.speed = typeof options.speed !== 'undefined' ? options.speed : defaults.speed;
    this.options.hasIndicator = typeof options.hasIndicator !== 'undefined' ? options.hasIndicator : defaults.hasIndicator;

    this.elem = elem;
    // 获取slider元素，获取容器中所有的子元素
    this.itemContainer = elem.querySelector('.slider-item-container');

    //获取当前banner容器中 所有的子元素 判断个数
    this.items = this.itemContainer.children;
    //获取item的宽度
    this.distancePerSlider = this.items[0].offsetWidth;

    //设置最小下标 ， 最大下标
    this.minIndex = 0;
    this.maxIndex = this.items.length - 1;

    //设置当前下标
    this.index = this._adjustIndex(this.options.initIndex);

    //移动
    this.move(this.getDistanceByIndex(this.index));
    // this.clone();
    if (this.options.hasIndicator) {
        this._createIndicators();
        this._setIndicatorActive(this.index);
    }
}
Slider.prototype.clone = function(){
    var lastNode = this.items[0].cloneNode(true);
    var firstNode = this.items[this.maxIndex].cloneNode(true);
    this.itemContainer.append(lastNode);
    this.itemContainer.prepend(firstNode);
};
//主动移动到某一页幻灯片
Slider.prototype.to = function(index,cb) {
    this.index = index;
    //设置移动动画速度
    this._setTransitionSpeed(this.options.speed);
    this.move(this.getDistanceByIndex(this.index));

    var self = this;
    this.itemContainer.addEventListener('transitionend', function() {
        self._setTransitionSpeed(0);
        if (typeof cb === 'function') {
            cb();
        }
    }, false);

    //激活指示器
    if (this.options.hasIndicator) {
        this._setIndicatorActive(this.index);
    }
};
//设置移动动画时间速度
Slider.prototype._setTransitionSpeed = function(speed) {
    this.itemContainer.style.transitionDuration = speed + 'ms';
};
Slider.prototype.prev = function(cb) {
    this.to(this.index - 1,cb);
};
//下一页幻灯片
Slider.prototype.next = function(cb) {
    this.to(this.index + 1,cb);
};
//设置幻灯片最大/最小下标越位重置变化
Slider.prototype._adjustIndex = function(index) {
    if (index < this.minIndex) {
        index = this.minIndex;
    } else if (index > this.maxIndex) {
        index = this.maxIndex;
    }
    return index;
};
//幻灯片移动 参数为移动距离
Slider.prototype.move = function(distance) {
    //通过3d变换动画来移动幻灯片
    this.itemContainer.style.transform = 'translate3d(' + distance + 'px,0,0)';
};
//获取当前索引距离父元素边距的偏差距离
Slider.prototype.getDistanceByIndex = function(index) {
    //设置为负数，幻灯片向左移动隐藏 ， 索引*幻灯片一个item的宽度
    return -index * this.distancePerSlider;
};
//创建指示器html元素
Slider.prototype._createIndicators = function() {
    var indicatorContainer = document.createElement('div');
    var html = '';
    indicatorContainer.className = 'slider-indicator-container';
    for (var i = 0; i <= this.maxIndex; i++) {
        html += '<span class="slider-indicator"></span>';
    }
    indicatorContainer.innerHTML = html;
    this.elem.appendChild(indicatorContainer);
};
//设置当前选中的指示器
Slider.prototype._setIndicatorActive = function(index) {
    //防止多次获取
    this.indicators = this.indicators || this.elem.querySelectorAll('.slider-indicator');
    for (var i = 0; i < this.indicators.length; i++) {
        this.indicators[i].classList.remove('slider-indicator-active');
    }
    this.indicators[index].classList.add('slider-indicator-active');
};
//对外提供slideritem的容器
Slider.prototype.getItemContainer = function(){
    return this.itemContainer;
};
//对外提供获取当前下标的方法
Slider.prototype.getIndex = function(){
    return this.index;
};
//对外提供一个item宽度的方法
Slider.prototype.getDistancePerSlider = function(){
    return this.distancePerSlider;
};