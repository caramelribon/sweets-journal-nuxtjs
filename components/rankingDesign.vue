<template>
  <div class="ranking pb-10">
    <p class="ranking-title p-5 text-center">{{ ranking }}</p>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(place, index) in rankingData" :key="index">
        <div class="flex items-start justify-center flex-row flex-wrap p-5">
          <div class="ranking-fav">
            <div class="ranking-no my-3">
              <p class="parisienne text-center text-nvybrown text-5xl">
                No.{{ place.no }}
              </p>
            </div>
            <!-- shop layout -->
            <div class="bg-none">
              <!-- shop image -->
              <div class="ranking-layout">
                <div>
                  <img
                    :src="place.photo"
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
                          {{ place.catchCopy }}
                        </p>
                      </div>
                      <p class="text-navyblue kaisei-medium text-xs my-2">
                        {{ place.access }}
                      </p>
                    </div>
                  </div>
                  <ul class="card-information my-3">
                    <li class="text-navyblue kaisei-medium text-xs mx-8">
                      {{ place.address }}
                    </li>
                    <li class="text-navyblue kaisei-medium text-xs mx-8">
                      予算:{{ place.average }}
                    </li>
                    <li class="text-navyblue kaisei-medium text-xs mx-8">
                      Open:{{ place.open }}
                    </li>
                    <li class="text-navyblue kaisei-medium text-xs mx-8">
                      <a
                        :href="place.url"
                        target="_blank"
                        class="text-sm text-lgtpink my-2"
                      >
                        さらに詳しい情報こちら
                        <i class="fas fa-external-link-alt icon-color-blue"></i>
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
</template>

<script>
import FirebaseService from "~/services/firebaseService";
export default {
  props: ["ranking"],
  data() {
    return {
      rankingData: [],
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
    await FirebaseService.getRankingTop(this.ranking)
      .then((result) => {
        this.rankingData = result.map((element, index) => ({
          ...element,
          no: index + 1,
        }));
      })
      .catch((err) => {
        console.log("Can not get data of ranking", err);
      });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&family=Parisienne&display=swap");
.ranking-title {
  font-size: 50px;
  color: #a76e63;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #dfd8d3, 0 2px #c2bcb7, 0 3px #b1aba6, 0 4px #a19b96,
    0 5px #99938e, 0 6px 5px #88837e;
}
@media screen and (max-width: 480px) {
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