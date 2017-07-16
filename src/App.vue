<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'normalize.css/normalize.css'
  import './assets/reset.css'
  import icons from './assets/icons'
  import '!style-loader!css-loader!less-loader!./assets/ui.less'
  import getAVUser from './lib/getAVUser'

  // 将 svg icons 写入 HTML 中
  document.body.insertAdjacentHTML('afterbegin', icons)

  export default {
    name: 'app',
    created () {
      // 提交命令：初始化 vuex 仓库
      this.$store.commit('initState')

      // 获取当前登录用户
      let user = getAVUser()
      // 提交命令：保存当前登录用户信息
      this.$store.commit('setUser', user)

      // 判断用户是否处于已登录状态，以此获取 resume 数据
      if (user.id) {
        // 提交命令：与后台交互，获取 resume 数据
        this.$store.dispatch('fetchResume').then(() => {
          // 成功获取数据后，检查本地 resume 数据
          this.restoreResumeFromLocalStorage()
        })
      } else {
        this.restoreResumeFromLocalStorage()
      }
    },
    methods: {
      // 获取 resume 本地数据
      restoreResumeFromLocalStorage () {
        let resume = localStorage.getItem('resume')
        if (resume) {
          // 如果 resume 本地数据存在，提交命令：设置 resume 数据
          this.$store.commit('setResume', JSON.parse(resume))
        }
      }
    }
  }
</script>

<style lang="less">

</style>
