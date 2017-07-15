<template>
  <div id="topBar">
    <div class="wrapper">
      <span class="logo">Resume</span>

      <div class="actions">
        <div v-if="logined" class="userActions">
          <span class="welcome">你好，{{user.username}}</span>
          <a class="button" href="#" @click.prevent="signOut">登出</a>
        </div>
        <div v-else class="userActions">
          <a class="button primary" href="#" @click.prevent="signUpDialogVisible = true">注册</a>
          <a class="button" href="#" @click.prevent="signInDialogVisible = true">登录</a>
        </div>
        <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
          <SignUpForm @success="signIn($event)"/>
        </MyDialog>
        <MyDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible = false">
          <SignInForm @success="signIn($event)"/>
        </MyDialog>
      </div>
    </div>
  </div>
</template>

<script>
  import MyDialog from './MyDialog'
  import SignUpForm from './SignUpForm'
  import SignInForm from './SignInForm'
  import AV from '../lib/leancloud'

  export default {
    name: 'TopBar',
    data () {
      return {
        signUpDialogVisible: false,
        signInDialogVisible: false
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      logined () {
        return this.user.id
      }
    },
    components: { MyDialog, SignUpForm, SignInForm },
    methods: {
      signIn (user) {
        console.log(user)
        this.signUpDialogVisible = false
        this.signInDialogVisible = false
        this.$store.commit('setUser', user)
      },
      signOut () {
        AV.User.logOut()
        this.$store.commit('removeUser')
      }
    }
  }
</script>

<style scoped lang="less">
  #topBar {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    padding: 0 16px;
    background-color: #fff;

    &>.wrapper {
      margin: 0 auto;
      min-width: 1024px;
      max-width: 1440px;
      height: 64px;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 24px;
      color: #000;
    }
    .btn {
      border: none;
      width: 72px;
      height: 32px;
      font-size: 18px;
      font-family: 'STHeitiSC-Light';
      color: #222;
      background-color: #ddd;
      cursor: pointer;
      &:hover {
        box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
      }
      &.actions-save {
        margin-right: 16px;
        color: #fff;
        background-color: #02af5f;
      }
    }
    .actions {
      display: flex;
      .userActions {
        /*margin-right: 3em;*/
        .welcome {
          margin-right: .5em;
        }
      }
    }
  }
</style>
