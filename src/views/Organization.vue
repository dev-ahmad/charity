<template>
  <div v-if="organization != null" v-loading="loading">
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
            @click="checkIfLoggedIn"
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
          <credit-card></credit-card>
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
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            Notes
          </legend>
          <v-textarea
            placeholder="Notes"
            persistent-hint
            v-model="notes"
            solo
          ></v-textarea>
        </v-card-text>

        <v-card-text
          v-if="selectedDonate == 'food' || selectedDonate == 'clothes'"
        >
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            Delivery Type
          </legend>
          <v-btn
            class="ma-2"
            @click="deliveryType = 'drop_off_location'"
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
            @click="deliveryType = 'pickup'"
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

          <v-card-text v-if="deliveryType == 'pickup'">
            <legend
              class="v-label mb-2 theme--light"
              style="font-size:14px;font-weight:600;"
            >
              Day and Time
            </legend>

            <v-select
              :items="organization.pickupSlots"
              item-text="value"
              item-value="id"
              v-model="selectedPickupSlot"
              label="Select"
              solo
            >
              <template slot="selection" slot-scope="data">
                {{ days.find((d) => d.id === data.item.day).name }} ... from:
                {{ data.item.fromHour }} to : {{ data.item.toHour }}
              </template>
              <template slot="item" slot-scope="data">
                {{ days.find((d) => d.id === data.item.day).name }} ... from:
                {{ data.item.toHour }} to : {{ data.item.toHour }}
              </template>
            </v-select>
          </v-card-text>

          <v-card-text v-if="deliveryType == 'drop_off_location'">
            <legend
              class="v-label mb-2 theme--light"
              style="font-size:14px;font-weight:600;"
            >
              Day and Time and Address
            </legend>

            <v-select
              :items="organization.dropOffLocationSlots"
              item-text="value"
              item-value="id"
              v-model="selectedDropOff"
              label="Select"
              solo
            >
              <template slot="selection" slot-scope="data">
                {{ days.find((d) => d.id === data.item.day).name }} ... from:
                {{ data.item.fromHour }} to : {{ data.item.toHour }} ... address
                =
                {{ data.item.address.name }}
              </template>
              <template slot="item" slot-scope="data">
                {{ days.find((d) => d.id === data.item.day).name }} ... from:
                {{ data.item.toHour }} to : {{ data.item.toHour }} ... address =
                {{ data.item.address.name }}
              </template>
            </v-select>
          </v-card-text>
          <v-card-text>
            <legend
              class="v-label mb-2 theme--light"
              style="font-size:14px;font-weight:600;"
            >
              Notes
            </legend>
            <v-textarea
              placeholder="Notes"
              persistent-hint
              v-model="notes"
              solo
            ></v-textarea>
          </v-card-text>
        </v-card-text>

        <!-- <v-card-text style="height: 300px;"> </v-card-text> -->
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="donateDialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="donateUser">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="loginDialog" scrollable max-width="600px">
      <v-card>
        <v-card-title>Login</v-card-title>

        <v-card-text>
          <h1>Log In</h1>
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            User Name
          </legend>
          <v-text-field
            v-model="username"
            label="User Name"
            prepend-inner-icon="person"
            persistent-hint
            solo
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            Password
          </legend>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-inner-icon="lock"
            persistent-hint
            solo
          ></v-text-field>
        </v-card-text>
        <v-card-actionst>
          <v-btn
            block
            depressed
            x-large
            color="#0090D0"
            @click="login"
            dark
            :loading="loginLoading"
            >Log In</v-btn
          >
        </v-card-actionst>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CreditCard from "@/components/creditcard.vue";
import axios from "axios";

export default {
  components: {
    CreditCard,
  },
  data() {
    return {
      selectedPickupSlot: null,
      selectedDropOff: null,
      username: null,
      password: null,
      deliveryType: "",
      amount: null,
      organization: null,
      menu: false,
      clothes: false,
      money: false,
      food: false,
      donateDialog: false,
      loginDialog: false,
      loginLoading: false,
      loading: false,
      selectedDonate: "",
      showPassword: false,
      days: [
        {
          id: 1,
          name: "Sunday",
        },
        {
          id: 2,
          name: "Monday",
        },
        {
          id: 3,
          name: "Tuesday",
        },
        {
          id: 4,
          name: "Wednesday",
        },
        {
          id: 5,
          name: "Thursday",
        },
        {
          id: 6,
          name: "Friday",
        },
        {
          id: 7,
          name: "Saturday",
        },
      ],
      notes: null,
    };
  },
  mounted() {
    this.getOrganization();
  },
  methods: {
    getItem() {
      return "Test";
    },
    filterMenu() {},
    getOrganization() {
      this.loading = true;
      this.$http
        .get(
          `${this.$store.state.base_url}/organization/home/${this.$route.params.id}`
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
    checkIfLoggedIn() {
      if (!this.$store.state.crrentUserDonate) {
        this.loginDialog = true;
      } else {
        this.donateDialog = true;
      }
    },
    login() {
      this.loginLoading = true;

      var data = {
        username: this.username,
        password: this.password,
      };

      axios.post(`${this.$store.state.base_url}/user/login`, data).then(
        (response) => {
          this.$store.commit("crrentUserDonate", response.data);
          this.loginLoading = false;
          this.loginDialog = false;
          this.donateDialog = true;
        },
        (error) => {
          this.loginLoading = false;
        }
      );
    },
    donateUser() {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUserDonate.token,
        },
      };

      var data = {
        userId: this.$store.state.crrentUserDonate.id,
        orgId: this.$route.params.id,
        donationType: this.selectedDonate,
        note: this.notes,
        deliveryType: this.deliveryType,
        pickupSlotId: this.selectedPickupSlot,
        dropOffLocationSlotId: this.selectedDropOff,
        amount: this.amount,
      };
      axios
        .post(`${this.$store.state.base_url}/donation/add`, data, config)
        .then(
          (response) => {
            this.loading = false;
            this.donateDialog = false;
            this.$message({
              type: "success",
              showClose: true,
              message: "Donate sent successfully",
            });
          },
          (error) => {
            this.loading = false;
          }
        );
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
