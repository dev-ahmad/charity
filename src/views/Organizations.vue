<template>
  <div v-loading="loading">
    <div
      class="contact-cont"
      style='background-image: url("https://www.globalgiving.org/img/banners/hero_aboutus_lg.jpg");'
    >
      <h1>Organizations</h1>
    </div>
    <v-row align="center" class="org-container" no-gutters>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="indigo" dark v-bind="attrs" v-on="on">
            Filters
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-text-field v-model="name" label="Name" required></v-text-field>
            </v-list-item>
          </v-list>

          <v-list>
            <v-list-item>
              <v-switch v-model="clothes">
                <template v-slot:label>
                  Clothes
                </template>
              </v-switch>
            </v-list-item>
            <v-list-item>
              <v-switch v-model="money">
                <template v-slot:label>
                  Money
                </template>
              </v-switch>
            </v-list-item>
            <v-list-item>
              <v-switch v-model="food">
                <template v-slot:label>
                  Food
                </template>
              </v-switch>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="menu = false">
              Cancel
            </v-btn>
            <v-btn color="primary" text @click="filterMenu">
              Apply
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-row>

    <v-row align="center" class="org-container" no-gutters>
      <template v-for="org in organizations">
        <v-col :key="org.id" style="margin: 20px;">
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>{{ org.name }}</v-card-title>
            </v-img>

            <v-card-text class="text--primary">
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                in magna ac tellus fringilla eleifend. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Vivamus in magna ac tellus
                fringilla eleifend. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Vivamus in magna ac tellus fringilla eleifend.
              </p>
            </v-card-text>

            <v-card-actions>
              <v-btn
                class="donate-btn"
                @click="$router.push({ path: `/organization/${org.id}` })"
                depressed
                color="primary"
              >
                View
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      organizations: [],
      menu: false,
      name: "",
      clothes: false,
      money: false,
      food: false,
      loading: false,
    };
  },
  mounted() {
    this.getOrganizations();
  },
  methods: {
    filterMenu() {
      this.loading = true;
      var data = {
        name: this.name,
        clothes: this.clothes,
        money: this.money,
        food: this.food,
      };
      axios
        .get(`${this.$store.state.base_url}/organization/home/all`, data)
        .then((response) => {
          this.organizations = response.data;
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getOrganizations() {
      this.loading = true;
      this.$http
        .get(`${this.$store.state.base_url}/organization/home/all`)
        .then((response) => {
          this.organizations = response.body;
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped lang="scss">
.contact-cont {
  height: 25em;
  position: relative;
  background: no-repeat 50% 50%;
  background-size: cover;
  overflow: hidden;
  text-align: center;
  justify-content: center;
}
.contact-cont::before {
  content: " ";
  position: absolute;
  background: #293541;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
h1 {
  color: white;
  z-index: 99999;
  height: 30px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.org-container {
  max-width: 90%;
  margin: auto;
  margin-top: 70px;
  margin-bottom: 40px;
}
</style>
