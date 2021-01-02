<template>
  <div class="sign-up-container">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-layout
      column
      align-center
      justify-center
      class="ml-4 mr-4"
      style="margin-top: 100px;"
    >
      <v-card width="800">
        <v-form ref="signUpForm">
          <v-card-text>
            <h1>Address</h1>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Name
                </legend>
                <v-text-field
                  placeholder="Name"
                  persistent-hint
                  v-model="name"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Street
                </legend>
                <v-text-field
                  placeholder="Street"
                  persistent-hint
                  v-model="street"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  House Number
                </legend>
                <v-text-field
                  placeholder="House Number"
                  persistent-hint
                  v-model="houseNumber"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Region
                </legend>
                <v-text-field
                  placeholder="Region"
                  persistent-hint
                  v-model="region"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Country
                </legend>
                <v-select
                  v-model="countryId"
                  :items="countries"
                  item-text="name"
                  item-value="id"
                  label="Select"
                  solo
                ></v-select>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  City
                </legend>
                <v-text-field
                  placeholder="City"
                  persistent-hint
                  v-model="city"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Phone
                </legend>
                <v-text-field
                  placeholder="Phone"
                  persistent-hint
                  v-model="phone"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Note
                </legend>
                <v-text-field
                  placeholder="Note"
                  persistent-hint
                  v-model="note"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="10" sm="4" md="5"> </v-col>
              <v-col cols="10" sm="4" md="5"> </v-col>
              <v-col cols="8" sm="4" md="2">
                <v-btn
                  outlined
                  depressed
                  large
                  color="#0090D0"
                  dark
                  @click="updateAddresss"
                  :loading="updateLoading"
                  >update</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      updateLoading: false,
      userTypes: [
        {
          name: "USER",
        },
        {
          name: "ORG",
        },
      ],
      email: "",
      password: "",
      showPassword: false,
      loading: false,
      name: "",
      street: "",
      houseNumber: "",
      region: "",
      countries: [],
      countryId: null,
      userType: null,
      phone: null,
      note: null,
      orgLogo: null,
      city: null,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getCountries();
    this.getAddress();
  },
  methods: {
    getAddress() {
      this.loading = true;

      var user_id = this.$store.state.crrentUser.id;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .get(`${this.$store.state.base_url}/user/address`, config)
        .then((response) => {
          this.name = response.data.name;
          this.phone = response.data.name;
          this.street = response.data.street;
          this.houseNumber = response.data.houseNumber;
          this.region = response.data.region;
          this.city = response.data.city;
          this.countryId = response.data.country;
          this.note = response.data.note;
          this.loading = false;
        });
    },
    getCountries() {
      this.$http
        .get(`${this.$store.state.base_url}/country/all`)
        .then((response) => {
          this.countries = response.body;
        })
        .finally(() => {});
    },
    updateAddresss() {
      this.updateLoading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {
        name: this.name,
        phone: this.phone,
        street: this.street,
        houseNumber: this.houseNumber,
        region: this.region,
        city: this.city,
        country: this.countryId,
        note: this.note,
      };
      this.$http
        .post("${this.$store.state.base_url}/user/address", data, config)
        .then((response) => {
          this.updateLoading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.sign-up-container {
  height: 50%;
}
h1 {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 40px;
  color: #0090d0;
}
</style>
