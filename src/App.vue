<script setup lang="ts">
import Navigation from '@/components/ui/AppNavigation.vue'
import FooterElement from '@/components/ui/AppFooter.vue'
</script>

<template>
  <Toast />
  <Navigation />
  <div class="main-container">
    <RouterView />
  </div>
  <FooterElement />
</template>

<style scoped>
.main-container {
  margin: auto;
}
@media (min-width: 1600px) {
  .main-container {
    max-width: 1600px;
  }
}
</style>
