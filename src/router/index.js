import Vue from 'vue'
import Router from 'vue-router'
import Tabber from '@/components/Tabber'
import Issue from '@/pages/Issue'
import GoodsDetails from '@/pages/GoodsDetails'
import Index from '@/pages/Index'
import IndexContent from '@/components/IndexContent'
import SchoolSupply from '@/components/SchoolSupply'
import Clothing from '@/components/Clothing'
import Snack from '@/components/Snack'
import OtherGoods from '@/components/OtherGoods'
import aboutUs from '@/pages/aboutUS'
import login from '@/pages/login'
import register from '@/pages/register'
import my from '@/pages/my'
import myUpdata from '@/pages/myUpdata'
import myCollection from '@/pages/myCollection'
import returnMessage from '@/pages/returnMessage'
import changeInfo from '@/pages/changeInfo'
import ChangePassword from '@/pages/ChangePassword'
import searchGoods from '@/pages/searchGoods'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',  // 默认页面重定向到主页
      name: '',
      redirect: '/index' //重定向
      
    },
    {
      path: '/issue',
      name: 'Issue',
      component: Issue
    },
    {
      path: '/goodsDetails',
      name: 'GoodsDetails',
      component: GoodsDetails
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
    },
    {
      path: '/indexContent',
      name: ' IndexContent',
      component: IndexContent
    },
    {
      path: '/tabber',
      name: 'Tabber',
      component: Tabber
    },
    {
      path: '/tabber',
      name: 'Tabber',
      component: Tabber
    },


    {
      path: '/login',
      name: 'login',
      component: login
    },

    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/myUpdata',
      name: 'myUpdata',
      component: myUpdata
    },
    {
      path: '/myCollection',
      name: 'myCollection',
      component: myCollection
    },
    {
      path: '/returnMessage',
      name: 'returnMessage',
      component: returnMessage
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/changeInfo',
      name: 'ChangeInfo',
      component: changeInfo
    },
    
    {
      path: '/searchGoods',
      name: 'searchGoods',
      component: searchGoods
    },
    
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs
    }

  ]
})
