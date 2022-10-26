<template>
  <!-- header (ヘッダー) -->
  <header class="header w-full h-5 z-10">
    <!-- login -->
    <nav id="header">
      <div class="flex justify-end items-center px-5">
        <!-- Menu Button (メニューボタン) -->
        <div class="menu">
          <input type="checkbox" id="actionMenuButton" @click="closeBalloon" />
          <div class="actions-menu">
            <!-- Home Button (ホームボタン) -->
            <button class="btn btn--home bg-none">
              <router-link
                to="/"
                class="block lora-bold text-lightgray text-lg"
              >
                Top
              </router-link>
            </button>
            <!-- User Button (ユーザボタン) -->
            <button class="btn btn--user relative" @click="toggleBalloon">
              <i class="far fa-user fa-2x user-button-color"></i>
            </button>
            <span
              v-if="isUserInfo"
              class="
                userinfo
                absolute
                z-10
                animate__animated animate__fadeIn animate__faster
              "
            >
              <div class="userinfo">
                <!-- Login User Name (ユーザの名前) -->
                <div class="mt-2 mx-3 border-b text-center">
                  <i class="user-icon fas fa-user-circle fa-4x"></i>
                  <p class="text-center py-1 text-2xl user-name-login">
                    {{ $store.state.user.name }}
                  </p>
                </div>
                <!-- Button Area (ボタンエリア) -->
                <div class="button mt-2 mx-3">
                  <div class="flex justify-center items-center">
                    <!-- User Profile (ユーザのプロフィールに繋がるボタン) -->
                    <div class="signup mr-1">
                      <button
                        class="
                          block
                          leading-none
                          border
                          rounded
                          px-2
                          py-2
                          text-xs text-beige
                          lora-bold
                          hover:border-transparent
                          hover:text-lightgray
                          hover:bg-beige
                          moji
                        "
                      >
                        Profile
                      </button>
                    </div>
                    <!-- Logout (ログアウトボタン) -->
                    <div class="logout">
                      <n-link to="/">
                        <button
                          class="
                            inline-block
                            leading-none
                            border
                            rounded
                            px-2
                            py-2
                            text-xs text-beige
                            lora-bold
                            hover:border-transparent
                            hover:text-lightgray
                            hover:bg-beige
                          "
                          type="button"
                          @click="signOut"
                        >
                          Logout
                        </button>
                      </n-link>
                    </div>
                  </div>
                </div>
                <!-- Message to LoginUser (ユーザへのメッセージ) -->
                <div class="mx-2 my-1">
                  <p class="text-beige text-xs kaisei-medium">
                    Thank you for logging in!<br />
                    Please enjoy this app!!
                  </p>
                </div>
              </div>
            </span>
            <!-- Activity Button (アクティビティボタン) -->
            <button class="btn btn--activity">
              <button
                class="block lora-bold text-lightgray text-lg"
              >
                Activity
              </button>
            </button>
            <label for="actionMenuButton" class="btn btn--large btn--menu" />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      isUserInfo: false,
    };
  },
  methods: {
    toggleBalloon() {
      this.isUserInfo = !this.isUserInfo;
    },
    closeBalloon() {
      this.isUserInfo = false;
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("ログアウトしました");
          this.$store.commit("signOut");
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
          console.log("ログアウトに失敗しました");
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&display=swap");
header {
  position: fixed;
}
/* text font */
.lora-bold {
  font-family: "Lora", serif;
  font-weight: bold;
}
.kaisei-medium {
  font-family: "Kaisei Decol", serif;
  font-weight: medium;
}
/* user name */
.user-name-login {
  color: #f2ebe5;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #8a8682, 0 2px #87837f, 0 3px #85817d, 0 4px #736f6a,
    0 5px #75716d, 0 6px 5px #706c68;
}
/* user information */
.userinfo {
  background-color: #8d8985;
  width: 150px;
  height: 210px;
  right: 200%;
  top: 100%;
}
.userinfo::after {
  border-left: 12px solid #8d8985;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  right: -12px;
  top: 10%;
  content: "";
  position: absolute;
}
/* menu button layout */
input[type="checkbox"] {
  display: none;
}
.btn {
  background: none;
  border: none;
  width: 45px;
  height: 45px;
}
.btn--large {
  width: 45px;
  height: 45px;
}
.btn--menu:after,
.btn--menu:before {
  content: "";
  display: block;
  width: 25px;
  height: 3px;
  background: #8d8985;
  position: absolute;
  top: 29px;
  left: 18px;
  transition: transform 100ms;
}
.btn--menu:after {
  transform: translateY(-5px);
}
.btn--menu:before {
  transform: translateY(5px);
}
.actions-menu {
  position: relative;
  width: 60px;
  height: 45px;
  right: 0px;
  bottom: 0px;
}
.actions-menu .btn {
  position: absolute;
  top: 8px;
  left: 8px;
  opacity: 0;
  transition: top 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    left 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 200ms;
}
.actions-menu .btn--menu {
  position: absolute;
  opacity: 1;
  top: 0;
  left: 0;
  z-index: 0;
}
.btn--menu,
#actionMenuButton:checked + .actions-menu > .btn {
  opacity: 1;
}
#actionMenuButton:checked + .actions-menu > .btn--menu:after {
  transform: rotate(45deg);
}
#actionMenuButton:checked + .actions-menu > .btn--menu:before {
  transform: rotate(-45deg);
}
#actionMenuButton:checked + .actions-menu > .btn--activity {
  top: 70px;
}
#actionMenuButton:checked + .actions-menu > .btn--user {
  top: 40px;
  left: -45px;
}
#actionMenuButton:checked + .actions-menu > .btn--home {
  top: -5px;
  left: -60px;
}
.user-icon {
  color: #f2ebe5;
}
.user-button-color {
  color: #8d8985;
}
</style>