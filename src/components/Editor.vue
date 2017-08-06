<template>
  <div id="write">

    <ResumeEditor/>
    <ResumePreview/>

  </div>
</template>

<script>
  import ResumeEditor from './ResumeEditor'
  import ResumePreview from './ResumePreview'
  export default {
    name: 'write',
    components: { ResumeEditor, ResumePreview }
  }
</script>

<style lang="less" scoped>
  #write {
    display: flex;
    height: 100vh;
  }
  #resumeEditor {
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
  .Panels {
    position: fixed;
    left: 0;
    bottom: 50px;
    width: 80px;
    height: 48px;
    color: #fff;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
  }
</style>
