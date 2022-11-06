<template>
  <div>
    <div class="user-activities navyblue-bg">
      <!-- title -->
      <div class="p-10">
        <p
          class="
            title
            text-center text-6xl
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            xl:text-9xl
            2xl:text-9xl
          "
        >
          User Activity
        </p>
        <div class="animate__animated animate__fadeInUp mt-7">
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
            全ユーザのアクティビティです
          </p>
        </div>
        <div class="flex justify-center">
          <div
            class="
              flex
              justify-end
              items-center
              mt-5
              sm:w-11/12
              md:w-11/12
              lg:w-4/5
              xl:w-4/5
              2xl:w-4/5
              w-11/12
            "
          ></div>
        </div>
      </div>
      <div class="flex items-start justify-center flex-row flex-wrap p-5">
        <div v-for="(information, index) in activities" :key="index">
          <div class="relative m-7 animate__animated animate__fadeInUp">
            <!-- User Action -->
            <span class="absolute user-action">
              <span class="flex justify-start items-center">
                <p class="text-xl mx-1 text-lightgray lora-bold user-name">
                  {{ information.userName }}
                </p>
                <p
                  class="text-sm lora mx-1"
                  :class="{
                    liked: information.action === 'favorite',
                    bookmarked: information.action === 'mark',
                  }"
                >
                  {{ information.action }}
                </p>
                <p class="text-sm mx-1 text-lightgray lora">
                  {{ information.createdAt }}
                </p>
              </span>
            </span>
            <!-- shop layout -->
            <div class="card">
              <!-- shop image -->
              <div class="card-header">
                <img
                  :src="information.photo"
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
                        {{ information.name }}
                      </p>
                      <p
                        class="
                          text-navyblue text-center
                          kaisei-medium
                          text-xs
                          my-2
                        "
                      >
                        {{ information.catchCopy }}
                      </p>
                    </div>
                    <p class="text-navyblue kaisei-medium text-xs my-2">
                      {{ information.access }}
                    </p>
                  </div>
                  <!-- button (favorite and mark) -->
                  <div class="flex justify-end items-center">
                    <!-- favorite button -->
                    <div class="p-2">
                      <button
                        @click="onFavorite(information)"
                        :disabled="!$store.state.user.isLogin"
                        v-if="
                          $store.state.userFavPlace.indexOf(information.id) ===
                          -1
                        "
                      >
                        <i class="far fa-heart fa-lg"></i>
                      </button>
                      <button
                        @click="delFavorite(information)"
                        :disabled="!$store.state.user.isLogin"
                        v-else
                      >
                        <i class="fas fa-heart fa-lg liked"></i>
                      </button>
                    </div>
                    <!-- mark button -->
                    <div class="p-2">
                      <button
                        @click="onBookmark(information)"
                        :disabled="!$store.state.user.isLogin"
                        v-if="
                          $store.state.userBmPlace.indexOf(information.id) ===
                          -1
                        "
                      >
                        <i class="far fa-bookmark fa-lg"></i>
                      </button>
                      <button
                        @click="delBookmark(information)"
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
                    {{ information.address }}
                  </li>
                  <li class="text-navyblue kaisei-medium text-xs">
                    予算:{{ information.average }}
                  </li>
                  <li class="text-navyblue kaisei-medium text-xs">
                    Open:{{ information.open }}
                  </li>
                  <li class="text-navyblue kaisei-medium text-xs">
                    <a :href="information.url" target="_blank">
                      さらに詳しい情報こちら
                      <i class="fas fa-external-link-alt icon-color-blue"></i>
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div class="loader-wrap text-center" v-if="!isAllData">
        <button class="text state-data" @click="getMoreActivityData">
          More
        </button>
      </div>
      <div class="loader-wrap text-center" v-if="!isExistData">
        <div class="text state-data">NO DATA</div>
      </div>
      <div class="loader-wrap text-center" v-if="isAllData">
        <div class="text state-data">ALL DATA</div>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FirebaseService from "~/services/firebaseService";
