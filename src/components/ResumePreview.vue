<template>
  <div id="resumePreview">
    <section data-name="brief" v-if="resume.brief && resume.brief.title">
      <h1>
        {{resume.brief.title}}
      </h1>
    </section>

    <section data-name="profile" v-if="resume.profile && resume.profile.name">
      <h1>
        {{resume.profile.name}}
      </h1>
      <h2>
        {{resume.profile.title}}
      </h2>
      <p>
        <small>{{resume.profile.city}}</small>
        <small>{{resume.profile.birthday}}</small>
      </p>
    </section>

    <section data-name="workHistory" v-show="resume.workHistory && resume.workHistory.length > 0">
      <h2>工作经历</h2>
      <ol>
        <li v-for="item in resume.workHistory">
          <h3>{{item.company}}</h3>
          <p v-show="item.content"> {{item.content}} </p>
        </li>
      </ol>
    </section>

    <section data-name="education" v-show="resume.education && resume.education.length > 0">
      <h2>毕业院校</h2>
      <ol>
        <li v-for="item in resume.education">
          <h3> {{item.school}}
            <span v-show="item.content"> - {{item.content}} </span>
          </h3>
        </li>
      </ol>
    </section>

    <section data-name="projects" v-show="resume.projects && resume.projects.length > 0">
      <h2>项目经历</h2>
      <ol>
        <li v-for="item in resume.projects">
          <h3> {{item.name}} </h3>
          <p v-show="item.content"> {{item.content}} </p>
        </li>
      </ol>
    </section>

    <section data-name="awards" v-show="resume.awards && resume.awards.length > 0">
      <h2>获奖情况</h2>
      <ol>
        <li v-for="item in resume.awards">
          <h3> {{item.name}} </h3>
          <p v-show="item.content"> {{item.content}} </p>
        </li>
      </ol>
    </section>

    <section data-name="contacts" v-show="resume.contacts && resume.contacts.length > 0">
      <h2>联系方式</h2>
      <ol>
        <li v-for="item in resume.contacts">
          <h3> {{item.name}} </h3>
          <p v-show="item.content"> {{item.content}} </p>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'resumePreview',
    computed: {
      resume () {
        return this.$store.state.resume
      }
    }
  }
</script>

<style scoped lang="less">
  #resumePreview {
    display: flex;
    flex-direction: column;
    padding: 1em;
    height: 100%;
    background-color: #fff;
    color: #333;
    line-height: 1.2;
    overflow: auto;

    * {
      font-variant: normal;
      font-weight: normal;
    }

    section + section {
      margin-top: 2em;
    }
    p {
      white-space: pre-line;
    }
    section {
      &>h2:first-child {
        display: inline-block;
        margin-bottom: .5em;
        padding: .2em;
        background: #ddd;
      }
    }
    section[data-name="brief"] {
      &>h1 {
        margin: .1em 0;
        font-size: 3em;
      }
    }
    section[data-name="profile"] {
      &>h1 {
        margin: .1em 0;
        font-size: 2em;
      }
    }
    section[data-name="workHistory"],
    section[data-name="projects"],
    section[data-name="awards"] {
      li + li {
        margin-top: 1em;
      }
      li {
        h3 {
          margin-bottom: .3em;
          padding-bottom: .3em;
          border-bottom: 1px solid #ddd;
        }
      }
    }
    section[data-name="education"] {
      li {
        line-height: 1.5;
      }
    }
    section[data-name="contacts"] {
      td:first-child {
        padding-right: 1em;
      }
    }
  }
</style>
