<template>
  <v-app>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card width="500" class="elevation-5">
          <v-container>
            <br />
            <div style="text-align: center">
              <h3>Reset Password</h3>
            </div>
            <br />
            <v-divider></v-divider>
            <br />
            <v-card-text>
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  label=" Password"
                  prepend-inner-icon="mdi-lock"
                  outlined
                  :rules="[(v) => !!v || 'Password est obligatoire']"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  required
                />
              </v-form>
              <v-btn
                color="info"
                class="mr-4"
                @click="resetPassword"
                style="height: 45px"
                block
                outlined
              >
                <v-icon left>mdi-login</v-icon> Reset Password
              </v-btn>
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
  name: "ResetPassword",
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail est obligatoire",
        (v) => /.+@.+\..+/.test(v) || "E-mail incorrect",
      ],
      lazy: false,
      valid: true,
      showPassword: false,
      users: [],
      v: false,
      role: "",
    };
  },
  methods: {
    resetPassword() {
      let user = {
        resetLink: this.$route.params.token,
        newPassword: this.password,
      };
      axios
        .put("http://localhost:3000/api/v1/auth/resetPassword", user)
        .then((res) => {
          this.$router.push("/Login");
          console.log("#################", res);
          //   this.$notify({
          //     group: "foo",
          //     title: "Important message",
          //     text: "Hello user! This is a notification!",
          //   });
          console.log("response from forgot password api", res);
        })
        .catch((err) => {
          this.$router.push("/forgetPassword");
          //   this.$notify({
          //     group: "foo",
          //     title: "Important message",
          //     text: "Hello user! This is a notification!",
          //   });
          //this.error = err.response.data.errors;
          console.log("error while forgot password api", err);
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>