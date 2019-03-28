//兼容 IE  和 主流浏览器 添加监听事件 解除事件的方法
var EvenetUtil = {
	addHandler:function(ele,type,fun){//添加事件绑定
		if (ele.addEventListener) {
			ele.addEventListener(type,fun,false);
		}else if(ele.attachEvent){
			ele.attachEvent("on"+type,fun);
		}else{
			ele["on"+type] = null;
		}
	},removeHandler:function(ele,type,fun){//移除事件绑定
		if (ele.removeEventListener) {
			ele.removeEventListener(type,fun,false);
		}else if(ele.detachEvent){
			ele.detachEvent("on"+type,fun);
		}else{
			ele["on"+type] = null;
		}
	},getTarget:function(event){//获取target
		return event.target || event.srcElement;
	},preventDefault:function(event){//阻止默认行为
		if (event.preventDefault) {
			event.preventDefault()
		}else{
			event.returnValue = false;
		}
	},stopPropagation:function(event){//结束事件传递
		if (event.stopPropagetion) {
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
}

var ElementUtil = {
	getElementById :function(id){//兼容id
			var el = document.getElementById(id);
			if(!+"\v1"){//判断是否为ie浏览器
				if(el && el.id == id){
					return el;
				}else{
					var els = document.all[id];
					var length = els.length;
					for(var i = 0;i<length;i++){
						if (els[i].id == id) {
							return els[i];
						}
					}
				}
			}
			return el;
		},getElementsByClassName :function(opts){//兼容方法 
	var searchClass = opts.searchClass;//存储要查找的类名
	var node = opts.node || document;//存储要查找的范围
	var tag = opts.tag || '*';//存储一定范围内要查找的标签
	var result = [];
	//判断浏览器支不支持getElementsByClassName方法
	if (document.getElementsByClassName) {//如果浏览器支持
		var nodes = node.getElementsByClassName(searchClass);
		if (tag !== "*") {
			for(var i = 0;node = nodes[i++];){
				if(node.tagName == tag.toUpperCase()){
					result.push(node);
				}
			}
		}else{
			result = nodes;
		}
		return result;
	}else{//使用IE8以下的浏览器能够支持该属性
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var i,j;
		var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"); //正则的意思  ^开始 以空格\\s或者 | searchClass开始， 后面 也可以以 \\s空格 |自己结束$
		for(i = 0,j=0;i<elsLen;i++){
			if (pattern.test(els[i].className)) {//检测正则表达式
				result[j] = els[i];
				j++;
			}
		}
		return result;
	}
	},getInnerText :function(element){//通用方法 兼容所有浏览器的读取值得方法
				return (typeof element.textContent = "string") ? element.textContent : element.innerText;
		},setInnerText:function(element,text){//兼容所有浏览器的set方法
				if(typeof element.textContent = "string"){
					element.textContent = text;
				}else{
					element.innerText = text;
				}
			}
}