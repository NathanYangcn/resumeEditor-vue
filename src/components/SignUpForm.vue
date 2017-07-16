<template>
  <div>
    <form @submit.prevent="signUp">
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
    name: 'signUpForm',
    data () {
      return {
        formData: {
          username: '', // 用户账号
          password: ''  // 用户密码
        },
        errorMessage: '' // 错误提示信息
      }
    },
    methods: {
      // 用户注册功能
      signUp () {
        let {username, password} = this.formData
        var user = new AV.User()
        user.setUsername(username)
        user.setPassword(password)
        user.signUp().then((loginedUser) => {
          this.$emit('success', getAVUser()) // vue自定义事件，向父组件通信
        }, (error) => {
          this.errorMessage = getErrorMessage(error) // 获取错误提示信息
        })
      }
    }
  }
</script>

<style scoped lang="less">

</style>
