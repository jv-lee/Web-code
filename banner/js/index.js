window.onload = function() {

    //兼容 IE  和 主流浏览器 添加监听事件 解除事件的方法
    var EvenetUtil = {
        //添加事件绑定
        addHandler: function(ele, type, fun) {
            if (ele.addEventListener) {
                ele.addEventListener(type, fun, false);
            } else if (ele.attachEvent) {
                ele.attachEvent("on" + type, fun);
            } else {
                ele["on" + type] = fun;
            }
        },
        //移除事件绑定
        removeHandler: function(ele, type, fun) {
            if (ele.removeEventListener) {
                ele.removeEventListener(type, fun, false);
            } else if (ele.detachEvent) {
                ele.detachEvent("on" + type, fun);
            } else {
                ele["on" + type] = null;
            }
        },
        //获取target
        getTarget: function(event) {
            return event.target || event.srcElement;
        },
        //阻止默认行为
        preventDefault: function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        //结束事件传递
        stopPropagation: function(event) {
            if (event.stopPropagetion) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
    };

    var ElementUtil = {
        //兼容id
        getElementById: function(id) {
            var el = document.getElementById(id);
            if (!+"\v1") { //判断是否为ie浏览器
                if (el && el.id == id) {
                    return el;
                } else {
                    var els = document.all[id];
                    var length = els.length;
                    for (var i = 0; i < length; i++) {
                        if (els[i].id == id) {
                            return els[i];
                        }
                    }
                }
            }
            return el;
        },
        //兼容方法 
        getElementsByClassName: function(opts) {
            var searchClass = opts.searchClass; //存储要查找的类名
            var node = opts.node || document; //存储要查找的范围
            var tag = opts.tag || '*'; //存储一定范围内要查找的标签
            var result = [];
            //判断浏览器支不支持getElementsByClassName方法
            if (document.getElementsByClassName) { //如果浏览器支持
                var nodes = node.getElementsByClassName(searchClass);
                if (tag !== "*") {
                    for (var i = 0; node = nodes[i++];) {
                        if (node.tagName == tag.toUpperCase()) {
                            result.push(node);
                        }
                    }
                } else {
                    result = nodes;
                }
                return result;
                //使用IE8以下的浏览器能够支持该属性
            } else {
                var els = node.getElementsByTagName(tag);
                var elsLen = els.length;
                var i, j;
                var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)"); //正则的意思  ^开始 以空格\\s或者 | searchClass开始， 后面 也可以以 \\s空格 |自己结束$
                for (i = 0, j = 0; i < elsLen; i++) {
                    if (pattern.test(els[i].className)) { //检测正则表达式
                        result[j] = els[i];
                        j++;
                    }
                }
                return result;
            }
        },
        //通用方法 兼容所有浏览器的读取值得方法
        getInnerText: function(element) {
            return (typeof element.textContent == "string") ? element.textContent : element.innerText;
        },
        //兼容所有浏览器的set方法
        setInnerText: function(element, text) {
            if (typeof element.textContent == "string") {
                element.textContent = text;
            } else {
                element.innerText = text;
            }
        }
    };


    var backgroundArray = ['./img/bg1.jpg', './img/bg2.jpg', './img/bg3.jpg'],
        menuArray = ['手机、配件', '电脑', '家用电器', '家具'],
        index = 0,
        main = ElementUtil.getElementById("main"),
        prev = ElementUtil.getElementById("prev"),
        next = ElementUtil.getElementById("next"),
        banner = ElementUtil.getElementById("banner"),
        dot = ElementUtil.getElementById("dots"),
        banners = null,
        dots = null,
        size = null,
        timer = null;

    for (var i = 0; i < backgroundArray.length; i++) {
        //创建banner子元素
        var div = document.createElement('div');
        div.style.backgroundImage = "url(" + backgroundArray[i] + ")";

        //创建dots子元素
        var span = document.createElement('span');
        span.setAttribute("data-id", i);

        //设置默认选中状态
        if (index == i) {
            div.className = "banner-slide slide-active";
            span.className = "active";
        } else {
            div.className = "banner-slide";
            span.className = "";
        }

        banner.appendChild(div);
        dot.appendChild(span);
    }


    //获取banner、dot 的子元素集合
    banners = banner.getElementsByTagName("div");
    dots = dot.getElementsByTagName("span");
    size = banners.length;

    //清除定时器，停止自动轮播
    function stopAutoPlay(){
        if (timer) {
            clearInterval(timer)
        }
    }

    //自动轮播任务
    function startAutoPlay() {
        timer = setInterval(function() {
            index++;
            if (index >= size)index = 0;
            changeImg();
        }, 3000);
    }

    //切换图片
    function changeImg() {
        for (var i = 0; i < size; i++) {
            banners[i].style.display = "none";
            dots[i].className = "";
        }
        banners[index].style.display = "block";
        dots[index].className = "active";
    }

    //点击下一张事件
    EvenetUtil.addHandler(next, "click", function() {
        index++;
        if (index >= 3) index = 0;
        changeImg();
    });

    //点击上一张事件
    EvenetUtil.addHandler(prev, "click", function() {
        index--;
        if (index < 0) index = size - 1;
        changeImg();
    });

    //点击索引图标 切换图片
    for (var j = 0; j < size; j++) {
        EvenetUtil.addHandler(dots[j], "click", function() {
            index = this.getAttribute('data-id');
            changeImg();
        });
    }

    //鼠标滑入main,停止轮播
    EvenetUtil.addHandler(main,"mouseover",stopAutoPlay);

    //鼠标离开main，继续轮播
    EvenetUtil.addHandler(main,"mouseout",startAutoPlay);

    //自动开启轮播
    startAutoPlay();


};