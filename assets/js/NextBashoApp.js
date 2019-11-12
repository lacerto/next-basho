Vue.use(httpVueLoader);

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
        'basho-card': 'url:/assets/js/components/BashoCard.vue',
        'language-selector': 'url:/assets/js/components/LanguageSelector.vue'
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