import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      meta: {title: '登录'},
      component: Login
    },{
      path: '/hello',
      name: 'HelloWord',
      meta: {requireAuth: true,title: '首页'},
      component: HelloWorld
    }
  ]
})
export default router

router.beforeEach((to,from,next) => {
  let token = localStorage.getItem('token');
  // isLogin = Boolean(Number(isLogin));
  if(to.path == '/login'){
      if(token){
        if(from.path == '/'){
          next('/hello');
        }else{
          next(from.path);
        }
      }else{
        next();
      }
  }else{
    if(to.meta.requireAuth && token){
        next();
    }else{
      next('/login');
    }
  }
})
