<template>
  <transition name="modal">
    <div class="overlay">
      <div class="panel">
        <input type="radio" id="switch-open" name="switch" />
        <input type="radio" id="switch-close" name="switch" />
        <!-- Login Form -->
        <div class="login is-active">
          <div class="w-full max-w-xm">
            <h1 class="m-2">LOGIN</h1>
            <p class="error-login">{{ loginError }}</p>
            <form class="w-full" @submit.prevent="onLogin">
              <div class="group mb-4">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <input
                  v-model="loginForm.userMail"
                  required
                  type="text"
                  id="emailLogin"
                  placeholder="E-Mail"
                  name="mailLogin"
                />
                <label for="emailLogin"></label>
                <span class="error-email flex px-1">
                  <p class="error">
                    {{ loginValidation.email }}
                  </p>
                  <p class="error px-1">
                    {{ loginValidation.emailType }}
                  </p>
                </span>
              </div>
              <div class="group mb-6">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                <input
                  v-model="loginForm.userPass"
                  required
                  type="password"
                  id="passwordLogin"
                  placeholder="Password"
                  name="pswLogin"
                />
                <label for="passwordLogin"></label>
                <span class="error-password flex mx-1">
                  <p class="error">
                    {{ loginValidation.password }}
                  </p>
                  <p class="error px-1">
                    {{ loginValidation.passwordType }}
                  </p>
                  <p class="error">
                    {{ loginValidation.passwordLength }}
                  </p>
                </span>
              </div>
              <input
                type="submit"
                value="LOGIN"
              />
            </form>
            <label class="button-open lora" for="switch-open">
              SIGN UP
              <i class="fa fa-user-plus" aria-hidden="true"></i>
            </label>
          </div>
        </div>
        <!-- Sign up Form -->
        <div class="register is-active">
          <label class="button-close lora" for="switch-close">
            LOGIN
            <i class="fas fa-user-check" aria-hidden="true"></i>
          </label>
          <div class="inner">
            <h1 classs="beige">REGISTER</h1>
            <p class="error-register">{{ signupError }}</p>
            <form class="w-full" @submit.prevent="onSignUp">
              <!-- user name -->
              <div class="group">
                <i class="fa fa-user" aria-hidden="true"></i>
                <input
                  type="text"
                  id="name"
                  data-maxlength="10"
                  class="required maxlength name"
                  v-model="signForm.userName"
                  placeholder="Name"
                />
                <label for="name"></label>
                <!-- error message (name) -->
                <span class="error-name flex px-1">
                  <p class="error">{{ signValidation.name }}</p>
                  <p class="error px-1">{{ signValidation.nameLength }}</p>
                </span>
              </div>
              <!-- email -->
              <div class="group">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <input
                  type="email"
                  id="email"
                  size="30"
                  class="required equal-email"
                  v-model="signForm.userMail"
                  placeholder="E-Mail"
                />
                <label for="email"></label>
                <!-- error message (email) -->
                <span class="error-email flex px-1">
                  <p class="error">
                    {{ signValidation.email }}
                  </p>
                  <p class="error px-1">{{ signValidation.emailType }}</p>
                  <p class="error">{{ signValidation.emailEqual }}</p>
                </span>
              </div>
              <!-- email(checking) -->
              <div class="group">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <input
                  type="email"
                  id="emailCheck"
                  size="30"
                  class="required equal-email"
                  v-model="signForm.userMailCheck"
                  placeholder="E-Mail (for checking)"
                />
                <label for="emailCheck"></label>
                <!-- error message (email) -->
                <span class="error-email flex px-1">
                  <p class="error">
                    {{ signValidation.emailCheck }}
                  </p>
                  <p class="error px-1">
                    {{ signValidation.emailTypeCheck }}
                  </p>
                  <p class="error">
                    {{ signValidation.emailEqual }}
                  </p>
                </span>
              </div>
              <!-- password -->
              <div class="group">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                <input
                  type="password"
                  id="password"
                  minlength="8"
                  class="required equal-password"
                  v-model="signForm.userPass"
                  placeholder="Password"
                />
                <label for="password"></label>
                <span class="error-email flex mx-1">
                  <p class="error">
                    {{ signValidation.password }}
                  </p>
                  <p class="error px-1">
                    {{ signValidation.passwordType }}
                  </p>
                  <p class="error">
                    {{ signValidation.passwordLength }}
                  </p>
                  <p class="error px-1">
                    {{ signValidation.passwordEqual }}
                  </p>
                </span>
              </div>
              <!-- password(checking) -->
              <div class="group">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                <input
                  type="password"
                  id="passwordCheck"
                  minlength="8"
                  class="required equal-password"
                  v-model="signForm.userPassCheck"
                  placeholder="Password (for checking)"
                />
                <label for="passwordCheck"></label>
                <span class="error-email flex px-1">
                  <p class="error">
                    {{ signValidation.passwordCheck }}
                  </p>
                  <p class="error px-1">
                    {{ signValidation.passwordTypeCheck }}
                  </p>
                  <p class="error">
                    {{ signValidation.passwordLengthCheck }}
                  </p>
                  <p class="error px-1">
                    {{ signValidation.passwordEqual }}
                  </p>
                </span>
              </div>
              <input type="submit" value="REGISTER" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  computed: {
    user() {
      return this.store.getters["user"];
    },
  },
  data() {
    return {
      loginError: "",
      loginForm: {
        userMail: null,
        userPass: null,
      },
      loginValidation: {
        email: "",
        emailType: "",
        password: "",
        passwordType: "",
        passwordLength: "",
      },
      signupError: "",
      signForm: {
        userMail: null,
        userMailCheck: null,
        userPass: null,
        userPassCheck: null,
        userName: null,
      },
      signValidation: {
        name: "",
        nameLength: "",
        email: "",
        emailEqual: "",
        emailType: "",
        emailCheck: "",
        emailTypeCheck: "",
        password: "",
        passwordEqual: "",
        passwordType: "",
        passwordLength: "",
        passwordCheck: "",
        passwordTypeCheck: "",
        passwordLengthCheck: "",
      },
      toUsername: null,
    };
  },
  methods: {
    async onLogin() {
      this.loginError = "";
      const result = await this.checkValidationLogin();
      if (result === true) {
        console.log("All OK");
        // Login
        firebase
          .auth()
          .signInWithEmailAndPassword(
            this.loginForm.userMail,
            this.loginForm.userPass
          )
          .then(() => {
            // ログインに成功したときの処理
            console.log("ログインしました");
            this.$store.dispatch("checkLogin");
            this.$router.push("/");
          })
          .catch((error) => {
            // ログインに失敗したときの処理
            this.loginError = "ログインできませんでした";
            console.error("ログインエラー", error);
          });
      } else {
        this.loginError = "フォームに誤りがあります";
        console.log(this.loginError);
      }
    },
    async checkValidationLogin() {
      let valid = false;
      const resultEmail = await this.checkEmailLogin();
      const resultPass = await this.checkPassLogin();
      if (resultEmail === true && resultPass === true) {
        valid = true;
        console.log("OK");
      } else {
        valid = false;
        this.loginError = "フォームに誤りがあります";
        console.log("NG");
      }
      return valid;
    },
    async onSignUp() {
      this.signupError = "";
      const result = await this.checkValidationSign();
      if (result === true) {
        console.log("All OK");
        // Signup
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.signForm.userMail,
            this.signForm.userPass
          )
          .then(async(result) => {
            // 登録に成功したときの処理
            console.log("登録しました");
            // ユーザ名の保存
            await result.user.updateProfile({
              displayName: this.signForm.userName,
            }).then(() => {
              this.$router.push("/");
              this.$store.dispatch("signUp", result.user);
            });
          })
          .catch((error) => {
            // 登録に失敗したときの処理
            this.signupError = "登録できませんでした";
            console.error("登録エラー", error);
          });
      } else {
        this.signupError = "フォームに誤りがあります";
        console.log(this.signupError);
      }
    },
    async checkValidationSign() {
      let valid = false;
      const resultUsername = await this.checkUsername();
      const resultEmail = await this.checkEmailSign();
      const resultEmailCheck = await this.checkEmailCheck();
      const resultEmailEqual = await this.checkEmailEqual();
      const resultPass = await this.checkPassSign();
      const resultPassCheck = await this.checkPassCheck();
      const resultPassEqual = await this.checkPassEqual();
      if (
        resultUsername === true &&
        resultEmail === true &&
        resultEmailCheck === true &&
        resultEmailEqual === true &&
        resultPass === true &&
        resultPassCheck === true &&
        resultPassEqual === true
      ) {
        valid = true;
        console.log("OK");
      } else {
        valid = false;
        console.log("NG");
      }
      return valid;
    },
    // Email validation Check
    checkEmailLogin() {
      let UserMail = false;
      this.loginValidation.email = "";
      this.loginValidation.emailType = "";
      if (!this.loginForm.userMail) {
        this.loginValidation.email = "未入力です";
        console.log("email NG no data");
      } else if (!this.checkEmailString(this.loginForm.userMail)) {
        this.loginValidation.emailType = "正しい形式で入力してください";
        console.log("email NG type");
      } else {
        UserMail = true;
        console.log("email OK");
      }
      if (UserMail === true) {
        this.loginValidation.email = "";
        this.loginValidation.emailType = "";
      }
      return UserMail;
    },
    // Password validation Check
    checkPassLogin() {
      let UserPass = false;
      this.loginValidation.password = "";
      this.loginValidation.passwordType = "";
      this.loginValidation.passwordLength = "";
      if (!this.loginForm.userPass) {
        this.loginValidation.password = "未入力です";
        console.log("pass NG nodata");
      } else if (!this.checkPassString(this.loginForm.userPass)) {
        this.loginValidation.passwordType = "半角英数で入力してください";
        console.log("pass NG type");
      } else if (!this.checkMinCount(this.loginForm.userPass)) {
        this.loginValidation.passwordLength = "8文字以上入力してください";
        console.log("pass NG length");
      } else {
        UserPass = true;
        console.log("pass OK");
      }
      if (UserPass === true) {
        this.loginValidation.password = "";
        this.loginValidation.passwordType = "";
        this.loginValidation.passwordLength = "";
      }
      return UserPass;
    },
    // Username validation Check
    checkUsername() {
      let UserName = false;
      this.signValidation.name = "";
      this.signValidation.nameLength = "";
      if (!this.signForm.userName) {
        this.signValidation.name = "未入力です";
        console.log("username NG no data");
      } else if (!this.checkMaxCount(this.signForm.userName)) {
        this.signValidation.nameLength = "10文字以内で入力してください";
        console.log("username NG name length");
      } else {
        UserName = true;
        console.log("username OK");
      }
      if (UserName === true) {
        this.signValidation.name = "";
        this.signValidation.nameLength = "";
      }
      return UserName;
    },
    // Email(check) validation Check
    checkEmailSign() {
      let UserMail = false;
      this.signValidation.email = "";
      this.signValidation.emailType = "";
      if (!this.signForm.userMail) {
        this.signValidation.email = "未入力です";
        console.log("email NG no data");
      } else if (!this.checkEmailString(this.signForm.userMail)) {
        this.signValidation.emailType = "正しい形式で入力してください";
        console.log("email NG type");
      } else {
        UserMail = true;
        console.log("email OK");
      }
      if (UserMail === true) {
        this.signValidation.email = "";
        this.signValidation.emailType = "";
      }
      return UserMail;
    },
    // Email(check) validation Check
    checkEmailCheck() {
      let UserMailCheck = false;
      this.signValidation.emailCheck = "";
      this.signValidation.emailTypeCheck = "";
      if (!this.signForm.userMailCheck) {
        this.signValidation.emailCheck = "未入力です";
        console.log("email check NG no data");
      } else if (!this.checkEmailString(this.signForm.userMailCheck)) {
        this.signValidation.emailTypeCheck = "正しい形式で入力してください";
        console.log("email check NG type");
      } else {
        UserMailCheck = true;
        console.log("email OK");
      }
      if (UserMailCheck === true) {
        this.signValidation.emailCheck = "";
        this.signValidation.emailTypeCheck = "";
      }
      return UserMailCheck;
    },
    // Email equal Check
    checkEmailEqual() {
      let UserMailChecking = false;
      this.signValidation.emailEqual = "";
      if (this.signForm.userMailCheck !== this.signForm.userMail) {
        this.signValidation.emailEqual = "メールアドレスが一致しません";
        console.log("email equal NG");
      } else {
        UserMailChecking = true;
        console.log("email equal OK");
      }
      if (UserMailChecking === true) {
        this.signValidation.emailEqual = "";
      }
      return UserMailChecking;
    },
    // Password validation Check
    checkPassSign() {
      let UserPass = false;
      this.signValidation.password = "";
      this.signValidation.passwordType = "";
      this.signValidation.passwordLength = "";
      if (!this.signForm.userPass) {
        this.signValidation.password = "未入力です";
        console.log("pass NG nodata");
      } else if (!this.checkPassString(this.signForm.userPass)) {
        this.signValidation.passwordType = "半角英数で入力してください";
        console.log("pass NG type");
      } else if (!this.checkMinCount(this.signForm.userPass)) {
        this.signValidation.passwordLength = "8文字以上入力してください";
        console.log("pass NG length");
      } else {
        UserPass = true;
        console.log("pass OK");
      }
      if (UserPass === true) {
        this.signValidation.password = "";
        this.signValidation.passwordType = "";
        this.signValidation.passwordLength = "";
      }
      return UserPass;
    },
    // Password(check) validation Check
    checkPassCheck() {
      let UserPassCheck = false;
      this.signValidation.passwordCheck = "";
      this.signValidation.passwordTypeCheck = "";
      this.signValidation.passwordLengthCheck = "";
      if (!this.signForm.userPassCheck) {
        this.signValidation.passwordCheck = "未入力です";
        console.log("pass check NG no data");
      } else if (!this.checkPassString(this.signForm.userPassCheck)) {
        this.signValidation.passwordTypeCheck = "半角英数で入力してください";
        console.log("pass check NG type");
      } else if (!this.checkMinCount(this.signForm.userPassCheck)) {
        this.signValidation.passwordLengthCheck = "8文字以上入力してください";
        console.log("pass check NG length");
      } else {
        UserPassCheck = true;
        console.log("pass check OK");
      }
      if (UserPassCheck === true) {
        this.signValidation.passwordCheck = "";
        this.signValidation.passwordTypeCheck = "";
        this.signValidation.passwordLengthCheck = "";
      }
      return UserPassCheck;
    },
    checkPassEqual() {
      let UserPassChecking = false;
      this.signValidation.passwordEqual = "";
      // Password Checking
      if (this.signForm.userPassCheck !== this.signForm.userPass) {
        this.signValidation.passwordEqual = "パスワードが一致しません";
        console.log("pass equal NG");
      } else {
        UserPassChecking = true;
        console.log("pass equal OK");
      }
      if (UserPassChecking === true) {
        this.signValidation.passwordEqual = "";
      }
      return UserPassChecking;
    },
    // Email string Check
    checkEmailString(inputdata) {
      const re =
        /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
      return re.test(inputdata);
    },
    // Password string Check
    checkPassString(inputdata) {
      const re = /^[A-Za-z0-9]*$/;
      return re.test(inputdata);
    },
    // Minimum number of characters Check
    checkMinCount(inputdata) {
      const re = /(?=^.{8,}$)/i;
      return re.test(inputdata);
    },
    // Max number of characters Check
    checkMaxCount(inputdata) {
      const re = /(?=^.{0,10}$)/i;
      return re.test(inputdata);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&display=swap");
.lora {
  font-family: "Lora", serif;
}
.overlay {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  transition: all 0.5s ease;
}
.login .group input[type="text"],
.login .group input[type="email"],
.login .group input[type="password"] {
  width: 100%;
  border: none;
  color: #f2ebe5; /*入力した文字の色*/
  padding: 14px 10px 14px 45px;
  margin-top: 20px;
  background: #9c9895; /*loginの入力フォーム*/
  z-index: 2;
  font-family: "Lora", serif;
  font-size: 12px;
  letter-spacing: 1px;
  position: relative;
}
.register .group input[type="text"],
.register .group input[type="email"],
.register .group input[type="password"] {
  width: 100%;
  border: none;
  color: #f2ebe5; /*文字を入力したときの文字の色*/
  padding: 10px 10px 10px 45px;
  margin-top: 20px;
  background: #a15c4e; /*registerの入力フォームの背景*/
  z-index: 2;
  font-family: "Lora", serif;
  font-weight: 300;
  font-size: 12px;
  letter-spacing: 1px;
  position: relative;
}
.login .group input[type="text"]::-moz-placeholder,
.login .group input[type="email"]::-moz-placeholder,
.login .group input[type="password"]::-moz-placeholder {
  color: #918d89;
}
.login .group input[type="text"]:-ms-input-placeholder,
.login .group input[type="email"]:-ms-input-placeholder,
.login .group input[type="password"]:-ms-input-placeholder {
  color: #918d89;
}
.login .group input[type="text"]::placeholder,
.login .group input[type="email"]::placeholder,
.login .group input[type="password"]::placeholder {
  color: #f2ebe5;
}
.login .group input[type="text"]:focus + label::before,
.login .group input[type="email"]:focus + label::before,
.login .group input[type="password"]:focus + label::before {
  width: 100%;
}
.register .group input[type="text"]::-moz-placeholder,
.register .group input[type="email"]::-moz-placeholder,
.register .group input[type="password"]::-moz-placeholder {
  color: #c4b3af;
}
.register .group input[type="text"]:-ms-input-placeholder,
.register .group input[type="email"]:-ms-input-placeholder,
.register .group input[type="password"]:-ms-input-placeholder {
  color: #c4b3af;
}
.register .group input[type="text"]::placeholder,
.register .group input[type="email"]::placeholder,
.register .group input[type="password"]::placeholder {
  color: #c4b3af;
}
.register .group input[type="text"]:focus + label::before,
.register .group input[type="email"]:focus + label::before,
.register .group input[type="password"]:focus + label::before {
  width: 100%;
}
.panel .login input[type="submit"] {
  align-self: flex-start;
  margin-top: 5px;
  padding: 10px 0;
  width: 150px;
  background: transparent;
  border-radius: 0 50px 50px 0;
  border-left: none !important;
  letter-spacing: 1px;
  cursor: pointer;
  font-family: "Lora", serif;
}
.panel .register input[type="submit"] {
  align-self: flex-start;
  margin-top: 25px;
  padding: 10px 0;
  width: 150px;
  background: transparent;
  border-radius: 0 50px 50px 0;
  border-left: none !important;
  letter-spacing: 1px;
  cursor: pointer;
  font-family: "Lora", serif;
}
@-webkit-keyframes loginOpen {
  0% {
    transform: translateX(140px);
  }
  50% {
    transform: translateX(-145px);
  }
  100% {
    transform: translateX(140px);
    z-index: -1;
  }
}
@keyframes loginOpen {
  0% {
    transform: translateX(140px);
  }
  50% {
    transform: translateX(-145px);
  }
  100% {
    transform: translateX(140px);
    z-index: -1;
  }
}
@-webkit-keyframes registerOpen {
  0% {
    transform: translateX(-140px);
  }
  50% {
    transform: translateX(145px);
  }
  100% {
    transform: translateX(-140px);
  }
}
@keyframes registerOpen {
  0% {
    transform: translateX(-140px);
  }
  50% {
    transform: translateX(145px);
  }
  100% {
    transform: translateX(-140px);
  }
}
@-webkit-keyframes loginClose {
  0% {
    transform: translateX(140px);
    z-index: -1;
  }
  50% {
    transform: translateX(-145px);
  }
  100% {
    transform: translateX(140px);
    z-index: 1;
  }
}
@keyframes loginClose {
  0% {
    transform: translateX(140px);
    z-index: -1;
  }
  50% {
    transform: translateX(-145px);
  }
  100% {
    transform: translateX(140px);
    z-index: 1;
  }
}
@-webkit-keyframes registerClose {
  0% {
    transform: translateX(-140px);
  }
  50% {
    transform: translateX(145px);
  }
  100% {
    transform: translateX(-140px);
  }
}
@keyframes registerClose {
  0% {
    transform: translateX(-140px);
  }
  50% {
    transform: translateX(145px);
  }
  100% {
    transform: translateX(-140px);
  }
}
* {
  box-sizing: border-box;
}
input {
  outline: none;
}
.panel {
  width: 640px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  position: relative;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.panel .login {
  width: 300px;
  height: 420px;
  background: #807b77;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translateX(140px);
  position: relative;
  z-index: 1;
  transition: filter 0.5s;
}
.panel .login input[type="submit"] {
  border: #f2ebe5 solid 1px;
  color: #f2ebe5;
}
.panel .login .button-open {
  position: absolute;
  width: 110px;
  height: 50px;
  padding: 12px 5px;
  background: none;
  border: #f2ebe5 solid 1px;
  color: #f2ebe5;
  top: 320px;
  right: 15px;
  cursor: pointer;
  transition: transform 0.4s;
  z-index: 9;
  text-align: center;
  transition: all 0.2s linear;
  margin: 7% auto;
  letter-spacing: 0.05em;
}
.panel .register {
  transform: translateX(-140px);
  position: relative;
}
.panel .register .button-close {
  position: absolute;
  width: 110px;
  height: 50px;
  padding: 12px 5px;
  background: none;
  border: #d5bdb9 solid 1px;
  color: #d5bdb9;
  top: 450px;
  right: 30px;
  cursor: pointer;
  transition: transform 0.4s;
  z-index: 9;
  text-align: center;
  transition: all 0.2s linear;
  margin: 7% auto;
  letter-spacing: 0.05em;
}
.panel .register .inner {
  filter: blur(5px);
  background: #8d5145; /*registerの背景8d5145*/
  box-shadow: 5px 14px 20px 0 #986055; /*影の色*/
  width: 100%;
  width: 340px;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: filter 0.5s;
}
.panel .register input[type="submit"] {
  border: #d5bdb9 solid 1px;
  color: #d5bdb9;
}
.button-close {
  visibility: hidden;
}
.login h1 {
  text-align: center;
  font-weight: 100;
  font-size: 30px;
  letter-spacing: 2px;
  margin-top: 0;
  color: #f2ebe5; /*Loginの文字色*/
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #8a8682, 0 2px #85817d, 0 3px #807b77, 0 4px #7d7874,
    0 5px #78736f, 0 6px #75706c, 0 7px #75716d, 0 8px #736f6b, 0 9px #736f6c,
    0 10px 8px #6e6a67;
}
.login .group {
  position: relative;
  width: 100%;
}
.login .group i {
  color: #f2ebe5; /*navypinkアイコンの色*/
  position: absolute;
  top: 36px;
  left: 15px;
  z-index: 3;
  font-size: 13px;
  opacity: 0.8;
}
.login .group label {
  display: block;
  position: absolute;
  width: 100%;
  height: 48px;
  z-index: 1;
  background: #666361; /*beige入力フォームの上線(入力する前)*/
  top: 19px;
}
.login .group label::before {
  content: "";
  position: absolute;
  width: 0;
  height: 100%;
  background: #f2ebe5; /*navypink入力フォームの上線(入力した後)*/
  transition: width 0.5s;
}
.register h1 {
  text-align: center;
  font-weight: 100;
  letter-spacing: 2px;
  margin-top: 0px;
  color: #d5bdb9;
  font-family: "Lora", serif;
  font-weight: bold;
  text-shadow: 0 1px #966258, 0 2px #8d5c53, 0 3px #885950, 0 4px #80544b,
    0 5px #7b5148, 0 6px #744c44, 0 7px #6f4841, 0 8px #68433c, 0 9px #5f3e37,
    0 10px 8px #523530;
}
.register .group {
  width: 100%;
  position: relative;
}
.register .group i {
  color: #d5bdb9;
  position: absolute;
  top: 33px;
  left: 15px;
  z-index: 3;
  font-size: 13px;
}
.register .group label {
  display: block;
  position: absolute;
  width: 100%;
  height: 40px;
  z-index: 1;
  background: #ae6354; /*beige入力フォームの上線(入力する前)*/
  top: 19px;
}
.register .group label::before {
  content: "";
  position: absolute;
  width: 0;
  height: 100%;
  background: #d5bdb9; /*navypink入力フォームの上線(入力した後)*/
  transition: width 0.5s;
}
input[id="switch-open"]:checked ~ .login {
  filter: blur(5px);
  -webkit-animation: loginOpen forwards 0.8s;
  animation: loginOpen forwards 0.8s;
}
input[id="switch-open"]:checked ~ .register {
  -webkit-animation: registerOpen forwards 0.8s;
  animation: registerOpen forwards 0.8s;
}
input[id="switch-open"]:checked ~ .register > .inner {
  filter: blur(0);
}
input[id="switch-open"]:checked ~ .register .button-open {
  visibility: hidden;
}
input[id="switch-open"]:checked ~ .register .button-close {
  visibility: visible;
}
input[id="switch-close"]:checked ~ .login {
  -webkit-animation: loginClose forwards 0.8s;
  animation: loginClose forwards 0.8s;
}
input[id="switch-close"]:checked ~ .register {
  -webkit-animation: registerClose forwards 0.8s;
  animation: registerClose forwards 0.8s;
}
input[id="switch-close"]:checked ~ .register > .inner {
  filter: blur(5px);
}
input[type="radio"] {
  display: none;
}
/* button hover Animation */
.panel .login input[type="submit"]:hover {
  background-color: #a8a39e;
  transition: background 0.5s;
}
.panel .login .button-open:hover {
  transform: translatey(3px);
  box-shadow: none;
  background-color: #a8a39e;
}
.panel .login .button-open:hover {
  animation: ani9 0.4s ease-in-out infinite alternate;
}
.panel .register input[type="submit"]:hover {
  background-color: #a15c4e;
  transition: background 0.5s;
}
.panel .register .button-close:hover {
  transform: translatey(3px);
  box-shadow: none;
  background-color: #a15c4e;
}
.panel .register .button-close:hover {
  animation: ani9 0.4s ease-in-out infinite alternate;
}
@keyframes ani9 {
  0% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(5px);
  }
}
/* error message */
.error {
  color: #c94940;
  font-size: 5px;
}
.error-register {
  color: #c94940;
  font-size: 10px;
  text-align: center;
}
.error-login {
  color: #c94940;
  font-size: 10px;
  text-align: center;
}
</style>