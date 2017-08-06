<template>
  <div id="setting">
    <TopBar/>
    <div class="layout">
      <nav>
        <ol>
          <li>个人资料</li>
        </ol>
      </nav>
      <ol class="settingPanel">
        <li class="settingRow">
          <label>昵称</label>
          <input type="text" v-model="setting.nickname">
        </li>
        <li class="settingRow setting-sex">
          <label>性别</label>
          <input type="radio" id="secrecy" value="保密" v-model="setting.sex">
          <label for="secrecy">保密</label>
          <input type="radio" id="mail" value="男" v-model="setting.sex">
          <label for="mail">男</label>
          <input type="radio" id="female" value="女" v-model="setting.sex">
          <label for="female">女</label>
        </li>
        <li class="settingRow">
          <label>职位</label>
          <input type="text" v-model="setting.job">
        </li>
        <li class="settingRow">
          <label>年龄</label>
          <input type="text" v-model="setting.age">
        </li>
        <li class="settingRow">
          <label>最高学历</label>
          <input type="text" v-model="setting.edu">
        </li>
        <li class="settingRow">
          <label>个人简介</label>
          <textarea v-model="setting.profile" placeholder="填写你的个人简介"></textarea>
        </li>
        <li class="settingAction">
          <span class="settingSave" @click="saveSetting">保存</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  import TopBar from './TopBar'
  import { Message } from 'element-ui'
  import getErrorMessage from '../lib/getErrorMessage'
  export default {
    name: 'setting',
    components: { TopBar },
    data () {
      return {
        setting: {
          nickname: '', // 昵称
          profile: '',  // 个人简介
          sex: '保密', // 性别
          age: 18, // 年龄
          edu: '', // 学历
          job: '' // 工种
        }
      }
    },
    computed: {
      resumeSet () {
        return this.$store.state.resumeSet
      }
    },
    created () {
      this.setting = this.resumeSet.setting
    },
    methods: {
      saveSetting () {
        let {nickname, profile, sex, age, edu, job} = this.setting
        this.$store.commit('setting', {nickname, profile, sex, age, edu, job})
        this.$store.dispatch('saveResumeSet').then(
          Message.success({
            showClose: true,
            message: '更新成功'
          }), (error) => {
          Message.error({
            showClose: true,
            message: '更新失败：' + getErrorMessage(error)
          })
        })
//        setTimeout(() => {
//          this.$store.commit('setUser', {nickname, profile, sex, age, edu, job})
//          this.$nextTick(() => {
//            this.$refs.toast.show('更新成功')
//          })
//        }, 3000)
      }
    }
  }
</script>

<style lang="less" scoped>
  #setting {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .layout {
    display: flex;
    flex-direction: row;
    align-self: center;
    margin-top: 30px;
  }
  nav {
    width: 30%;
    li {
      display: flex;
      align-items: center;
      padding: 10px 1em;
      border-radius: 5px;
      height: 3em;
      background-color: #eee;
      cursor: pointer;
    }
  }
  .settingPanel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    margin-left: 2em;
  }
  .settingRow {
    display: flex;
    align-items: center;
    min-height: 3em;

    label:first-child {
      width: 25%;
    }
    input[type=text],
    textarea {
      padding: 10px 10px;
      border: 1px solid #999;
      border-radius: 5px;
      width: 50%;
      outline: none;
      resize: none;
    }
    input {
      height: 35px;
    }
    textarea {
      min-height: 100px;
    }
  }
  .settingRow + .settingRow,
  .settingAction {
    margin-top: 30px;
  }
  .settingAction {
    text-align: center;
  }
  .settingSave {
    border-radius: 5px;
    padding: 6px 10px;
    color: #fff;
    background-color: #02af5f;
    cursor: pointer;
  }

  .setting-sex {
    input[type=radio] {
      margin-right: 8px;
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
    label {
      margin-right: 2em;
      cursor: pointer;
    }
    label:first-child {
      margin-right: inherit;
    }
  }
</style>
