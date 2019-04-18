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

    /************************************** 基础常量 **************************************/

    var backgroundArray = ['./img/bg1.jpg', './img/bg2.jpg', './img/bg3.jpg'],
        menuArray = ['手机、配件', '电脑', '家用电器', '家具'],
        menuIcon = '&#xe665;',
        subMenuArray = [{
                'title': '手机、配件',
                'data': [
                    { 'subtitle': '手机通讯：', 'array': ['手机', '手机维修', '以旧换新'] },
                    { 'subtitle': '手机配件：', 'array': ['手机壳', '手机存储卡', '数据线', '充电器', '电池'] },
                    { 'subtitle': '运营商：', 'array': ['中国联通', '中国移动', '中国电信'] },
                    { 'subtitle': '智能设备：', 'array': ['智能手环', '智能家居', '智能手表', '其他配件'] },
                    { 'subtitle': '娱乐：', 'array': ['耳机', '音响', '收音机', '麦克风'] }
                ]
            },
            {
                'title': '电脑',
                'data': [
                    { 'subtitle': '手机通讯：', 'array': ['手机', '手机维修', '以旧换新'] },
                    { 'subtitle': '手机配件：', 'array': ['手机壳', '手机存储卡', '数据线', '充电器', '电池'] },
                    { 'subtitle': '运营商：', 'array': ['中国联通', '中国移动', '中国电信'] },
                    { 'subtitle': '智能设备：', 'array': ['智能手环', '智能家居', '智能手表', '其他配件'] },
                    { 'subtitle': '娱乐：', 'array': ['耳机', '音响', '收音机', '麦克风'] }
                ]
            }, {
                'title': '家用电器',
                'data': [
                    { 'subtitle': '手机通讯：', 'array': ['手机', '手机维修', '以旧换新'] },
                    { 'subtitle': '手机配件：', 'array': ['手机壳', '手机存储卡', '数据线', '充电器', '电池'] },
                    { 'subtitle': '运营商：', 'array': ['中国联通', '中国移动', '中国电信'] },
                    { 'subtitle': '智能设备：', 'array': ['智能手环', '智能家居', '智能手表', '其他配件'] },
                    { 'subtitle': '娱乐：', 'array': ['耳机', '音响', '收音机', '麦克风'] }
                ]
            }, {
                'title': '家具',
                'data': [
                    { 'subtitle': '手机通讯：', 'array': ['手机', '手机维修', '以旧换新'] },
                    { 'subtitle': '手机配件：', 'array': ['手机壳', '手机存储卡', '数据线', '充电器', '电池'] },
                    { 'subtitle': '运营商：', 'array': ['中国联通', '中国移动', '中国电信'] },
                    { 'subtitle': '智能设备：', 'array': ['智能手环', '智能家居', '智能手表', '其他配件'] },
                    { 'subtitle': '娱乐：', 'array': ['耳机', '音响', '收音机', '麦克风'] }
                ]
            }
        ],
        index = 0,
        main = ElementUtil.getElementById("main"),
        prev = ElementUtil.getElementById("prev"),
        next = ElementUtil.getElementById("next"),
        banner = ElementUtil.getElementById("banner"),
        dot = ElementUtil.getElementById("dots"),
        menuBox = ElementUtil.getElementById("menu-box"),
        menuContent = ElementUtil.getElementById("menu-content"),
        subMenu = ElementUtil.getElementById("sub-menu"),
        banners = null,
        dots = null,
        size = null,
        timer = null;



    /************************************** 元素创建 **************************************/



    //  创建banner轮播图 及 索引指示灯
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

    //创建 左侧 菜单栏
    for (var a = 0; a < menuArray.length; a++) {
        var menuContentDiv = document.createElement('div');
        var menuContentSpan = document.createElement('span');
        var menuContentI = document.createElement('i');

        menuContentDiv.className = "menu-item";
        menuContentDiv.setAttribute('data-id', a);
        menuContentSpan.innerHTML = menuArray[a];
        menuContentI.innerHTML = menuIcon;

        menuContentDiv.appendChild(menuContentSpan);
        menuContentDiv.appendChild(menuContentI);
        menuContent.appendChild(menuContentDiv);
    }


    //创建sub子菜单 及子菜单元素
    for (var b = 0; b < subMenuArray.length; b++) {
        var subItemDiv = document.createElement("div");
        var titleDiv = document.createElement("div");

        subItemDiv.className = "sub-item";
        titleDiv.className = "title";
        titleDiv.innerHTML = subMenuArray[b].title;

        subItemDiv.appendChild(titleDiv);

        var rowArray = subMenuArray[b].data;
        for (var c = 0; c < rowArray.length; c++) {
            var subRowDiv = document.createElement("div");

            subRowDiv.className = "sub-row";

            var rowTitle = rowArray[c].subtitle;
            var rowSubArray = rowArray[c].array;
            for (var d = 0; d < rowSubArray.length; d++) {
                var rowTitleEle, rowCodeEle, rowItemEle;
                if (d == 0) {
                    rowTitleEle = document.createElement('a');
                    rowTitleEle.innerHTML = rowTitle;
                    subRowDiv.appendChild(rowTitleEle);
                } else {
                    rowCodeEle = document.createElement('span');
                    rowCodeEle.innerHTML = "/";
                    subRowDiv.appendChild(rowCodeEle);
                }
                rowItemEle = document.createElement('a');
                rowItemEle.setAttribute("data-id", d);
                rowItemEle.className= "child-lable";
                rowItemEle.innerHTML = rowSubArray[d];
                subRowDiv.appendChild(rowItemEle);
                subItemDiv.appendChild(subRowDiv);
            }
        }

        subMenu.appendChild(subItemDiv);
    }

    /************************************** 事件操作 **************************************/

    //获取banner、dot 的子元素集合
    banners = banner.getElementsByTagName("div");
    dots = dot.getElementsByTagName("span");
    size = banners.length;

    //清除定时器，停止自动轮播
    function stopAutoPlay() {
        if (timer) {
            clearInterval(timer);
        }
    }

    //自动轮播任务
    function startAutoPlay() {
        timer = setInterval(function() {
            index++;
            if (index >= size) index = 0;
            changeImg();
        }, 5000);
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



    EvenetUtil.addHandler(menuContent, "mouseout", function() {
        subMenu.style.display = "none";
    });
    EvenetUtil.addHandler(subMenu, "mouseover", function() {
        subMenu.style.display = "block";
    });
    EvenetUtil.addHandler(subMenu, "mouseout", function() {
        subMenu.style.display = "none";
    });


    //鼠标滑入main,停止轮播
    EvenetUtil.addHandler(main, "mouseover", stopAutoPlay);

    //鼠标离开main，继续轮播
    EvenetUtil.addHandler(main, "mouseout", startAutoPlay);

    //自动开启轮播
    startAutoPlay();


    //子菜单显示隐藏事件
    var subItems = subMenu.getElementsByClassName('sub-item');

    function showSubMenu(index) {
        subMenu.style.display = "block";
        for (i = 0; i < subItems.length; i++) {
            subItems[i].style.display = "none";
        }
        subItems[index].style.display = "block";
    }

    //主菜单控制子菜单显示隐藏事件
    var menuItems = menuContent.getElementsByClassName('menu-item');
    for (var e = 0; e < menuItems.length; e++) {
        EvenetUtil.addHandler(menuItems[e], 'mouseover', function() {
            showSubMenu(this.getAttribute('data-id'));
        });
    }

    //添加submenu 子元素点击事件
    var childLables = document.getElementsByClassName('child-lable');
    for(var f = 0;f<childLables.length;f++){
        EvenetUtil.addHandler(childLables[f],'click',function(){
            alert(this.getAttribute('data-id')+':'+this.innerHTML);
        });
    }


};