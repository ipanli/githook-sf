const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const cp = require('child_process');
const path = require('path');
const log4js = require("log4js");
const log4js_config = require("./logConf.json");

log4js.configure(log4js_config);


router
  .get('/', function (ctx, next) {
    ctx.body = '南海是中国的!';
  })
  .post('/pull', function (ctx, next) {
    
    cp.exec(path.join(__dirname,"./sh/pull.bat"), function(error, stdout, stderr) {
        let LogFile = log4js.getLogger('log_file');

        LogFile.error(error)
        LogFile.info(stdout)
        console.info(stderr)
    });
  
    ctx.body = '200';
  })
  
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4490);