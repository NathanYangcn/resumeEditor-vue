<template>
  <div>
    <form @submit.prevent="signIn">
      <div class="row">
        <label>账号</label>
        <input type="text" v-model="formData.username" required>
      </div>
      <div class="row">
        <label>密码</label>
        <input type="password" v-model="formData.password" required>
      </div>
      <div class="actions">
        <input type="submit" value="提交">
        <span class="errorMessage"> {{errorMessage}} </span>
      </div>
    </form>
  </div>
</template>

<script>
  import AV from '../lib/leancloud'
  import getErrorMessage from '../lib/getErrorMessage'
  import getAVUser from '../lib/getAVUser'

  export default {
    name: 'signIpForm',
    data () {
      return {
        formData: {
          username: '',
          password: ''
        },
        errorMessage: '' // 错误提示信息
      }
    },
    methods: {
      // 用户登录功能
      signIn () {
        let {username, password} = this.formData
        AV.User.logIn(username, password).then(() => {
          this.$emit('success', getAVUser()) // vue自定义事件，向父组件通信
        }, (error) => {
          this.errorMessage = getErrorMessage(error) // 获取错误提示信息
        })
        setTimeout(function () {
          window.location.reload() // 重载页面，获取数据后自动刷新页面，呈现数据
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="less">

</style>
