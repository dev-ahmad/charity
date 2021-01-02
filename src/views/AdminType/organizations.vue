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
              v-if="!item.verified"
              depressed
              color="success"
              @click="verifyOrg(item)"
            >
              Verify
            </v-btn>
            <v-btn
              style="margin-left: 10px;"
              small
              v-if="item.verified"
              depressed
              color="error"
              @click="unverifyOrg(item)"
            >
              Unverify
            </v-btn>
            <v-btn
              style="margin-left: 10px;"
              small
              v-if="!item.status"
              depressed
              color="success"
              @click="activateOrg(item)"
            >
              Active
            </v-btn>
            <v-btn
              style="margin-left: 10px;"
              small
              v-if="item.status"
              depressed
              color="error"
              @click="deactivateOrg(item)"
            >
              Deactivate
            </v-btn>
            <v-btn
              style="margin-left: 10px;"
              small
              depressed
              color="primary"
              @click="showDocuments(item)"
            >
              Show Documents
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-layout>

    <v-dialog v-model="documentDialog" scrollable max-width="740px">
      <v-card>
        <v-data-table
          :headers="documentHeaders"
          :items="documents"
          :loading="documentLoading"
          hide-default-footer
          class="elevation-1"
          ><template v-slot:item.actions="{ item }">
            <v-btn
              small
              v-if="!item.verified"
              depressed
              color="success"
              @click="verifyDocument(item)"
            >
              Verify
            </v-btn>
          </template>
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
      loading: false,
      selectedOrg: null,
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
          text: "Org admin first name",
          value: "orgAdminInfo.firstName",
          width: 200,
        },
        {
          text: "Org admin last name",
          value: "orgAdminInfo.lastName",
          width: 200,
        },
        {
          text: "Logo",
          value: "logo",
          width: 100,
        },
        {
          text: "Accept clothes",
          value: "acceptClothes",
          sortable: false,
        },
        {
          text: "Accept food",
          value: "acceptFood",
          sortable: false,
        },
        {
          text: "Accept money",
          value: "acceptMoney",
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
          width: 500,
        },
      ],
      donations: [],
      documentDialog: false,
      documentLoading: false,
      documents: [],
      documentHeaders: [
        {
          text: "ID",
          value: "id",
          sortable: true,
        },
        {
          text: "Document Name",
          value: "documentName",
        },
        {
          text: "Document Url",
          value: "documentUrl",
          sortable: false,
        },
        {
          text: "Verified",
          value: "verified",
          sortable: false,
        },
        {
          text: "Action",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getOrganizations();
  },
  methods: {
    getOrganizations() {
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
    activateOrg(org) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {};
      axios
        .put(
          `http://203237d8713f.ngrok.io/organization/activate/${org.id}`,
          data,
          config
        )
        .then((response) => {
          this.loading = false;
          this.getOrganizations();
        });
    },
    deactivateOrg(org) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {};
      axios
        .put(
          `http://203237d8713f.ngrok.io/organization/activate/${org.id}`,
          data,
          config
        )
        .then((response) => {
          this.loading = false;
          this.getOrganizations();
        });
    },
    verifyOrg(org) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {};
      axios
        .put(
          `http://203237d8713f.ngrok.io/organization/verify/${org.id}`,
          data,
          config
        )
        .then((response) => {
          this.loading = false;
          this.getOrganizations();
        });
    },
    unverifyOrg(org) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {};
      axios
        .put(
          `http://203237d8713f.ngrok.io/organization/unverify/${org.id}`,
          data,
          config
        )
        .then((response) => {
          this.loading = false;
          this.getOrganizations();
        });
    },
    verifyDocument(doc) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {};
      axios
        .put(
          `http://203237d8713f.ngrok.io/organization/document/${this.selectedOrg}/${doc.id}/verify`,
          data,
          config
        )
        .then((response) => {
          this.loading = false;
          this.showDocuments(this.selectedOrg);
        });
    },
    showDocuments(org) {
      this.selectedOrg = org.id;
      this.documents = [];
      this.documentDialog = true;
      this.documentLoading = true;
      var org_id = this.$store.state.crrentUser.id;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .get(
          `http://203237d8713f.ngrok.io/organization/document/${org.id}/all`,
          config
        )
        .then((response) => {
          this.documentLoading = false;
          this.documents = response.data;
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
