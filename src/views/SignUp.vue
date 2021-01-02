<template>
  <div class="sign-up-container">
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
            <h1>Sign Up</h1>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="color:#0090D0;font-size:14px;font-weight:600;"
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
                  style="color:#0090D0;font-size:14px;font-weight:600;"
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
                  style="color:#0090D0;font-size:14px;font-weight:600;"
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
                  style="color:#0090D0;font-size:14px;font-weight:600;"
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
                  style="color:#0090D0;font-size:14px;font-weight:600;"
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
                  persistent-hint
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="color:#0090D0;font-size:14px;font-weight:600;"
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
                  style="color:#0090D0;font-size:14px;font-weight:600;"
                >
                  User Type
                </legend>
                <v-select
                  v-model="userType"
                  :items="userTypes"
                  item-text="name"
                  item-value="name"
                  label="Select"
                  solo
                ></v-select>
              </v-col>
              <v-col cols="8" sm="4" md="4" v-if="userType == 'ORG'">
                <legend
                  class="v-label mb-2 theme--light"
                  style="color:#0090D0;font-size:14px;font-weight:600;"
                >
                  ORG Name
                </legend>
                <v-text-field
                  placeholder="User Name"
                  persistent-hint
                  v-model="orgName"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="userType == 'ORG'">
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="color:#0090D0;font-size:14px;font-weight:600;"
                >
                  ORG Description
                </legend>
                <v-text-field
                  placeholder="Email"
                  persistent-hint
                  v-model="orgDesc"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="color:#0090D0;font-size:14px;font-weight:600;"
                >
                  ORG Logo
                </legend>
                <v-text-field
                  placeholder="URL"
                  persistent-hint
                  v-model="orgLogo"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" sm="4" md="4"> </v-col>
              <v-col cols="8" sm="4" md="4">
                <v-btn
                  block
                  depressed
                  x-large
                  color="#0090D0"
                  @click="emailSignUp"
                  dark
                  :loading="emailSignUpLoading"
                  >Sign Up</v-btn
                >
              </v-col>
              <v-col cols="8" sm="4" md="4"> </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
    </v-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      emailSignUpLoading: false,
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
  },
  methods: {
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
    emailSignUp() {
      var data = {
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        userType: this.userType,
        phone: this.phoneNumber,
        country: this.countryId,
        orgName: this.orgName,
        orgDescription: this.orgDesc,
        orgLogo: this.orgLogo,
      };
      this.$http
        .post(`${this.$store.state.base_url}/user/register`, data)
        .then((response) => {
          this.$store.commit("setCurrnentUser", response.data);
          this.$store.commit("setIsLoggedIn", true);
          if (response.data.userType == "ORG") {
            this.$router.push({ path: "/org" });
          } else {
            this.$router.push({ path: "/user" });
          }
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
