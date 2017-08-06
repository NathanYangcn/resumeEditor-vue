<template>
  <div id="resumeCenter">
    <header>
      <TopBar/>
    </header>
    <main class="layout">
      <div class="content">
        <div class="brief">
          <h2 class="nickname">{{setting.nickname ? setting.nickname : user.username}}</h2>
          <span class="curjob" v-if="setting.job">{{setting.job}}</span>
          <span class="sex" v-if="setting.sex">{{setting.sex}}</span>
          <span class="age" v-if="setting.age">{{setting.age}}岁</span>
          <span class="edu" v-if="setting.edu">{{setting.edu}}</span>
        </div>
        <div class="list">
          <nav>
            <ol>
              <li class="selectedLi">简历</li>
              <li @click="article">文章</li>
            </ol>
          </nav>
          <ol class="panel"  v-if="pool.length > 0">
            <li v-for="(item,index) in pool"
                @click="checkoutIndex(index)"
            >
              <router-link to="preview">
                <h3 class="pannel-title">{{item.brief.title}}</h3>
                <div>
                  <small class="pannel-author">{{item.brief.author}}</small>
                  <small class="pannel-createdAt">{{item.brief.createdAt}}</small>
                </div>
              </router-link>
            </li>
          </ol>
          <div class="empty" v-else>这人很懒，还未发布任何内容...</div>
        </div>
      </div>
      <aside>
        <span>个人介绍</span>
        <textarea disabled v-if="setting.profile">{{setting.profile}}</textarea>
        <textarea disabled v-else>这人很懒，还未填写个人简介。</textarea>
      </aside>
    </main>
  </div>
</template>

<script>
  import TopBar from './TopBar'
  import { Message } from 'element-ui'
  export default {
    name: 'resumeCenter',
    components: { TopBar },
    created () {
      if (!this.logined) {
        this.$router.push('signIn')
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      logined () {
        return this.user.id
      },
      setting () {
        return this.$store.state.resumeSet.setting
      },
      pool () {
        return this.$store.state.resumeSet.pool
      }
    },
    methods: {
      checkoutIndex (index) {
        this.$store.commit('checkoutIndex', index)
        this.$store.commit('setEditor')
      },
      article () {
        Message.warning({
          showClose: true,
          message: '暂未开放'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #resumeCenter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  header {
    width: 100%;
  }

  main {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: row;
    margin-top: 3em;
    .content {
      flex-grow: 1;
    }
    aside {
      display: flex;
      flex-direction: column;
      margin-left: 40px;
      min-width: 280px;
      &>span {
        border-bottom: 1px solid #ccc;
      }
    }
  }

  .brief{
    span {
      display: inline-flex;
      margin-top: .5em;
      padding-right: 12px;
    }
  }
  .list {
    margin-top: 2em;
    nav>ol {
      display: flex;
      border-bottom: 1px solid #ccc;
      li {
        padding: 10px 20px;
        border-bottom: 3px solid #ccc;
        font-size: 1em;
        font-weight: bold;
        color: #999;
        cursor: pointer;
        &:hover {
          color: #333;
          border-bottom: 3px solid #333;
        }
      }
      .selectedLi {
        color: #111;
        border-bottom: 3px solid #333;
      }
    }
    .panel {
      margin-top: 1em;
      li {
        padding: 1em 0;
        h3 {
          margin-bottom: 6px;
        }
        div {
          display: flex;
          justify-content: space-between;
          margin-top: .5em;
        }
        &:hover a {
          color: #02af5f;
        }
      }
      li + li {
        border-top: 1px solid #ccc;
      }
    }
  }

  aside {
    span {
      color: #999;
      line-height: 27px;
    }
    textarea {
      margin-top: 1em;
      border: none;
      min-height: 200px;
      color: #666;
      background: #fff;
      resize: none;
    }
  }
  .empty {
    margin-top: 3em;
    color: #666;
    text-align: center;
  }
</style>
