var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.use(serveStatic('/Users/jv.lee/workspaces/web/web-code/Mobile-响应式布局/'));
app.listen(8080,function(){
	console.log('App listening at prot 8080');
});

//node app.js 运行