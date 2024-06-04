<script setup lang="ts">
import InputTextarea from 'primevue/textarea'
import { ref } from 'vue'
import { type Truck, TRUCK_STATUSES } from '@/types/trucks'
import { createTruck, ERROR_CODES } from '@/services/trucksService'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const emit = defineEmits(['new', 'cancel'])

const progress = ref(false)

const DEFAULT_FORM = {
  code: '',
  name: '',
  status: TRUCK_STATUSES.OUT_OF_SERVICE,
  description: ''
}

const form = ref<Truck>({ ...DEFAULT_FORM })

type ErrorsType = Partial<{ code: string; name: string; status: string; description: string }>

const errors = ref<ErrorsType>({})

const statusOptions = [
  { label: 'Out of Service', value: TRUCK_STATUSES.OUT_OF_SERVICE },
  { label: 'Loading', value: TRUCK_STATUSES.LOADING },
  { label: 'To Job', value: TRUCK_STATUSES.TO_JOB },
  { label: 'At Job', value: TRUCK_STATUSES.AT_JOB },
  { label: 'Returning', value: TRUCK_STATUSES.RETURNING }
]

const validateForm = () => {
  errors.value = {}
  if (!form.value.code) {
    errors.value.code = 'Code is required'
  }
  if (!/^[a-zA-Z0-9_]*$/.test(form.value.code as string)) {
    errors.value.code = 'Code must be alphanumeric'
  }
  if (!form.value.name) {
    errors.value.name = 'Name is required'
  }
  if (!form.value.status) {
    errors.value.status = 'Status is required'
  }
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      progress.value = true
      const result = await createTruck(form.value)
      emit('new', result)
      toast.add({ severity: 'success', summary: 'Success', detail: 'Truck added', life: 3000 })
      emit('cancel')
    } catch (error: any) {
      if (error.cause.code === ERROR_CODES.NOT_UNIQUE) {
        errors.value.code = 'Not unique'
      } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error adding truck', life: 3000 })
      }
    } finally {
      progress.value = false
    }
  }
}

const onCancel = () => {
  emit('cancel')
  reset()
}

const reset = () => {
  form.value = { ...DEFAULT_FORM }
  errors.value = {}
}
</script>

<template>
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
      <div class="p-field p-col-12 p-md-6 mb-2">
        <label for="status" class="font-semibold">Status</label>
        <Dropdown
          id="status"
          class="mt-2"
          v-model="form.status"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
        />
        <small v-if="errors.status" class="p-error">{{ errors.status }}</small>
      </div>
      <div class="p-field p-col-12 mb-5">
        <label for="description" class="font-semibold">Description</label>
        <InputTextarea id="description" class="mt-2" v-model="form.description" />
        <small v-if="errors.description" class="p-error">{{ errors.description }}</small>
      </div>
    </form>
  </div>
  <div class="flex justify-content-end gap-2">
    <Button type="button" label="Cancel" severity="secondary" @click="onCancel"></Button>
    <Button type="button" label="Save" :loading="progress" @click="handleSubmit"></Button>
  </div>
</template>

<style scoped></style>
