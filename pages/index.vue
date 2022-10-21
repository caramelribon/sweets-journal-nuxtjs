<template>
  <div>
    <app-top></app-top>
    <app-message></app-message>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppMessage from '~/components/appMessage.vue'
import AppTop from '~/components/appTop.vue'
import AppFooter from '~/components/appFooter.vue'
export default {
  comments: {
    AppTop,
    AppMessage,
    AppFooter,
  }
}
</script>