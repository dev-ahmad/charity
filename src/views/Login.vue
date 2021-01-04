<template>
  <div class="sign-up-container">
    <v-layout
      column
      align-center
      justify-center
      class="ml-4 mr-4"
      style="margin-top: 100px;"
    >
      <v-card width="400">
        <v-form ref="signUpForm">
          <v-card-text>
            <h1>Log In</h1>
            <legend
              class="v-label mb-2 theme--light"
              style="color:#0090D0;font-size:14px;font-weight:600;"
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
            <legend
              class="v-label mb-2 theme--light"
              style="color:#0090D0;font-size:14px;font-weight:600;"
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
            <v-btn
              block
              depressed
              x-large
              color="#0090D0"
              @click="login"
              dark
              :loading="loading"
              >Log In</v-btn
            >
            <v-btn
              text
              outlined
              medium
              color="#0090D0"
              @click="resetDialog = true"
              dark
              >Reset Password</v-btn
            >
          </v-card-text>
        </v-form>
      </v-card>
    </v-layout>

    <v-dialog v-model="resetDialog" scrollable max-width="440px">
      <v-card>
        <v-card-title>Reset Password</v-card-title>
        <v-card-text>
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            Username
          </legend>
          <v-text-field
            placeholder="username"
            persistent-hint
            v-model="reset.username"
            solo
          ></v-text-field>
          <credit-card></credit-card>
        </v-card-text>
        <v-card-text>
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            Email
          </legend>
          <v-text-field
            placeholder="Email"
            persistent-hint
            v-model="reset.email"
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
            @click="resetPassword"
          >
            Reset
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
      resetLoading: false,
      resetDialog: false,
      reset: {
        username: "",
        email: "",
      },
      username: "",
      password: "",
      showPassword: false,
      loading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    login() {
      var data = {
        username: this.username,
        password: this.password,
      };

      axios
        .post(`${this.$store.state.base_url}/user/login`, data)
        .then((response) => {
          console.warn(response.data.userType);
          this.$store.commit("setCurrnentUser", response.data);
          this.$store.commit("setIsLoggedIn", true);
          if (response.data.userType == "ORG") {
            this.$router.push({ path: "/org" });
          }
          if (response.data.userType == "USER") {
            this.$router.push({ path: "/user" });
          }
          if (response.data.userType == "SUPER_ADMIN") {
            this.$router.push({ path: "/admin" });
          }
        });
    },
    resetPassword() {
      this.resetLoading = true;

      var data = {
        username: this.reset.username,
        email: this.reset.email,
      };
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };

      axios
        .put(`${this.$store.state.base_url}/user/reset_password`, data, config)
        .then((response) => {
          this.messageText = "Please check your email";
          this.showMsg = true;
          this.getUser();
          this.resetLoading = false;
          this.resetDialog = false;
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
