import { route, GET, POST, before } from 'awilix-koa' 
import lgAuthenticate from '../middlewares/lgAuthenticate';  

@route('/')
export default class IndexAPI {
  constructor({ indexService }) {
    console.log("拿到注入的indexService！");
    this.indexService = indexService
  }
 
  //注册了/默认路由
  
  @GET()
  @before([lgAuthenticate()])
  async getIndex(ctx) {
    // console.log("准备进入indexService");
    const result =  this.indexService.init();
    console.log("indexService处理后的数据：",result);
    ctx.body = await ctx.render('users/index',{serviceData: result});
  }

}