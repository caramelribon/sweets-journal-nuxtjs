<template>
  <!-- header (ヘッダー) -->
  <header class="header w-full">
    <!-- Not login -->
    <nav id="header" class="z-30">
      <div class="flex justify-end items-center px-3 py-3">
        <div class="user-button">
          <!-- User Button (ユーザボタン) -->
          <button class="relative" @click="openBalloonNoLogin">
            <i class="far fa-user fa-2x user-button-color"></i>
          </button>
          <span
            v-if="userInfoNoLogin"
            class="
              absolute
              z-10
              animate__animated animate__fadeIn animate__faster
            "
          >
            <div class="userinfo-nologin relative">
              <!-- Guest User (ゲストユーザの印) -->
              <div class="text-center mt-3 mx-3 border-b">
                <i class="user-icon fas fa-user-circle fa-4x pt-2"></i>
                <p class="text-center py-1 text-xl user-name">Guest</p>
              </div>
              <!-- Buuton Area (ボタンエリア) -->
              <div class="button mt-2 mx-3">
                <div class="flex justify-center items-center">
                  <!-- Login Button (ログインボタン) -->
                  <div class="login">
                    <router-link to="/login">
                      <button
                        class="
                          inline-block
                          leading-none
                          border border-white
                          rounded
                          px-2
                          py-2
                          text-xs text-beige
                          lora-bold
                          hover:border-transparent
                          hover:text-navyblue
                          hover:bg-white
                        "
                        type="button"
                      >
                        Login
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- Message to Guest User (ゲストユーザへのメッセージ) -->
              <div class="my-1 mx-2">
                <p class="text-beige text-xs kaisei-medium">
                  Please try to register as a member (free of charge).
                </p>
              </div>
            </div>
          </span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      userInfoNoLogin: false,
    };
  },
  methods: {
    openBalloonNoLogin() {
      if (this.userInfoNoLogin === false) {
        this.userInfoNoLogin = true;
      } else {
        this.userInfoNoLogin = false;
      }
    },
    closeBalloonNoLogin() {
      if (this.userInfoNoLogin === true) {
        this.userInfoNoLogin = false;
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&display=swap");
header {
  position: fixed;
}
/* text font */
.lora {
  font-family: "Lora", serif;
}
.lora-bold {
  font-family: "Lora", serif;
  font-weight: bold;
}
.lobster {
  font-family: "Antic Didone", serif;
}
.kaisei-medium {
  font-family: "Kaisei Decol", serif;
  font-weight: medium;
}
/* user name */
.user-name {
  color: #f2ebe5;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #8a8682, 0 2px #87837f, 0 3px #85817d, 0 4px #736f6a,
    0 5px #75716d, 0 6px 5px #706c68;
}
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
.userinfo-nologin {
  background-color: #8d8985;
  width: 150px;
  height: 210px;
  right: 130%;
  top: 0;
}
.userinfo-nologin::after {
  border-left: 12px solid #8d8985;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  right: -12px;
  top: 5%;
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
.b-home {
  color: #f2ebe5;
}
.b-user {
  color: #4f5666;
}
.b-activity {
  color: #f2ebe5;
}
.container {
  position: relative;
}
.user-icon {
  color: #f2ebe5;
}
.user-button-color {
  color: #8d8985;
}
</style>