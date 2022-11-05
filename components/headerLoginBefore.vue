<template>
  <!-- header (ヘッダー) -->
  <header class="header w-full z-10">
    <!-- Not login -->
    <nav id="header">
      <div class="flex justify-end items-center px-3 py-3">
        <div class="user-button">
          <!-- User Button (ユーザボタン) -->
          <button class="relative" @click="toggleBalloon">
            <i class="far fa-user fa-2x user-button-color"></i>
          </button>
          <div
            v-if="isUserInfo"
            class="
              absolute
              top-0
              right-16
              animate__animated animate__fadeIn animate__faster
            "
          >
            <div class="userinfo-nologin">
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
                    <n-link to="/login">
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
                        @click="toggleBalloon"
                      >
                        Login
                      </button>
                    </n-link>
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
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
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
.user-name {
  color: #f2ebe5;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #8a8682, 0 2px #87837f, 0 3px #85817d, 0 4px #736f6a,
    0 5px #75716d, 0 6px 5px #706c68;
}
/* user information */
.userinfo-nologin {
  background-color: #8d8985;
  width: 150px;
  height: 210px;
}
.userinfo-nologin::after {
  border-left: 12px solid #8d8985;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  right: -12px;
  top: 10%;
  content: "";
  position: absolute;
}
.user-icon {
  color: #f2ebe5;
}
.user-button-color {
  color: #8d8985;
}
</style>