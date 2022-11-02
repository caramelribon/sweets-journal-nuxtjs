<template>
  <div>
    <div class="user-profile lightblue-bg">
      <!-- username -->
      <div class="p-10">
        <p
          class="
            text-center text-6xl
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            xl:text-9xl
            2xl:text-9xl
            user-name
          "
        >
          {{ $store.state.user.name }}
        </p>
        <div class="animate__animated animate__fadeInUp mt-24 mb-2">
          <p
            class="
              text-beige text-center
              kaisei-medium
              sm:text-base
              md:text-2xl
              lg:text-2xl
              xl:text-2xl
              2xl:text-2xl
            "
          >
            あなたが気になる・お気に入りしたお店です
          </p>
        </div>
      </div>
      <!-- tab -->
      <ul class="tabs-menu flex justify-center items-center">
        <li
          class="
            text-4xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            xl:text-6xl
            2xl:text-6xl
            px-3
          "
          :class="{ active: activeTab === 'favorite' }"
          @click="activeTab = 'favorite'"
        >
          Favorites
        </li>
        <li
          class="
            text-4xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            xl:text-6xl
            2xl:text-6xl
            px-10
          "
          :class="{ active: activeTab === 'bookmark' }"
          @click="activeTab = 'bookmark'"
        >
          Marks
        </li>
      </ul>
      <!-- tab contents -->
      <section class="tabs-content p-5">
        <user-serve-place-design v-show="activeTab === 'favorite'" action = "favorite" />
        <user-serve-place-design v-show="activeTab === 'bookmark'" action = "mark" />
      </section>
    </div>
    <app-footer />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      activeTab: "favorite",
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&display=swap");
.tabs-menu {
  list-style: none;
}
.tabs-menu li {
  display: block;
  float: left;
  color: #f2ebe5;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #6e7a7c, 0 2px #6a7678, 0 3px #687375, 0 4px #667173,
    0 5px #626d6f, 0 6px #5f6a6c, 0 7px #5d6769, 0 8px #596365, 0 9px #566062,
    0 10px 8px #50595b;
  text-decoration: none;
  transition: 0.5s ease all;
}
/* タブにマウスを乗せたらカーソルの形を変える */
.tabs-menu li:hover {
  cursor: pointer;
  transform: translate(0px, 10px);
  text-shadow: none;
}
/* 非選択のタブにマウスを乗せたら色を変える */
.tabs-menu li:not(.active):hover {
  transform: translate(0px, 10px);
  text-shadow: none;
}
/* 選択中のタブ */
.tabs-menu .active {
  transform: translate(0px, 10px);
  text-shadow: none;
}
.lightblue-bg {
  background-color: #717d7f;
  background: linear-gradient(to right, #747e80, #697779, #5f7174);
}
.user-name {
  color: #f2ebe5;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #6e7a7c, 0 2px #6a7678, 0 3px #687375, 0 4px #667173,
    0 5px #626d6f, 0 6px #5f6a6c, 0 7px #5d6769, 0 8px #596365, 0 9px #566062,
    0 10px 8px #50595b;
}
.user-profile {
  min-height: 100vh;
  position: relative; /*←相対位置*/
  padding-bottom: 60px; /*←footerの高さ*/
  box-sizing: border-box;
}
</style>