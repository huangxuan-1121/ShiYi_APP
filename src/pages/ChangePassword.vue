<template>
  <div class="change">
    <div class="header">
      <router-link to="/my" tag="div">
        <van-icon name="arrow-left" size="3rem" color="grey" />
      </router-link>
      <div>修改密码</div>
    </div>
    <div class="changePasswordContent">
      <van-cell-group>
        <van-field
          v-model="prePassword"
          required
          clearable
          label="原密码"
          placeholder="请输入原密码"
          @blur="CheckPrePassword(),comfirmPassword()"
        />

        <van-field
          v-model="newPassword"
          type="password"
          label="新密码"
          placeholder="请输入新密码"
          required
          @blur="comfirmPassword()"
        />
        <van-field
          v-model="confirmPassword"
          type="password"
          label="新密码"
          placeholder="请确认新密码"
          required
          @blur="comfirmPassword()"
        />
      </van-cell-group>
      <div class="footer">
        <p @click="submit">确认提交</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";

import { Decrypt, Encrypt } from "@/utils/Aes.js";

export default {
  name: "changePassword",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      prePassword: "",
      newPassword: "",
      confirmPassword: "",
      getPrePassword: "",
      isChangePassword: [0, 0]
    };
  },
  methods: {
    setCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cvalue;
      // console.log(document.cookie);
    },
    goBack() {
      this.$router.push("/index");
    },
    submit() {
      if (this.isChangePassword[0] && this.isChangePassword[1]) {
        console.log("原密码正确，可以修改");
        axios({
          url: "http://39.106.65.18:8080/user/updatePwd", // 后端的接口地址
          method: "post",
          params: {},
          data: {
            // prePassword: Encrypt(this.prePassword),
            newPassword: Encrypt(this.newPassword),
            id: window.localStorage.data
          },
          transformRequest: [
            function(data) {
              data = Qs.stringify(data);
              return data;
            }
          ],
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          dataType: "json"
        })
          .then(res => {
            console.log("连接成功"); // 这里多打印一句提示，只是为了更直观一点
            console.log(res); // res 是后端回传的数据，如果连接成功，可以把res打印出来。
            if (res.data.msg == "modify succeed") {
              this.$notify({
                message: "修改成功！",
                color: "155,147,128",
                background: "rgb(237,232,104)"
              });
              localStorage.clear();
              this.$router.push("/login");
            } else {
              this.$notify({
                message: "未知错误，修改失败！",
                color: "155,147,128",
                background: "rgb(237,232,104)"
              });
            }
          })
          .catch(function(error) {
            console.log("连接失败"); // 作用同上
            console.log(error); // 如果连接失败，会抛出错误信息。
          });
      } else {
        this.$notify({
          message: "请确认填入的信息正确",
          color: "155,147,128",
          background: "rgb(237,232,104)"
        });
      }
    },
    CheckPrePassword() {
      axios({
        url: "http://39.106.65.18:8080/user/getUserById", // 后端的接口地址
        method: "get",
        params: {
          id: window.localStorage.data
        },
        data: {
          id: window.localStorage.data
        },
        transformRequest: [
          function(data) {
            data = Qs.stringify(data);
            return data;
          }
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        dataType: "json"
      })
        .then(res => {
          // console.log("连接成功"); // 这里多打印一句提示，只是为了更直观一点
          // console.log(res); // res 是后端回传的数据，如果连接成功，可以把res打印出来。
          this.getPrePassword = res.data[0].password;

          if (Encrypt(this.prePassword) == this.getPrePassword) {
            this.isChangePassword[0] = 1;
            console.log("原密码正确！");
          } else {
            this.$notify({
              message: "原密码错误！",
              color: "155,147,128",
              background: "rgb(237,232,104)"
            });
            this.isChangePassword[0] = 0;
          }
        })
        .catch(function(error) {
          console.log("连接失败"); // 作用同上
          console.log(error); // 如果连接失败，会抛出错误信息。
        });
    },
    comfirmPassword() {
      if (this.newPassword != "" && this.confirmPassword != "") {
        if (this.newPassword == this.confirmPassword) {
          this.isChangePassword[1] = 1;
        } else {
          this.isChangePassword[1] = 0;
          this.$notify({
            message: "两次输入的密码不一致",
            color: "155,147,128",
            background: "rgb(237,232,104)"
          });
        }
      }
    }
  },
};
</script>

<style scoped>
.change {
  margin: 0;
  padding: 0;
  height: 100vh;
  background-color: rgba(104, 104, 103, 0.075);
}
.header {
  margin-bottom: 1rem;
  box-sizing: border-box;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 4rem;
  background-color: rgb(175, 228, 146);
}
.header div:first-child {
  width: 0%;
}

.header div:last-child {
  width: 100%;
  margin: 0;
  line-height: 3rem;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
}
.upImg {
  margin: 0 auto;
  padding: 0.5rem;
}
.main {
  padding: 0.5rem;
}
textarea {
  margin: 0;
  font-size: 1rem;
  background-color: rgba(104, 104, 103, 0.075);
  width: 90%;
  border-top: 0.01rem solid rgb(83, 81, 81);
}
input {
  width: 90%;
  margin: 1rem 0;
  background-color: rgba(104, 104, 103, 0.075);
  border: none;
  padding: 0.2rem;
  color: rgb(97, 95, 95);
  font-size: 1.2rem;
  border: 0.01rem solid rgb(151, 150, 150);
}
.footer {
  width: 100%;
  background-color: rgb(246, 179, 127);
  color: white;
  box-sizing: border-box;
}
.footer p {
  margin-top: 5rem;
  font-size: 2rem;
  line-height: 3rem;
  font-weight: 500;
  text-align: center;
}
</style>

