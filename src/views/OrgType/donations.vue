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
          <template v-slot:item.actions="{ item }">
            <v-btn
              small
              v-if="item.received"
              depressed
              color="success"
              @click="receivedDonation(item)"
            >
              Recieved
            </v-btn>
          </template>
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
          text: "User Fist Name",
          value: "user.firstName",
        },
        {
          text: "User Last Name",
          value: "user.lastName",
        },
        {
          text: "Donation Type",
          value: "donationType",
          sortable: false,
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
        {
          text: "Action",
          value: "actions",
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
      var org_id = this.$store.state.crrentUser.orgId;
      this.loading = true;
      var user_id = this.$store.state.crrentUser.id;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .get(`http://203237d8713f.ngrok.io/donation/${org_id}/all`, config)
        .then((response) => {
          this.loading = false;
          this.donations = response.data;
        });
    },
    receivedDonation(don) {
      var org_id = this.$store.state.crrentUser.orgId;
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {};
      axios
        .put(
          `http://203237d8713f.ngrok.io/donation/${org_id}/${don.id}/received`,
          data,
          config
        )
        .then((response) => {
          this.loading = false;
          this.getDonations();
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
