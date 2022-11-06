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
          <div class="flex justify-center" v-show="!$store.state.user.isLogin">
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
      <ranking-design ranking="favorite" />
      <ranking-design ranking="mark" />
    </div>
  </div>
</template>

<script>
export default {};
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
@media screen and (max-width: 480px) {
  .small-title-beige {
    font-size: 50px;
  }
}
@media screen and (min-width: 480px) and (max-width: 684px) {
  .small-title-beige {
    font-size: 50px;
  }
}
@media screen and (min-width: 640px) and (max-width: 768px) {
  .small-title-beige {
    font-size: 70px;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .small-title-beige {
    font-size: 100px;
  }
}
@media screen and (min-width: 1024px) {
  .small-title-beige {
    font-size: 100px;
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
</style>
