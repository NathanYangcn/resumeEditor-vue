<template>
  <div id="resumeTool">
    <router-link to="/look" @click.native="look"><small>预览</small></router-link>
    <small @click="clearEditor">清空</small>
    <small @click="save"> 保存 </small>
    <!--<router-link @click.native="outEditor" to="/manager"><small>退出</small></router-link>-->
    <small @click="outEditor">退出</small>
  </div>
</template>

<script>
  import { MessageBox, Message } from 'element-ui'
  export default {
    name: 'resumeTool',
    computed: {
      resume () {
        return this.$store.state.resume
      },
      curIndex () {
        return this.$store.state.curIndex
      },
      newResumeFlag () {
        return this.$store.state.newResumeFlag
      }
    },
    methods: {
      // 保存编辑功能
      save () {
        // 提交命令：保存resume数据到后台
        if (!this.resume.brief.title) {
          Message.warning({
            showClose: true,
            message: '请填写简历标题！'
          })
          return
        }
        this.$store.commit('saveToPool')
        this.$store.dispatch('saveResumeSet')
        Message.success({
          showClose: true,
          message: '保存成功！'
        })
      },

      // 退出编辑器并保存数据
      outEditor () {
        if (!this.resume.brief.title) {
          Message.warning({
            showClose: true,
            message: '请填写简历标题！'
          })
          return
        }

        MessageBox.confirm('是否保存当前内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('saveToPool')
          this.$store.dispatch('saveResumeSet')
          Message({
            type: 'success',
            message: '保存成功!'
          })
          this.$store.commit('closeResumeFlag')
          this.$router.push('manager')
        }).catch(() => {
          if (this.newResumeFlag) {
            this.$store.commit('removeResume', this.curIndex)
          }
          Message({
            type: 'info',
            message: '未保存'
          })
          this.$store.commit('closeResumeFlag')
          this.$router.push('manager')
        })
      },

      // 清空当前编辑器内容
      clearEditor () {
        MessageBox.confirm('清空当前所有内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('initEditor')
          Message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },

      // 预览提示
      look () {
        Message.warning({
          showClose: true,
          message: '预览模式'
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #resumeTool {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 64px;
    background-color: #ddd;
    small {
      cursor: pointer;
    }
  }
</style>
