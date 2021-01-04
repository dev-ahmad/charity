import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueResource from "./vue-resource";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import { Message, Table, TableColumn, Icon } from "element-ui";

Vue.use(axios);

Vue.use(VueResource);

Vue.use(VueMaterial);
Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(ElementUI);

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    switch (error.response.status) {
      case 200:
        break;

      case 400:
        if (error.response.data.message) {
          Message({
            type: "error",
            showClose: true,
            message: error.response.data.message,
          });
        } else {
          Message({
            type: "error",
            showClose: true,
            message: error.response.data.errors[0],
          });
        }
        break;

      case 401:
        if (error.response.data.message) {
          Message({
            type: "error",
            showClose: true,
            message: error.response.data.message,
          });
        } else {
          Message({
            type: "error",
            showClose: true,
            message: error.response.data.errors[0],
          });
        }
        break;
      case 415:
        if (error.response.data.message) {
          Message({
            type: "error",
            showClose: true,
            message: error.response.data.message,
          });
        } else {
          Message({
            type: "error",
            showClose: true,
            message: error.response.data.errors[0],
          });
        }
        break;
      case 422:
        if (error.response.data.message) {
          Message({
            type: "error",
            showClose: true,
            message: error.response.data.message,
          });
        } else {
          Message({
            type: "error",
            showClose: true,
            message: error.response.data.errors[0],
          });
        }
        break;
      case 403:
        if (error.response.data.message) {
          Message({
            type: "error",
            showClose: true,
            message: error.response.data.message,
          });
        } else {
          Message({
            type: "error",
            showClose: true,
            message: error.response.data.errors[0],
          });
        }
        break;
      case 404:
        if (error.response.data.message) {
          Message({
            type: "error",
            showClose: true,
            message: error.response.data.message,
          });
        } else {
          Message({
            type: "error",
            showClose: true,
            message: error.response.data.errors[0],
          });
        }
        break;
      case 502:
        setTimeout(() => {
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
        }, 1000);
    }
    return Promise.reject(error);
  }
);

Vue.http.interceptors.push(function(request, next) {
  // request.headers.set('token', 'Bearer ');

  next(function(response) {
    switch (response.status) {
      case 200:
        break;

      case 400:
        Message({
          type: "error",
          showClose: true,
          message: response.body.errors[0],
        });
        break;

      case 401:
        Message({
          type: "error",
          showClose: true,
          message: response.body.errors[0],
        });
        break;
      case 422:
        Message({
          type: "error",
          showClose: true,
          message: response.body.errors[0],
        });
        break;
      case 403:
        Message({
          type: "error",
          showClose: true,
          message: response.body.errors[0],
        });
        break;
      case 404:
        Message({
          type: "error",
          showClose: true,
          message: response.body.errors[0],
        });
        break;
      case 502:
        setTimeout(() => {
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
        }, 1000);
    }
  });
});

new Vue({
  vuetify: new Vuetify(),
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
