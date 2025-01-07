<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter()
</script>

<template>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      v-model="value"
      :color="color"
      :bg-color="bgColor"
      grow
    >
      <v-btn @click="router.push('/')">
        <v-icon>mdi-washing-machine</v-icon>

        Current Prediction
      </v-btn>

      <v-btn @click="router.push('/forecast')">
        <v-icon>mdi-chart-line</v-icon>

        Forecasts
      </v-btn>

      <v-btn @click="router.push('/plan')">
        <v-icon>mdi-calendar-search</v-icon>

        Plan
      </v-btn>

      <v-btn @click="router.push('/contribute')">
        <v-icon>mdi-database-plus-outline</v-icon>

        Contribute
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      value () {
        switch(this.$route.name) {
          case "/":
            return 0
          case "/forecast":
            return 1
          case "/plan":
            return 2
          case "/contribute":
            return 3
        }
      },
      color () {
        switch (this.value) {
          case 0:
            return 'cyan-accent-2'
          case 1:
            return 'lime-accent-2'
          case 2:
            return 'deep-purple-accent-2'
          case 3:
            return 'light-green-accent-2'
        }
      },
      bgColor () {
        switch (this.value) {
          case 0:
            return 'cyan-darken-4'
          case 1:
            return 'lime-darken-4'
          case 2:
            return 'deep-purple-darken-3'
          case 3:
            return 'light-green-darken-4'
        }
      }
    },
  }
</script>