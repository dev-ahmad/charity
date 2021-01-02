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
          :items="users"
          :loading="loading"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn
              small
              v-if="!item.status"
              depressed
              color="success"
              @click="activateUser(item)"
            >
              Activate
            </v-btn>
            <v-btn
              small
              v-if="item.status"
              depressed
              color="error"
              @click="deactivateUser(item)"
            >
              Deactivate
            </v-btn>
            <v-btn style="margin-left: 10px;" small depressed color="primary" @click="getAddresses(item)">
              Show Address
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-layout>

    <v-dialog v-model="addressesDialog" scrollable max-width="740px">
      <v-card>
        <v-data-table
          :headers="addressHeaders"
          :items="adresses"
          :loading="addressLoading"
          hide-default-footer
          class="elevation-1"
        >
        </v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      addressLoading: false,
      loading: false,
      headers: [
        {
          text: "ID",
          value: "id",
          sortable: true,
        },
        {
          text: "User first name",
          value: "firstName",
        },
        {
          text: "User last name",
          value: "lastName",
        },
        {
          text: "Email",
          value: "email",
          sortable: false,
        },
        {
          text: "Phone",
          value: "phone",
          sortable: false,
        },
        {
          text: "User Name",
          value: "username",
          sortable: false,
        },
        {
          text: "Action",
          value: "actions",
        },
      ],
      addressHeaders: [
        {
          text: "ID",
          value: "id",
          sortable: true,
        },
        {
          text: "Name",
          value: "name",
          sortable: false,
        },
        {
          text: "City",
          value: "city",
        },
        {
          text: "House number",
          value: "houseNumber",
        },

        {
          text: "Phone",
          value: "phone",
          sortable: false,
        },
        {
          text: "Region",
          value: "region",
          sortable: false,
        },
        {
          text: "Street",
          value: "street",
        },
      ],
      users: [],
      adresses: [],
      addressesDialog: false,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .get(`http://203237d8713f.ngrok.io/user/all`, config)
        .then((response) => {
          this.loading = false;
          this.users = response.data;
        });
    },
    getAddresses(user) {
      this.adresses = [];
      this.addressesDialog = true;
      this.addressLoading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .get(`http://203237d8713f.ngrok.io/user/address/${user.id}`, config)
        .then((response) => {
          this.addressLoading = false;
          this.adresses.push(response.data);
        });
    },
    activateUser(user) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {};
      axios
        .put(
          `http://203237d8713f.ngrok.io/user/activate/${user.id}`,
          data,
          config
        )
        .then((response) => {
          this.loading = false;
          this.getUsers();
        });
    },
    deactivateUser(user) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {};
      axios
        .put(
          `http://203237d8713f.ngrok.io/user/deactivate/${user.id}`,
          data,
          config
        )
        .then((response) => {
          this.loading = false;
          this.getUsers();
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
