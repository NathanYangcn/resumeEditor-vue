<template>
  <div id="signUp">
    <div class="sign-logo">Resume Editor</div>

    <div class="sign-warp">
      <form @submit.prevent="signUp">
        <div class="row">
          <input type="text" placeholder="账号" v-model="formData.username" required>
        </div>
        <div class="row">
          <input type="password" placeholder="密码" v-model="formData.password" required>
        </div>
        <div class="actions">
          <input type="submit" value="注册">
        </div>
      </form>

      <div class="sign-tab">
        <label>
          已有账户？
          <router-link to="signIn">
            登录
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
  // import Toast from './Toast'

  export default {
    name: 'SignUp',
    // components: { [Toast.name]: Toast },
    data () {
      return {
        formData: {
          username: '', // 用户账号
          password: ''  // 用户密码
        }
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
          this.$store.commit('setUser', getAVUser())
          Message.success({
            showClose: true,
            message: '注册成功'
          })
          this.$router.push('/')
        }, (error) => {
          Message.error({
            showClose: true,
            message: getErrorMessage(error)
          })
          // this.$refs.toast.show(getErrorMessage(error))// 获取错误提示信息
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #signUp {
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
