<template>
  <div v-if="organization != null" :loading="loading">
    <div
      class="contact-cont"
      style='background-image: url("https://www.globalgiving.org/img/banners/hero_aboutus_lg.jpg");'
    >
      <h1>Donate in Honor or Memory of Someone</h1>
    </div>
    <v-row align="center" class="org-container" no-gutters>
      <v-avatar size="56">
        <img
          alt="user"
          src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
        />
      </v-avatar>
      <h2>{{ organization.name }}</h2>
    </v-row>

    <v-row align="center" class="org-container" no-gutters> </v-row>

    <v-dialog v-model="donateDialog" scrollable max-width="600px">
      <v-card>
        <v-card-title>Donate</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;"> </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="donateDialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="donateDialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      organization: null,
      menu: false,
      clothes: false,
      money: false,
      food: false,
      donateDialog: false,
      loading: false,
    };
  },
  mounted() {
    this.getOrganization();
  },
  methods: {
    filterMenu() {},
    getOrganization() {
      this.loading = true;
      this.$http
        .get(
          `http://203237d8713f.ngrok.io/organization/home/${this.$route.params.id}`
        )
        .then((response) => {
          this.organization = response.body;
          console.warn(this.organization);
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