export default {
  computed: {
    ...mapGetters(["user", "userFavPlace", "userBmPlace"]),
  },
  middleware: "auth",
  data() {
    return {
      activities: [],
      countNum: -1,
      nextToken: null,
      isAllData: false,
      isExistData: true,
    };
  },
  async created() {
    const allDataNum = await FirebaseService.getActivityCountNum();
    if (allDataNum === 0) {
      this.isExistData = false;
    }
    this.countNum = allDataNum;
    await this.getActivityData(10);
  },
  methods: {
    // さらにデータを取得
    async getMoreActivityData() {
      try {
        if (this.countNum < 10 && this.countNum > 0) {
          await this.getActivityData(this.countNum);
          this.isAllData = true;
        } else {
          await this.getActivityData(10);
        }
      } catch (e) {
        alert("データを取得できませんでした");
      }
    },
    // activityデータを取得
    async getActivityData(num) {
      const getActivityData = await FirebaseService.getActivitiesData(
        num,
        this.nextToken
      );
      this.activities = this.activities.concat(getActivityData.activityData);
      this.nextToken = getActivityData.nextToken;
      this.countNum -= getActivityData.activityData.length;
    },
    async onFavorite(place) {
      await this.$store.dispatch("onFavorite", place);
      // 現在の時刻を取得
      const now = new Date();
      const createTime = `${now.getFullYear()}/${
        now.getMonth() + 1
      }/${now.getDate()}/${now.getHours()}/${now.getMinutes()}/${now.getSeconds()}`;
      // activitiesにデータを追加
      const placeData = {
        ...place,
        userName: this.user.name,
        createdAt: createTime,
        action: "favorite",
      };
      this.activities.unshift(placeData);
    },
    async delFavorite(place) {
      await this.$store.dispatch("delFavorite", place);
      // 削除するデータ
      const deleteData = this.activities.find(
        (placeData) =>
          placeData.id === place.id &&
          placeData.userName === this.user.name &&
          placeData.action === "favorite"
      );
      this.activities = this.activities.filter(
        (placeData) => placeData !== deleteData
      );
    },
    async onBookmark(place) {
      await this.$store.dispatch("onBookmark", place);
      // 現在の時刻を取得
      const now = new Date();
      const createTime = `${now.getFullYear()}/${
        now.getMonth() + 1
      }/${now.getDate()}/${now.getHours()}/${now.getMinutes()}/${now.getSeconds()}`;
      // activitiesにデータを追加
      const placeData = {
        ...place,
        userName: this.user.name,
        createdAt: createTime,
        action: "mark",
      };
      this.activities.unshift(placeData);
    },
    async delBookmark(place) {
      await this.$store.dispatch("delBookmark", place);
      // 削除するデータ
      const deleteData = this.activities.find(
        (placeData) =>
          placeData.id === place.id &&
          placeData.userName === this.user.name &&
          placeData.action === "mark"
      );
      this.activities = this.activities.filter(
        (placeData) => placeData !== deleteData
      );
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&display=swap");
.kaisei-medium {
  font-family: "Kaisei Decol", serif;
  font-weight: medium;
}
.user-activities {
  min-height: 100vh;
  position: relative; /*←相対位置*/
  padding-bottom: 60px; /*←footerの高さ*/
  box-sizing: border-box;
}
.title {
  color: #f2ebe5;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #5f6571, 0 2px #5d626e, 0 3px #5a5f6b, 0 4px #575c68,
    0 5px #545965, 0 6px #515661, 0 7px #4e535e, 0 8px #4b505b, 0 9px #454954,
    0 10px 8px #41454f;
}
.state-data {
  color: #6b717f;
  font-family: "Lora", serif;
  font-weight: bold;
  font-size: 30px;
  text-shadow: 0 1px #5f6571, 0 2px #5a5f6b, 0 3px #545965, 0 4px #4e535e,
    0 5px #454954, 0 6px 5px #41454f;
}
.navyblue-bg {
  background-color: #5e636f;
  background: linear-gradient(to right, #636772, #5c626f, #4f5666);
}
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
.liked {
  color: #ff8882;
}
.bookmarked {
  color: #efdc71;
}
.icon-color-blue {
  color: #4f5666;
}
.user-action {
  display: inline-block;
  transform-origin: left top;
  transform: rotate(90deg);
}
.lora-bold {
  font-family: "Lora", serif;
  font-weight: bold;
}
.lora {
  font-family: "Lora", serif;
}
.user-name {
  text-shadow: 0 1px #5f6571, 0 2px #5a5f6b, 0 3px #545965, 0 4px #515661,
    0 5px #4b505b, 0 6px 5px #41454f;
}
</style>