<template>
  <div class="sign-up-container">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row class="d-flex justify-end mb-6" style="margin: 30px;">
      <v-btn
        class="ma-2"
        large
        color="primary"
        @click="addNewAddressDialog = true"
      >
        Add
      </v-btn>
    </v-row>

    <v-layout
      column
      align-center
      justify-center
      class="ml-4 mr-4"
      style="margin-top: 100px;"
    >
      <div style=" display: flex;flex-wrap: wrap;width: 1600px;">
        <v-card
          width="740"
          style="margin: auto;margin-bottom: 20px;"
          v-for="address in addresses"
          :key="address.id"
        >
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
                    v-model="address.name"
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
                    v-model="address.street"
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
                    v-model="address.houseNumber"
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
                    v-model="address.region"
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
                    v-model="address.country"
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
                    v-model="address.city"
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
                    v-model="address.phone"
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
                    v-model="address.note"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="d-flex justify-end mb-6">
                <!-- <v-col cols="10" sm="4" md="5"> </v-col> -->
                <!-- <v-col cols="6" sm="4" md="5"> </v-col> -->
                <!-- <v-col  cols="12" sm="4" md="2"> -->
                <v-btn
                  outlined
                  depressed
                  medium
                  color="error"
                  dark
                  @click="deactivateAddress(address)"
                  style="margin-right: 7px;"
                  >Deactivate</v-btn
                >
                <v-btn
                  outlined
                  depressed
                  medium
                  color="success"
                  dark
                  @click="activateAddress(address)"
                  style="margin-right: 7px;"
                  >Activate</v-btn
                >
                <v-btn
                  outlined
                  depressed
                  medium
                  color="#0090D0"
                  dark
                  @click="updateAddresss(address)"
                  style="margin-right: 10px;"
                  >update</v-btn
                >
                <!-- </v-col> -->
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
      </div>
    </v-layout>

    <v-dialog v-model="addNewAddressDialog" scrollable max-width="740px">
      <v-card>
        <v-card-title>New Address</v-card-title>
        <v-divider></v-divider>
        <v-form ref="signUpForm">
          <v-card-text>
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
          </v-card-text>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end mb-6">
          <v-btn
            color="blue darken-1"
            text
            @click="addNewAddressDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            :loading="createLoading"
            color="blue darken-1"
            text
            @click="createAddress"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      createLoading: false,
      addNewAddressDialog: false,
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
      addresses: [],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getCountries();
    this.getAddresses();
  },
  methods: {
    getAddresses() {
      this.loading = true;

      var user_id = this.$store.state.crrentUser.id;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .get(`${this.$store.state.base_url}/organization/address/all`, config)
        .then((response) => {
          this.addresses = response.data;
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
    updateAddresss(address) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {
        name: address.name,
        phone: address.phone,
        street: address.street,
        houseNumber: address.houseNumber,
        region: address.region,
        city: address.city,
        country: address.country,
        note: address.note,
      };
      axios
        .put(
          `${this.$store.state.base_url}/organization/address/${this.$store.state.crrentUser.orgId}/${address.id}`,
          data,
          config
        )
        .then(
          (response) => {
            this.loading = false;
            this.getAddresses();
            this.$message({
              type: "success",
              showClose: true,
              message: "Address updated successfully",
            });
          },
          (error) => {
            this.loading = false;
          }
        );
    },
    createAddress() {
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
      this.createLoading = true;

      axios
        .post(
          `${this.$store.state.base_url}/organization/address`,
          data,
          config
        )
        .then(
          (response) => {
            this.createLoading = false;
            this.addNewAddressDialog = false;
            this.$message({
              type: "success",
              showClose: true,
              message: "Address created successfully",
            });
          },
          (error) => {
            this.createLoading = false;
          }
        );
    },
    activateAddress(address) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .put(
          `${this.$store.state.base_url}/organization/address/activate/${this.$store.state.crrentUser.orgId}/${address.id}`,
          null,
          config
        )
        .then(
          (response) => {
            this.$message({
              type: "success",
              showClose: true,
              message: "Address activated successfully",
            });
            this.loading = false;
            this.getAddresses();
          },
          (error) => {
            this.loading = false;
          }
        );
    },
    deactivateAddress(address) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .put(
          `${this.$store.state.base_url}/organization/address/deactivate/${this.$store.state.crrentUser.orgId}/${address.id}`,
          null,
          config
        )
        .then(
          (response) => {
            this.$message({
              type: "success",
              showClose: true,
              message: "Address Deactivated successfully",
            });
            this.loading = false;
            this.getAddresses();
          },
          (error) => {
            this.loading = false;
          }
        );
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
