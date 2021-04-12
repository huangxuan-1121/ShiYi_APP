<template>
  <div class="my">
    <router-link tag="div" class="name" to="/changeInfo">
      <div>
        <img :src="this.avatarUrl" alt />
      </div>
      <div>
        <h3>{{msg}}</h3>
        <p>{{introduction}}</p>
      </div>
    </router-link>
    <br />
    <van-cell-group>
      <van-cell icon="add" title=" 我的发布 " is-link to="/myUpdata" size="large" />
      <van-cell icon="like" title=" 我的收藏 " is-link to="/myCollection" size="large" />
      <van-cell icon="lock" title="修改密码 " is-link to="/changePassword" size="large" />
      <van-cell icon="question" title="问题反馈 " is-link to="/returnMessage" size="large" />
      <van-cell icon="friends" title=" 关于 " is-link to="/aboutUs" size="large" />
      <br />
      <br />
      <br />
    </van-cell-group>
    <div class="footer">
      <p @click="out">退出登录</p>
    </div>

    <!-- <router-view /> -->

    <van-tabbar route>
      <van-tabbar-item replace to="/index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/issue" icon="add">发布</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import { Row, Col, Icon, Cell, CellGroup } from 'vant';
import axios from "axios";
import Qs from "qs";

export default {
  name: "my",
  data() {
    return {
      msg: " ",
      introduction: " ",
      avatarUrl: " "
    };
  },
  methods: {
    out() {
      localStorage.clear();
      this.$router.push("/login");
    }
  },
  created: function() {
    if (!window.localStorage.data) {
      this.$router.push("/login");
    }
    
  },

  mounted: function() //mounted钩子函数(用来向后端发起请求拿到数据以后做一些业务处理)
  {
    axios({
      url: "http://39.106.65.18:8080/user/getUserById",
      method: "get",
      params: {
        id:window.localStorage.data
      }
    })
      .then(res => {
        this.msg = res.data[0].username;
        this.introduction = res.data[0].introduction;
        this.avatarUrl = res.data[0].avatarUrl;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.my {
  /* background-color: rgb(248,245,238); */
  margin: 0;
  padding: 0;
  height: 100vh;
}
.name {
  background: linear-gradient(to right, #000000 0%, rgb(112, 112, 99) 100%);
  width: 100%;
  display: flex;
}
.name img {
  overflow: hidden;
  width: 5rem;
  height: 5rem;
  border: 0.1rem solid black;
  border-radius: 50%;
}
.name div:first-child {
  padding: 1rem;
}
.name h3 {
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
  margin-bottom: 0;
}
.name p {
  color: rgb(143, 143, 142);
  font-size: 0.9rem;
}
.footer {
  width: 100%;
  border-top: 0.05rem solid rgb(148, 147, 147);
  border-bottom: 0.05rem solid rgb(150, 150, 150);
}
.footer p {
  text-align: center;
  font-size: 1.2rem;
  line-height: 2.8rem;
  margin: 0;
  /* position:  */
}
</style>

