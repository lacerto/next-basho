let BashoCard = {
    props: [
        'nextBashoName',
        'venue',
        'firstDay',
        'finalDay',
        'progressMax',
        'progressValue',
        'started',
        'language'
    ],
    data: function() {
      return {
        labels: {
          eo: {
            title: 'Venonta basho',
            name: 'Bashnomo',
            venue: 'Loko',
            firstDay: 'Unua tago',
            lastDay: 'Lasta tago',
            between: 'Restantaj tagoj gxis la venonta basho',
            started: 'Tiu cxi basho jam komencis.'
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
    },
    template: `
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
    `
};

let Languages = {
  props: [],
  data: function() {
    return {
      activeItems: {
        eo: false, 
        de: false,
        en: true, 
        hu: false 
      }
    }
  },
  methods: {
    clicked(lang) {
      if (this.activeItems[lang]) return;
      Vue.set(this.activeItems, lang, true);
      for (const key in this.activeItems) {
        if (key != lang) {
          Vue.set(this.activeItems, key, false);
        }
      }
      this.$emit('change-language', lang);
    }
  },
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    }
  },
  template: `
    <div>
      <b-nav pills align="right">
        <b-nav-item 
          v-for="(value, name) in activeItems"
          :key="name"
          :active="value"
          @click.prevent="clicked(name)"
        >
          {{ name | uppercase }}
        </b-nav-item>
      </b-nav>
    </div>
  `
};

new Vue({
    el: '#next-basho-app',
    data: {
        max: 48,
        value: 22,
        nextBasho: '',
        venue: '',
        start: '',
        end: '',
        prevBashoEnd: '',
        started: false,
        language: 'en'
    },
    components: {
        Languages, BashoCard
    },
    mounted: function() {
        const now = moment().startOf('day');
        //const now = moment('2019-09-23'); // test
    
        console.log(`Current date: ${now.format('YYYY-MM-DD')}`);
    
        let basho;
        try {
            ({ 
                description: this.nextBasho,
                venue: this.venue,
                firstDay: this.start,
                finalDay: this.end,
                prevBashoFinalDay: this.prevBashoEnd,
                started: this.started
            } = getNextBasho(now));
            if (this.started) {
                let firstDay = moment(this.start);
                let finalDay = moment(this.end);
                this.max = finalDay.diff(firstDay, 'days') + 1;
                this.value = now.diff(firstDay, 'days') + 1;        
            } else {
                let firstDay = moment(this.start);
                let prevFinalDay = moment(this.prevBashoEnd);
                this.max = firstDay.diff(prevFinalDay, 'days');
                this.value = now.diff(prevFinalDay, 'days');
            }
        } catch(error) {
            console.log('Could not get next basho information: ', error);
        }
    },
    methods: {
      handleLanguageChange(lang) {
        console.log(lang);
        this.language = lang;
      }
    }
});