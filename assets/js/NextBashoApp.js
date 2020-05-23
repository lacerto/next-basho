import getNextBasho from './next_basho.js';
import config from './config.js';

Object.defineProperty(Vue.prototype, '$moment', { value: moment });

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
        language: 'eo',
        showCookieAlert: false
    },

    components: {
        'basho-card': `url:${config.basePath}/assets/js/components/BashoCard.vue`,
        'language-selector': `url:${config.basePath}/assets/js/components/LanguageSelector.vue`,
        'info-alert': `url:${config.basePath}/assets/js/components/InfoAlert.vue`,
        'cookie-alert': `url:${config.basePath}/assets/js/components/CookieAlert.vue`
    },

    created: function() {
        let lang = this.$cookies.get('next-basho-lang');
        if (lang) {
            console.log(`Got language setting from cookie: ${lang}`);
            this.language = lang;
        } else {
            console.log('No language preference cookie found.');
            console.log(`Using default language: ${this.language}`);
        }

        this.showCookieAlert = !this.$cookies.get('next-basho-cookie-alert');
    },

    mounted: function() {
        const now = this.$moment().startOf('day');
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
                let firstDay = this.$moment(this.start);
                let finalDay = this.$moment(this.end);
                this.max = finalDay.diff(firstDay, 'days') + 1;
                this.value = now.diff(firstDay, 'days') + 1;        
            } else {
                let firstDay = this.$moment(this.start);
                let prevFinalDay = this.$moment(this.prevBashoEnd);
                this.max = firstDay.diff(prevFinalDay, 'days');
                this.value = now.diff(prevFinalDay, 'days');
            }
        } catch(error) {
            console.log('Could not get next basho information: ', error);
        }
    },

    methods: {
        handleLanguageChange(lang) {
            this.language = lang;
            console.log(`Language changed to: ${lang}`);
            this.$cookies.set('next-basho-lang', lang, '30d', config.basePath, '', '', 'strict');
            console.log('Language changed: preference cookie has been set.')            
        },

        handleCookieAlertDismissed() {
            this.$cookies.set('next-basho-cookie-alert', true, '30d', config.basePath, '', '', 'strict');
            console.log('CookieAlert dismissed: preference cookie has been set.');
        }
    }
});