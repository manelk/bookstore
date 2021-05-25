<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      class="elevation-1"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
      :loading="myloadingvariable"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>User managemnent</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            outlined
            dense
            class="mr-6"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <!-- The Add and Edit Dialog -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="teal"
                outlined
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New User
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        outlined
                        dense
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-select
                        :items="rolesItems"
                        label="Role"
                        v-model="editedItem.role"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td>
            <v-icon
              small
              class="mr-6"
              color="yellow darken-3
"
              >mdi-account</v-icon
            >
            <span>{{ item.email }}</span>
          </td>
          <td>
            <span>{{ item.role }}</span>
          </td>
          <!-- The Profile Dialog -->
          <td class="center">
            <showUser :item="item"></showUser>
          </td>
          <td>
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </td>
        </tr></template
      >
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
        color="teal lighten-1"
        circle
      ></v-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import showUser from "./showUser.component";
export default {
  data: () => ({
    dialogProfile: false,
    roleNameEdit: "",
    roleFunctionalitiesEdit: {},
    rolesItems: [],
    myloadingvariable: true,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
      { text: "Profile", value: "" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      role: "",
    },
    defaultItem: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      role: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  components: {
    showUser,
  },

  created() {
    this.initialize();
    this.getRoles();
    //this.getUserByRole();
  },

  methods: {
    // getUserByRole() {
    //   let res = axios.get("http://localhost:3000/api/v1/role/getRoleByName", {
    //     params: { roleName: "mariem" },
    //   });
    //   console.log("@@@@@@@@@@@@@@@@@@", res);
    // },
    // getUserByRole() {
    //   let url =
    //     "http://localhost:3000/api/v1/role/getRoleByName?roleName=" + "mariem";
    //   console.log("url test test", urlTest);

    //   fetch(url).then((response) =>
    //     response
    //       .json()
    //       .then((data) => ({
    //         data: data,
    //         status: response.status,
    //       }))
    //       .then((res) => {
    //         console.log("ths", res.status, res.data.data);
    //       })
    //   );

    //   // return new Promise((resolve, reject) => {
    //   //   let res = axios.get("http://localhost:3000/api/v1/role/getRoleByName", {
    //   //     params: { roleName: "mariem" },
    //   //   });
    //   //   if (res) {
    //   //     resolve(res);
    //   //     console.log("@@@@@@@@@@@@@@@@@@", res);
    //   //   }
    //   // });
    // },
    getRoles() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:3000/api/v1/role/getRoles")
          .then((res) => {
            resolve(res.data);
            res.data.data.forEach((element) => {
              this.rolesItems.push(element.role);
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    initialize() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:3000/api/v1/auth/getUsers")
          .then((res) => {
            console.log("idkaaaaaaaa", res.data.data);
            resolve(res.data.data);
            res.data.data.forEach((element) => {
              this.users.push({
                id: element._id,
                firstName: element.firstName,
                lastName: element.lastName,
                email: element.email,
                // birthDate: element.birthDate.substr(0, 10),
                birthDate: element.birthDate,
                role: element.role,
              });
              this.myloadingvariable = false;
            });
          })
          .catch((err) => {
            console.log("test err", err.response.data.errors);
            reject(err);
          });
      });
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      axios
        .get("http://localhost:3000/api/v1/user/deleteUser/" + item.id)
        .then((res) => {
          if (res) {
            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
          }
        });
    },
    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        // Edit
        /**
         * Logic of edit : The owner can only update the email and department name.
         * First, we look for the full role object by the new department entered
         * Second, we update the user data (email and role object only!)
         * The rest will be updated after login
         */
        let department = this.editedItem.department;
        let url =
          "http://localhost:3000/api/v1/role/getRoleByDepartment?department=" +
          department;
        axios.get(url).then((res) => {
          axios
            .post(
              "http://localhost:3000/api/v1/user/updateUser/" +
                this.editedItem.id,
              {
                _id: this.editedItem.id,
                email: this.editedItem.email,
                role: res.data.data,
              }
            )
            .then((res) => {
              Object.assign(this.users[this.editedIndex], this.editedItem);
              this.close();
            });
        });
      } else {
        // Add new user with its department.
        axios
          .post("http://localhost:3000/api/v1/user/userAdd", {
            email: this.editedItem.email,
            role: this.editedItem.role,
          })
          .then((res) => {
            this.users.splice(0, 0, {
              id: res.data.data._id,
              firstName: this.editedItem.firstName,
              lastName: this.editedItem.lastName,
              email: this.editedItem.email,
              birthDate: this.editedItem.birthDate,
              role: this.editedItem.role,
            });
            this.close();
          });
      }
    },
  },
};
</script>