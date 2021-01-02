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
          width: 100
        },
        {
          text: "User first name",
          value: "user.firstName",
          width: 140
        },
        {
          text: "User last name",
          value: "user.lastName",
          width: 140
        },
        {
          text: "User email",
          value: "user.email",
        },
        {
          text: "User phone",
          value: "user.phone",
        },
        {
          text: "Organization",
          value: "organization.name",
          width: 140
        },
        {
          text: "Donation Type",
          value: "donationType",
          sortable: false,
          width: 130
        },
        {
          text: "Delivery Type",
          value: "deliveryType",
          sortable: false,
        },
        {
          text: "Payment Amount",
          value: "paymentInfo.amount",
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
        .get(`${this.$store.state.base_url}/donation/all`, config)
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
