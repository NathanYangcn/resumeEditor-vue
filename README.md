# resume-ediotr

## 概述
  > A Vue.js project for resume-editor
  > 这是一款 Vue 单页应用，属于个人项目。
  > 一款轻便的简历编辑器，可以有效管理个人简历，包括新建、删除、保存、预览等操作。

## 预览
  线上预览地址：[https://nathanyangcn.github.io/resumeEditor-vue/dist](https://nathanyangcn.github.io/resumeEditor-vue/dist)
  登录测试账号1：  zhangsan  123456
  登录测试账号2：  wangwu    456789

## 技术栈
  - Vue
  - Vue-cli
  - Vue-router
  - Vuex
  - webpack
  - less
  - flex 布局
  - element-ui 部分组件
  - leancloud
  - i18n

## 安装部署
  1. 下载
  `git clone git@github.com:NathanYangcn/resumeEditor-vue.git`
  2. 进入项目
  `cd resumeEditor-vue`
  3. 安装依赖
  `npm install`
  4. 运行
  `npm run dev`
  5. 打包
  `npm run build`

## 目标功能
  - 个人简历中心页
  - 简历编辑页
  - 简历管理页
  - 更新个人资料页
  - 简历预览页
  - 操作工具栏
  - 注册页
  - 登录页
  - 登出
  - 新建简历模板
  - 删除简历
  - 编辑简历
  - 清空简历
  - 保存简历

## 项目布局
```
resumeEditor
├─ build                                   // webpack配置文件
├─ config                                  // 项目设置
├─ dist                                    // 项目部署文件
├─ src
│  ├─ assets                               // 静态文件
│  ├─ components                           // 组件
│  │  │  ├─ Editor.vue                   // page 简历编辑页
│  │  │  ├─ Look.vue                     // page 简历预览页1
│  │  │  ├─ Manager.vue                  // page 简历管理页
│  │  │  ├─ Preview.vue                  // page 简历预览页2
│  │  │  ├─ ResumeCenter.vue             // page 个人简历中心页
│  │  │  ├─ ResumeEditor.vue             // 简历编辑组件
│  │  │  ├─ ResumeManager.vue            // 简历管理组件
│  │  │  ├─ ResumePreview.vue            // 简历预览组件
│  │  │  ├─ ResumeTool.vue               // 操作工具栏
│  │  │  ├─ Setting.vue                  // 更新个人资料页
│  │  │  ├─ SignIn.vue                   // 注册页
│  │  │  ├─ signUp.vue                   // 登录页
│  │  │  └─ TopBar.vue                   // 头部导航栏组件
│  ├─ i18n
│  │  └─ index.js                         // i18n 配置
│  ├─ lib                                  // 公用方法
│  ├─ router
│  │  └─ index.js                         // 路由 配置
│  ├─ store
│  │  └─ index.js                         // vuex 配置
│  ├─ App.vue                              // 页面入口文件
│  └─ main.js                              // 程序入口文件
├─ static                                   // 静态文件
│  └─ svg_icons                            // svg icon 图标
├─ test
├─ .babelrc                                 // ES6语法编译配置
├─ .editorconfig                            // 代码编写规格配置
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore                               // git 忽略项
├─ .postcssrc.js
├─ index.html                               // html模板
├─ package.json                             // 配置依赖
└─ README.md                                // README
```
## 知识总结（未完待续）
1. [初始化 Vue 项目（vue-cli）](http://www.jianshu.com/p/45b5ce2ab1c5)

## 相关资料
1. [vue2 官网](https://cn.vuejs.org/)
2. [vuex2 官网](https://vuex.vuejs.org/zh-cn/)
3. [vue-router2 官网](https://router.vuejs.org/zh-cn/)
4. [element-ui 官网](http://element.eleme.io/#/zh-CN)
5. [leancloud 官网](https://leancloud.cn/docs/leanstorage_guide-js.html)
6. [i18n 官网](https://kazupon.github.io/vue-i18n/old/)
7. [vue-cli 文档](https://github.com/vuejs/vue-cli)
