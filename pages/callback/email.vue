<template>
  <div class="back-1">
    <v-main>
      <client-only>
        <dialog-error ref="dialogErrorRef"></dialog-error>
        <dialog-confirm-account
          ref="dialogConfirmAccountRef"
        ></dialog-confirm-account>
        <dialog-now-loading :loading="loading"></dialog-now-loading>
      </client-only>
    </v-main>
  </div>
</template>

<script>
import {
  FETCH_POSTS,
  FETCH_NEXT_POSTS,
  LOGIN_EMAIL
} from "~/store/actions_type";
import DialogError from "~/components/DialogError";
import DialogConfirmAccount from "~/components/DialogConfirmAccount";
import DialogNowLoading from "~/components/DialogNowLoading";

export default {
  components: {
    DialogError,
    DialogConfirmAccount,
    DialogNowLoading
  },
  data() {
    return {
      loading: false,
      currentUser: null,
      user: null
    };
  },
  mounted() {
    this.loading = true;
    setTimeout(async () => {
      try {
        let returnObj = await this.magicEmailSignIn();
        this.user = returnObj.user;

        if (returnObj.loginAction) {
          this.$router.push({ path: `/` });
        } else if (returnObj.user) {
          this.$refs.dialogConfirmAccountRef.show(
            "receive",
            returnObj.user.email
          );
        } else if (!returnObj.user) {
          this.$router.push({ path: `/` });
        }
      } catch (err) {
        console.log("error callback: ", err);
        this.$refs.dialogConfirmAccountRef.show("error", "");
      } finally {
        this.loading = false;
      }
    });
  },
  methods: {
    async magicEmailSignIn() {
      let url = window.location.href;
      let slug = this.$route;

      var returnObj = {
        user: null,
        loginAction: false
      };

      let currentUser = AuthService.getAuthCurrentUser();
      this.currentUser = currentUser;
      if (!currentUser) {
        returnObj = await this.$store.dispatch(
          `auth_module/${LOGIN_EMAIL}`,
          url
        );
      }
      return returnObj;
    }
  }
};
</script>

<style></style>
