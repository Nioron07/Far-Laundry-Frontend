<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
async function SetLocalStorage() {
  await (await fetch("http://127.0.0.1:5000/week/0")).json().then(
    (data) => {
        window.localStorage.setItem("currentDay", new Date().getDate().toString()) 
        window.localStorage.setItem("currentTime", data['Current Time']) 
        window.localStorage.setItem("weekWasherDataOg", Object.values(data['Washing Machines']).slice(0, Object.values(data['Washing Machines']).length - 2).toString())
        window.localStorage.setItem("weekDryerDataOg", Object.values(data['Dryers']).slice(0, Object.values(data['Washing Machines']).length - 2).toString())
        window.localStorage.setItem("weekChartLabels", Object.keys(data['Dryers']).slice(0, Object.values(data['Washing Machines']).length - 2).toString())
        window.localStorage.setItem("weekWashHighOg", data['Washing Machines']["High"])
        window.localStorage.setItem("weekWashLowOg", data['Washing Machines']["Low"])
        window.localStorage.setItem("weekDryHighOg", data['Dryers']["High"])
        window.localStorage.setItem("weekDryLowOg", data['Dryers']["Low"])
    }
  )
  await (await fetch("http://127.0.0.1:5000/week/1")).json().then(
    (data) => {
      window.localStorage.setItem("weekWasherDataTr", Object.values(data['Washing Machines']).slice(0, Object.values(data['Washing Machines']).length - 2).toString())
      window.localStorage.setItem("weekDryerDataTr", Object.values(data['Dryers']).slice(0, Object.values(data['Washing Machines']).length - 2).toString())
      window.localStorage.setItem("weekWashHighTr", data['Washing Machines']["High"])
      window.localStorage.setItem("weekWashLowTr", data['Washing Machines']["Low"])
      window.localStorage.setItem("weekDryHighTr", data['Dryers']["High"])
      window.localStorage.setItem("weekDryLowTr", data['Dryers']["Low"])
    }
  )
  await (await fetch("http://127.0.0.1:5000/today/0")).json().then(
    (data) => {
      window.localStorage.setItem("dayWasherDataOg", Object.values(data['Washing Machines']['Predictions']).toString())
      window.localStorage.setItem("dayDryerDataOg", Object.values(data['Dryers']['Predictions']).toString())
      window.localStorage.setItem("dayWashHighOg", data['Washing Machines']["High"])
      window.localStorage.setItem("dayWashLowOg", data['Washing Machines']["Low"])
      window.localStorage.setItem("dayDryHighOg", data['Dryers']["High"])
      window.localStorage.setItem("dayDryLowOg", data['Dryers']["Low"])
    }
  )
  await (await fetch("http://127.0.0.1:5000/today/1")).json().then(
    (data) => {
      window.localStorage.setItem("dayWasherDataTr", Object.values(data['Washing Machines']['Predictions']).toString())
      window.localStorage.setItem("dayDryerDataTr", Object.values(data['Dryers']['Predictions']).toString())
      window.localStorage.setItem("dayWashHighTr", data['Washing Machines']["High"])
      window.localStorage.setItem("dayWashLowTr", data['Washing Machines']["Low"])
      window.localStorage.setItem("dayDryHighTr", data['Dryers']["High"])
      window.localStorage.setItem("dayDryLowTr", data['Dryers']["Low"])
    }
  )
}
SetLocalStorage()
</script>
