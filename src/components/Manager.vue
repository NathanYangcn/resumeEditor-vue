<template>
  <div id="manager">

    <ResumeManager/>
    <ResumePreview/>

  </div>
</template>

<script>
  import ResumePreview from './ResumePreview'
  import ResumeManager from './ResumeManager'
  export default {
    name: 'manager',
    components: { ResumePreview, ResumeManager }
  }
</script>

<style lang="less" scoped>
  #manager {
    display: flex;
    height: 100vh;
  }
  #resumeManager {
    width: 40%;
  }
  section {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  #resumePreview {
    border-left: 1px solid #aaa;
    flex-grow: 1;
  }
</style>
