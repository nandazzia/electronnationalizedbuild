<template>
  <section class="app-main">
    <transition name="el-fade-in-linear">
      <router-view
        :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>
