<template>
    <b-alert 
        show
        dismissible
        variant="light"
    >
      <!-- Dismissible property + v-html issue: -->
      <!-- https://github.com/bootstrap-vue/bootstrap-vue/issues/489 -->
      <div v-html="text[language]"></div>
    </b-alert>    
</template>

<script>
    module.exports = {
        props: {
            language: String
        },

        data() {
            return {
                text: {
                    eo: 'Ĉi tiu aplikaĵo konservas vian ligvoagordon en retumila kuketo.<br>\
                         La apo ne konservas aliajn datenojn kaj ĝi ne sendas ĉiajn ajn datenojn al la servilo.',
                    de: 'Diese Applikation speichert Ihre Spracheinstellungen in einem Browser Cookie.<br>\
                         Es werden keine anderen Daten gespeichert oder an den Server geschickt.',
                    en: 'This application stores your language preferences in a browser cookie.<br>\
                         It does not store any other data nor does it send any data whatsoever to the server.',
                    hu: 'Ez az alkalmazás egy böngésző sütiben tárolja az Ön nyelvi beállításait.<br>\
                         Az alkalmazás semmilyen más adatot nem tárol és nem is küld a szerver felé.'
                }
            }
        }
    }
</script>