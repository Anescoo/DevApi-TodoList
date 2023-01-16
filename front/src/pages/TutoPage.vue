<template>
    <q-page class="q-pa-xl">
        <h1>Tutorial</h1>

        <h2>Ref & computed</h2>
        <p>Ref : {{ firstname }} {{ lastname }}</p>
        <p>Computed : {{ fullname }}</p>
        <q-input type="text" label="Firstname" outlined v-model="firstname" />

        <h2>Watcher</h2>
        {{ watchedValue }}

        <h2>Conditional rendering</h2>
        <q-btn label="toggle boolean" @click="toggle" />
        <div v-if="bool">
            Bool is true the value is showed
        </div>
        <div v-else>
            Bool is false :(
        </div>

        <h2>Loop</h2>
        <div v-for="(todo, index) in todos" :key="index">
            <p class="text-bold">{{ todo.title }}</p>
            <p>{{ todo.description }}</p>
            <hr>
        </div>

        <h2>Custom event</h2>
        <AppEmitVue @on-tuto="handleOnTuto" />
        {{ emitedValue }}

        <h2>Router & routes</h2>
        <q-btn @click="redirectHomepage" label="Redirect homepage" />
        <br>
        <q-btn @click="redirectTutoWithParams" label="Redirect tuto params" class="q-mb-md" />

        <p class="text-bold">Params found</p>
        {{ route.params.id }}

        <h2>Asynchronous Calls</h2>
        <div v-if="loading">
            ...Loading data
        </div>
        <div v-else>
            {{ fakeData }}
        </div>

        <h2>Components</h2>
        <AppExempleComponent title="Mon titre" description="Ma description" class="q-mb-md" />

        <h3>Components with reactive data</h3>
        <div v-for="(data, i) in fakeData" :key="i">
            <AppExempleComponent :title="data.title" :description="data.description" class="q-mb-md" />
        </div>

        <h2>Store</h2>
        <div class="flex items-center">
            <q-btn label="+" @click="counterStore.increment()" />
            <AppCounter class="q-mx-md" />
            <q-btn label="-" @click="counterStore.decrement()" />
        </div>

        <h2>Api calls</h2>
        {{ lists }}
    </q-page>
</template>

<script setup>
import AppEmitVue from 'components/AppEmit.vue'
import AppExempleComponent from 'src/components/AppExempleComponent.vue'
import AppCounter from 'src/components/AppCounter.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCounterStore } from 'src/stores/example-store'
import { getAllLists } from 'src/services/lists'
import { Notify } from 'quasar'
const router = useRouter()
const route = useRoute()
const counterStore = useCounterStore()
const firstname = ref('Matthieu')
const lastname = ref('Tabarin')
const fullname = computed(() => `${firstname.value} ${lastname.value}`)
const watchedValue = ref('')
const bool = ref(false)
const emitedValue = ref('')
const fakeData = ref([])
const loading = ref(false)
const lists = ref([])
const todos = ref([
  { title: 'To do 1', description: 'Acheter des patates' },
  { title: 'To do 1', description: 'Acheter des carottes' },
  { title: 'To do 1', description: 'Acheter des pâtes' }
])
const toggle = () => {
  bool.value = !bool.value
}
const handleOnTuto = (v) => {
  console.log(v)
  emitedValue.value = v
}
const redirectHomepage = () => {
  router.push({ name: 'homepage' })
}
const redirectTutoWithParams = () => {
  router.push({ name: 'tuto-params', params: { id: '12345678' } })
}
const asyncCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { title: 'Loaded data', description: 'Acheter des patates' },
        { title: 'Loaded data 2', description: 'Acheter des carottes' }
      ])
    }, 3000)
  })
}
onMounted(async () => {
  loading.value = true
  const data = await asyncCall()
  try {
    const res = await getAllLists()
    console.log(res)
    lists.value = res.data
  } catch {
    Notify.create('Error on lists load')
  }
  fakeData.value = data
  loading.value = false
})
watch(firstname, (newVal, oldVal) => {
  watchedValue.value = newVal + ' Watched'
})
</script>
