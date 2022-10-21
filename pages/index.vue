<template>
  <p v-if="$store.state.user.login">ログイン中</p>
  <p v-else>ログインしていない</p>
</template>

<script>
export default {
}
</script>
