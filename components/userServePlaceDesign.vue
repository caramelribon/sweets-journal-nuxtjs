<template>
  <div>
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
    <section class="tabs-content p-5">
      <section>
        <div class="flex items-start justify-center flex-row flex-wrap p-5">
          <div
            v-for="place in (userServePlaces =
              activeTab === 'favorite'
                ? userServeFavoritePlaces
                : userServeBookmarkPlaces)"
            :key="place.id"
          >
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
                        :disabled="!user.isLogin"
                        v-if="userFavPlace.indexOf(place.id) === -1"
                      >
                        <i class="far fa-heart fa-lg"></i>
                      </button>
                      <button
                        @click="delFavorite(place)"
                        :disabled="!user.isLogin"
                        v-else
                      >
                        <i class="fas fa-heart fa-lg liked"></i>
                      </button>
                    </div>
                    <!-- mark button -->
                    <div class="p-2">
                      <button
                        @click="onBookmark(place)"
                        :disabled="!user.isLogin"
                        v-if="userBmPlace.indexOf(place.id) === -1"
                      >
                        <i class="far fa-bookmark fa-lg"></i>
                      </button>
                      <button
                        @click="delBookmark(place)"
                        :disabled="!user.isLogin"
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
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FirebaseService from "~/services/firebaseService";
export default {
  computed: {
    ...mapGetters(["user", "userFavPlace", "userBmPlace"]),
  },
  data() {
    return {
      activeTab: "favorite",
      userServeFavoritePlaces: [],
      userServeBookmarkPlaces: [],
    };
  },
  async created() {
    // ユーザが登録しているお店の情報の取得
    this.userServeFavoritePlaces = await FirebaseService.userRegisteredPlaces(
      "favorite",
      this.user.id
    );
    this.userServeBookmarkPlaces = await FirebaseService.userRegisteredPlaces(
      "bookmark",
      this.user.id
    );
  },
  methods: {
    onFavorite(place) {
      this.$store.dispatch("onFavorite", place);
      // userServeBookmarkPlacesの方でfavoriteしたお店の情報がuserServeFavoritePlacesになかった場合、追加する
      if (this.userServeFavoritePlaces.indexOf(place.id) === -1) {
        const placeFavoriteData = this.userServeBookmarkPlaces.filter(
          (placeData) => placeData.id === place.id
        );
        this.userServeFavoritePlaces.unshift(placeFavoriteData[0]);
      }
    },
    delFavorite(place) {
      this.$store.dispatch("delFavorite", place);
      this.userServeFavoritePlaces = this.userServeFavoritePlaces.filter(
        (placeData) => placeData.id !== place.id
      );
    },
    onBookmark(place) {
      this.$store.dispatch("onBookmark", place);
      // userServeFavoritePlacesの方でbookmarkしたお店の情報がuserServeBookmarkPlacesになかった場合、追加する
      if (this.userServeBookmarkPlaces.indexOf(place.id) === -1) {
        const placeBookmarkData = this.userServeFavoritePlaces.filter(
          (placeData) => placeData.id === place.id
        );
        console.log(placeBookmarkData);
        this.userServeBookmarkPlaces.unshift(placeBookmarkData[0]);
      }
    },
    delBookmark(place) {
      this.$store.dispatch("delBookmark", place);
      this.userServeBookmarkPlaces = this.userServeBookmarkPlaces.filter(
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
