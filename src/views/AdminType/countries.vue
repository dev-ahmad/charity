<template>
  <div class="sign-up-container">
    <v-row class="d-flex justify-end mb-6" style="margin: 30px;">
      <v-btn
        class="ma-2"
        large
        color="primary"
        @click="createCountryDialog = true"
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
      <v-card width="1200">
        <v-data-table
          :headers="headers"
          :items="countries"
          :loading="loading"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn small depressed color="success" @click="activateUser(item)">
              Activate
            </v-btn>
            <v-btn
              style="margin-left: 10px;"
              small
              depressed
              color="error"
              @click="deactivateUser(item)"
            >
              Deactivate
            </v-btn>
            <v-btn
              style="margin-left: 10px;"
              small
              depressed
              color="primary"
              @click="openEditDialog(item)"
            >
              Edit
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-layout>

    <v-dialog v-model="createCountryDialog" scrollable max-width="440px">
      <v-card>
        <v-card-title>Create country</v-card-title>
        <v-card-text>
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            Country name
          </legend>
          <v-text-field
            placeholder="Jordan"
            persistent-hint
            v-model="countryName"
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
            :loading="createCountryLoading"
            @click="createCountry"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" scrollable max-width="440px">
      <v-card>
        <v-card-title>Create country</v-card-title>
        <v-card-text>
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            Country name
          </legend>
          <v-text-field
            placeholder="Jordan"
            persistent-hint
            v-model="selectedCountry.name"
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
            :loading="createCountryLoading"
            @click="updateCountry"
          >
            Update
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
      editDialog: false,
      selectedCountry: {
        name: "",
      },
      createCountryLoading: false,
      loading: false,
      createCountryDialog: false,
      headers: [
        {
          text: "ID",
          value: "id",
          sortable: true,
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Action",
          value: "actions",
          width: 500,
        },
      ],
      countryName: null,
      countries: [],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getCountries();
  },
  methods: {
    getCountries() {
      this.loading = true;
      var user_id = this.$store.state.crrentUser.id;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .get(`${this.$store.state.base_url}/country`, config)
        .then((response) => {
          this.loading = false;
          this.countries = response.data;
        });
    },
    activateUser(contry) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {};
      axios
        .put(
          `${this.$store.state.base_url}/country/activate/${contry.id}`,
          data,
          config
        )
        .then((response) => {
          this.loading = false;
          this.getCountries();
        });
    },
    deactivateUser(contry) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {};
      axios
        .put(
          `${this.$store.state.base_url}/country/deactivate/${contry.id}`,
          data,
          config
        )
        .then((response) => {
          this.loading = false;
          this.getCountries();
        });
    },
    createCountry() {
      this.createCountryLoading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };

      var data = {
        name: this.countryName,
      };
      axios
        .post(`${this.$store.state.base_url}/country/add`, data, config)
        .then((response) => {
          this.createCountryLoading = false;
          this.createCountryDialog = false;
          this.getCountries();
        });
    },
    updateCountry() {
      this.createCountryLoading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };

      var data = {
        name: this.selectedCountry.name,
      };
      axios
        .put(
          `${this.$store.state.base_url}/country/${this.selectedCountry.id}`,
          data,
          config
        )
        .then((response) => {
          this.createCountryLoading = false;
          this.editDialog = false;
          this.getCountries();
        });
    },
    openEditDialog(country) {
      this.selectedCountry = country;
      this.editDialog = true;
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
