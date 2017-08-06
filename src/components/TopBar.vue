<template>
  <div id="topBar">
    <router-link class="logo" to="/">Resume</router-link>
    <div class="layout">
      <div class="btn-group">
        <router-link class="btn-item" to="/">发现</router-link>
      </div>
      <div class="actions">
        <div v-if="logined" class="userActions">
          <ul class="firstNav welcome">
            <li>
              <router-link class="welcome" to="/">
                <span>你好，</span>
                {{setting.nickname ? setting.nickname : user.username}}
              </router-link>

              <ul class="subNav">
                <li>
                  <router-link @click.native="enterCurIndex" to="manager">管理简历</router-link>
                </li>
                <li>
                  <router-link to="setting">设置</router-link>
                </li>
                <li>
                  <a href="#" @click.prevent="signOut">登出</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div v-else class="userActions">
          <router-link class="sign primary" to="signUp">注册</router-link>
          <router-link class="sign" to="signIn">登录</router-link>
        </div>
      </div>
    </div>
    <div class="write">
      <router-link class="button" @click.native="newResume"  to="editor">写简历</router-link>
    </div>
  </div>
</template>

<script>
  import AV from '../lib/leancloud'

  export default {
    name: 'topBar',
    computed: {
      user () {
        return this.$store.state.user
      },
      logined () {
        return this.user.id
      },
      setting () {
        return this.$store.state.resumeSet.setting
      }
    },
    methods: {
      // 用户登录
      signIn (user) {
        this.$store.commit('setUser', user)
      },

      // 退出登录
      signOut () {
        AV.User.logOut().then(() => {
          this.$store.commit('removeUser')
          this.$router.push('signIn')
        })
      },

      // 新建简历
      newResume () {
        this.$store.commit('openResumeFlag')
        this.$store.commit('initCurIndex')
        this.$store.commit('initPool')
        this.$store.commit('initEditor')
      },

      // 初始化 curIndex 值
      enterCurIndex () {
        this.$store.commit('enterCurIndex')
      }
    }
  }
</script>

<style scoped lang="less">
  #topBar {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    padding: 0 16px;
    background-color: #fff;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &>.logo {
      position: relative;
      top: -3px;
      flex-grow: 1;
      font-size: 24px;
      color: #000;
      text-decoration: none;
    }
    &>.write {
      flex-grow: 1;
      text-align: right;
      &>.button {
        border-radius: 5px;
        width: 100px;
        color: #fff;
        background-color: #ea6f5a;
      }
    }
    &>.layout {
      margin: 0 auto;
      height: 64px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn-item {
        padding: 0 8px;
        color: #ea6f5a;
        text-decoration: none;
      }
      .sign {
        border: 1px #ea6f5a solid;
        border-radius: 5px;
        width: 72px;
        height: 32px;
        color: #ea6f5a;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        cursor: pointer;
      }
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
        .welcome {
          margin-right: .5em;
        }
      }
    }
  }

  .firstNav{
    &>li {
      position: relative;
      &:hover {
        background-color: #eee;
        .subNav {
          display: block;
        }
      }
    }
    .welcome {
      padding: 0 1em;
      height: 64px;
      line-height: 64px;
      &>span {
        padding-right: 8px;
      }
    }
  }
  .subNav {
    display: none;
    position: absolute;
    top: 64px;
    left: 2px;
    background-color: #fff;
    box-shadow: 0 0 3px 1px #ccc;
    a {
      display: flex;
      align-items: center;
      padding: 6px 1em;
      width: 100px;
      height: 3em;
    }
    &>li:hover {
      background-color: #eee;
    }
  }
</style>
