<template>
  <div id="preview">
    <TopBar/>
    <div class="layout">
      <ResumePreview/>
    </div>
  </div>
</template>

<script>
  import ResumePreview from './ResumePreview'
  import TopBar from './TopBar'
  export default {
    name: 'preview',
    components: {ResumePreview, TopBar}
  }
</script>

<style lang="less" scoped>
  #preview {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #topBar {
    width: 100%;
  }
  .layout {
    margin-top: 3em;
  }
</style>
