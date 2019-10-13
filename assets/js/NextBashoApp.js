let BashoJumbotron = {
    props: [
        'nextBashoName',
        'venue',
        'firstDay',
        'finalDay',
        'progressMax',
        'progressValue',
        'started'
    ],
    template: `
        <b-jumbotron header="Next Basho" header-level="5" bg-variant="info" text-variant="white">
          <b-container>
            <b-row class="justify-content-md-center">
              <b-col cols="3">Basho name:</b-col>
              <b-col cols="3">{{ nextBashoName }}</b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col cols="3">Venue:</b-col>
              <b-col cols="3">{{ venue }}</b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col cols="3">First day:</b-col>
              <b-col cols="3">{{ firstDay }}</b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col cols="3">Last day:</b-col>
              <b-col cols="3">{{ finalDay }}</b-col>
            </b-row>
            <b-row v-if="started" class="justify-content-md-center">
              <b-col cols="6">This basho has already started.</b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col cols="6">
                <b-progress
                  class="progress"
                  :max="progressMax"
                  striped
                  height="2rem">
                  <b-progress-bar :value="progressValue">
                    <span v-if="started">
                      <strong>{{ progressValue }} / {{ progressMax }}</strong>
                    </span>
                    <span v-else>
                      <strong>{{ progressMax - progressValue }} days till next basho</strong>
                    </span>
                  </b-progress-bar>
                </b-progress>
              </b-col>
            </b-row>
          </b-container>
        </b-jumbotron>
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
        started: false
    },
    components: {
        BashoJumbotron
    },
    mounted: function() {
        //const now = moment();
        const now = moment('2019-11-20'); // test
    
        console.log(`Current date: ${now.format('YYYY-MM-DD')}`);
    
        let basho;
        try {
            ({ 
                description: this.nextBasho,
                venue: this.venue,
                firstDay: this.start,
                finalDay: this.end,
                started: this.started
            } = getNextBasho(now));
            if (this.started) {
                let firstDay = moment(this.start);
                let finalDay = moment(this.end);
                this.max = finalDay.diff(firstDay, 'days') + 1;
                this.value = now.diff(firstDay, 'days') + 1;        
            }
        } catch(error) {
            console.log('Could not get next basho information: ', error);
        }
    }
});