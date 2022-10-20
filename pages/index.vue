<template>
</template>

<script>
export default {
  layout({ store }) {
    return store.state.loggedIn ? 'default' : 'loginBefore'
  }
}
</script>
