<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  components: {
    Nav: () => import('@/components/Nav.vue')
  },
};
</script>
