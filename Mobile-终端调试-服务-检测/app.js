var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.use(serveStatic('E:/works/Web-code/Mobile-终端调试-服务-检测/'));
// app.use(serveStatic('/Users/jv.lee/workspaces/web/web-code/Mobile-屏幕适配/'));
app.listen(8080,function(){
	console.log('App listening at prot 8080');
});

//node app.js 运行