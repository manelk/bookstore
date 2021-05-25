<template>
  <v-app>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card width="500" class="elevation-5">
          <v-container>
            <br />
            <div style="text-align: center">
              <h3>Login</h3>
            </div>
            <br />
            <v-divider></v-divider>
            <br />
            <v-card-text>
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-text-field
                  label=" Email"
                  prepend-inner-icon="mdi-email"
                  v-model="email"
                  outlined
                  :rules="emailRules"
                  required
                />
                <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  label=" Password"
                  prepend-inner-icon="mdi-lock"
                  outlined
                  :rules="[(v) => !!v || 'Password is required']"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  required
                />
              </v-form>

              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="info"
                    class="mr-4"
                    @click="Login"
                    style="height: 45px"
                    block
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>mdi-login</v-icon>Login
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Update Password</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form v-model="isFormValid">
                        <!-- all input elements go here -->
                        <v-row>
                          <v-col cols="12" md="12">
                            <v-label>Password *</v-label>
                            <v-text-field
                              outlined
                              :type="showPasswordUpdate1 ? 'text' : 'password'"
                              v-model="password"
                              :rules="passwordRules"
                              :append-icon="
                                showPasswordUpdate1 ? 'mdi-eye' : 'mdi-eye-off'
                              "
                              @click:append="
                                showPasswordUpdate1 = !showPasswordUpdate1
                              "
                              required
                            >
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" md="12">
                            <v-label>Confirm Password *</v-label>
                            <v-text-field
                              outlined
                              v-model="confirmPassword"
                              :append-icon="
                                showPasswordUpdate2 ? 'mdi-eye' : 'mdi-eye-off'
                              "
                              @click:append="
                                showPasswordUpdate2 = !showPasswordUpdate2
                              "
                              :rules="
                                (passwordRules,
                                [rules.confirmPasswordRules],
                                confirmPasswordRules)
                              "
                              @update:error="checkPassword"
                              :type="showPasswordUpdate2 ? 'text' : 'password'"
                              required
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                    <small class="ml-3">*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- disable if form is not valid -->
                    <v-btn
                      :disabled="!isFormValid"
                      color="teal lighten-1"
                      text
                      @click="resetPassword"
                      >Change Password</v-btn
                    >
                    <v-btn color="teal lighten-1" text @click="dialog = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- <p class="text-center">
                I've forgotten my password
                <v-btn text color="success" to="/forgetPassword">
                  Reset Password
                </v-btn>
              </p>
              <br />
              <p class="text-center">
                Don't have an account?
                <v-btn text color="success" to="/register"> Register </v-btn>
              </p> -->
              <br />
            </v-card-text>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      isFormValid: false,
      password: "",
      confirmPassword: "",
      validPassword: "",
      rules: {
        confirmPasswordRules: (v) => !!v || "Password is required",
      },
      confirmPasswordRules: [
        (value) => !!value || "type confirm password",
        (value) =>
          value === this.password ||
          "The password confirmation does not match.",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 5) || "Password must have 5+ characters",
        (v) => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
        (v) => /(?=.*\d)/.test(v) || "Must have one number",
        (v) => /([!@$%])/.test(v) || "Must have one special character [!@#$%]",
      ],
      dialog: false,
      pass: "",
      pass2: "",
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail is invalid",
      ],
      lazy: false,
      valid: true,
      showPassword: false,
      showPasswordUpdate1: false,
      showPasswordUpdate2: false,
      users: [],
      v: false,
      role: "",
    };
  },
  // computed: {
  //   passwordConfirmationRule() {
  //     return () =>
  //       this.password === this.confirmPassword || "Password must match";
  //   },
  // },
  methods: {
    resetPassword() {
      // let user = {
      let resetLink = localStorage.token;
      let newPassword = this.password;
      let confirmPassword = this.confirmPassword;
      // };
      // console.log("#######33", user);
      axios
        .put("http://localhost:3000/api/v1/auth/resetPassword", {
          resetLink,
          newPassword,
          confirmPassword,
        })
        .then((res) => {
          //this.$router.push("/Login");
          console.log("#################", res);

          console.log("response from forgot password api", res);
        })
        .catch((err) => {
          //this.$router.push("/forgetPassword");
          //this.error = err.response.data.errors;
          console.log("error while forgot password api", err);
          console.log(err.response.data.errors);
          // this.icon = "mdi-alert";
          // this.snackbarText = "Error";
          // this.color = "red";
          // this.snackbar = true;
        });
    },
    checkPassword(invalid) {
      // correct: false
      if (true == invalid) {
        this.validPassword = false;
      } else {
        this.validPassword = true;
      }
    },

    // validate() {
    //   if (this.$refs.form.validate()) {
    //     Axios.get("http://localhost:3000/user").then((res) => {
    //       res.data.forEach((item) => {
    //         if (this.email == item.login && this.pass == item.mdp) {
    //           // this.$router.push({ path: "/student" });
    //           localStorage.setItem("id", item.id);
    //           localStorage.setItem("login", item.login);
    //           localStorage.setItem("role", item.role);
    //           localStorage.setItem("nom", item.Nom);
    //           this.role = item.role;
    //           // v means user exists
    //           this.v = true;
    //         }
    //       });
    //       if (this.v) {
    //         if (this.role == "student") {
    //           // this.$router.push({ path: "/student" });
    //           this.$router.push({ path: "/Nav2" });
    //         } else {
    //           this.$router.push({ path: "/Nav" });
    //         }
    //       } else {
    //         alert("WRONG PSW OR LOGIN CHECK");
    //       }
    //       // this.users = res.data;
    //     });
    //   }
    // },

    Login() {
      return new Promise((resolve, reject) => {
        // get information inside token not post!
        axios
          .post("http://localhost:3000/api/v1/auth/login", {
            email: this.email,
            password: this.password,
            // addLink: this.$route.params.token,
          })
          .then((res) => {
            console.log("this.$route.params.token", this.$route.params.token);
            //localStorage.setItem("userObject", JSON.stringify(res.data.user));
            //localStorage.setItem("token", this.$route.params.token);
            // localStorage.setItem("id", res.data.user.id);
            // localStorage.setItem("emailCreator", res.data.user.email);
            // localStorage.setItem("FirstName", res.data.user.firstName);
            // localStorage.setItem("LastName", res.data.user.lastName);
            // axios.defaults.headers.common["Authorization"] =
            //   "Bearer " + res.data.token;
            //this.$router.push({ path: "/updatePassword" });
            //console.log("response from login0000000000000000 api", res.data.user);
            resolve(res);
            // console.log(res);
          })
          .catch((err) => {
            reject(err);
            console.log("error while login api", err);
          });
        //console.log("userrrrrrrr", user);
        //this.$router.push("/roleManagement");
      });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>