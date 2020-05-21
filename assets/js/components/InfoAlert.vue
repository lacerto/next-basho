<template>
    <b-alert :show="showAlert" variant="info" v-html="labels[language]"></b-alert>
</template>

<script>
    module.exports = {
        props: {
            language: String
        },

        data() {
            return {
                labels: {
                    eo: 'Nacu Baŝo estis\
                        <a href="http://sumo.or.jp/IrohaKyokaiInformation/detail?id=364" class="alert-link">\
                          nuligita.\
                        </a>',
                    en: 'Natsu Basho has been\
                        <a href="http://sumo.or.jp/IrohaKyokaiInformation/detail?id=364" class="alert-link">\
                          canceled.\
                        </a>',
                    de: 'Natsu Basho wurde\
                        <a href="http://sumo.or.jp/IrohaKyokaiInformation/detail?id=364" class="alert-link">\
                          abgesagt.\
                        </a>',
                    hu: 'Nacu Baso\
                        <a href="http://sumo.or.jp/IrohaKyokaiInformation/detail?id=364" class="alert-link">\
                          elmaradt.\
                        </a>'
                },
                showAlert: true,
                expirationDate: '2020-07-19'
            }
        },
        
        beforeMount() {
            const now = this.$moment().startOf('day');
            // const now = this.$moment('2020-07-19').startOf('day');
            this.showAlert = now.isBefore(this.expirationDate, 'day');
        }
    }
</script>