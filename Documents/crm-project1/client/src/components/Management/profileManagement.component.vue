<template>
  <div style="margin-top: 10%">
    <!-- <br /><br /><br /> -->
    <v-row class="pa-4">
      <v-col cols="12" md="4" class="d-flex text-center">
        <v-card class="pt-6 mx-auto" flat>
          <v-card-text style="position: sticky; top: 35%">
            <v-avatar size="100" color="info" class="white--text headline"
              >JS</v-avatar
            >
            <v-spacer></v-spacer>
            <br />
            <v-btn outlined class="mr-2">Edit</v-btn>
            <v-btn outlined>Reset password</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="auto">
        <v-divider
          :vertical="$vuetify.breakpoint.mdAndUp ? true : false"
        ></v-divider>
      </v-col>
      <v-col cols="12" md="7" class="ml-md-6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="firstName"
            :rules="nameRules"
            append-icon="mdi-account"
            label="First Name"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="lastName"
            :rules="nameRules"
            append-icon="mdi-account"
            label="Last Name"
            required
          ></v-text-field>
          <template>
            <div>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    :rules="birthdayRules"
                    v-model="date"
                    label="Birthday date"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  :active-picker.sync="activePicker"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </div>
          </template>
          <v-text-field
            outlined
            v-model="email"
            append-icon="mdi-gmail"
            :rules="emailRules"
            type="email"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label=" Password"
            outlined
            :rules="[(v) => !!v || 'Password is required']"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
          />

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Validate
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    showPassword: false,

    activePicker: null,
    date: null,
    menu: false,
    password: "",
    firstName: "",
    lastName: "",
    valid: true,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    birthdayRules: [(v) => !!v || "Birthday is required"],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 8) || "Password must be greater than 8 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>