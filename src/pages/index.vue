<template>
  <v-card
    class="title-card"
    variant="plain"
    color="cyan-accent-2"
  >
    <v-card-title class="page-title">FAR Laundry Tool</v-card-title>
    <v-card-subtitle class="page-subtitle">Created by Matthew Hirstius</v-card-subtitle>
  </v-card>
  <PredictionMenu />
</template>

<script lang="ts" setup>
  //
</script>

<style scoped>
.page-title {
  font-family: Oxanium, sans-serif;
  font-size: 75px;
  padding-bottom: 0px;
}
.page-subtitle {
  font-family: Oxanium, sans-serif;
  justify-self: center;
  font-size: 12px;
}
.title-card {
  display: grid;
  justify-content: center;
}
</style>
