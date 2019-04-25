//兼容 IE  和 主流浏览器 添加监听事件 解除事件的方法
var EveUtil = {
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

var EleUtil = {
    //兼容id
    byId: function(id) {
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
    byCName: function(opts) {
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
    },
    // 获取单个元素 根据calss
getEle:function(selector) {
    return document.querySelector(selector);
},

//获取多个元素 根据class
getAllEle:function(selector) {
    return document.querySelectorAll(selector);
},

//获取元素样式
getCls:function(element) {
    return element.getAttribute('class');
},

//设置元素样式
setCls:function(element, cls) {
    return element.setAttribute('class', cls);
},

//为元素添加样式
addCls:function(element, cls) {
    var baseCls = this.getCls(element);
    if (baseCls.indexOf(cls) === -1) {
        this.setCls(element, baseCls + " " + cls);
    }
},

//为元素删除样式
delCls:function(element, cls) {
    var baseCls = this.getCls(element);
    if (baseCls.indexOf(cls) != -1) {
        this.setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
    }
}
};