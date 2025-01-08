<template>
  <v-card variant="outlined" color="deep-purple-accent-2" class="bigCard pa-1 ma-3" rounded="xl">
    <v-card-title class="title">Laundry Planner</v-card-title>
    <v-form @submit.prevent fast-fail>
      <div class="d-flex justify-space-evenly align-start">
        <div class="dateDiv">
          <h3 class="freqHeader">Dates</h3>
          <v-divider class="ma-2"></v-divider>
          <v-date-input clearable variant="outlined" label="Start Date" v-model="startDate" :rules="startDateRules"
            show-adjacent-months>
          </v-date-input>
          <v-date-input clearable variant="outlined" label="End Date" v-model="endDate" :rules="endDateRules"
            show-adjacent-months>
          </v-date-input>
        </div>
        <div>
          <h3 class="freqHeader">Frequency</h3>
          <v-divider class="ma-2"></v-divider>
          <div class="freqDiv d-flex justify-space-evenly align-center ma-2">
            <h3 class="txt">Every</h3>
            <v-number-input class="numInput" :reverse="false" controlVariant="split" :hideInput="false" :inset="false"
              variant="outlined" v-model="numFreq" :min=1>
            </v-number-input>
          </div>
          <v-btn-toggle v-model="frequency" variant="outlined" shaped mandatory color="deep-purple-accent-2"
            class="toggle">
            <v-btn :value="1">
              Day(s)
            </v-btn>
            <v-btn :value="7">
              Week(s)
            </v-btn>
            <v-btn :value="30">
              Month(s)
            </v-btn>
          </v-btn-toggle>
        </div>
        <div>
          <h3 class="freqHeader">Hall</h3>
          <v-divider class="ma-2"></v-divider>
          <div class="toggle-div ma-2">
            <v-btn-toggle v-model="toggle" mandatory shaped color="deep-purple-darken-3">
              <v-btn :value="0">
                Oglesby
              </v-btn>
              <v-btn :value="1">
                Trelease
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
      </div>
      <div class="submitButtonDiv">
        <v-btn type="submit" color="deep-purple-darken-3" @click="CreatePlan" :loading="loading">Generate Plan</v-btn>
      </div>
    </v-form>
  </v-card>
  <v-alert v-if="invalidDates" class="alert" text="Start date must be before end date" type="error"
    variant="outlined"></v-alert>
  <v-timeline direction="horizontal" lineInset="15" truncate-line="both" dot-color="deep-purple-accent-3" fill-dot
    class="timeline" v-show="schedule.length != 0">
    <v-timeline-item v-for="(date, i) in schedule" size="x-small">
      <v-card :class="i % 2 != 0 ? 'evenDate' : 'oddDate'">
        <v-card-title class=" bg-deep-purple-accent-3">{{ date.time.slice(4, 16)}}</v-card-title>
        <v-card-text class="pa-2">
          <p>{{ `Best Time:\n ${date.bestTime}` }}</p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
  <div class="d-flex justify-center ma-5" v-if="schedule.length != 0">
    <v-btn @click="ExportPlan" color="deep-purple-darken-3">Export Plan
      to Calendar</v-btn>
  </div>
</template>

<script>
import { createEvents } from 'ics';
export default {
  data: () => ({
    toggle: 0,
    loading: false,
    startDate: null,
    numFreq: 3,
    frequency: 1,
    endDate: null,
    schedule: [],
    invalidDates: false,
    startDateRules: [
      value => {
        if (value) return true

        return 'You must pick a start date'
      },
    ],
    endDateRules: [
      value => {
        if (value) return true

        return 'You must pick an end date'
      },
    ]
  }),
  methods: {
    async CreatePlan() {
      if (this.startDate == undefined || this.endDate == undefined) {
        return;
      }
      this.schedule = [];
      this.loading = true;
      if (this.startDate > this.endDate) {
        this.invalidDates = true;
        return;
      }
      this.invalidDates = false;
      const increment = this.numFreq * this.frequency;
      console.log(this.startDate.toDateString())
      await (await fetch(`https://backend-1047148175119.us-central1.run.app/optimumTime/${this.toggle}/startDay/${this.startDate.getTime()}/endDay/${this.endDate.getTime()}/step/${increment}`)).json().then(
        (data) => {
          
          console.log(this.schedule)
          this.schedule = data['Optimum Time']
          console.log(this.schedule)
        }
      )
      this.loading = false;
    },
    ExportPlan() {
      const events = this.schedule.map((item) => {
        console.log('1')
        const date = new Date(item.time);
        let [hours, minutes] = [0, 0];
        console.log('2')
        const timeMatch = item.bestTime.match(/(\d+):(\d+)\s*(AM|PM)?/i);
        if (timeMatch) {
          let rawHour = parseInt(timeMatch[1], 10);
          const rawMin = parseInt(timeMatch[2], 10);
          const ampm = timeMatch[3]?.toUpperCase();
          if (ampm === 'PM' && rawHour < 12) rawHour += 12;
          if (ampm === 'AM' && rawHour === 12) rawHour = 0;

          hours = rawHour;
          minutes = rawMin;
        }

        return {
          title: 'Laundry Day',
          description: `Optimum time: ${item.bestTime}`,
          start: [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            hours,
            minutes
          ],
          duration: { hours: 1, minutes: 0 },
        };
      });

      createEvents(events, (error, value) => {
        if (error) {
          console.log(error);
          return;
        }
        const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'LaundryPlan.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });

    }
  }
}
</script>

<style scoped>
.title {
  font-family: Oxanium, sans-serif;
  font-size: 30px;
  justify-self: center;
}

.bigCard {
  width: 98%;
  justify-self: center;
}

.submitButtonDiv {
  justify-self: center;
  margin-bottom: 1vh;
}

.toggle-div {
  justify-self: center;
}

.freqHeader {
  justify-self: center;
  font-family: Oxanium, sans-serif;
}

.selects {
  max-width: 30%;
}

.freqDiv {
  justify-self: center;
  width: 70%;
}

.txt {
  font-family: Oxanium, sans-serif;
  margin-bottom: 4%;
}

.toggle {
  width: fit-content;
  margin-bottom: 4%;
}

.alert {
  width: fit-content;
  justify-self: center;
}

@keyframes evenDateAnim {
  from {
    scale: 0%;
    bottom: 100px;
  }

  to {
    scale: 100%;
    bottom: 0px;
  }
}

.evenDate {
  scale: 100%;
  animation-name: evenDateAnim;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
}

@keyframes oddDateAnim {
  from {
    scale: 0%;
    top: 100px;
    opacity: 0%;
  }

  to {
    scale: 100%;
    top: 0px;
    opacity: 100%;
  }
}

.oddDate {
  scale: 100%;
  animation-name: oddDateAnim;
  animation-duration: 1s;
  animation-timing-function: ease-out;
}

.timeline {
  margin-top: 3vh;
  margin-bottom: 3vh;
}

.numInput {
  margin-left: 1lh;
}

.dateDiv {
  width: 15%;
}
</style>
