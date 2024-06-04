<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import { computed, type PropType, ref } from 'vue'
import { type Truck } from '@/types/trucks'
import { updateTruck } from '@/services/trucksService'
import InputTextarea from 'primevue/textarea'

const toast = useToast()

const props = defineProps({
  visible: { type: Boolean, required: true },
  truck: { type: Object as PropType<Truck>, required: true }
})

const emit = defineEmits(['update:visible', 'updated'])

const visibleModal = computed({
  get() {
    return props.visible
  },
  set(newValue) {
    emit('update:visible', newValue)
    reset()
  }
})

const progress = ref(false)

const form = ref<Partial<Truck>>({
  code: props.truck.code,
  name: props.truck.name,
  description: props.truck.description
})

type ErrorsType = Partial<{ code: string; name: string; description: string }>

const errors = ref<ErrorsType>({})

const validateForm = () => {
  errors.value = {}
  if (!form.value.code) {
    errors.value.code = 'Code is required'
  }
  if (!form.value.name) {
    errors.value.name = 'Name is required'
  }
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      progress.value = true
      const result = await updateTruck(props.truck.id as number, form.value)
      emit('updated', result)
      toast.add({ severity: 'success', summary: 'Success', detail: 'Truck updated', life: 3000 })
      visibleModal.value = false
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error adding truck', life: 3000 })
    } finally {
      progress.value = false
    }
  }
}

const onCancel = () => {
  visibleModal.value = false
  reset()
}

const reset = () => {
  errors.value = {}
}
</script>

<template>
  <Dialog
    v-model:visible="visibleModal"
    modal
    header="Update Truck details"
    :style="{ width: '36rem' }"
  >
    <div class="p-fluid p-grid">
      <form @submit.prevent="handleSubmit">
        <div class="p-field p-col-12 p-md-6 mb-2">
          <label for="code" class="font-semibold">Code</label>
          <InputText id="code" class="mt-2" v-model="form.code" />
          <small v-if="errors.code" class="p-error">{{ errors.code }}</small>
        </div>
        <div class="p-field p-col-12 p-md-6 mb-2">
          <label for="name" class="font-semibold">Name</label>
          <InputText id="name" class="mt-2" v-model="form.name" />
          <small v-if="errors.name" class="p-error">{{ errors.name }}</small>
        </div>
        <div class="p-field p-col-12 mb-5">
          <label for="description" class="font-semibold">Description</label>
          <InputTextarea id="description" class="mt-2" v-model="form.description" />
          <small v-if="errors.description" class="p-error">{{ errors.description }}</small>
        </div>
      </form>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" class="" @click="onCancel"></Button>
      <Button type="button" label="Save" :loading="progress" @click="handleSubmit"></Button>
    </div>
  </Dialog>
</template>

<style scoped></style>
