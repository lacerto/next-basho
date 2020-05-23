# Next Basho

Small [Vue.js](https://vuejs.org/) application showing information about the upcoming Grand Sumo Tournament.

This is a learning project.

## Dependencies

* Vue.js
* Bootstrap
* BootstrapVue
* Moment.js
* [http-vue-loader](https://github.com/FranckFreiburger/http-vue-loader)
* [vue-cookies](https://github.com/cmp-cc/vue-cookies)

This app uses `http-vue-loader` that enables the usage of single-file components without the Node.js environment.

If you put this to a directory on the web-server then be sure to adjust the base path in `config.js`.

## How it works

All data is hard-coded as json in a string (originally it was a [TinyDB](https://tinydb.readthedocs.io/) database).

Based on the current date the app searches for the next basho in the json object by calculating the diffs between the basho starting dates and the current date.

The selected language is saved in a cookie and a message about cookie usage is shown and can be dismissed. The dissmissed state of the cookie message is also stored in a cookie and the message is not shown again until the cookie expires.

Nothing is saved on the server and the app sends nothing to it as there is no backend.

## Testing

### Using Python

Just run `http.server` in the application's directory.

```shell
python -m http.server
```
