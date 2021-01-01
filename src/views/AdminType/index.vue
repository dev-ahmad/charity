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
          <v-tab ripple>Users</v-tab>
          <v-tab ripple>Donations</v-tab>
          <v-tab ripple>Organizations</v-tab>
          <v-tab ripple>Countries</v-tab>
          <v-tab ripple>Pages</v-tab>
        </v-tabs>
      </div>
      <v-divider></v-divider>
    </div>
    <user-info v-if="active_tab == 0"></user-info>
    <users v-if="active_tab == 1"></users>
    <donations v-if="active_tab == 2"></donations>
    <organizations v-if="active_tab == 3"></organizations>
    <countries v-if="active_tab == 4"></countries>
    <pages v-if="active_tab == 5"></pages>
  </div>
</template>
<script>
import UserInfo from "./userInfo.vue";
import Donations from "./donations.vue";
import Users from "./users.vue";
import Organizations from "./organizations.vue";
import Countries from "./countries.vue";
import Pages from "./pages.vue";

export default {
  name: "University",
  components: {
    UserInfo,
    Donations,
    Users,
    Organizations,
    Countries,
    Pages
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
