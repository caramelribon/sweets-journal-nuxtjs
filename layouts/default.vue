<template>
  <div>
    <header-login-before v-if="!$store.state.user.login" />
    <header-login-after v-else />
    <Nuxt />
  </div>
</template>

<script>
import HeaderLoginBefore from '~/components/headerLoginBefore.vue';
import HeaderLoginAfter from '~/components/headerLoginAfter.vue';
export default {
  components: {
    HeaderLoginAfter,
    HeaderLoginBefore,
  }
};
</script>

<style scoped>
</style>
