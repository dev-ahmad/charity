<template>
  <div>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">
            {{ item.text }}
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <p class="organizations-text">Organizations</p>
    <v-row align="center" class="org-container" no-gutters>
      <v-col v-for="org in organizations" :key="org.id">
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>{{ org.name }}</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <!-- <p class="card-text">{{org.description}}</p> -->
            <p class="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              in magna ac tellus fringilla eleifend. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Vivamus in magna ac tellus fringilla
              eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vivamus in magna ac tellus fringilla eleifend.
            </p>
          </v-card-text>

          <v-card-actions>
            <v-btn
              @click="viewOrganization(org)"
              class="donate-btn"
              depressed
              color="primary"
            >
              view
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-btn
        outlined
        color="primary"
        dark
        @click="$router.push({ path: '/organizations' })"
      >
        View All
      </v-btn>
    </div>
    <v-divider style="margin-top: 50px;"></v-divider>
    <v-parallax
      style="margin-top: 50px;"
      dark
      src="http://www.nicdarkthemes.com/themes/charity/wp/demo/charity-foundation/wp-content/uploads/sites/3/2017/04/parallax-19.jpg"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <v-btn
            class="ma-2"
            @click="$router.push({ path: '/login' })"
            outlined
            color="white"
            x-large
          >
            LOG IN
          </v-btn>
          <v-btn
            class="ma-2"
            @click="$router.push({ path: '/signup' })"
            outlined
            depressed
            color="white"
            x-large
          >
            Sign Up
          </v-btn>
        </v-col>
      </v-row>
    </v-parallax>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      organizations: [],
      items: [
        {
          src:
            "http://www.nicdarkthemes.com/themes/charity/wp/demo/charity-foundation/wp-content/uploads/sites/3/2017/04/parallax-1.jpg",
          text: "Help people life and their formation",
        },
        {
          src:
            "http://www.nicdarkthemes.com/themes/charity/wp/demo/wp-content/uploads/2017/05/slide-1.jpg",
          text: "Water for all children",
        },
        {
          src:
            "http://www.nicdarkthemes.com/themes/charity/wp/demo/charity-navigation/wp-content/uploads/sites/7/2017/05/parallax-18.jpg",
          text: "Help people life and their formation",
        },
        {
          src:
            "http://www.nicdarkthemes.com/themes/charity/wp/demo/charity-foundation/wp-content/uploads/sites/3/2017/04/blog-12.jpg",
          text: "Help people life and their formation",
        },
      ],
    };
  },
  mounted() {
    this.getHomePage();
    this.getOrganizations();
  },
  methods: {
    goToLogin() {},
    goToSignup() {},
    getHomePage() {
      this.$http
        .get("http://203237d8713f.ngrok.io/page/HOME_PAGE")
        .then((response) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getOrganizations() {
      this.$http
        .get("http://203237d8713f.ngrok.io/organization/home/all")
        .then((response) => {
          this.organizations = response.body;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    viewOrganization(org) {
      this.$router.push({ path: `/organization/${org.id}` });
    },
  },
};
</script>
<style scoped lang="scss">
.card-text {
  font-size: 15px;
  color: black;
  text-align: left;
}
.donate-btn {
  float: right;
}
.org-container {
  max-width: 90%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 40px;
}
.organizations-text {
  margin-top: 40px;
  color: #1a1a1a;
  font-size: 26px;
  font-weight: 500;
}
</style>
