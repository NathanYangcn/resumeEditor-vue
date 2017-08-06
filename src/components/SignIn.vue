<template>
  <div id="signIn">
    <div class="sign-logo">Resume Editor</div>

    <div class="sign-warp">
      <form @submit.prevent="signIn">
        <div class="row">
          <input type="text" placeholder="账号" v-model="formData.username" required>
        </div>
        <div class="row">
          <input type="password" placeholder="密码" v-model="formData.password" required>
        </div>
        <div class="actions">
          <input type="submit" value="登录">
        </div>
      </form>

      <div class="sign-tab">
        <label>
          <router-link to="signUp">
            创建免费账户
          </router-link>
        </label>
      </div>
    </div>
    <!--<toast ref="toast"></toast>-->
  </div>
</template>

<script>
  import AV from '../lib/leancloud'
  import getErrorMessage from '../lib/getErrorMessage'
  import getAVUser from '../lib/getAVUser'
  import { Message } from 'element-ui'

  export default {
    name: 'signIn',
    data () {
      return {
        formData: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      // 用户登录功能
      signIn () {
        let {username, password} = this.formData
        AV.User.logIn(username, password).then(() => {
          this.$store.commit('setUser', getAVUser())
          Message.success({
            showClose: true,
            message: '登录成功'
          })
          this.$router.push('/')
//          setTimeout(() => {   // element-ui 可以解决该问题
//            this.$router.push('/')
//          }, 1500)
        }, (error) => {
          Message.error({
            showClose: true,
            message: getErrorMessage(error)
          })
        })
//        setTimeout(function () {
//          window.location.reload() // 重载页面，获取数据后自动刷新页面，呈现数据
//        }, 1000)
      }
    }
  }
</script>

<style scoped lang="less">
  #signIn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    input {
      border: none;
      width: 100%;
      height: 35px;
      font-size: 16px;
      line-height: 35px;
      outline: none;
    }
  }
  .sign-logo {
    height: 120px;
    font-size: 30px;
    font-weight: bold;
    color: #476ad8;
    text-align: center;
    line-height: 120px;
  }
  .sign-warp {
    padding: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 400px;
    background-color: #eee;
  }
  .row {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 1px solid #ccc;
    width: 100%;
    height: 36px;
    label {
      min-width: 2em;
    }
    input {
      flex-grow: 1;
      background-color: #eee;
      &:focus {
        border-bottom: 1px solid #476ad8;
        height: 36px;
      }
    }
  }
  .actions {
    margin: 30px 0 45px 0;
    input {
      border-radius: 3px;
      color: #fff;
      background-color: #476ad8;
    }
  }
  .sign-tab {
    text-align: center;
    label:hover {
      border-bottom: 1px solid #476ad8;
    }
    a {
      color: #476ad8;
    }
  }
</style>
