<template>
  <div>
    <!-- Search -->
    <div class="navypink-bg h-auto">
      <p class="small-title-navypink text-center p-10">Search</p>
      <div class="h-auto animate__animated">
        <p
          class="
            text-beige text-center
            my-5
            mx-10
            kaisei-medium
            sm:text-base
            md:text-2xl
            lg:text-2xl
            xl:text-2xl
            2xl:text-2xl
          "
        >
          旅先で、現在地周辺のお店を探してみてください
        </p>
        <div class="bg-none pt-10 pb-24">
          <!-- search area (検索エリア) -->
          <div class="search-area">
            <div class="search-form">
              <form class="pt-16">
                <div class="flex justify-center items-center">
                  <div class="flex justify-center items-center">
                    <div
                      class="
                        relative
                        select
                        sm:w-40
                        md:w-56
                        lg:w-72
                        xl:w-72
                        2xl:w-72
                        w-24
                      "
                    >
                      <select
                        v-model="genre"
                        class="
                          sel-form
                          select-text
                          block
                          appearance-none
                          sm:w-40
                          md:w-56
                          lg:w-72
                          xl:w-72
                          2xl:w-72
                          w-24
                          leading-tight
                          px-5
                          py-3
                          focus:outline-none
                        "
                      >
                        <option value="" class="kaisei-medium lora">
                          すべて
                        </option>
                        <option value="G005" class="kaisei-medium lora">
                          洋食
                        </option>
                        <option value="G004" class="kaisei-medium lora">
                          和食
                        </option>
                        <option value="G007" class="kaisei-medium lora">
                          中華
                        </option>
                        <option value="G006" class="kaisei-medium lora">
                          Italian&French
                        </option>
                        <option value="G017" class="kaisei-medium lora">
                          韓国料理
                        </option>
                        <option value="G009" class="kaisei-medium lora">
                          Asian&Ethnic
                        </option>
                        <option value="G010" class="kaisei-medium lora">
                          各国料理
                        </option>
                        <option value="G003" class="kaisei-medium lora">
                          創作料理
                        </option>
                        <option value="G001" class="kaisei-medium lora">
                          居酒屋
                        </option>
                        <option value="G002" class="kaisei-medium lora">
                          Bar
                        </option>
                        <option value="G016" class="kaisei-medium lora">
                          お好み焼き
                        </option>
                        <option value="G013" class="kaisei-medium lora">
                          ラーメン
                        </option>
                        <option value="G014" class="kaisei-medium lora">
                          カフェ
                        </option>
                        <option value="G015" class="kaisei-medium lora">
                          その他
                        </option>
                      </select>
                      <span class="select-highlight"></span>
                      <span
                        class="
                          select-bar
                          sm:w-40
                          md:w-56
                          lg:w-72
                          xl:w-72
                          2xl:w-72
                          w-24
                        "
                      ></span>
                      <label class="select-label">Genre</label>
                    </div>
                  </div>
                  <div class="area flex justify-center items-center px-10">
                    <div
                      class="
                        relative
                        select
                        sm:w-40
                        md:w-56
                        lg:w-72
                        xl:w-72
                        2xl:w-72
                        w-24
                      "
                    >
                      <select
                        v-model="radius"
                        class="
                          select-text
                          block
                          appearance-none
                          sm:w-40
                          md:w-56
                          lg:w-72
                          xl:w-72
                          2xl:w-72
                          w-24
                          leading-tight
                          px-4
                          py-3
                          rounded-l
                          focus:outline-none
                        "
                      >
                        <option
                          value=""
                          hidden
                          disabled
                          selected
                          class="kaisei-medium lora"
                        ></option>
                        <option value="2" class="kaisei-medium lora">
                          半径 500 m以内
                        </option>
                        <option value="3" class="kaisei-medium lora">
                          半径 1 km以内
                        </option>
                        <option value="5" class="kaisei-medium lora">
                          半径 3 km以内
                        </option>
                      </select>
                      <span class="select-highlight"></span>
                      <span
                        class="
                          select-bar
                          sm:w-40
                          md:w-56
                          lg:w-72
                          xl:w-72
                          2xl:w-72
                          w-24
                        "
                      ></span>
                      <label class="select-label">Area</label>
                    </div>
                  </div>
                  <div class="flex justify-center items-center">
                    <button
                      type="submit"
                      @click.prevent="getCurrentLatLng"
                      class="
                        search-button
                        rounded
                        bg-none
                        text-white text-center
                        uppercase
                      "
                    >
                      〇
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- fetching status -->
      <span v-show="currentState === 'IS_FETCHING'">
        <div class="py-12 text-center">
          <span class="material-icons md-48"> loop </span>
        </div>
      </span>
      <!-- failed status -->
      <span v-show="currentState === 'IS_FAILED'">
        <p
          class="
            text-beige text-center
            py-12
            kaisei-medium
            sm:text-base
            md:text-2xl
            lg:text-2xl
            xl:text-2xl
            2xl:text-2xl
          "
        >
          データの取得に失敗しました<br />
          categoryとareaの両方を選択しているか確認してください
        </p>
      </span>
    </div>
    <!-- Place Serch Results (検索結果)-->
    <div v-show="currentState === 'IS_FOUND'" class="navypink-bg h-auto">
      <p class="place-title text-center p-10">Places</p>
      <p
        class="
          animate__animated
          text-beige text-center
          my-5
          mx-10
          kaisei-medium
          text-sm
          sm:text-base
          md:text-2xl
          lg:text-2xl
          xl:text-2xl
          2xl:text-2xl
        "
        v-show="resultState === 'GET_DATA'"
      >
        現在地から{{ radiusName }}にある{{ genreName }}のお店一覧です
      </p>
      <p
        class="
          animate__animated

          text-beige text-center
          my-5
          kaisei-medium
          sm:text-base
          md:text-2xl
          lg:text-2xl
          xl:text-2xl
          2xl:text-2xl
        "
        v-show="resultState === 'NO_DATA'"
      >
        現在地から{{ radiusName }}に{{ genreName }}のお店はありませんでした
      </p>
      <div class="animate__animated">
        <div
          id="shop"
          class="
            flex
            justify-center
            items-start
            flex-row flex-wrap
            px-5
            navypink-bg
            h-auto
          "
        >
          <div v-for="(place, index) in places" :key="index">
            <!-- shop layout -->
            <div class="m-4">
              <!-- shop image -->
              <div class="place-image text-center mx-3">
                <img
                  :src="place.photo"
                  width="300"
                  height="300"
                  class="place-photo"
                />
              </div>
              <!-- shop description and button(favorite and mark) -->
              <div class="place-description">
                <!-- shop name -->
                <div class="place-name m-3 text-center">
                  <p class="text-beige text-center kaisei-medium my-5">
                    {{ place.name }}
                  </p>
                  <p class="text-beige text-center kaisei-medium text-xs my-4">
                    {{ place.access }}
                  </p>
                </div>
                <!-- button-area-gap -->
                <div class="button-area-gap"></div>
                <!-- button (favorite and mark) -->
                <div class="button-area grid grid-cols-6">
                  <div class="col-span-4"></div>
                  <!-- favorite button -->
                  <div class="flex justify-center items-center">
                    <button
                      @click="$store.dispatch('onFavorite', place)"
                      :disabled="!$store.state.user.isLogin"
                      v-if="$store.state.userFavPlace.indexOf(place.id) === -1"
                    >
                      <i class="far fa-heart fa-lg"></i>
                    </button>
                    <button
                      @click="$store.dispatch('delFavorite', place)"
                      :disabled="!$store.state.user.isLogin"
                      v-else
                    >
                      <i class="fas fa-heart fa-lg liked"></i>
                    </button>
                  </div>
                  <!-- mark button -->
                  <div class="flex justify-center items-center">
                    <button
                      @click="$store.dispatch('onBookmark', place)"
                      :disabled="!$store.state.user.isLogin"
                      v-if="$store.state.userBmPlace.indexOf(place.id) === -1"
                    >
                      <i class="far fa-bookmark fa-lg"></i>
                    </button>
                    <button
                      @click="$store.dispatch('delBookmark', place)"
                      :disabled="!$store.state.user.isLogin"
                      v-else
                    >
                      <i class="fas fa-bookmark fa-lg bookmarked"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allDataNum: 0,
      countNum: 0,
      currentState: "IS_INITIALIZED",
      genre: "",
      genreName: "",
      lat: "",
      lng: "",
      places: [],
      radius: "",
      radiusName: "",
      resultState: "",
      startNum: 1,
    };
  },
  methods: {
    // 現在地の緯度と経度の取得
    getCurrentLatLng() {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.radiusName = await this.checkRadius();
          this.genreName = await this.checkGenre();
          await this.firstSetting();
          await this.searchPlace();
        },
        (error) => {
          this.currentState = "IS_FAILED";
          console.log(error.message);
        }
      );
    },
    checkRadius() {
      return this.radius === "2"
        ? "半径500m以内"
        : this.radius === "3"
        ? "半径1km以内"
        : this.radius === "5"
        ? "半径3km以内"
        : "";
    },
    checkGenre() {
      return this.genre === "G001"
        ? "居酒屋"
        : this.genre === "G004"
        ? "和食"
        : this.genre === "G005"
        ? "洋食"
        : this.genre === "G006"
        ? "Italian&French"
        : this.genre === "G007"
        ? "中華"
        : this.genre === "G008"
        ? "焼肉"
        : this.genre === "G017"
        ? "韓国料理"
        : this.genre === "G003"
        ? "創作料理"
        : this.genre === "G002"
        ? "Bar"
        : this.genre === "G009"
        ? "Asian&Ethnic"
        : this.genre === "G010"
        ? "各国料理"
        : this.genre === "G013"
        ? "ラーメン"
        : this.genre === "G016"
        ? "お好み焼き系"
        : this.genre === "G014"
        ? "カフェ"
        : this.genre === "G015"
        ? "その他"
        : "すべて";
    },
    firstSetting() {
      this.currentState = "IS_FETCHING";
      this.startNum = 1;
      this.allDataNum = null;
      this.countNum = 0;
      this.places = [];
      console.log(this.genreName);
      console.log(this.radiusName);
    },
    // 現在地周辺の地図とお店の取得
    async searchPlace() {
      this.resultState = "GET_DATA";
      // お店のデータ取得
      while(this.allDataNum !== this.countNum){      
        await this.getPlaceData();
        this.countNum += this.getDataNum;
        this.startNum = this.countNum + 1;
        console.log(this.allDataNum);
        console.log(this.countNum);
        if (this.allDataNum === 0) {
        this.resultState = "NO_DATA";
        }
        console.log(this.resultState);
      }
    },
    async getPlaceData() {
      await this.$axios
        .$get(
          `/api/hotpepper/gourmet/v1/?key=${process.env.NUXT_APP_HOTPEPPER_APIKEY}&lat=${this.lat}&lng=${this.lng}&range=${this.radius}&genre=${this.genre}&order=4&format=json&start=${this.startNum}&count=100`
        )
        .then((res) => {
          this.currentState = "IS_FOUND";
          const data = res.results.shop;
          // お店の情報をplacesに格納
          this.places = data.map((element) => {
            const placeAccess = element.access ?? "";
            const placeAddress = element.address ?? "";
            const placeAverage = element.budget?.average ?? "";
            const placeCatch = element.genre?.catch ?? "";
            const placeId = element.id ?? "";
            const placeName = element.name ?? "";
            const placeOpen = element.open ?? "";
            const placePhoto = element.photo?.pc?.l ?? "";
            const placeUrl = element.urls?.pc ?? "";
            const placeData = {
              id: placeId,
              name: placeName,
              address: placeAddress,
              access: placeAccess,
              average: placeAverage,
              catchcopy: placeCatch,
              open: placeOpen,
              photo: placePhoto,
              url: placeUrl,
            };
            return placeData;
          });
          // 取得できる全てのデータ数
          this.allDataNum = res.results.results_available;
          // この処理で取得したデータ数
          this.getDataNum = Number(res.results.results_returned);
        })
        .catch(() => {
          console.log("エラー");
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&family=Parisienne&display=swap");
/* background */
.navypink-bg {
  background-color: #a76e63;
  background: linear-gradient(to right, #ab766b, #9f6054, #945447);
}
/* title */
.small-title-navypink {
  font-size: 100px;
  color: #a76e63;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #966258, 0 2px #8d5c53, 0 3px #885950, 0 4px #80544b,
    0 5px #7b5148, 0 6px #744c44, 0 7px #6f4841, 0 8px #68433c, 0 9px #5f3e37,
    0 10px 8px #523530;
}
.place-title {
  color: #f2ebe5;
  transition: 0.2s ease all;
  text-align: center;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #966258, 0 2px #8d5c53, 0 3px #885950, 0 4px #80544b,
    0 5px #7b5148, 0 6px #744c44, 0 7px #6f4841, 0 8px #68433c, 0 9px #5f3e37,
    0 10px 8px #523530;
}
@media screen and (max-width: 480px) {
  .small-title-navypink {
    font-size: 50px;
  }
  .place-title {
    font-size: 50px;
  }
  .select-text {
    font-size: 10px;
  }
  .select-text:focus ~ .select-label,
  .select-text:valid ~ .select-label {
    font-size: 15px;
    top: -60px;
  }
  .select:after {
    top: 5px;
  }
  .select-text:focus ~ .select-bar:before,
  .select-text:focus ~ .select-bar:after {
    width: 62%;
  }
}
@media screen and (min-width: 480px) and (max-width: 684px) {
  .small-title-navypink {
    font-size: 50px;
  }
  .place-title {
    font-size: 50px;
  }
  .select-text {
    font-size: 10px;
  }
  .select-text:focus ~ .select-label,
  .select-text:valid ~ .select-label {
    font-size: 15px;
    top: -60px;
  }
  .select:after {
    top: 5px;
  }
  .select-text:focus ~ .select-bar:before,
  .select-text:focus ~ .select-bar:after {
    width: 62%;
  }
}
@media screen and (min-width: 640px) and (max-width: 768px) {
  .small-title-navypink {
    font-size: 70px;
  }
  .place-title {
    font-size: 70px;
  }
  .select-text {
    font-size: 20px;
  }
  .select-text:focus ~ .select-label,
  .select-text:valid ~ .select-label {
    font-size: 40px;
    top: -80px;
  }
  .select:after {
    top: 17px;
  }
  .select-text:focus ~ .select-bar:before,
  .select-text:focus ~ .select-bar:after {
    width: 106%;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .small-title-navypink {
    font-size: 100px;
  }
  .place-title {
    font-size: 100px;
  }
  .select-text {
    font-size: 25px;
  }
  .select-text:focus ~ .select-label,
  .select-text:valid ~ .select-label {
    font-size: 50px;
    top: -100px;
  }
  .select:after {
    top: 30px;
  }
  .select-text:focus ~ .select-bar:before,
  .select-text:focus ~ .select-bar:after {
    width: 149%;
  }
}
@media screen and (min-width: 1024px) {
  .small-title-navypink {
    font-size: 100px;
  }
  .place-title {
    font-size: 100px;
  }
  .select-text {
    font-size: 30px;
  }
  .select-text:focus ~ .select-label,
  .select-text:valid ~ .select-label {
    font-size: 50px;
    top: -100px;
  }
  .select:after {
    top: 30px;
  }
  .select-text:focus ~ .select-bar:before,
  .select-text:focus ~ .select-bar:after {
    width: 192%;
  }
}
/* text font */
.lora {
  font-family: "Lora", serif;
}
.kaisei-medium {
  font-family: "Kaisei Decol", serif;
  font-weight: medium;
}
/* serch form */
select {
  background-color: transparent;
  line-height: 2em;
}

option {
  background-color: #a76e63;
}
.select {
  font-family: "Lora", serif;
  font-family: "Kaisei Decol", serif;
  font-weight: medium;
  position: relative;
}
.select-text {
  position: relative;
  font-family: inherit;
  padding: 10px 10px 10px 0;
  color: #f2ebe5;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  text-shadow: 0 1px #966258, 0 2px #8d5c53, 0 3px #885950, 0 4px #80544b,
    0 5px #7b5148, 0 6px #744c44, 0 7px #6f4841, 0 8px #68433c, 0 9px #5f3e37,
    0 10px 8px #523530;
}
.select-text:focus {
  outline: none;
}
.select .select-text {
  appearance: none;
  -webkit-appearance: none;
  text-align: center;
}
.select:after {
  position: absolute;
  right: 10px;
  /* Styling the down arrow */
  width: 0;
  height: 0;
  padding: 0;
  text-align: center;
  content: "▼";
  color: #f2ebe5;
  text-shadow: 0 1px #966258, 0 2px #8d5c53, 0 3px #885950, 0 4px #80544b,
    0 5px #7b5148, 0 6px #744c44, 0 7px #6f4841, 0 8px #68433c, 0 9px #5f3e37,
    0 10px 8px #523530;
  pointer-events: none;
  transition: 0.3s ease all;
}
.select:hover:after {
  transform: translate(0px, 10px);
  text-shadow: none;
}
.select-label {
  color: rgba(0, 0, 0, 0.26);
  font-size: 50px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 10px;
  transition: 0.2s ease all;
}
.select-text:focus ~ .select-label,
.select-text:valid ~ .select-label {
  color: #f2ebe5;
  transition: 0.2s ease all;
  text-align: center;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #966258, 0 2px #8d5c53, 0 3px #885950, 0 4px #80544b,
    0 5px #7b5148, 0 6px #744c44, 0 7px #6f4841, 0 8px #68433c, 0 9px #5f3e37,
    0 10px 8px #523530;
}
.select-bar {
  position: relative;
  display: block;
  width: 150px;
}
.select-bar:before,
.select-bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 0px;
  position: absolute;
  background: #f2ebe5;
  transition: 0.2s ease all;
}
.select-highlight {
  position: absolute;
  height: 60%;
  width: 50%;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

/* serch button (検索ボタン) */
.search-button {
  display: inline-block;
  position: relative;
  font-size: 50px;
  color: #f2ebe5;
  text-shadow: 0 1px #966258, 0 2px #8d5c53, 0 3px #885950, 0 4px #80544b,
    0 5px #7b5148, 0 6px #744c44, 0 7px #6f4841, 0 8px #68433c, 0 9px #5f3e37,
    0 10px 8px #523530;
  transition: all 0.5s ease;
}
.search-button::before {
  position: absolute;
  top: 45px;
  left: 31px;
  transform: rotate(-45deg);
  width: 0.1em;
  height: 0.5em;
  content: "i";
  color: #f2ebe5;
  font-size: 30px;
  text-shadow: -1px 1px #966258, -1px 2px #8d5c53, -2px 3px #885950,
    -3px 4px #80544b, -4px 5px #7b5148, -5px 6px #744c44, -6px 7px #6f4841,
    -7px 8px #68433c, -8px 9px #5f3e37, -9px 10px 8px #523530;
  transition: all 0.5s ease;
}
.search-button:hover {
  transform: translate(0px, 10px);
  text-shadow: none;
}
.search-button:hover::before {
  transform: translate(0px, 10px);
  transform: rotate(-45deg);
  text-shadow: none;
}

/* place card layout */
#photos li {
  display: inline-box;
  float: left;
}
.button-area-gap {
  width: 300px;
  height: 10px;
}
.button-area {
  width: 300px;
  height: 40px;
}

/* favorite and bookmark button */
button:disabled {
  opacity: 0.4;
}
.liked {
  color: #ff8882;
}
.bookmarked {
  color: #efdc71;
}
.marked {
  color: #efdc71;
}
.icon-color-yellow {
  color: #efdc71;
}
.place-image {
  width: 300px;
  -moz-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  -webkit-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  -ms-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
}
.place-name {
  width: 300px;
  height: auto;
}
/* 回転するアニメーション */
.material-icons.md-48 {
  font-size: 48px;
  color: #f2ebe5;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>