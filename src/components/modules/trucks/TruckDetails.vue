<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import ProgressSpinner from 'primevue/progressspinner'
import Steps from 'primevue/steps'
import { type Truck, TRUCK_STATUSES } from '@/types/trucks'
import { deleteTruck, fetchTruckById, updateTruck } from '@/services/trucksService'
import UpdateTruckModal from '@/components/modules/trucks/UpdateTruckModal.vue'

const toast = useToast()
const router = useRouter()
const truckId = router.currentRoute.value.params.id as string

const truck = ref<Truck | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const statusLoading = ref(false)
const showUpdateTruckModal = ref(false)

const statusSteps = [
  { label: 'Loading', value: TRUCK_STATUSES.LOADING },
  { label: 'To Job', value: TRUCK_STATUSES.TO_JOB },
  { label: 'At Job', value: TRUCK_STATUSES.AT_JOB },
  { label: 'Returning', value: TRUCK_STATUSES.RETURNING }
]

const activeStepIndex = computed(() => {
  return statusSteps.findIndex((step) => step.value === truck.value?.status)
})

const nextStep = computed(() => {
  if (activeStepIndex.value === 3) {
    return statusSteps[0]
  }

  return statusSteps[activeStepIndex.value + 1]
})

onMounted(async () => {
  try {
    truck.value = await fetchTruckById(truckId)
  } catch (err) {
    error.value = 'Failed to fetch truck details'
  } finally {
    loading.value = false
  }
})

const putStatus = async (status: TRUCK_STATUSES) => {
  if (truck.value?.id) {
    statusLoading.value = true
    const res = await updateTruck(truck.value.id, { status })
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Truck status updated',
      life: 2000
    })
    truck.value.status = res.status
    statusLoading.value = false
  }
}

const onChangeStatus = (value: { value: { label: string; value: string } }) => {
  const newStatus = value.value.value as TRUCK_STATUSES
  putStatus(newStatus)
}

const onUpdated = (updatedTruck: Truck) => {
  truck.value = updatedTruck
}

const onDelete = async () => {
  if (truck.value?.id && confirm('Are you sure to delete truck?')) {
    await deleteTruck(truck.value.id)
    toast.add({ severity: 'success', summary: 'Success', detail: 'Truck deleted', life: 3000 })
    router.push({ name: 'allTrucks' })
  }
}
</script>

<template>
  <Card>
    <template #content>
      <UpdateTruckModal
        v-if="truck"
        :truck="truck"
        v-model:visible="showUpdateTruckModal"
        @updated="onUpdated"
      />
      <ProgressSpinner v-if="loading" />
      <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>
      <Panel v-if="truck" :header="truck.name">
        <template #header>
          <RouterLink :to="{ name: 'allTrucks' }">
            <Button class="mb-2" size="small"><span class="pi pi-arrow-left"></span> </Button>
          </RouterLink>
          <div class="flex align-items-center gap-2">Truck Details</div>
        </template>
        <template #icons>
          <button class="p-panel-header-icon p-link mr-2" @click="showUpdateTruckModal = true">
            <span class="pi pi-pencil"></span>
          </button>
          <button class="p-panel-header-icon p-link mr-2" @click="onDelete">
            <span class="pi pi-times"></span>
          </button>
        </template>
        <div class="mb-2"><span class="font-bold">Code: </span> {{ truck.code }}</div>
        <div class="mb-2"><span class="font-bold">Name: </span> {{ truck.name }}</div>
        <div class="mb-2"><span class="font-bold">Description: </span> {{ truck.description }}</div>
        <div class="mb-2">
          <span class="font-bold">Status:</span>
        </div>
        <Message
          v-if="truck.status === TRUCK_STATUSES.OUT_OF_SERVICE"
          severity="error"
          :closable="false"
          >Truck Out of service
        </Message>
        <Steps v-else :model="statusSteps" :activeStep="activeStepIndex" />
        <div class="mt-3 flex flex-column gap-2 w-full md:w-5 m-auto">
          <Dropdown
            v-if="activeStepIndex < 0"
            :options="statusSteps"
            :loading="statusLoading"
            placeholder="Change status"
            option-label="label"
            appendTo="self"
            @change="onChangeStatus"
          />
          <Button
            v-else
            :label="nextStep.label"
            icon="pi pi-arrow-right"
            :loading="statusLoading"
            @click="putStatus(nextStep.value)"
          />
          <Button
            v-if="activeStepIndex >= 0"
            label="Out of service"
            icon="pi pi-times"
            severity="danger"
            :loading="statusLoading"
            @click="putStatus(TRUCK_STATUSES.OUT_OF_SERVICE)"
          />
        </div>
      </Panel>
    </template>
  </Card>
</template>

<style scoped></style>
