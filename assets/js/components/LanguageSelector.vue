<template>
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
</template>

<script>
  module.exports = {
    props: {
      language: String
    },

    data() {
      return {
        activeItems: {
          eo: false, 
          de: false,
          en: false, 
          hu: false 
        }
      }
    },

    created() {
      if (this.language) {
        Vue.set(this.activeItems, this.language, true);
      } else {
        // Default to Esperanto if no preference cookie found.
        Vue.set(this.activeItems, 'eo', true);
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
    }   
  }
</script>
