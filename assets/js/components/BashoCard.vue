<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="4">
        <div class="text-center">
          <b-card-img src="assets/images/sumo.png" class="w-auto mt-4 rounded-0"></b-card-img>
        </div>
      </b-col>
      <b-col md="8">
        <b-card-body :title="labels[language].title">
          <b-container>
            <b-row class="justify-content-center">
              <b-col cols="5">{{ labels[language].name }}:</b-col>
              <b-col cols="5">{{ nextBashoName }}</b-col>
            </b-row>
            <b-row class="justify-content-center">
              <b-col cols="5">{{ labels[language].venue }}:</b-col>
              <b-col cols="5">{{ venue }}</b-col>
            </b-row>
            <b-row class="justify-content-center">
              <b-col cols="5">{{ labels[language].firstDay }}:</b-col>
              <b-col cols="5">{{ firstDay }}</b-col>
            </b-row>
            <b-row class="justify-content-center">
              <b-col cols="5">{{ labels[language].lastDay }}:</b-col>
              <b-col cols="5">{{ finalDay }}</b-col>
            </b-row>
            <b-row v-if="started" class="justify-content-center mt-3">
              <b-col cols="10">{{ labels[language].started }}</b-col>
            </b-row>
            <b-row v-else class="justify-content-center mt-3">
              <b-col cols="10">{{ labels[language].between }}:</b-col>
            </b-row>
            <b-row class="justify-content-center">
              <b-col cols="10">
                <b-progress
                  class="mt-2"
                  :max="progressMax"
                  striped
                  height="2rem">
                  <b-progress-bar :value="progressValue">
                    <span v-if="started">
                      <strong>{{ bashoDay }}</strong>
                    </span>
                    <span v-else>
                      <strong>{{ daysLeft }}</strong>
                    </span>
                  </b-progress-bar>
                </b-progress>
              </b-col>
            </b-row>
          </b-container>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>      
</template>

<script>
  module.exports = {
    props: {
        nextBashoName: String,
        venue: String,
        firstDay: String,
        finalDay: String,
        progressMax: Number,
        progressValue: Number,
        started: Boolean,
        language: String
    },

    data() {
      return {
        labels: {
          eo: {
            title: 'Venonta sumoturniro (baŝo)',
            name: 'Turniro',
            venue: 'Loko',
            firstDay: 'Unua tago',
            lastDay: 'Lasta tago',
            between: 'Restantaj tagoj ĝis la venonta baŝo',
            started: 'Tiu ĉi baŝo jam komencis.'
          },
          en: {
            title: 'Next Basho',
            name: 'Basho name',
            venue: 'Venue',
            firstDay: 'First day',
            lastDay: 'Last day',
            between: 'Days left till next basho',
            started: 'This basho has already started.'
          },
          de: {
            title: 'Nächstes Sumoturnier',
            name: 'Bezeichnung',
            venue: 'Austragungsort',
            firstDay: 'Erster Turniertag',
            lastDay: 'Letzter Turniertag',
            between: 'Anzahl Tage bis zum nächsten Turnier',
            started: 'Dieses Turnier hat bereits begonnen.'
          },
          hu: {
            title: 'Következő szumótorna',
            name: 'Torna',
            venue: 'Helyszín',
            firstDay: 'Első nap',
            lastDay: 'Utolsó nap',
            between: 'Hátralévő napok a következő tornáig',
            started: 'Ez a szumótorna már elkezdődött.'
          }
        }
      }
    },

    computed: {
        daysLeft: function() {
            return (this.progressMax - this.progressValue);
        },
        bashoDay: function() {
            return `${this.progressValue} / ${this.progressMax}`;
        }
    }
  }
</script>
