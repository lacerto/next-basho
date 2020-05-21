# Next Basho

Small [Vue.js](https://vuejs.org/) application showing information about the upcoming Grand Sumo Tournament.

## Dependencies

* Vue.js
* Bootstrap
* BootstrapVue
* Moment.js
* [http-vue-loader](https://github.com/FranckFreiburger/http-vue-loader)

This app uses `http-vue-loader` that enables the usage of single-file components without the Node.js environment.

If you put this to a directory on the web-server then be sure to adjust the component URLs accordingly.

```
'basho-card': 'url:[/BASE-DIR]/assets/js/components/BashoCard.vue',
```

## Testing

### Using Python

Just run `http.server` in the application's directory.

```shell
python -m http.server
```
