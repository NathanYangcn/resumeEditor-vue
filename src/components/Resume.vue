<template>
  <div>
    <div id="app">
      <header>
        <TopBar/>
      </header>
      <main>
        <ResumeEditor/>
        <ResumePreview/>
      </main>
    </div>
  </div>
</template>

<script>
  import TopBar from './TopBar'
  import ResumeEditor from './ResumeEditor'
  import ResumePreview from './ResumePreview'

  export default {
    name: 'resume',
    components: { TopBar, ResumeEditor, ResumePreview }
  }
</script>

<style lang="less">
  #resumeEditor {
    min-width: 35%;
  }
  #resumePreview {
    margin-left: 16px;
    flex-grow: 1;
  }
</style>
