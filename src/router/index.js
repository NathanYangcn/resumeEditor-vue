import Vue from 'vue'
import Router from 'vue-router'
import Preview from '@/components/Preview'
import Editor from '@/components/Editor'
import ResumeCenter from '@/components/ResumeCenter'
import Setting from '@/components/Setting'
import Manager from '@/components/Manager'
import Look from '@/components/look'
import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ResumeCenter',
      component: ResumeCenter
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager
    },
    {
      path: '/preview',
      name: 'Preview',
      component: Preview
    },
    {
      path: '/look',
      name: 'Look',
      component: Look
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    }
  ]
})
