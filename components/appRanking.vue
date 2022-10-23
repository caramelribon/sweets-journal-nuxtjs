<template>
  <!-- Ranking (ランキング) -->
  <div class="beige-bg h-auto">
    <p class="small-title-beige text-center p-10">Ranking</p>
    <div class="animate__animated">
      <div class="h-auto py-3">
        <div class="row-span-1">
          <p
            class="
              text-nvybrown text-center text-sm
              sm:text-base
              md:text-2xl
              lg:text-2xl
              xl:text-2xl
              2xl:text-2xl
              my-5
              mx-10
              kaisei-medium
            "
          >
            お気に入りのお店ランキングと気になるお店ランキングの上位のお店です
          </p>
          <div class="flex justify-center" v-show="!$store.state.user.login">
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
            >
              <button
                class="block lora-bold text-lightgray text-lg text-center"
              >
                AllRanking
                <p class="text-xs text-nvybrown kaisei-medium">
                  お店のランキングはこちら
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Favorite -->
      <div class="ranking pb-10">
        <p class="ranking-title p-5 text-center">Favorits</p>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(favorite, index) in favorites" :key="index">
            <div class="flex items-start justify-center flex-row flex-wrap p-5">
              <div class="ranking-fav">
                <div class="ranking-no my-3">
                  <p class="parisienne text-center text-nvybrown text-5xl">
                    No.{{ favorite.no }}
                  </p>
                </div>
                <!-- shop layout -->
                <div class="bg-none">
                  <!-- shop image -->
                  <div class="ranking-layout">
                    <div>
                      <img
                        :src="favorite.photo"
                        class="photo-position"
                        width="300"
                        height="300"
                      />
                    </div>
                    <!-- shop description and button(favorite and mark) -->
                    <div class="place-data">
                      <div class="shop-description">
                        <!-- shop name -->
                        <div class="place-info m-2 text-center">
                          <div class="my-1">
                            <p class="text-navyblue text-center kaisei-medium">
                              {{ favorite.name }}
                            </p>
                            <p
                              class="
                                text-navyblue text-center
                                kaisei-medium
                                text-xs
                                my-2
                              "
                            >
                              {{ favorite.catchcopy }}
                            </p>
                          </div>
                          <p class="text-navyblue kaisei-medium text-xs my-2">
                            {{ favorite.access }}
                          </p>
                        </div>
                      </div>
                      <ul class="card-information my-3">
                        <li class="text-navyblue kaisei-medium text-xs mx-8">
                          {{ favorite.address }}
                        </li>
                        <li class="text-navyblue kaisei-medium text-xs mx-8">
                          予算:{{ favorite.average }}
                        </li>
                        <li class="text-navyblue kaisei-medium text-xs mx-8">
                          Open:{{ favorite.open }}
                        </li>
                        <li class="text-navyblue kaisei-medium text-xs mx-8">
                          <a
                            :href="favorite.url"
                            target="_blank"
                            class="text-sm text-lgtpink my-2"
                          >
                            さらに詳しい情報こちら
                            <i
                              class="fas fa-external-link-alt icon-color-blue"
                            ></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <!-- Bookmark -->
      <div class="ranking pb-10">
        <p class="ranking-title p-5 text-center">Marks</p>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(bookmark, index) in bookmarks" :key="index">
            <div class="flex items-start justify-center flex-row flex-wrap p-5">
              <div class="ranking-fav">
                <div class="ranking-no my-3">
                  <p class="parisienne text-center text-nvybrown text-5xl">
                    No.{{ bookmark.no }}
                  </p>
                </div>
                <!-- shop layout -->
                <div class="bg-none">
                  <!-- shop image -->
                  <div class="ranking-layout">
                    <div>
                      <img
                        :src="bookmark.photo"
                        class="photo-position"
                        width="300"
                        height="300"
                      />
                    </div>
                    <!-- shop description and button(favorite and mark) -->
                    <div class="place-data">
                      <div class="shop-description">
                        <!-- shop name -->
                        <div class="place-info m-2 text-center">
                          <div class="my-1">
                            <p class="text-navyblue text-center kaisei-medium">
                              {{ bookmark.name }}
                            </p>
                            <p
                              class="
                                text-navyblue text-center
                                kaisei-medium
                                text-xs
                                my-2
                              "
                            >
                              {{ bookmark.catchcopy }}
                            </p>
                          </div>
                          <p class="text-navyblue kaisei-medium text-xs my-2">
                            {{ bookmark.access }}
                          </p>
                        </div>
                      </div>
                      <ul class="card-information my-3">
                        <li class="text-navyblue kaisei-medium text-xs mx-8">
                          {{ bookmark.address }}
                        </li>
                        <li class="text-navyblue kaisei-medium text-xs mx-8">
                          予算:{{ bookmark.average }}
                        </li>
                        <li class="text-navyblue kaisei-medium text-xs mx-8">
                          Open:{{ bookmark.open }}
                        </li>
                        <li class="text-navyblue kaisei-medium text-xs mx-8">
                          <a
                            :href="bookmark.url"
                            target="_blank"
                            class="text-sm text-lgtpink my-2"
                          >
                            さらに詳しい情報こちら
                            <i
                              class="fas fa-external-link-alt icon-color-blue"
                            ></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { getRankingTop } from "~/services/firebaseService";
