<template>
  <div class="sign-up-container">
    <v-row class="d-flex justify-end mb-6" style="margin: 30px;">
      <v-btn
        class="ma-2"
        large
        color="primary"
        @click="addNewDocDialog = true"
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
          :items="donations"
          :loading="loading"
          hide-default-footer
          class="elevation-1"
        >
        </v-data-table>
      </v-card>
    </v-layout>

    <v-dialog v-model="addNewDocDialog" scrollable max-width="740px">
      <v-card>
        <v-card-title>New Document</v-card-title>
        <v-divider></v-divider>
        <v-form ref="signUpForm">
          <v-card-text>
            <v-row>
              <v-col cols="10" sm="6" md="6">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Document Url
                </legend>
                <v-text-field
                  placeholder="Document Url"
                  persistent-hint
                  v-model="documentUrl"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="10" sm="6" md="6">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Document Name
                </legend>
                <v-text-field
                  placeholder="Document Name"
                  persistent-hint
                  v-model="documentName"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="20" sm="12" md="12">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Document Description
                </legend>
                <v-textarea
                  placeholder="Document Description"
                  persistent-hint
                  v-model="documentDescription"
                  solo
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end mb-6">
          <v-btn
            color="blue darken-1"
            text
            @click="addNewDocDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            :loading="createLoading"
            color="blue darken-1"
            text
            @click="createDocument"
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
      addNewDocDialog: false,
      createLoading: false,
      loading: false,
      documentUrl: null,
      documentName: null,
      documentDescription: null,
      headers: [
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
      ],
      donations: [],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getDocuments();
  },
  methods: {
    getDocuments() {
      var org_id = this.$store.state.crrentUser.orgId;
      this.loading = true;
      var user_id = this.$store.state.crrentUser.id;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .get(
          `${this.$store.state.base_url}/organization/document/${org_id}/all`,
          config
        )
        .then((response) => {
          this.loading = false;
          this.donations = response.data;
        });
    },
    createDocument() {
      var org_id = this.$store.state.crrentUser.orgId;
      this.createLoading = true;

      var user_id = this.$store.state.crrentUser.id;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };

      var data = {
        orgId: org_id,
        documentUrl: this.documentUrl,
        documentName: this.documentName,
        documentDescription: this.documentDescription
      };
      axios
        .post(
          `${this.$store.state.base_url}/organization/document/${org_id}/add`, data,
          config
        )
        .then((response) => {
          this.createLoading = false;
          this.getDocuments();
          this.addNewDocDialog = false;
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
