<template>
  <div>
    <app-top></app-top>
    <app-message></app-message>
  </div>
</template>

<script>
import AppMessage from '~/components/appMessage.vue'
import AppTop from '~/components/appTop.vue'
export default {
  comments: {
    AppTop,
    AppMessage,
  }
}
</script>