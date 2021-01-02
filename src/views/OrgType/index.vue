x<template>
  <div>
    <v-menu
      style="z-index: 999;"
      rounded
      offset-y
      origin="center center"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          style="position: absolute; right: 20px; top: 20px; z-index: 99;"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Settings
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div
      class="uk-card uk-card-small uk-position-z-index	"
      uk-sticky="offset: 64"
    >
      <div id="tab-bar">
        <v-tabs v-model="active_tab" slider-color="primary">
          <v-tab ripple>User Info</v-tab>
          <v-tab ripple>Addresses</v-tab>
          <v-tab ripple>Organization Info</v-tab>
          <v-tab ripple>Donations</v-tab>
          <v-tab ripple>Documents</v-tab>
        </v-tabs>
      </div>
      <v-divider></v-divider>
    </div>
    <user-info v-if="active_tab == 0"></user-info>
    <addresses v-if="active_tab == 1"></addresses>
    <organization-info v-if="active_tab == 2"></organization-info>
    <donations v-if="active_tab == 3"></donations>
    <documents v-if="active_tab == 4"></documents>
  </div>
</template>
<script>
import UserInfo from "./userInfo.vue";
import Addresses from "./addresses.vue";
import Donations from "./donations.vue";
import OrganizationInfo from "./OrganizationInfo.vue";
import Documents from "./documents.vue";

export default {
  name: "User",
  components: {
    UserInfo,
    Addresses,
    Donations,
    OrganizationInfo,
    Documents,
  },
  data() {
    return {
      active_tab: 0,
    };
  },
  methods: {
    logout() {
      this.$store.commit("setCurrnentUser", null);
      this.$store.commit("setIsLoggedIn", false);
      this.$router.push({ path: "/" });
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
