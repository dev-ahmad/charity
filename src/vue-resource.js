import Vue from 'vue';
import VueResource from 'vue-resource';
import store from './store';

Vue.use(VueResource);

Vue.http.options.root = 'http://203237d8713f.ngrok.io';

export default {
  reloadAuth: () => {
    if(!store.state.has_session) {
      return;
    }
    let session_data = store.state.session_data;
    Vue.http.headers.common["uid"] = session_data["uid"];
    Vue.http.headers.common["client"] = session_data["client"];
    Vue.http.headers.common["access-token"] = session_data["access-token"];
  }
};