<template>
<div>
    <q-card>
    <q-card-section>
        <p class="text-bold">
        {{ props.title }}
        </p>
        <p>{{ props.description }}</p>
    </q-card-section>
    </q-card>
</div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>
