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
          :items="countries"
          :loading="loading"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
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

    <v-dialog v-model="updatePageDialog" scrollable max-width="440px">
      <v-card>
        <v-card-title>Edit Page</v-card-title>
        <v-card-text>
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            Page name
          </legend>
          <v-text-field
            placeholder="Jordan"
            persistent-hint
            v-model="selectedPage.name"
            solo
          ></v-text-field>
          <credit-card></credit-card>
        </v-card-text>
        <v-card-text>
          <legend
            class="v-label mb-2 theme--light"
            style="font-size:14px;font-weight:600;"
          >
            Page content
          </legend>
          <v-textarea
            placeholder="Jordan"
            persistent-hint
            v-model="selectedPage.content"
            solo
          ></v-textarea>
          <credit-card></credit-card>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="updatePageDialog = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :loading="updatePageLoading"
            @click="updatePage"
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
      loading: false,
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Path",
          value: "path",
        },
        {
          text: "Content",
          value: "content",
          width: 600,
        },
        {
          text: "Action",
          value: "actions",
          width: 100,
        },
      ],
      countries: [],
      selectedPage: {
        name: "",
        content: "",
      },
      updatePageDialog: false,
      updatePageLoading: false,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getPages();
  },
  methods: {
    getPages() {
      this.loading = true;
      var user_id = this.$store.state.crrentUser.id;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .get(`http://203237d8713f.ngrok.io/page/all`, config)
        .then((response) => {
          this.loading = false;
          this.countries = response.data;
        });
    },
    openEditDialog(page) {
      this.selectedPage = page;
      this.updatePageDialog = true;
    },
    updatePage() {
      this.updatePageLoading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };

      var data = {
        name: this.selectedPage.name,
        content: this.selectedPage.content,
      };
      axios
        .put(
          `http://203237d8713f.ngrok.io/page/${this.selectedPage.path}`,
          data,
          config
        )
        .then((response) => {
          this.updatePageLoading = false;
          this.updatePageDialog = false;
          this.getPages();
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
