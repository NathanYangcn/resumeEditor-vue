import Vue from 'vue'
import Vuex from 'vuex'
import objectPath from 'object-path'
import AV from '../lib/leancloud'
import getAVUser from '../lib/getAVUser'
import getTime from '../lib/getTime'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curIndex: '', // 当前操作的 resume 在 pool 中 index
    newResumeFlag: false, // 新建按钮flag
    user: {
      username: '', // 账号
      id: '' // 用户ID
    },
    resumeConfig: [ // 编辑区 tab信息
      {field: 'profile', icon: 'id', type: 'object', keys: ['name', 'city', 'title', 'birthday']},
      {field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'content']},
      {field: 'education', icon: 'book', type: 'array', keys: ['school', 'content']},
      {field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'content']},
      {field: 'awards', icon: 'cup', type: 'array', keys: ['name', 'content']},
      {field: 'contacts', icon: 'phone', type: 'array', keys: ['name', 'content']},
      {field: 'brief', keys: ['title', 'author', 'id', 'createdAt']}
    ],
    resume: {}, // 当前正在编辑的简历数据
    resumeSet: {
      id: '', // 当前简历ID
      setting: { // 最终数据集合
        nickname: '', // 昵称
        profile: '',  // 个人简介
        sex: '', // 性别
        age: '', // 年龄
        edu: '', // 学历
        job: '' // 工种
      },
      pool: [] // 简历池子
    }
  },
  mutations: {
    // 初始化：编辑器
    initEditor (state, payload) { // => initState
      state.resumeConfig.map((item) => {
        if (item.type === 'array') {
          Vue.set(state.resume, item.field, []) // resume[field] 为数组类型
        } else {
          Vue.set(state.resume, item.field, {}) // resume[field] 为对象类型
          item.keys.map((key) => {
            if (item.field === 'brief') {
              let id = state.user.id
              let author = state.user.nickname ? state.user.nickname : state.user.username
              Vue.set(state.resume[item.field], 'title', '')
              Vue.set(state.resume[item.field], 'createdAt', getTime())
              Vue.set(state.resume[item.field], 'author', author)
              Vue.set(state.resume[item.field], 'id', id)
            } else {
              Vue.set(state.resume[item.field], key, '')
            }
          })
        }
      })
      if (payload) { // 合并参数到Vuex，用于获取本地或后台数据
        Object.assign(state, payload)
      }
    },

    // 编辑区-单向绑定
    updateResume (state, {path, value}) {
      objectPath.set(state.resume, path, value)
    },
    updateResumeTitle (state, {path, value}) {
      objectPath.set(state.resume.brief, path, value)
    },

    // 用户已登录状态的标识
    setUser (state, payload) {
      Object.assign(state.user, payload)
    },

    // 退出登录
    removeUser (state) {
      // state.user.id = null
      state.user.id = ''
      state.user.username = ''
    },

    // 更新个人资料
    setting (state, payload) {
      Object.assign(state.resumeSet.setting, payload)
    },

    // 增加一个可编辑内容的子模板
    addResumeSubfield (state, {field}) {
      let empty = {}
      state.resume[field].push(empty)
      state.resumeConfig.filter((i) => i.field === field)[0].keys.map((key) => {
        Vue.set(empty, key, '')
      })
    },

    // 删除一个可编辑内容的子模板(
    removeResumeSubfield (state, {field, index}) {
      state.resume[field].splice(index, 1)
    },

    // 主要作用：存储数据到云端时，云端时新建数据表（id 不存在）还是更新数据表（id 存在） - 前后交互【表ID】
    resumeSetId (state, { id }) {
      state.resumeSet.id = id
    },

    // 设置 resume 数据
    // 当用户登录成功后，从后台获取数据，并将数据塞入vuex仓库，最终渲染数据
    setResume (state, resume) {
      state.resumeConfig.map(({field}) => {
        Vue.set(state.resume, field, resume[field])
      })
      state.resume.id = resume.id
    },

    // 当用户登录成功后，从后台获取数据，并将数据塞入vuex仓库，最终渲染数据 —— 新
    setResumeSet (state, resumeSet) {
      Object.assign(state.resumeSet, resumeSet)
    },

    // 保存简历到简历池 —— 新
    saveToPool (state) { // =》 saveinpool
      if (typeof state.curIndex === 'number') {
        Object.assign(state.resumeSet.pool[state.curIndex], state.resume)
        // localStorage.setItem('resumeSet', JSON.parse(state.resumeSet)) // 本地存储
      }
    },

    // 新建简历flag
    closeResumeFlag (state) {
      state.newResumeFlag = false // 关闭新建按钮flag
    },
    openResumeFlag (state) {
      state.newResumeFlag = true // 打开新建按钮flag
    },

    // 初始化简历池
    initPool (state) {
      Vue.set(state.resumeSet.pool, state.resumeSet.pool.length, {})
      state.resumeConfig.map((item) => {
        if (item.type === 'array') {
          Vue.set(state.resumeSet.pool[state.resumeSet.pool.length - 1], item.field, []) // resume[field] 为数组类型
        } else {
          Vue.set(state.resumeSet.pool[state.resumeSet.pool.length - 1], item.field, {}) // resume[field] 为对象类型
          item.keys.map((key) => {
            Vue.set(state.resumeSet.pool[state.resumeSet.pool.length - 1][item.field], key, '')
          })
        }
      })
    },

    // 设置指定简历数据——进入编辑状态——新
    setEditor (state) {
      let preResume = state.resumeSet.pool[state.curIndex]
      state.resumeConfig.map(({field}) => {
        Vue.set(state.resume, field, preResume[field])
      })
    },

    // 删除简历 —— 新
    removeResume (state, index) {
      state.resumeSet.pool.splice(index, 1)
      if (state.curIndex === index) {
        if ((index > 0) && (index < state.resumeSet.pool.length)) {
        } else if (index === state.resumeSet.pool.length) {
          state.curIndex = index - 1
        } else if (index === 0) {
          state.curIndex = 0
        }
      } else {
        if ((index > 0) && (index < state.resumeSet.pool.length)) {
          state.curIndex -= 1
        } else if (index === state.resumeSet.pool.length) {
          state.curIndex = state.resumeSet.pool.length
        } else if (index === 0) {
          state.curIndex -= 1
        }
      }
    },

    // 新建简历模板序列 —— 新
    initCurIndex (state) {
      state.curIndex = state.resumeSet.pool.length
    },
    enterCurIndex (state) {
      state.curIndex = 0
    },

    // 点击查看简历池中的某个简历
    checkoutIndex (state, payload) {
      state.curIndex = payload
    },

    // 点击查看简历池中的某个简历 —— 新
    setIndex (state, payload) {
      state.curIndex = payload
    }
  },
  actions: {
    // 保存resume数据到后台
    saveResumeSet ({state, commit}, payload) {
      var ResumeSet = AV.Object.extend('ResumeSet')
      var resumeSet = new ResumeSet()
      if (state.resumeSet.id) {
        resumeSet.id = state.resumeSet.id // 表 ID
      }
      resumeSet.set('setting', state.resumeSet.setting)
      resumeSet.set('pool', state.resumeSet.pool)
      resumeSet.set('owner_id', getAVUser().id) // 用户 ID

      var acl = new AV.ACL()
      acl.setPublicReadAccess(true)
      acl.setWriteAccess(AV.User.current(), true)

      resumeSet.setACL(acl)
      resumeSet.save().then(function (response) {
        if (!state.resumeSet.id) {
          commit('resumeSetId', {id: response.id})
        }
      }).catch(function (error) {
        console.log(error)
      })
    },

    // 从后台拉取resume数据
    fetchResume ({commit}, payload) {
      var query = new AV.Query(('ResumeSet'))
      query.equalTo('owner_id', getAVUser().id)
      query.first().then((resumeSet) => {
        if (resumeSet) {
          commit('setResumeSet', {id: resumeSet.id, ...resumeSet.attributes})
        }
      })
    }
  }
})
