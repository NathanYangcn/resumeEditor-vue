import Vue from 'vue'
import Vuex from 'vuex'
import objectPath from 'object-path'
import AV from '../lib/leancloud'
import getAVUser from '../lib/getAVUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'profile',  // 编辑区 tab切换 当前选中tab
    user: {
      username: '', // 当前登录用户账号
      id: '' // 当前登录用户ID
    },
    resumeConfig: [ // 编辑区 tab切换 所有tab信息
      {field: 'profile', icon: 'id', keys: ['name', 'city', 'title', 'birthday']},
      {field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'content']},
      {field: 'education', icon: 'book', type: 'array', keys: ['school', 'content']},
      {field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'content']},
      {field: 'awards', icon: 'cup', type: 'array', keys: ['name', 'content']},
      {field: 'contacts', icon: 'phone', type: 'array', keys: ['name', 'content']}
    ],
    resume: {
      id: '' // 当前简历ID
    }
  },
  mutations: {
    // 初始化 Vuex 仓库：包括 1.编辑数据为空 2.存有编辑数据
    // 将tab切换所要包含的key赋为空值，并将其塞进Vuex仓库
    // 遍历resumeConfig，然后创建数据结构并塞入resume，组件读取resume数据进行渲染
    initState (state, payload) {
      state.resumeConfig.map((item) => {
        if (item.type === 'array') {
          // state.resume[item.field] = []
          Vue.set(state.resume, item.field, []) // resume[field] 为数组类型
        } else {
          // state.resume[item.field] = {}
          Vue.set(state.resume, item.field, {}) // resume[field] 为对象类型
          item.keys.map((key) => {
            // state.resume[item.field][key] = ''
            Vue.set(state.resume[item.field], key, '')
          })
        }
      })
      if (payload) { // 如果存在参数，将参数合并到Vuex仓库中，用于获取本地或后台数据
        Object.assign(state, payload)
      }
    },

    // tab切换功能：切换编辑区当前编辑面板
    switchTab (state, payload) {
      state.selected = payload
    },

    // 编辑区-单向绑定：收集表单控件输入，塞入Vuex仓库中
    // 配合 :value='value' 达成与双向绑定一样的功能
    updateResume (state, {path, value}) {
      objectPath.set(state.resume, path, value)
    },

    // 保存用户信息：登录成功后，保存当前用户登录信息
    // 在vuex中，保存用户账号和ID，作为当前用户已登录状态的标识
    setUser (state, payload) {
      Object.assign(state.user, payload)
    },

    // 退出登录功能：在vuex中，删除当前用户登录信息
    // HTML中使用 ID 控制是否显示当前已登录用户账号名称
    removeUser (state) {
      // state.user.id = null
      state.user.id = ''
    },

    // 增加一个可填写内容模板功能(单个tab面板的子模块)
    // 举例说明：在编辑区内，工作经历tab下，增加一条可填写的工作经历模板
    addResumeSubfield (state, {field}) {
      let empty = {}
      state.resume[field].push(empty)
      state.resumeConfig.filter((i) => i.field === field)[0].keys.map((key) => {
        Vue.set(empty, key, '')
      })
    },

    // 删除一个可填写内容模板功能(单个tab面板的子模块)
    // 举例说明：在编辑区内，工作经历tab下，删除一条可填写的工作经历模板
    removeResumeSubfield (state, {field, index}) {
      state.resume[field].splice(index, 1)
    },

    // 设置 resume 的 ID：与后台交互时使用
    // 主要用于判断该 resume 是否存在，如果不存在则新建数据，如果存在则更新该数据
    setResumeId (state, { id }) {
      state.resume.id = id
    },

    // 设置 resume 数据
    // 当用户登录成功后，从后台获取数据，并将数据塞入vuex仓库，最终渲染数据
    setResume (state, resume) {
      state.resumeConfig.map(({field}) => {
        Vue.set(state.resume, field, resume[field])
      })
      state.resume.id = resume.id
    }
  },
  actions: {
    // 保存resume数据到后台
    saveResume ({state, commit}, payload) {
      var Resume = AV.Object.extend('Resume')
      var resume = new Resume()
      if (state.resume.id) {
        resume.id = state.resume.id
      }
      resume.set('profile', state.resume.profile)
      resume.set('workHistory', state.resume.workHistory)
      resume.set('education', state.resume.education)
      resume.set('projects', state.resume.projects)
      resume.set('awards', state.resume.awards)
      resume.set('contacts', state.resume.contacts)
      resume.set('owner_id', getAVUser().id)

      var acl = new AV.ACL()
      acl.setPublicReadAccess(true)
      acl.setWriteAccess(AV.User.current(), true)

      resume.setACL(acl)
      resume.save().then(function (response) {
        if (!state.resume.id) {
          commit('setResumeId', {id: response.id})
        }
      }).catch(function (error) {
        console.log(error)
      })
    },

    // 从后台拉取resume数据
    fetchResume ({commit}, payload) {
      var query = new AV.Query(('Resume'))
      query.equalTo('owner_id', getAVUser().id)
      query.first().then((resume) => {
        if (resume) {
          commit('setResume', {id: resume.id, ...resume.attributes})
        }
      })
    }
  }
})
