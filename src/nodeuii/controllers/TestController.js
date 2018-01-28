import { route, GET, POST, before } from 'awilix-koa' 
import lgAuthenticate from '../middlewares/lgAuthenticate'; 

@route('/test')
export default class TestAPI {
  constructor({ testService }) {
    console.log("拿到注入的testService！");
    this.testService = testService
  }
 
  //注册了/test路由
  
  @GET()
  @before([lgAuthenticate()])
  async getTest(ctx) {
    // console.log("准备进入testService");
    const result =  this.testService.find();
    console.log("testService处理后的数据：",result);
    ctx.body = await ctx.render('users/index',{serviceData: result});
  }

}