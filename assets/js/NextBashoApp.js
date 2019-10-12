let BashoJumbotron = {
    props: [
        'nextBashoName',
        'venue',
        'firstDay',
        'finalDay',
        'previousBashoName',
        'progressMax',
        'progressValue'
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
            <b-row>
              <b-col>{{ previousBashoName }}</b-col>
              <b-col cols="6">
                <b-progress
                  class="progress"
                  :max="progressMax"
                  striped>
                  <b-progress-bar :value="progressValue">
                    {{ progressMax - progressValue }} days left
                  </b-progress-bar>
                </b-progress>
              </b-col>
              <b-col>{{ nextBashoName }}</b-col>
            </b-row>
          </b-container>
        </b-jumbotron>
    `
};

new Vue({
    el: '#next-basho-app',
    data: {
        max: 48,
        value: 20,
        nextBasho: 'Kyushu Basho',
        venue: 'Fukuoka Kokusai Center',
        start: '2019-11-10',
        end: '2019-11-24',
        prevBasho: 'Aki Basho'
    },
    components: {
        BashoJumbotron
    }
});