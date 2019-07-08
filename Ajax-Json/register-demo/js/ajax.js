var $ = {
    ajax: function(options) {
        var xhr = null, //XMLHttpRequest对象
            url = options.url, //请求地址
            method = options.method || 'get', //请求方式，默认为get
            async = typeof(options.async) === "undefined" ? true : options.async, //是否异步
                data = options.data || null, //数据
                params = '', //参数接收变量
                callback = options.success, //ajax请求成功后回调
                error = options.error; //ajax请求失败回调函数

        //将data对象字面量形式转换为字符串形式
        if (data) {
            for (var val in data) {
                params += val + '=' + data[val] + '&';
            }
            params = params.replace(/&$/, "");
            console.log(params);
        }

        //根据method的值改变url
        if (method === "get") {
            url += '?' + params;
        }
        console.log(url);

        //创建请求对象
        if (typeof XMLHttpRequest != "undefined") {
            xhr = new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            throw new Error('No XHR object available.');
        }
        //创建响应成功回调函数
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    callback && callback(JSON.parse(xhr.responseText));
                }else{
                	error && error();
                }
            }
        }
        //创建发送请求请求
        xhr.open(method, url, async);
        xhr.setRequestHeader('Content-type', 'application/x-www-form');
        xhr.send(params);
    }
};

// $.ajax({
//     url: "http://127.0.0.1/register.php",
//     method: "post",
//     async: false,
//     data: { username: '13623447894', pwd: '3213123' },
//     success: function() {

//     },
//     error: function() {

//     }
// });