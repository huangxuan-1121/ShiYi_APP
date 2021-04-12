<template>
  <div class="change">
    <div class="header">
      <router-link to="/my" tag="div">
        <van-icon name="arrow-left" size="3rem" color="grey" />
      </router-link>
      <div>编辑信息</div>
    </div>
    <div class="upImg">
      <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
    </div>
    <div class="main">
      <input type="text" placeholder="昵称" v-model="userName" />
      <input type="text" placeholder="QQ" v-model="QQNumber" />
      <!-- <input type="text" placeholder="微信" v-model="WeChatNumber" /> -->
      <textarea name id cols="30" rows="10" placeholder="有没有个性由我决定！" v-model="introduction"></textarea>
    </div>
    <div class="footer">
      <p @click="submit">确认提交</p>
    </div>
  </div>
</template>

<script>
// import { Row, Col, Icon, Cell, CellGroup } from 'vant';
import axios from "axios";
import Qs from "qs";

export default {
  name: "changeInfo",
  data() {
    return {
      fileList: [],
      userName: "",
      introduction: "",
      avatarUrl: "",
      uuid: "",
      QQNumber: "",
      // WeChatNumber: ""
    };
  },
  
  methods: {

  },
  mounted: function() //mounted钩子函数(用来向后端发起请求拿到数据以后做一些业务处理)
  {
    axios({
      url: "http://39.106.65.18:8080/user/getUserById",
      method: "get",
      params: {
        id: window.localStorage.data
      }
    })
      .then(res => {
        this.userName = res.data[0].username;
        this.introduction = res.data[0].introduction;
        this.avatarUrl = res.data[0].avatarUrl;
        this.QQNumber = res.data[0].contact;
        // this.WeChatNumber = res.data[0].WeChatNumber;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    afterRead(file) {
      //将图片上传到服务器！
      let data = this.fileList.map((item, index) => {
        return item.content;
      });
      axios({
        url: "http://39.106.65.18:8080/user/base64Upload",
        method: "post",
        data: {
          base64Data: data,
          id: window.localStorage.data
        },
        transformRequest: [
          function(data) {
            data = Qs.stringify(data);
            return data;
          }
        ],
        dataType: "json"
      })
        .then(res => {
          // console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submit() {
      console.log(this.QQNumber)
      axios({
        url: "http://39.106.65.18:8080/user/updateUser",
        method: "post",
        data: {
          username: this.userName,
          introduction: this.introduction,
          avatarUrl: this.avatarUrl,
          contact: this.QQNumber,
          WeChatNumber: this.WeChatNumber,
          // sign: this.uuid
          id: window.localStorage.data
        },
        transformRequest: [
          function(data) {
            data = Qs.stringify(data);
            console.log(data);
            return data;
          }
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        dataType: "json"
      })
        .then(res => {
          this.$router.push("/my");
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    createUuid() {
      var lastUuid = 0;
      this.uuid = new Date().getTime() * 1000 + (lastUuid++ % 1000);
      console.log("aaa");
      console.log(this.uuid);
      console.log("bbb");
    }
  }
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

