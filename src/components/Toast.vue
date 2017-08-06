<template>
  <transition name="toast-fade">
    <div class="toast-wrap" v-show="showing">{{text}}</div>
  </transition>
</template>

<script>
  const DEFAULT_DURATION = 3000
  import Utils from '../lib/Utils'
  export default {
    name: 'toast',
    data () {
      return {
        text: '',
        showing: false,
        timer: null
      }
    },
    mounted: function () {
      Utils.register('toast', this.show) // 将公共方法注册到Utils中
    },
    methods: {
      show: function (text, duration) {
        this.text = text
        this.showing = true
        if (this.timer) {
          clearInterval(this.timer)
        }
        this.timer = setTimeout(() => {
          this.showing = false
        }, duration || DEFAULT_DURATION)
      }
    }
  }
</script>

<style>
  .toast-wrap {
    position: fixed;
    top: 75px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    padding: 5px;
    border-radius: 5px;
    width: 30%;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
  }
  .toast-fade-enter-active, .toast-fade-leave-active {
    /*transition: all .8s ease;*/
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .toast-fade-enter, .toast-fade-leave-active {
    transform: translateY(-60px);
    opacity: 0
  }
</style>
