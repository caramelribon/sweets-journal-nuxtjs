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
        <section v-show="activeTab === 'favorite'">
          <div class="flex items-start justify-center flex-row flex-wrap p-5">
            <div v-for="place in favoritePlaces" :key="place.id">
              <!-- shop layout -->
              <div class="m-4 card animate__animated animate__fadeInUp">
                <!-- shop image -->
                <div class="card-header">
                  <img
                    :src="place.photo"
                    width="300"
                    height="300"
                    class="card-image"
                  />
                </div>
                <!-- shop description and button(favorite and mark) -->
                <section class="card-body">
                  <div class="shop-description">
                    <!-- shop name -->
                    <div class="place-info m-2 text-center">
                      <div class="my-1">
                        <p class="text-navyblue text-center kaisei-medium">
                          {{ place.name }}
                        </p>
                        <p
                          class="
                            text-navyblue text-center
                            kaisei-medium
                            text-xs
                            my-2
                          "
                        >
                          {{ place.catchcopy }}
                        </p>
                      </div>
                      <p class="text-navyblue kaisei-medium text-xs my-2">
                        {{ place.access }}
                      </p>
                    </div>
                    <!-- button (favorite and mark) -->
                    <div class="flex justify-end items-center">
                      <!-- favorite button -->
                      <div class="p-2">
                        <button
                          @click="onFavorite(place)"
                          :disabled="!$store.state.user.isLogin"
                          v-if="
                            $store.state.userFavPlace.indexOf(place.id) === -1
                          "
                        >
                          <i class="far fa-heart fa-lg"></i>
                        </button>
                        <button
                          @click="delFavorite(place)"
                          :disabled="!$store.state.user.isLogin"
                          v-else
                        >
                          <i class="fas fa-heart fa-lg liked"></i>
                        </button>
                      </div>
                      <!-- mark button -->
                      <div class="p-2">
                        <button
                          @click="onBookmark(place)"
                          :disabled="!$store.state.user.isLogin"
                          v-if="
                            $store.state.userBmPlace.indexOf(place.id) === -1
                          "
                        >
                          <i class="far fa-bookmark fa-lg"></i>
                        </button>
                        <button
                          @click="delBookmark(place)"
                          :disabled="!$store.state.user.isLogin"
                          v-else
                        >
                          <i class="fas fa-bookmark fa-lg bookmarked"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <ul class="card-information">
                    <li class="text-navyblue kaisei-medium text-xs">
                      {{ place.address }}
                    </li>
                    <li class="text-navyblue kaisei-medium text-xs">
                      予算:{{ place.average }}
                    </li>
                    <li class="text-navyblue kaisei-medium text-xs">
                      Open:{{ place.open }}
                    </li>
                    <li class="text-navyblue kaisei-medium text-xs">
                      <a :href="place.url" target="_blank">
                        さらに詳しい情報こちら
                        <i class="fas fa-external-link-alt icon-color-blue"></i>
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </section>
        <section v-show="activeTab === 'bookmark'">
          <div class="flex items-start justify-center flex-row flex-wrap p-5">
            <div v-for="place in bookmarkPlaces" :key="place.id">
              <!-- shop layout -->
              <div class="m-4 card animate__animated animate__fadeInUp">
                <!-- shop image -->
                <div class="card-header">
                  <img
                    :src="place.photo"
                    width="300"
                    height="300"
                    class="card-image"
                  />
                </div>
                <!-- shop description and button(favorite and mark) -->
                <section class="card-body">
                  <div class="shop-description">
                    <!-- shop name -->
                    <div class="place-info m-2 text-center">
                      <div class="my-1">
                        <p class="text-navyblue text-center kaisei-medium">
                          {{ place.name }}
                        </p>
                        <p
                          class="
                            text-navyblue text-center
                            kaisei-medium
                            text-xs
                            my-2
                          "
                        >
                          {{ place.catchcopy }}
                        </p>
                      </div>
                      <p class="text-navyblue kaisei-medium text-xs my-2">
                        {{ place.access }}
                      </p>
                    </div>
                    <!-- button (favorite and mark) -->
                    <div class="flex justify-end items-center">
                      <!-- favorite button -->
                      <div class="p-2">
                        <button
                          @click="onFavorite(place)"
                          :disabled="!$store.state.user.isLogin"
                          v-if="
                            $store.state.userFavPlace.indexOf(place.id) === -1
                          "
                        >
                          <i class="far fa-heart fa-lg"></i>
                        </button>
                        <button
                          @click="delFavorite(place)"
                          :disabled="!$store.state.user.isLogin"
                          v-else
                        >
                          <i class="fas fa-heart fa-lg liked"></i>
                        </button>
                      </div>
                      <!-- mark button -->
                      <div class="p-2">
                        <button
                          @click="onBookmark(place)"
                          :disabled="!$store.state.user.isLogin"
                          v-if="
                            $store.state.userBmPlace.indexOf(place.id) === -1
                          "
                        >
                          <i class="far fa-bookmark fa-lg"></i>
                        </button>
                        <button
                          @click="delBookmark(place)"
                          :disabled="!$store.state.user.isLogin"
                          v-else
                        >
                          <i class="fas fa-bookmark fa-lg bookmarked"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <ul class="card-information">
                    <li class="text-navyblue kaisei-medium text-sm">
                      {{ place.address }}
                    </li>
                    <li class="text-navyblue kaisei-medium text-sm">
                      予算:{{ place.average }}
                    </li>
                    <li class="text-navyblue kaisei-medium text-sm">
                      Open:{{ place.open }}
                    </li>
                    <li class="text-navyblue kaisei-medium">
                      <a :href="place.url" target="_blank">
                        さらに詳しい情報こちら
                        <i class="fas fa-external-link-alt icon-color-blue"></i>
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { userRegisteredPlaces } from "../../services/firebaseService";
export default {
  middleware: 'auth',
  data() {
    return {
      activeTab: "favorite",
      bookmarkPlaces: [],
      favoritePlaces: [],
    };
  },
  async created() {
    // ユーザが登録しているお店の情報の取得
    this.favoritePlaces = await userRegisteredPlaces(
      "favorite",
      this.$store.state.user.id
    );
    this.bookmarkPlaces = await userRegisteredPlaces(
      "mark",
      this.$store.state.user.id
    );
  },
  methods: {
    onFavorite(place) {
      this.$store.dispatch("onFavorite", place);
      this.favoritePlaces.unshift(place);
    },
    delFavorite(place) {
      this.$store.dispatch("delFavorite", place);
      this.favoritePlaces = this.favoritePlaces.filter(
        (placeData) => placeData.id !== place.id
      );
    },
    onBookmark(place) {
      this.$store.dispatch("onBookmark", place);
      this.bookmarkPlaces.unshift(place);
    },
    delBookmark(place) {
      this.$store.dispatch("delBookmark", place);
      this.bookmarkPlaces = this.bookmarkPlaces.filter(
        (placeData) => placeData.id !== place.id
      );
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&display=swap");
/* card layout */
.card {
  padding: 20px;
  width: 300px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
}
.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.card:hover .card-header {
  height: 50px;
}
.card:hover .card-header .card-image {
  transform: translateX(-50%) translateY(-50%) scale(1.5);
}
.card:hover .card-body {
  height: auto;
}
.card:hover .card-body .card-information li {
  transform: translateX(0);
  transition-timing-function: cubic-bezier(0, 1.5, 1, 1);
  transition-duration: 0.5s;
}
.card:hover .card-body .card-information li:nth-child(1) {
  transition-delay: 0.25s;
}
.card:hover .card-body .card-information li:nth-child(2) {
  transition-delay: 0.5s;
}
.card:hover .card-body .card-information li:nth-child(3) {
  transition-delay: 0.75s;
}
.card:hover .card-body .card-information li:nth-child(4) {
  transition-delay: 1s;
}
.card:hover .card-body .card-information li:nth-child(5) {
  transition-delay: 1.25s;
}
.card:hover .card-body .card-information li:nth-child(6) {
  transition-delay: 1.5s;
}
.card .card-header {
  position: relative;
  background-color: #9e9a95;
  height: 200px;
  margin: -20px -20px 5px -20px;
  transition: height 0.5s;
  overflow: hidden;
}
.card .card-header .card-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  display: block;
  width: 300px;
  height: auto;
  transition: transform 0.5s;
}
.card .card-body {
  height: 180px;
  transition: height 0.5s;
  overflow: hidden;
}
.card .card-body .card-information {
  margin-top: 10px;
  color: #424242;
}
.card .card-body .card-information li {
  margin-top: 5px;
  transition-duration: 0;
  transition-delay: 0.5s;
  transform: translateX(-100%);
}
.place-info {
  width: auto;
  height: auto;
}
.kaisei-medium {
  font-family: "Kaisei Decol", serif;
  font-weight: medium;
}
.liked {
  color: #ff8882;
}
.bookmarked {
  color: #efdc71;
}
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
.icon-color-blue {
  color: #4f5666;
}
</style>