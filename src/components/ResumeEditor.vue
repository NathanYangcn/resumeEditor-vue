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
        get: function () {
          return this.$store.state.selected
        },
        set: function (value) {
          this.$store.commit('switchTab', value)
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
      changeResumeField (path, value) {
        this.$store.commit('updateResume', {
          path: path,
          value: value
        })
      },
      addResumeSubfield (field) {
        this.$store.commit('addResumeSubfield', {field})
      },
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
