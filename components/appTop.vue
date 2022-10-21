<template>
  <div class="bg-beige">
    <!-- title -->
    <div class="relative h-auto w-full navypink-bg title">
      <div class="flex justify-center items-center pt-20">
        <p class="sweets">SWEETS</p>
      </div>
      <div class="flex justify-center items-center pb-20">
        <p class="journal">Journal</p>
      </div>
      <div
        class="
          absolute
          text-beige
          kaisei-medium
          top-message
          w-full
          text-center
          text-base
          sm:text-base
          md:text-2xl
          lg:text-3xl
          xl:text-4xl
          animate__animated animate__fadeInUp
        "
      >
        <p>あなたが気に入った・気になる「お店」を伝えよう</p>
      </div>
      <div class="scrolldown lora">
        <span>Scroll</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&family=Parisienne&display=swap");
/* background */
.navypink-bg {
  background-color: #a76e63;
  background: linear-gradient(to right, #ab766b, #9f6054, #945447);
}
/* title */
.sweets {
  text-transform: Uppercase;
  font-size: 200px;
  color: #a76e63;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #966258, 0 2px #8d5c53, 0 3px #885950, 0 4px #80544b,
    0 5px #7b5148, 0 6px #744c44, 0 7px #6f4841, 0 8px #68433c, 0 9px #5f3e37,
    0 10px 8px #523530;
}
.journal {
  text-transform: Uppercase;
  font-size: 200px;
  color: #a76e63;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #966258, 0 2px #8d5c53, 0 3px #885950, 0 4px #80544b,
    0 5px #7b5148, 0 6px #744c44, 0 7px #6f4841, 0 8px #68433c, 0 9px #5f3e37,
    0 10px 8px #523530;
}
@media screen and (max-width: 480px) {
  .sweets {
    font-size: 70px;
  }
  .journal {
    font-size: 70px;
  }
}
@media screen and (min-width: 480px) and (max-width: 684px) {
  .sweets {
    font-size: 100px;
  }
  .journal {
    font-size: 100px;
  }
}
@media screen and (min-width: 640px) and (max-width: 768px) {
  .sweets {
    font-size: 150px;
  }
  .journal {
    font-size: 150px;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .sweets {
    font-size: 150px;
  }
  .journal {
    font-size: 150px;
  }
}
@media screen and (min-width: 1024px) {
  .sweets {
    font-size: 200px;
  }
  .journal {
    font-size: 200px;
  }
}
.top-message {
  top: 50%;
  left: 50%;
  margin: auto;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
/* scroll down */
/* スクロールダウン全体の場所 */
.scrolldown {
  position: absolute;
  bottom: 0;
  left: 50%;
}
/*Scrollテキストの描写*/
.scrolldown span {
  position: absolute;
  left: 10px;
  bottom: 10px;
  color: #eee;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  /*縦書き設定*/
  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
}
/* 丸の描写 */
.scrolldown:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: -4px;
  /*丸の形状*/
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #eee;
  /*丸の動き1.6秒かけて透過し、永遠にループ*/
  animation: circlemove 1.6s ease-in-out infinite,
    cirlemovehide 1.6s ease-out infinite;
}
/*下からの距離が変化して丸の全体が上から下に動く*/
@keyframes circlemove {
  0% {
    bottom: 45px;
  }
  100% {
    bottom: -5px;
  }
}
/*上から下にかけて丸が透過→不透明→透過する*/
@keyframes cirlemovehide {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  80% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
  }
}
/* 線の描写 */
.scrolldown:after {
  content: "";
  /*描画位置*/
  position: absolute;
  bottom: 0;
  left: 0;
  /*線の形状*/
  width: 2px;
  height: 50px;
  background: #eee;
}
/* text font */
.lora {
  font-family: "Lora", serif;
}.kaisei-medium {
  font-family: "Kaisei Decol", serif;
  font-weight: medium;
}
</style>