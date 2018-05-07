const Koa = require("koa")
const app = new Koa()
const puppeteer = require('puppeteer')

const url = `https://movie.douban.com/tag/#/?sort=R&range=0,10&tags=`

const sleep = time => new Promise(resolve =>{
  setTimeout(resolve,time)
})
;(async () => {

  const browser = await puppeteer.launch({
    args:['--no-sandbox'],
    dumpio:false
  })
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  //await page.screenshot({path: 'example.png', fullPage:true});
  //await sleep(1000)

  await page.waitForSelector('.more')
  for(let i=0;i<1;i++){
    //await sleep(3000)
    await page.click('.more')
    await sleep(2000)
  }

  const result = await page.evaluate(()=>{
    var $ = window.$
    var items = $('.list-wp a')
    var links = []
    if(items.length >= 1){
      items.each((index,item)  =>{
        let it = $(item)
        let doubanId = it.find('div').data('id')
        let title = it.find('.title').text()
        links.push({
          doubanId,
          title
        })
      })
    }
    return links
  })
  //browser.close()
  console.log(result)
})()
