<template>
  <keep-alive :include="cacheList" :exclude="notCacheName">
    <router-view ref="child"/>
  </keep-alive>
</template>
<script>
export default {
  name: 'ParentView',
  computed: {
    tagNavList () {
      console.log('ParentView', this.$store.state.app.tagNavList)
      return this.$store.state.app.tagNavList
    },
    notCacheName () {
      console.log('exclude', [(this.$route.meta && this.$route.meta.notCache) ? this.$route.name : ''])
      return [(this.$route.meta && this.$route.meta.notCache) ? this.$route.name : '']
    },
    cacheList () {
      console.log('include', ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []])
      return ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
    }
  }
}
</script>
