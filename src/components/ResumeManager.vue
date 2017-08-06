<template>
  <div id="resumeManager">

    <nav>
      <ol>
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link @click.native="newResume" to="/editor">新建</router-link>
        </li>
      </ol>
    </nav>

    <ol class="managerList" v-if="pool && pool.length > 0">
      <li v-for="(item, index) in pool"
          :class="{selectLi: index === curIndex}"
          @click="checkoutIndex(index)"
      >
        <h3 class="subject font-in-line">标题：{{item['brief']['title']}}</h3>
        <small class="job font-in-line" v-show="item.profile.title">职位：{{item['profile']['title']}}</small>
        <div class="btn-group">
          <small class="updateTime">更新：{{item['brief']['createdAt']}}</small>
          <div>
            <small class="btn btn-editor" @click.native="enterEditor">
              <router-link to="/editor">编辑</router-link>
            </small>
            <small class="btn btn-delete" @click.stop="removeResume(index)">删除</small>
          </div>
        </div>
      </li>
    </ol>
    <h3 class="empty" v-else>您还未创建简历</h3>
  </div>
</template>

<script>
  import { MessageBox, Message } from 'element-ui'
  export default {
    name: 'resumeManager',
    computed: {
      pool () {
        return this.$store.state.resumeSet.pool
      },
      curIndex () {
        return this.$store.state.curIndex
      }
    },
    methods: {
      // 新建简历
      newResume () {
        this.$store.commit('openResumeFlag')
        this.$store.commit('initCurIndex')
        this.$store.commit('initPool')
        this.$store.commit('initEditor')
        Message.success({
          showClose: true,
          message: '新建成功'
        })
      },
      checkoutIndex (index) {
        this.$store.commit('setIndex', index)
        this.$store.commit('setEditor')
      },
      // 进入编辑器
      enterEditor () {
        this.$store.commit('setEditor')
        Message({
          showClose: true,
          message: '开始编辑'
        })
      },
      // 删除指定 resume 数据
      removeResume (index) {
        MessageBox.confirm('是否删除选中内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('initEditor') // 清空编辑器内数据
          this.$store.commit('removeResume', index) // 删除简历池中指定数据
          this.$store.dispatch('saveResumeSet')
          Message.success({
            showClose: true,
            message: '删除成功'
          }) // 操作通报
        }).catch(() => {
          Message.info({
            showClose: true,
            message: '放弃删除'
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #resumeManager {
    display: flex;
  }

  nav {
    min-width: 80px;
    color: #fff;
    background-color: #1f2126;
    &>ol {
      &>li {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 16px;
        margin-bottom: 16px;
        height: 48px;
        cursor: pointer;
        &>svg.icon {
          width: 24px;
          height: 24px;
        }
      }
      a {
        color: #fff;
      }
    }
  }

  .empty {
    align-self: center;
    width: 100%;
    text-align: center;
  }
  .managerList {
    flex-grow: 1;
    padding: 1em;
    li {
      display: flex;
      flex-direction: column;
      padding: 1em;
      border: 1px solid #02af5f;
      border-radius: 5px;
      cursor: pointer;
      .job {
        margin-top: 12px;
      }
      .btn-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
      }
      .btn {
        margin-left: 10px;
        text-align: center;
        cursor: pointer;
      }
    }
    li + li {
      margin-top: 1em;
    }
    .selectLi {
      color: #fff;
      background-color: #02af5f;
      a {
        color: #fff;
      }
    }
  }
</style>
