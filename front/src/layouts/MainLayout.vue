<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white  text-black">
      <q-toolbar>
        <q-btn src='../assets/logo.png' style="height: 40px; max-width: 40px" to="/" />
        <q-toolbar-title>
          TODO LIST
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
