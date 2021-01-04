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
            <h1>User Data</h1>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  First Name
                </legend>
                <v-text-field
                  placeholder="First Name"
                  persistent-hint
                  v-model="firstName"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Last Name
                </legend>
                <v-text-field
                  placeholder="Last Name"
                  persistent-hint
                  v-model="lastName"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Phone Number
                </legend>
                <v-text-field
                  placeholder="+962xxxxxxxxx"
                  persistent-hint
                  v-model="phoneNumber"
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
                  User Name
                </legend>
                <v-text-field
                  placeholder="User Name"
                  persistent-hint
                  v-model="username"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Email
                </legend>
                <v-text-field
                  placeholder="Email"
                  persistent-hint
                  v-model="email"
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
            </v-row>
            <v-row>
              <v-col cols="10" sm="4" md="5"> </v-col>
              <v-col cols="10" sm="4" md="2"> </v-col>
              <v-col cols="4" sm="4" md="3">
                <v-btn
                  text
                  outlined
                  medium
                  color="#0090D0"
                  @click="changePasswordDialog = true"
                  dark
                  >Change Password</v-btn
                >
              </v-col>

              <v-col cols="4" sm="4" md="2">
                <v-btn
                  outlined
                  depressed
                  large
                  color="#0090D0"
                  @click="updateUser"
                  dark
                  :loading="updateLoading"
                  >update</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
    </v-layout>

    <v-dialog v-model="changePasswordDialog" scrollable max-width="440px">
      <v-card>
        <v-card-title>Change Password</v-card-title>
        <v-card-text>
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            Old password
          </legend>
          <v-text-field
            placeholder="Old password"
            type="password"
            persistent-hint
            v-model="change.oldPassword"
            solo
          ></v-text-field>
          <credit-card></credit-card>
        </v-card-text>
        <v-card-text>
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            New password
          </legend>
          <v-text-field
            placeholder="New password"
            type="password"
            persistent-hint
            v-model="change.newPassword"
            solo
          ></v-text-field>
          <credit-card></credit-card>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="createCountryDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :loading="resetLoading"
            @click="changePassword"
          >
            Change
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
      changePasswordDialog: false,
      changePasswordLoading: false,
      change: {
        oldPassword: "",
        newPassword: "",
      },
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
      updateLoading: false,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      username: "",
      countries: [],
      countryId: null,
      userType: null,
      orgName: null,
      orgDesc: null,
      orgLogo: null,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getCountries();
    this.getUser();
  },
  methods: {
    getUser() {
      this.loading = true;

      var user_id = this.$store.state.crrentUser.id;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };

      axios
        .get(`${this.$store.state.base_url}/user/${user_id}`, config)
        .then((response) => {
          this.email = response.data.email;
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
          this.countryId = response.data.country;
          this.phoneNumber = response.data.phone;
          this.username = response.data.username;
          this.loading = false;
        });
    },
    getCountries() {
      this.$http
        .get(`${this.$store.state.base_url}/country/all`)
        .then((response) => {
          this.countries = response.body;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateUser() {
      this.updateLoading = true;
      var user_id = this.$store.state.crrentUser.id;
      var data = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        country: this.countryId,
        phone: this.phoneNumber,
        username: this.username,
      };
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };

      axios
        .put(`${this.$store.state.base_url}/user/${user_id}`, data, config)
        .then(
          (response) => {
            this.getUser();
            this.$message({
              type: "success",
              showClose: true,
              message: "User updated successfully",
            });
            this.updateLoading = false;
          },
          (error) => {
            this.updateLoading = false;
          }
        );
    },
    changePassword() {
      this.changePasswordLoading = true;

      var user_id = this.$store.state.crrentUser.id;

      var data = {
        oldPassword: this.change.oldPassword,
        newPassword: this.change.newPassword,
      };
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };

      axios
        .put(
          `${this.$store.state.base_url}/user/change_password/${user_id}`,
          data,
          config
        )
        .then(
          (response) => {
            this.$message({
              type: "success",
              showClose: true,
              message: "Password changes successfully",
            });
            this.getUser();
            this.changePasswordLoading = false;
            this.changePasswordDialog = false;
          },
          (error) => {
            this.changePasswordLoading = false;
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
