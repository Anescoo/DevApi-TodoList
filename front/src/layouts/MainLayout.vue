<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white  text-black">
      <q-toolbar>
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <Router-link to="/logIn">
          Se connecter
        </Router-link>
        <q-btn outline label="S'incrire" color="primary" no-caps class="q-mx-md" to="/register"/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
