let BashoCard = {
    props: [
        'nextBashoName',
        'venue',
        'firstDay',
        'finalDay',
        'progressMax',
        'progressValue',
        'started'
    ],
    computed: {
        daysLeft: function() {
            return (this.progressMax - this.progressValue);
        },
        bashoDay: function() {
            return `${this.progressValue} / ${this.progressMax}`;
        }
    },
    template: `
        <b-card
          title="Next Basho"
          img-src="assets/images/sumo.png"
          img-alt="Sumo image"
          img-left
          border-variant="info"
          class="mt-5 mx-0 px-0"
        >
          <b-container>
            <b-row class="justify-content-md-center">
              <b-col cols="5">Basho name:</b-col>
              <b-col cols="5">{{ nextBashoName }}</b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col cols="5">Venue:</b-col>
              <b-col cols="5">{{ venue }}</b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col cols="5">First day:</b-col>
              <b-col cols="5">{{ firstDay }}</b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col cols="5">Last day:</b-col>
              <b-col cols="5">{{ finalDay }}</b-col>
            </b-row>
            <b-row v-if="started" class="justify-content-md-center">
              <b-col cols="10">This basho has already started.</b-col>
            </b-row>
            <b-row v-else class="justify-content-md-center">
              <b-col cols="10">Days left till next basho:</b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col cols="10">
                <b-progress
                  class="mt-3"
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
        </b-card>    
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
        started: false
    },
    components: {
        BashoCard
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
    }
});