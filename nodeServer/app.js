var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.use(serveStatic('/Users/jv.lee/workspaces/web/web-code/nodeServer/'));
app.listen(5000,function(){
	console.log('App listening at prot 8080');
});

//node app.js 运行