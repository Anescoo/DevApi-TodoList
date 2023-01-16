<template>
<div>
    <q-btn @click="emitOnTuto" label="Emit value"/>
</div>
</template>
<script setup>
import { ref } from 'vue'
const valToEmit = ref('Valeur à emit')
const emit = defineEmits(['onTuto'])
const emitOnTuto = () => {
  emit('onTuto', valToEmit)
}
</script>
