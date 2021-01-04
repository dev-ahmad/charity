<template>
  <div class="sign-up-container">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
            <h1>Organization Info</h1>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Name
                </legend>
                <v-text-field
                  placeholder="Name"
                  persistent-hint
                  v-model="name"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Email
                </legend>
                <v-text-field
                  placeholder="Street"
                  persistent-hint
                  v-model="email"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Phone
                </legend>
                <v-text-field
                  placeholder="Phone"
                  persistent-hint
                  v-model="phone"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Website
                </legend>
                <v-text-field
                  placeholder="website"
                  persistent-hint
                  v-model="website"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Established Date
                </legend>
                <v-text-field
                  placeholder="City"
                  persistent-hint
                  v-model="establishedDate"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Logo
                </legend>
                <v-text-field
                  placeholder="Logo"
                  persistent-hint
                  v-model="logo"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Accept Clothes
                </legend>
                <v-switch
                  v-model="acceptClothes"
                  color="success"
                  hide-details
                ></v-switch>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Accept Food
                </legend>
                <v-switch
                  v-model="acceptFood"
                  color="success"
                  hide-details
                ></v-switch>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Accept Money
                </legend>
                <v-switch
                  v-model="acceptMoney"
                  color="success"
                  hide-details
                ></v-switch>
              </v-col>
            </v-row>
            <v-row style="margin: 20px;margin-bottom: 40px;">
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col cols="8" sm="4" md="6">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Description
                </legend>
                <v-textarea
                  placeholder="Description"
                  persistent-hint
                  v-model="description"
                  solo
                ></v-textarea>
              </v-col>
              <v-col cols="8" sm="4" md="6">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Note
                </legend>
                <v-textarea
                  placeholder="Note"
                  persistent-hint
                  v-model="note"
                  solo
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row style="margin: 20px;margin-bottom: 40px;">
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Offering Drop Off Location
                </legend>
                <v-switch
                  v-model="offeringDropOffLocation"
                  color="success"
                  hide-details
                ></v-switch>
              </v-col>
              <v-col cols="8" sm="4" md="4"> </v-col>
            </v-row>
            <v-row style="margin: 20px;" v-if="offeringDropOffLocation">
              <v-data-table
                style="width: 100%;"
                :headers="dropOffLocationSlotsHeaders"
                :items="dropOffLocationSlots"
                hide-default-footer
                class="elevation-1"
              >
                <template v-slot:item.days="{ item }">
                  {{ days.find((d) => d.id === item.day).name }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn depressed color="error" @click="deleteDropOff(item)">
                    Delete
                  </v-btn>
                </template>
              </v-data-table>
              <v-card-actions
                style="width: 100;"
                class="d-flex justify-end mb-6"
              >
                <v-btn
                  :loading="createLoading"
                  color="blue darken-1"
                  text
                  @click="dropOffDialog = true"
                >
                  Create
                </v-btn>
              </v-card-actions>
            </v-row>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Offering Pickup
                </legend>
                <v-switch
                  v-model="offeringPickup"
                  color="success"
                  hide-details
                ></v-switch>
              </v-col>
              <v-col cols="8" sm="4" md="4"> </v-col>
            </v-row>
            <v-row style="margin: 20px;" v-if="offeringPickup">
              <v-data-table
                style="width: 100%;"
                :headers="pickupSlotsHeaders"
                :items="pickupSlots"
                hide-default-footer
                class="elevation-1"
              >
                <template v-slot:item.days="{ item }">
                  {{ days.find((d) => d.id === item.day).name }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn depressed color="error" @click="deletePickUp(item)">
                    Delete
                  </v-btn>
                </template>
              </v-data-table>
              <v-card-actions
                style="width: 100;"
                class="d-flex justify-end mb-6"
              >
                <v-btn
                  :loading="createLoading"
                  color="blue darken-1"
                  text
                  @click="pickupDialog = true"
                >
                  Create
                </v-btn>
              </v-card-actions>
            </v-row>
            <v-row>
              <v-col cols="10" sm="4" md="5"> </v-col>
              <v-col cols="10" sm="4" md="5"> </v-col>
              <v-col cols="8" sm="4" md="2">
                <v-btn
                  outlined
                  depressed
                  large
                  color="#0090D0"
                  dark
                  @click="updateOrganization"
                  :loading="updateLoading"
                  >update</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
    </v-layout>

    <v-dialog v-model="dropOffDialog" scrollable max-width="740px">
      <v-card>
        <v-card-title>Drop Off Location</v-card-title>
        <v-divider></v-divider>
        <v-form ref="signUpForm">
          <v-card-text>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Day
                </legend>
                <v-select
                  v-model="selectedDay"
                  :items="days"
                  item-text="name"
                  item-value="id"
                  label="Select"
                  solo
                ></v-select>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  From Hour
                </legend>
                <v-text-field
                  placeholder="From Hour"
                  persistent-hint
                  v-model="dropOff.fromHour"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  To Hour
                </legend>
                <v-text-field
                  placeholder="To Hour"
                  persistent-hint
                  v-model="dropOff.toHour"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Address
                </legend>
                <v-select
                  v-model="selectedAddress"
                  :items="addresses"
                  item-text="name"
                  item-value="id"
                  label="Select"
                  solo
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end mb-6">
          <v-btn color="blue darken-1" text @click="dropOffDialog = false">
            Close
          </v-btn>
          <v-btn
            :loading="createLoading"
            color="blue darken-1"
            text
            @click="createDroppOffLocation(true)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="pickupDialog" scrollable max-width="740px">
      <v-card>
        <v-card-title>Pickup</v-card-title>
        <v-divider></v-divider>
        <v-form ref="signUpForm">
          <v-card-text>
            <v-row>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  Day
                </legend>
                <v-select
                  v-model="selectedDay"
                  :items="days"
                  item-text="name"
                  item-value="id"
                  label="Select"
                  solo
                ></v-select>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  From Hour
                </legend>
                <v-text-field
                  placeholder="From Hour"
                  persistent-hint
                  v-model="dropOff.fromHour"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4" md="4">
                <legend
                  class="v-label mb-2 theme--light"
                  style="font-size:14px;font-weight:600;"
                >
                  To Hour
                </legend>
                <v-text-field
                  placeholder="To Hour"
                  persistent-hint
                  v-model="dropOff.toHour"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end mb-6">
          <v-btn color="blue darken-1" text @click="pickupDialog = false">
            Close
          </v-btn>
          <v-btn
            :loading="createLoading"
            color="blue darken-1"
            text
            @click="createPickup(true)"
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
      createLoading: false,
      dropOff: {
        day: null,
        addressId: null,
        fromHour: null,
        toHour: null,
      },
      dropOffDialog: false,
      pickupDialog: false,
      pickupSlotsHeaders: [
        {
          text: "Day",
          value: "days",
        },
        {
          text: "From Hour",
          value: "fromHour",
        },
        {
          text: "To Hour",
          value: "toHour",
          sortable: false,
        },
        {
          text: "Action",
          value: "actions",
        },
      ],
      dropOffLocationSlotsHeaders: [
        {
          text: "Day",
          value: "days",
        },
        {
          text: "From Hour",
          value: "fromHour",
        },
        {
          text: "To Hour",
          value: "toHour",
          sortable: false,
        },
        {
          text: "Address",
          value: "address.name",
          sortable: false,
        },
        {
          text: "Action",
          value: "actions",
        },
      ],
      dropOffLocationSlots: [],
      pickupSlots: [],
      updateLoading: false,
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
      loading: false,
      name: "",
      website: "",
      houseNumber: "",
      region: "",
      countries: [],
      countryId: null,
      userType: null,
      phone: null,
      description: "",
      note: null,
      orgLogo: null,
      establishedDate: null,
      logo: null,
      acceptClothes: false,
      acceptFood: false,
      acceptMoney: false,
      offeringDropOffLocation: false,
      offeringPickup: false,
      addresses: null,
      selectedAddress: null,
      selectedDay: null,
      days: [
        {
          id: 1,
          name: "Sunday",
        },
        {
          id: 2,
          name: "Monday",
        },
        {
          id: 3,
          name: "Tuesday",
        },
        {
          id: 4,
          name: "Wednesday",
        },
        {
          id: 5,
          name: "Thursday",
        },
        {
          id: 6,
          name: "Friday",
        },
        {
          id: 7,
          name: "Saturday",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getCountries();
    this.getOrgInfo();
    this.getAddresses();
  },
  methods: {
    getAddresses() {
      this.loading = true;

      var user_id = this.$store.state.crrentUser.id;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .get(
          `${this.$store.state.base_url}/organization/address/active/all`,
          config
        )
        .then((response) => {
          this.addresses = response.data;
          this.loading = false;
        });
    },
    getOrgInfo() {
      this.loading = true;

      var org_id = this.$store.state.crrentUser.orgId;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      axios
        .get(`${this.$store.state.base_url}/organization/${org_id}`, config)
        .then((response) => {
          this.name = response.data.name;
          this.email = response.data.email;
          this.phone = response.data.phone;
          this.website = response.data.website;
          this.establishedDate = response.data.establishedDate;
          this.logo = response.data.logo;
          this.acceptClothes = response.data.acceptClothes;
          this.acceptFood = response.data.acceptFood;
          this.acceptMoney = response.data.acceptMoney;
          this.offeringDropOffLocation = response.data.offeringDropOffLocation;
          this.offeringPickup = response.data.offeringPickup;
          this.dropOffLocationSlots = response.data.dropOffLocationSlots;
          this.pickupSlots = response.data.pickupSlots;
          this.description = response.data.description;
          this.note = response.data.note;
          this.loading = false;
        });
    },
    getCountries() {
      axios
        .get(`${this.$store.state.base_url}/country/all`)
        .then((response) => {
          this.countries = response.body;
        })
        .finally(() => {});
    },
    updateOrganization() {
      var org_id = this.$store.state.crrentUser.orgId;

      this.loading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };
      var data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        website: this.website,
        establishedDate: this.establishedDate,
        logo: this.logo,
        description: this.description,
        note: this.note,
        acceptClothes: this.acceptClothes,
        acceptFood: this.acceptFood,
        acceptMoney: this.acceptMoney,
        offeringDropOffLocation: this.offeringDropOffLocation,
        offeringPickup: this.offeringPickup,
        dropOffLocationSlots: this.dropOffLocationSlots,
      };
      axios
        .put(
          `${this.$store.state.base_url}/organization/${org_id}`,
          data,
          config
        )
        .then(
          (response) => {
            this.loading = false;
            this.$message({
              type: "success",
              showClose: true,
              message: "Organization updated successfully",
            });
          },
          (error) => {
            this.loading = false;
          }
        );
    },
    createDroppOffLocation(update) {
      var org_id = this.$store.state.crrentUser.orgId;

      this.createLoading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };

      if (update) {
        var new_value = {
          day: this.selectedDay,
          fromHour: this.dropOff.fromHour,
          toHour: this.dropOff.toHour,
          addressId: this.selectedAddress,
        };
        this.dropOffLocationSlots.push(new_value);
      }
      var data = this.dropOffLocationSlots;

      axios
        .post(
          `${this.$store.state.base_url}/organization/dfl_slot/${org_id}/modify`,
          data,
          config
        )
        .then(
          (response) => {
            this.getOrgInfo();
            this.dropOffDialog = false;
            this.createLoading = false;
            this.$message({
              type: "success",
              showClose: true,
              message: "Dropp off location created successfully",
            });
          },
          (error) => {
            this.createLoading = false;
          }
        )
        .finally(() => {
          this.createLoading = false;
        });
    },
    createPickup(update) {
      var org_id = this.$store.state.crrentUser.orgId;

      this.createLoading = true;
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.crrentUser.token,
        },
      };

      if (update) {
        var new_value = {
          day: this.selectedDay,
          fromHour: this.dropOff.fromHour,
          toHour: this.dropOff.toHour,
        };
      }
      this.pickupSlots.push(new_value);
      var data = this.pickupSlots;

      axios
        .post(
          `${this.$store.state.base_url}/organization/pickup_slots/${org_id}/modify`,
          data,
          config
        )
        .then(
          (response) => {
            this.getOrgInfo();
            this.pickupDialog = false;
            this.createLoading = false;
            this.$message({
              type: "success",
              showClose: true,
              message: "pickup location created successfully",
            });
          },
          (error) => {
            this.createLoading = false;
          }
        );
    },
    deleteDropOff(item) {
      this.dropOffLocationSlots = this.dropOffLocationSlots.filter((a) => {
        return a.id != item.id;
      });
      this.createDroppOffLocation(false);
    },
    deletePickUp(item) {
      this.pickupSlots = this.pickupSlots.filter((a) => {
        return a.id != item.id;
      });
      this.createPickup(false);
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
