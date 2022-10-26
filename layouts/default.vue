<template>
  <div>
    <header-login-before v-if="!$store.state.user.login" />
    <header-login-after v-else />
    <Nuxt />
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
</style>
