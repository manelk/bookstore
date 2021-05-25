<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined small color="red accent-3" v-bind="attrs" v-on="on">
        Profile
      </v-btn>
      <!-- <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn> -->
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-label>Email</v-label>
              <v-text-field
                readonly
                solo
                label="Email"
                v-model="item.email"
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-label>First Name</v-label>
              <v-text-field
                solo
                readonly
                label="First Name"
                v-model="item.firstName"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-label>Last Name</v-label>

              <v-text-field
                readonly
                solo
                label="Last Name"
                v-model="item.lastName"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-label>BirthDate</v-label>

              <v-text-field
                readonly
                solo
                label="Birth Date"
                v-model="item.birthDate"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-label>Role </v-label>
              <v-text-field
                readonly
                solo
                label="Role"
                v-model="item.role"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialogProfile = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      dialog: false,
    };
  },
};
</script>