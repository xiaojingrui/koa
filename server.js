const Koa = require("koa")

const logger = require('koa-logger')
const app = new Koa()
const router = require('koa-router')()
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const serve = require("koa-static")
const path = require("path")

const mid1 = async (ctx,next) =>{
  ctx.body = " 11 HI"
  await next()
}
const mid2 = async (ctx,next) =>{
  ctx.body = "22 HI he"
  await next()
}
const mid3 = async (ctx,next) =>{
  ctx.body = "233HI hello"
}

router.get('/aaa', (ctx,next)=> {
    console.log(ctx,ctx.query)
     //get请求 获取data数据
    ctx.body = ctx.query
});
router.post('/bb', async (ctx,next)=> {
   //ctx.response.body = JSON.parse(ctx.response)
   ctx.body =  JSON.stringify(ctx.response)
});

router.post('/json', async (ctx, next) => {
  console.log(ctx.request,ctx.request.body)
  //post请求 获取data数据
  ctx.body = ctx.request.body
})
 //post请求前需先进行bodyParser处理
app.use(bodyParser())
//allow custom header and CORS
app.use(cors());
app.use(router.routes())
// app.use(logger())
// app.use(mid1)
// app.use(mid2)
//app.use(mid3)
app.use(serve(path.join(__dirname, './web')));
app.listen(2333)
