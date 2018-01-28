import { route, GET, POST, before } from 'awilix-koa' ;
import lgAuthenticate from '../middlewares/lgAuthenticate'; 

@route('/users')
export default class UserAPI {
  constructor({ userService,user }) {
    this.userService = userService;
    this.user = user;
  }
 
  //注册了 /users/:id 的路由哦； users/4 就进入到下面的async函数里
  //拿回来一个promise的API
  //use的方式load所有的controller，所以可以使用ctx
  @route('/:id')
  @GET()
  @before([lgAuthenticate()])
  async getUser(ctx) {
    const DIdata = this.user;
    console.log("DI贯穿的值：",DIdata);
    const serviceData = await this.userService.get(ctx.params.id);
    console.log("userService处理后的数据：",serviceData);
    ctx.body = await ctx.render('users/index',{serviceData: serviceData, DIdata:DIdata});
  }

}