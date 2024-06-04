<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Card from 'primevue/card'
import Toolbar from 'primevue/toolbar'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Paginator, { type PageState } from 'primevue/paginator'
import { ref, onMounted } from 'vue'
import { type Truck, TRUCK_STATUSES } from '@/types/trucks'
import { fetchTrucks } from '@/services/trucksService'
import CreateTruckModal from '@/components/modules/trucks/CreateTruckModal.vue'
import debounce from '@/utils/debounce'

onMounted(async () => {
  const trucksData = await fetchTrucks()
  products.value = trucksData.trucks
  trucksTotalCount.value = trucksData.total
})

const products = ref<Truck[]>([])
const selectedTrucks = ref<Truck[]>([])

const showCreateTruckModal = ref(false)

const searchValue = ref('')

const page = ref(1)

const trucksTotalCount = ref(0)

const onPage = async (event: PageState) => {
  page.value = event.page + 1
  const trucksData = await fetchTrucks({ page: page.value })
  products.value = trucksData.trucks
  trucksTotalCount.value = trucksData.total
}

const onNew = (truck: Truck) => {
  products.value.unshift(truck)
}

const onSearch = debounce(async (event: Event) => {
  const nameValue = (event.target as HTMLInputElement).value
  const trucksData = await fetchTrucks({ page: 1, name: nameValue })
  products.value = trucksData.trucks
  trucksTotalCount.value = trucksData.total
}, 300)

function getStatusTagSeverity(status: TRUCK_STATUSES) {
  switch (status) {
    case TRUCK_STATUSES.OUT_OF_SERVICE:
      return 'danger'
    case TRUCK_STATUSES.LOADING:
      return 'info'
    case TRUCK_STATUSES.TO_JOB:
      return 'warning'
    case TRUCK_STATUSES.AT_JOB:
      return 'success'
    case TRUCK_STATUSES.RETURNING:
      return 'primary'
    default:
      return 'neutral'
  }
}
</script>

<template>
  <Card>
    <template #content>
      <CreateTruckModal v-model:visible="showCreateTruckModal" @new="onNew" />

      <DataTable v-model:selection="selectedTrucks" :value="products" tableStyle="min-width: 500px">
        <template #header>
          <Toolbar>
            <template #start>
              <Button
                label="Add"
                icon="pi pi-plus"
                severity="success"
                class="mr-2"
                @click="showCreateTruckModal = true"
              />
            </template>
            <template #end>
              <IconField iconPosition="left">
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="searchValue" placeholder="Search by Name" @input="onSearch" />
              </IconField>
            </template>
          </Toolbar>
        </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="code" header="Code"></Column>
        <Column header="Name">
          <template #body="slotProps">
            <RouterLink :to="{ name: 'truckDetails', params: { id: slotProps.data.id } }"
              >{{ slotProps.data.name }}
            </RouterLink>
          </template>
        </Column>
        <Column header="Status">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.status"
              :severity="getStatusTagSeverity(slotProps.data.status)"
            />
          </template>
        </Column>
        <Column field="description" header="Description" />
        <Column>
          <template #body="slotProps">
            <RouterLink :to="{ name: 'truckDetails', params: { id: slotProps.data.id } }">
              <Button icon="pi pi-pencil" size="small" severity="secondary" />
            </RouterLink>
          </template>
        </Column>

        <template #footer>
          <Paginator :rows="10" :totalRecords="trucksTotalCount" @page="onPage" />
        </template>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped></style>
