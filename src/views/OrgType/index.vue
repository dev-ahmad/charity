x<template>
  <div>
    <div
      class="uk-card uk-card-small uk-position-z-index	"
      uk-sticky="offset: 64"
    >
      <div id="tab-bar">
        <v-tabs v-model="active_tab" slider-color="primary">
          <v-tab ripple>User Info</v-tab>
          <v-tab ripple>Addresses</v-tab>
          <v-tab ripple>Donations</v-tab>
        </v-tabs>
      </div>
      <v-divider></v-divider>
    </div>
    <user-info v-if="active_tab == 0"></user-info>
    <addresses v-if="active_tab == 1"></addresses>
    <donations v-if="active_tab == 2"></donations>
  </div>
</template>
<script>
import UserInfo from "./userInfo.vue";
import Addresses from "./addresses.vue";
import Donations from "./donations.vue";

export default {
  name: "University",
  components: {
    UserInfo,
    Addresses,
    Donations,
  },
  data() {
    return {
      active_tab: 0
    };
  },
  methods: {
    getUniversity() {
      // this.$http
      //   .get(`universities/${this.university_id}`)
      //   .then(response => {
      //     this.university = response.body.university;
      //   })
    },
    goToPath(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style scoped>
.v-divider {
  margin: 0;
}

#tab-bar {
  margin: 0 auto;
  width: 1400px;
  padding: 20px 20px 0 20px;
}
</style>
