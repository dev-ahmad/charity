<template>
  <div class="sign-up-container">
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
          :items="donations"
          :loading="loading"
          hide-default-footer
          class="elevation-1"
        >
          <!-- <template v-slot:item.actions="{ item }">
            <button
              class="uk-button uk-button-default uk-button-small"
              @click="setEditCity(item)"
            >
              Edit
            </button>
            <button
              class="uk-button uk-button-secondary uk-button-small uk-margin-small-left"
              @click="goToPath(`cities/${item.id}/universities`)"
            >
              Show
            </button>
          </template> -->
        </v-data-table>
      </v-card>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
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
          text: "Email",
          value: "email",
        },
        {
          text: "Phone",
          value: "phone",
        },
        {
          text: "Website",
          value: "website",
          sortable: false,
        },
        {
          text: "Payment Amount",
          value: "orgAdminInfo.amount",
          sortable: false,
        },
        {
          text: "Street Address",
          value: "pickupAddress.street",
          sortable: false,
        },
        {
          text: "House Number",
          value: "pickupAddress.houseNumber",
          sortable: false,
        },
        {
          text: "Note",
          value: "note",
          sortable: false,
        },
      ],
      donations: [],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getDonations();
  },
  methods: {
    getDonations() {
      this.loading = true;
      var user_id = this.$store.state.crrentUser.id;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .get(`http://203237d8713f.ngrok.io/organization/all`, config)
        .then((response) => {
          this.loading = false;
          this.donations = response.data;
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
