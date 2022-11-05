<template>
  <div>
    <header-login-before v-if="!user.isLogin" />
    <header-login-after v-else />
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
</style>
