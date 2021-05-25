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
                  label=" Email"
                  prepend-inner-icon="mdi-email"
                  v-model="email"
                  outlined
                  :rules="emailRules"
                  required
                />
              </v-form>

              <v-btn
                color="info"
                class="mr-4"
                @click="forgotPassword"
                style="height: 45px"
                block
                outlined
              >
                Validate
              </v-btn>
              <br />
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
  name: "forgotPassword",
  data() {
    return {
      email: "",
      password: "",
      lazy: false,
      emailRules: [
        (v) => !!v || "E-mail est obligatoire",
        (v) => /.+@.+\..+/.test(v) || "E-mail incorrect",
      ],
      valid: true,
    };
  },
  methods: {
    forgotPassword() {
      let user = {
        email: this.email,
      };
      axios
        .put("http://localhost:3000/api/v1/auth/forgotPassword", user)
        .then((res) => {
          this.$router.push("/Login");
          //   this.$notify({
          //     group: "foo",
          //     title: "Important message",
          //     text: "Hello user! This is a notification!",
          //   });
          console.log("response from forgot password api", res);
        })
        .catch((err) => {
          //   this.$notify({
          //     group: "foo",
          //     title: "Important message",
          //     text: "Hello user! This is a notification!",
          //   });
          //this.error = err.response.data.errors;
          console.log("error while forgot password api", err);
        });
    },
  },
};
</script>