export default {
  data() {
    return {
      bookmarks: [],
      favorites: [],
      swiperOption: {
        speed: 1000,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 8000,
          disableOnInteraction: false,
        },
      },
    };
  },
  async created() {
    // Ranking上位のお店の情報を取得
    const rankingFav = await getRankingTop("favorite").catch((err) => {
      console.log("Can not get data of favorite ranking", err);
    });
    for (let i = 0; i < rankingFav.length; i += 1) {
      const dataFav = rankingFav[i];
      const placeData = {
        id: dataFav.id,
        name: dataFav.name,
        address: dataFav.address,
        access: dataFav.access,
        average: dataFav.average,
        catchcopy: dataFav.catchcopy,
        open: dataFav.open,
        photo: dataFav.photo,
        url: dataFav.url,
        no: i + 1,
      };
      this.favorites.push(placeData);
    }
    const rankingBm = await getRankingTop("mark").catch((err) => {
      console.log("Can not get data of bookmark ranking", err);
    });
    for (let i = 0; i < rankingBm.length; i += 1) {
      const dataBm = rankingBm[i];
      const placeData = {
        id: dataBm.id,
        name: dataBm.name,
        address: dataBm.address,
        access: dataBm.access,
        average: dataBm.average,
        catchcopy: dataBm.catchcopy,
        open: dataBm.open,
        photo: dataBm.photo,
        url: dataBm.url,
        no: i + 1,
      };
      this.bookmarks.push(placeData);
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&family=Parisienne&display=swap");
/* background */
.beige-bg {
  background-color: #f2ebe5;
  background: linear-gradient(to right, #f2ebe5, #eee5de, #eae2da);
}
/* title */
.small-title-beige {
  font-size: 100px;
  color: #f2ebe5;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #dfd8d3, 0 2px #d1cac5, 0 3px #c2bcb7, 0 4px #b8b2ac,
    0 5px #b1aba6, 0 6px #aaa49f, 0 7px #a19b96, 0 8px #99938e, 0 9px #918b86,
    0 10px 8px #88837e;
}
.ranking-title {
  font-size: 50px;
  color: #a76e63;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #dfd8d3, 0 2px #c2bcb7, 0 3px #b1aba6, 0 4px #a19b96,
    0 5px #99938e, 0 6px 5px #88837e;
}
@media screen and (max-width: 480px) {
  .small-title-beige {
    font-size: 50px;
  }
  .ranking-title {
    font-size: 30px;
  }
  .place-data {
    width: 80%;
    margin: 0 auto;
  }
  .photo-position {
    text-align: center;
    margin: 0 auto;
  }
}
@media screen and (min-width: 480px) and (max-width: 684px) {
  .small-title-beige {
    font-size: 50px;
  }
  .ranking-title {
    font-size: 30px;
  }
  .place-data {
    width: 90%;
    margin: 0 auto;
  }
  .photo-position {
    text-align: center;
    margin: 0 auto;
  }
}
@media screen and (min-width: 640px) and (max-width: 768px) {
  .small-title-beige {
    font-size: 70px;
  }
  .ranking-title {
    font-size: 30px;
  }
  .ranking-layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .place-data {
    width: 33.333333%;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .small-title-beige {
    font-size: 100px;
  }
  .ranking-title {
    font-size: 50px;
  }
  .ranking-layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .place-data {
    width: 33.333333%;
  }
}
@media screen and (min-width: 1024px) {
  .small-title-beige {
    font-size: 100px;
  }
  .ranking-title {
    font-size: 50px;
  }
  .ranking-layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .place-data {
    width: 33.333333%;
  }
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
/* ranking layout */
#slider {
  overflow: hidden;
  width: 310px;
  border: 1px solid #000;
  margin: 10px auto;
  padding: 0px;
}
#rankings {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}
.card .card-body .card-information {
  margin-top: 10px;
  color: #424242;
}
.card .card-body .card-information li {
  margin-top: 5px;
  margin-left: 35px;
}
.place-info {
  width: auto;
  height: auto;
}
.parisienne {
  font-family: "Parisienne", cursive;
}
</style>
