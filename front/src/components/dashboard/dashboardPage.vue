<template>
  <q-page class="flex">
    <div class="home">
      <div class="right-block">
        <div v-if="loading">
          <q-circular-progress
            indeterminate
            rounded
            size="50px"
            color="#613973"
            class="q-ma-md"
          />
        </div>
        <div v-else>
          <table style="width: 100%">
            <div class="cursor-pointer">
              <div v-for="list_all in lists" :key="list_all._id">
                <q-card flat bordered class="my-card bg-grey-1">
                  <q-card-selection class="bg-lightgrey">
                    <div class="row items-center no-wrap">
                      <div class="col">
                        <div class="text-h6">{{ list_all.title }}</div>
                      </div>
                      <div class="col-auto">
                        <q-btn color="grey-7" round flat icon="more-vert">
                          <q-menu>
                            <q-list dense style="min-width: 100px">
                              <q-btn
                                >Editer
                                <q-menu>
                                  <q-item clickable>
                                    <form
                                      className="form"
                                      @submit.prevent="
                                        modifyCurrentList(list_all._id)
                                      "
                                    >
                                      <q-input
                                        v-model="modList"
                                        clearable
                                        filled
                                        label="Modifiy"
                                      />
                                      <q-btn
                                        type="submit"
                                        class="btn btn-block"
                                      >
                                        Modify list
                                      </q-btn>
                                    </form>
                                  </q-item>
                                </q-menu>
                              </q-btn>
                              <q-item-section>
                                <form
                                  className="form"
                                  @submit.prevent="
                                    deleteCurrentList(list_all._id)
                                  "
                                >
                                  <q-btn type="submit" class="btn btn-block"
                                    >Supprimer</q-btn
                                  >
                                </form>
                              </q-item-section>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </div>
                  </q-card-selection>
                  <q-card-section class="bg-white" align="left">
                    <q-btn color="blue" to="/Dashboard/Tasks">
                      Voir ma liste
                    </q-btn>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </table>
        </div>
      </div>
      <div class="left-block">
        <h3>
          Mes Listes
          <q-btn color="blue" round flat>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <q-menu>
              <q-item clickable>
                <form className="form" @submit.prevent="addnewList">
                  <q-input v-model="newList" clearable filled label="Add" />
                  <q-btn type="submit" class="btn btn-block">
                    Add new list
                  </q-btn>
                </form>
              </q-item>
            </q-menu>
          </q-btn>
        </h3>
        <div v-if="loading">
          <q-circular-progress
            indeterminate
            rounded
            size="50px"
            color="blue"
            class="q-ma-md"
          />
        </div>
        <div v-else>
          <table style="width: 100%">
            <div class="cursor-pointer">
              <tr v-for="list_all in lists" :key="list_all._id">
                <td>{{ list_all.title }}</td>
              </tr>
            </div>
          </table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Notify } from 'quasar'
import {
  getAllLists,
  addList,
  modifyList,
  deleteList
} from 'src/services/lists'

const loading = ref(false)
const lists = ref([])
const newList = ref('')
const modList = ref('')

const addnewList = async () => {
  const listForm = { title: newList.value }
  const response = await addList(listForm)
  window.location.reload()
  console.log(response)
}

const modifyCurrentList = async (getId) => {
  const modifylistForm = { title: modList.value }
  const response = await modifyList(getId, modifylistForm)
  window.location.reload()
  console.log(response)
}

const deleteCurrentList = async (getId) => {
  const response = await deleteList(getId)
  window.location.reload()
  console.log(response)
}

const asyncCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([])
    }, 1000)
  })
}

onMounted(async () => {
  loading.value = true
  await asyncCall()
  try {
    const res = await getAllLists()
    lists.value = res.data
  } catch {
    Notify.create('Error on user load')
  }
  loading.value = false
})
</script>

<style>
.home {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "left right";
  column-gap: 60px;
  border-radius: 30px;
}

.right-block {
  grid-area: right;
  align-content: center;
  background-color: white;
  border-radius: 10px;
}

.left-block {
  grid-area: left;
  background-color: rgb(237, 242, 243);
  width: 100%;
  height: 3000px;
  padding: 15px 15px 15px 15px;
  /* padding: 35px; */
}

.left-block q-btn {
  align-content: left;
  /* border-radius: 20px; */
}

.left-block h3 {
  height: 50px;
}

.left-block .lists {
  margin-bottom: 100px;
  padding: 15px;
}
</style>
