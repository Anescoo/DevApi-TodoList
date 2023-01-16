<template>
  <q-page class="flex flex-center"><div class ="home">
    <div class="right-block">
    <img
      alt="Quasar logo"
      src="~/assets/header-img.png"
      style="width: 500px; height: 400px"
    >
    </div>
    <div class="left-block">
      <h1>Ynov Tasks Manager</h1>
      <p> Try out this new lightweight tasks manager for everyday tasks</p>
      <q-btn outline label="Get Started" color="purple" no-caps class="q-mx-md" to="/register" />
    </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>

<style>
.home {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'left right';
  column-gap: 60px;
  padding: 50px;
  border-radius: 30px;
}

.right-block {
  grid-area: right;
  display: grid;
  align-content: center;
  background-color: white;
  border-radius: 10px;
}

.left-block {
  grid-area: left;
  display: grid;
  align-content: center;
  background-color: white;
}

.left-block q-btn {
  align-content: left;
}

</style>
