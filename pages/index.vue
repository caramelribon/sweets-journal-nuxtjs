<template>
  <div>
    <app-top></app-top>
    <app-message></app-message>
    <shop-search></shop-search>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppMessage from '~/components/appMessage.vue'
import AppTop from '~/components/appTop.vue'
import AppFooter from '~/components/appFooter.vue'
import ShopSearch from '~/components/shopSearch.vue'
export default {
  comments: {
    AppTop,
    AppMessage,
    AppFooter,
    ShopSearch,
  }
}
</script>