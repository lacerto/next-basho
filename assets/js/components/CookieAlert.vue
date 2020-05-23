<template>
    <b-alert 
        :show="showAlert"
        dismissible
        variant="light"
        @dismissed="handleDismissed"
    >
      <!-- Dismissible property + v-html issue: -->
      <!-- https://github.com/bootstrap-vue/bootstrap-vue/issues/489 -->
      <div v-html="text[language]"></div>
    </b-alert>    
</template>

<script>
    module.exports = {
        props: {
            language: String,
            showAlert: Boolean
        },

        data() {
            return {
                text: {
                    eo: 'Tiu ĉi aplikaĵo konservas vian ligvoagordon kaj la staton de tiu ĉi mesaĝo (videbla aŭ fermita) en retumilaj kuketoj.<br>\
                         Ĝi ne konservas aliajn datenojn kaj ne sendas ĉiajn ajn datenojn al la servilo.<br>\
                         Vi povas fermi tiun ĉi mesaĝon per X.',
                    de: 'Diese Applikation speichert Ihre Spracheinstellungen und den Status dieser Nachricht (sichtbar oder geschlossen) in Browser Cookies.<br>\
                         Es werden keine anderen Daten gespeichert oder an den Server geschickt.<br>\
                         Diese Nachricht kann mittels X geschlossen werden.',
                    en: 'This application stores your language preferences and the state of this message (visible or closed) in browser cookies.<br>\
                         It does not store any other data nor does it send any data whatsoever to the server.<br>\
                         You can close this message with the X.',
                    hu: 'Ez az alkalmazás böngésző sütikben tárolja az Ön nyelvi beállításait és ezen üzenet állapotát (látható illetve rejtett).<br>\
                         Az alkalmazás semmilyen más adatot nem tárol és nem is küld a szerver felé.<br>\
                         Az X-szel bezárhatja ezt az üzenetet.'
                }
            }
        },

        methods: {
            handleDismissed() {
                console.log('CookieAlert has been dismissed.');
                this.$emit('cookie-alert-dismissed');
            }
        }
    }
</script>