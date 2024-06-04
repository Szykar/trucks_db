<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/'
  },
  {
    label: 'Trucks',
    icon: 'pi pi-truck',
    route: '/trucks/all'
  }
])
</script>

<template>
  <header>
    <div class="card">
      <Menubar :model="items">
        <template #start>
          <h1 class="green mr-2">🚛 TRUCKS DB</h1>
        </template>
        <template #item="{ item, props }">
          <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </RouterLink>
        </template>
      </Menubar>
    </div>
  </header>
</template>

<style>
.p-menuitem {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
