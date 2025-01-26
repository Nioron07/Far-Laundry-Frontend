<template>
  <div class="form-card" >
  <v-card color="light-green-accent-2" variant="outlined">
    <v-card-text class="form-title">Laundry Data Entry Form</v-card-text>
    <v-select :rules="rules" v-model="hall" clearable class="form-input" label="Select Hall"
      :items="['Oglesby', 'Trelease']" variant="outlined"></v-select>
    <v-select :rules="rules" v-model="washerNum" clearable class="form-input" label="Number of Washers Available"
      :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]" variant="outlined"></v-select>
    <v-select :rules="rules" v-model="dryerNum" clearable class="form-input" label="Number of Dryers Available"
      :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]" variant="outlined"></v-select>
    <v-btn color="light-green-darken-3" class="form-button" @click="PostToDatabase">Submit</v-btn>
  </v-card>
  </div>
  <div class="alert-div">
  <v-alert closable v-if="success == 'success'" class="alert" title="Success!" text="Thank you for contributing!"
    type="success" variant="tonal"></v-alert>
  <v-alert closable v-if="success == 'duplicate'" class="alert" title="Error" text="Duplicate Submission" type="error"
    variant="tonal"></v-alert>
  <v-alert closable v-if="success == 'failed'" class="alert" title="Error" text="Something went wrong with your request"
    type="error" variant="tonal"></v-alert>
  </div>
</template>
<script>
export default {
  data: () => ({
    rules: [
      value => {
        if (value || value == 0) return true
        return 'You must pick an option'
      },
    ],
  })
}
</script>
<script setup>
import { ref } from 'vue';
const success = ref()
const hall = ref()
const washerNum = ref()
const dryerNum = ref()
const halls = { 'Oglesby': 0, 'Trelease': 1 }
function PostToDatabase() {
  if (hall.value != null && washerNum.value != null && dryerNum.value != null) {
    fetch("https://backend-1047148175119.us-central1.run.app/contribute", {
      method: "POST",
      body: JSON.stringify({
        data: [washerNum.value, dryerNum.value, halls[hall.value]]
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": true
      }
    }).then((data) => {
      if (data.status == 200) {
        success.value = 'success'
      } else if (data.status == 201) {
        success.value = 'failed'
      } else {
        success.value = 'duplicate'
      }
    }
    )
  }
}
</script>
<style scoped>
@media only screen and (max-width: 800px) {
  .form-card {
    margin-left: 5% !important;
    margin-right: 5% !important;
    margin-top: 5% !important;
  }
}
.form-card {
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 2%;
}

.form-input {
  margin-top: 3%;
  width: 80%;
  justify-self: center;
}

.form-title {
  font-family: Oxanium, sans-serif;
  font-size: 25px;
  justify-self: center;
}

.form-button {
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  justify-self: center;
}

.alert-div {
  font-family: Oxanium, sans-serif;
  display: grid;
  justify-content: center;
  margin-top: 5%;
}
</style>