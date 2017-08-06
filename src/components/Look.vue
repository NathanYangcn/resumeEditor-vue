<template>
  <div id="look">
    <div class="layout">
      <ResumePreview/>
    </div>
    <el-tooltip class="backEditor" @click.native="backEditor" content="返回编辑器" placement="left" effect="light">
      <i class="el-icon-edit"></i>
    </el-tooltip>
  </div>
</template>

<script>
  import ResumePreview from './ResumePreview'
  export default {
    name: 'look',
    components: {ResumePreview},
    methods: {
      backEditor () {
        this.$router.push('editor')
      }
    }
  }
</script>

<style lang="less" scoped>
  #look {
    display: flex;
    justify-content: center;
  }
  .layout {
    margin-top: 3em;
  }
  .backEditor {
    position: fixed;
    bottom: 5em;
    right: 3em;
    padding: 1em;
    border: 1px solid #fff;
    border-radius: 50%;
    background: #555;
    color: #fff;
    cursor: pointer;
  }
</style>
