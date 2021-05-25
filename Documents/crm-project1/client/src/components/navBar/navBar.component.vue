<template>
  <div>
    <v-navigation-drawer v-model="drawer" app absolute permanent>
      <v-list-item class="px-2">
        <v-list-item-avatar color="teal lighten-1 " size="48">
          <!-- <span class="white--text headline">
            {{ nameAvatar() }}
          </span> -->
        </v-list-item-avatar>
        <v-list-item-title
          >{{ this.firstName }} {{ this.lastName }}</v-list-item-title
        >
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item to="/profileManagement" active-class="active">
          <v-list-item-action>
            <v-icon
              color="teal lighten-1
            "
              >mdi-cog-outline</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profile Management</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/roleManagement" active-class="active">
          <v-list-item-action>
            <v-icon
              color="teal lighten-1
            "
              >mdi-account-details</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Role Management</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/userManagement" active-class="active">
          <v-list-item-action>
            <v-icon
              color="teal lighten-1
            "
              >mdi-account-cog</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>User Management</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/activityManagement" active-class="active">
          <v-list-item-action>
            <v-icon
              color="teal lighten-1
            "
              >mdi-calendar-outline</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Activity Management</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/contactManagement" active-class="active">
          <v-list-item-action>
            <v-icon
              color="teal lighten-1
            "
              >mdi-account-group</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact Management</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/dealsManagement" active-class="active">
          <v-list-item-action>
            <v-icon
              color="teal lighten-1
            "
              >mdi-handshake</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Deals Management</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-icon @click="logout()"> mdi-logout </v-icon>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      firstName: localStorage.getItem("FirstName"),
      lastName: localStorage.getItem("LastName"),
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      mini: true,
    };
  },
  methods: {
    // nameAvatar() {
    //   return this.firstName.charAt(0) + this.lastName.charAt(0);
    // },
    logout() {
      this.$router.push({ name: "login" });
      localStorage.clear();
    },
  },
};
</script>
<style scoped>
.v-application .pa-2 {
  text-align: center;
}
</style>