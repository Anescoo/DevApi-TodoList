<template>
    <div>
    Counter
    {{ counterStore.counter }}

    Double Count :
    {{ counterStore.doubleCount }}
    </div>
</template>
<script setup>
import { useCounterStore } from 'stores/example-store'
const counterStore = useCounterStore()
</script>
