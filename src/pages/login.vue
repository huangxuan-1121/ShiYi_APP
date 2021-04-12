<template>
  <div class="login">
    <router-link to="/">
      <van-icon name="arrow-left" size="2rem" color="grey" />
    </router-link>
    <div class="main">
      <h2>登录</h2>
      <form @submit.prevent="submit">
        <div class="text">
          <div>
            <input
              type="text"
              class="login-username"
              @mouseenter="focusText"
              v-model="username"
              placeholder="请输入用户名"
            />
          </div>
          <van-icon
            name="cross"
            size="1.5rem"
            color="grey"
            v-show="!usernameClose"
            @click="clearusername"
          />
        </div>
        <div class="text">
          <div>
            <input
              type="password"
              @mouseenter="focusText"
              class="login-password"
              v-model="password"
              placeholder="请输入密码"
            />
          </div>
          <van-icon
            name="cross"
            size="1.5rem"
            color="grey"
            v-show="!passwordClose"
            @click="clearpassword"
          />
        </div>
        <div class="up">
          <input type="submit" value="登录" />
        </div>
      </form>
      <div class="next">
        还没有账号?
        <router-link to="/register" tag="a">马上去注册!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";

import { Decrypt, Encrypt } from "@/utils/Aes.js";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      usernameClose: true,
      passwordClose: true
    };
  },
  methods: {
    clearusername(e) {
      this.username = "";
    },
    clearpassword(e) {
      this.password = "";
    },
    focusText(e) {
      let $className = e.currentTarget.className;
      $className === "login-username"
        ? (this.usernameClose = false)
        : (this.passwordClose = false);
    },
    setCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cvalue;
      // console.log(document.cookie);
    },
    submit() {
      axios({
        url:"http://39.106.65.18:8080/user/login",
        method: "post",
        data: {
          username: this.username,
          password: Encrypt(this.password)
        },
        transformRequest: [
          function(data) {
            console.log(data.password);
            data = Qs.stringify(data);
            return data;
          }
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        dataType: "json"
      })
        .then(res => {
          // console.log(res)
          if (res.data.msg == "登录成功") {
            var ses = window.localStorage; //sessionStorage关闭窗口，存储的数据清空
            var id = JSON.stringify(res.data.detail);
            ses.setItem("data", id); 
            // this.setCookie("userid",res.data.detail,15)
            this.$router.push("/my");
            return true;
          } else {
            this.$notify({
              message: "用户名或密码错误！",
              color: "155,147,128",
              background: "rgb(237,232,104)"
            });
            return false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  padding-top: 0.5rem;
  height: 100vh;
  background-image: url(../assets/BG.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.main {
  width: 100%;
  padding: 8rem 3rem 0;
  box-sizing: border-box;
}

.main h2 {
  font-size: 2rem;
}

.main input {
  text-indent: 0.5rem;
  width: 100%;
  border: none;
  line-height: 2rem;
  font-size: 1.2rem;
  background-color: transparent;
}

.text {
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(128, 128, 128);
}

.up {
  margin: 3rem auto;
  width: 100%;
  line-height: 3rem;
  color: white;
  background-color: rgb(175, 228, 146);
  border-radius: 5rem;
}

.up input {
  width: 100%;
  font-size: 1.5rem;
  line-height: 3rem;
}

.next {
  font-size: 1.1rem;
  color: grey;
  text-align: center;
}

.next a {
  color: rgb(148, 142, 47);
}
</style>
