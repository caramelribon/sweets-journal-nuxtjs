<template>
  <div class="bg-beige">
    <div class="contents">
      <!-- About -->
      <div class="beige-bg">
        <p class="text-center p-10 small-title-beige">About</p>
        <div class="h-auto">
          <div class="bg-none">
            <p
              class="
                mt-3
                mb-8
                mx-10
                text-nvybrown text-2xl
                sm:text-3xl
                md:text-3xl
                lg:text-4xl
                xl:text-4xl
                2xl:text-4xl
                lora-bold
                text-center
              "
            >
              Welcome to the Sweets Journal
            </p>
            <div
              class="mx-10 sm:mx-20 md:mx-32 lg:mx-52 xl:mx-52 2xl:mx-52 pb-20"
            >
              <p
                class="
                  text-nvybrown
                  sm:text-base
                  md:text-2xl
                  lg:text-2xl
                  xl:text-2xl
                  2xl:text-2xl
                  kaisei-medium
                  mb-10
                "
              >
                Sweets
                Journalでは、旅先で現在地周辺のカフェやレストランを見つけることができます。<br />
                また、会員登録をすると、<br />
                ・気に入ったお店や気になるお店を保存できる<br />
                ・全会員の保存したお店をリアルタイムでみることができる<br />
                ・お店のランキングをみることができる<br />
                といった機能がつきます!!<br />
                会員登録することで、他の会員がどんなお店に注目しているのかもわかりますよ♪<br />
                ぜひ、皆さんの旅先でお店を探したり、素敵なお店を保存したりしてみてください<br />
                会員登録は、右上の<i class="far fa-user user-button-color"></i
                >からできます
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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