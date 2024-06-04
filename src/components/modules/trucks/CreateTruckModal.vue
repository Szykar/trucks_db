<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { computed } from 'vue'
import CreateTruckForm from '@/components/modules/trucks/CreateTruckForm.vue'

const props = defineProps(['visible'])

const emit = defineEmits(['update:visible', 'new'])

const visible = computed({
  get() {
    return props.visible
  },
  set(newValue) {
    emit('update:visible', newValue)
  }
})
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Add Truck" :style="{ width: '36rem' }">
    <CreateTruckForm @new="emit('new', $event)" @cancel="visible = false" />
  </Dialog>
</template>

<style scoped></style>
