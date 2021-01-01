<template>
  <div v-if="organization != null" :loading="loading">
    <div
      class="contact-cont"
      style='background-image: url("https://www.globalgiving.org/img/banners/hero_aboutus_lg.jpg");'
    >
      <h1>Donate in Honor or Memory of Someone</h1>
    </div>

    <v-layout
      column
      align-center
      justify-center
      class="ml-4 mr-4"
      style="margin-top: 100px;"
    >
      <v-card elevation="2" outlined shaped width="800">
        <v-card-title>{{ organization.name }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <legend
                class="v-label mb-2 theme--light"
                style="font-size:14px;font-weight:600;"
              >
                Description
              </legend>
              <p class="text-sm-left body-2 text--primary">
                {{ organization.description }}
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <legend
                class="v-label mb-2 theme--light"
                style="font-size:14px;font-weight:600;"
              >
                Phone
              </legend>
              <p class="text-sm-left body-2 text--primary">
                {{ organization.phone }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <legend
                class="v-label mb-2 theme--light"
                style="font-size:14px;font-weight:600;"
              >
                Email
              </legend>
              <p class="text-sm-left body-2 text--primary">
                {{ organization.email }}
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <legend
                class="v-label mb-2 theme--light"
                style="font-size:14px;font-weight:600;"
              >
                Website
              </legend>
              <p class="text-sm-left body-2 text--primary">
                {{ organization.website }}
              </p>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text>
          <v-btn
            class="ma-2"
            small
            color="primary"
            dark
            v-if="organization.acceptClothes"
          >
            Accept Clothes
            <v-icon dark right>
              mdi-checkbox-marked-circle
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            small
            color="orange"
            dark
            v-if="organization.acceptFood"
          >
            Accept Food
            <v-icon dark right>
              mdi-checkbox-marked-circle
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            small
            color="purple"
            dark
            v-if="organization.acceptMoney"
          >
            Accept Money
            <v-icon dark right>
              mdi-checkbox-marked-circle
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            class="align-end"
            color="blue darken-1"
            text
            @click="donateDialog = true"
          >
            Donate
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
    <v-row align="center" class="org-container" no-gutters> </v-row>
    <v-dialog v-model="donateDialog" scrollable max-width="600px">
      <v-card>
        <v-card-title>Donate</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="margin: 30px;">
          <v-btn
            class="ma-2"
            @click="selectedDonate = 'clothes'"
            small
            color="primary"
            dark
            v-if="organization.acceptClothes"
          >
            Clothes
            <v-icon dark right>
              mdi-shopping
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            @click="selectedDonate = 'food'"
            small
            color="orange"
            dark
            v-if="organization.acceptFood"
          >
            Food
            <v-icon dark right>
              mdi-food
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            @click="selectedDonate = 'money'"
            small
            color="purple"
            dark
            v-if="organization.acceptMoney"
          >
            Money
            <v-icon dark right>
              mdi-wallet
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text v-if="selectedDonate == 'money'">
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            Amount
          </legend>
          <v-text-field
            placeholder="10 JD"
            persistent-hint
            v-model="amount"
            solo
          ></v-text-field>
          <credit-card></credit-card>
        </v-card-text>

        <v-card-text v-if="selectedDonate == 'food' || selectedDonate == 'clothes'">
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            Delivery Type
          </legend>
          <v-btn
            class="ma-2"
            @click="deliveryType = 'offeringDropOffLocation'"
            small
            color="green"
            dark
            v-if="organization.offeringDropOffLocation"
          >
            Delivery
            <v-icon dark right>
              mdi-truck-delivery
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            @click="deliveryType = 'offeringPickup'"
            small
            color="red"
            dark
            v-if="organization.offeringPickup"
          >
            Pick Up
            <v-icon dark right>
              mdi-truck-fast
            </v-icon>
          </v-btn>
        </v-card-text>

        <!-- <v-card-text style="height: 300px;"> </v-card-text> -->
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
import CreditCard from "@/components/creditcard.vue";

export default {
  components: {
    CreditCard,
  },
  data() {
    return {
      deliveryType: "",
      amount: null,
      organization: null,
      menu: false,
      clothes: false,
      money: false,
      food: false,
      donateDialog: false,
      loading: false,
      selectedDonate: "",
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
  z-index: 99;
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
