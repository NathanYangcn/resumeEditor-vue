<template>
  <div id="resumeEditor">
    <nav>
      <ol>
        <li v-for="(item,index) in resumeConfig"
            :class="{active: item.field === selected}"
            @click="selected = item.field"
        >
          <svg class="icon">
            <use :xlink:href="`#icon-${item.icon}`"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="item in resumeConfig" v-show="item.field === selected">
        <div v-if="item.type === 'array'">
          <h2>{{ $t(`resume.${item.field}._`) }}</h2>
          <div class="subitem" v-for="(subitem, index) in resume[item.field]">
            <button class="button remove small" @click="removeResumeSubfield(item.field, index)">删除</button>
            <div class="resumeField" v-for="(value,key) in subitem">
              <label> {{ $t(`resume.${item.field}.${key}`) }} </label>
              <input type="text" :value="value" @input="changeResumeField(`${item.field}.${index}.${key}`, $event.target.value)">
            </div>
            <hr>
          </div>
          <button class="button add" @click="addResumeSubfield(item.field)">新增</button>
        </div>
        <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
          <label> {{ $t(`resume.profile.${key}`) }} </label>
          <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)">
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'ResumeEditor',
    computed: {
      selected: {
        get: function () { // 计算属性 getter —— 读数据
          return this.$store.state.selected
        },
        set: function (value) { // 计算属性 setter —— 写数据
          this.$store.commit('switchTab', value) // 为了实现单向绑定
        }
      },
      resume () {
        return this.$store.state.resume
      },
      resumeConfig () {
        return this.$store.state.resumeConfig
      }
    },
    methods: {
      // 监听输入表单value的改变，将改变同步到vuex仓库
      // 为了实现单向绑定，UI事件监听 需配合 :value='value' 实现单向绑定
      changeResumeField (path, value) {
        this.$store.commit('updateResume', {
          path: path,
          value: value
        })
      },

      // 增加一个可填写内容模板功能(单个tab面板的子模块)
      addResumeSubfield (field) {
        this.$store.commit('addResumeSubfield', {field})
      },

      // 删除一个可填写内容模板功能(单个tab面板的子模块)
      removeResumeSubfield (field, index) {
        this.$store.commit('removeResumeSubfield', {field, index})
      }
    }
  }
</script>

<style scoped lang="less">
  #resumeEditor {
    display: flex;
    flex-direction: row;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    background-color: #fff;
    overflow: auto;
  }

  nav {
    width: 80px;
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
        &.active {
          color: #1f2126;
          background-color: #fff;
        }
        &>svg.icon {
          width: 24px;
          height: 24px;
        }
      }
    }
  }

  .panels {
    flex-grow: 1;
    &>li {
      padding: 24px;
    }
  }
  .resumeField {
    &>label {
      display: block;
    }
    input[type=text] {
      margin: 16px 0;
      border: 1px solid #ddd;
      box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.25);
      width: 100%;
      height: 40px;
      padding: 0 8px;
    }
  }
  hr {
    margin: 24px 0;
    border: none;
    border-top: 1px solid #ddd;
  }
  .subitem {
    position: relative;
    .button.remove {
      position: absolute;
      top: -3px;
      right: 0;
    }
  }
</style>
