<template>
  <div class="goodsDetails">
    <header>
      <div class="goodsDetailsHeader">
        <div class="goback" id="goodsDetailsgoback" @click="goBack">
          <van-icon name="arrow-left" />商品详情
        </div>
      </div>
    </header>
    <div class="goodsDetailsContent">
      <div class="picture">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item, index) in images" :key="index">
            <img v-lazy="images[index]" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="goodsMessage">
        <div class="name">
          <h1>{{this.name}}</h1>
        </div>
        <div class="price">
          <h1>￥{{this.price}}</h1>
        </div>
      </div>

      <div data-v-6f1c1aa0 class="van-skeleton">
        <div
          data-v-6f1c1aa0
          class="van-skeleton__avatar van-skeleton__avatar--round"
          style="width: 50px; height: 50px;margin: 8px 0 0 0;"
        >
          <img :src="this.merchant.merchantImg" style="width: 50px; height: 50px;" alt />
        </div>
        <div data-v-6f1c1aa0 class="van-skeleton__content">
          <h2 v-text="this.merchant.merchantName">{{this.merchant.merchantName}}}</h2>
          <h3 v-text="this.merchant.merchantTips">{{this.merchant.chantTips}}</h3>
        </div>
      </div>
      <div class="describe">
        <van-cell title="QQ" :value="this.merchant.merchantQQNumber" />
        <!-- <van-cell title="微信" :value="this.merchant.merchantWeChatNumber" /> -->
        <van-cell :value="this.merchant.merchantWord" />
      </div>

      <van-divider></van-divider>
      <p class="comment-title">留言区</p>
      <div class="commentBox">
        <van-cell-group>
          <van-field
            v-model="userComment"
            rows="6"
            autosize
            type="textarea"
            placeholder="有没有什么想对Ta说的呢"
            show-word-limit
          />
        </van-cell-group>
      </div>
    </div>
    <footer class="details-footer">
      <div class="footer-wrap">
        <div class="collection" @click="collect()">
          <img src="https://img.yzcdn.cn/vant/leaf.jpg" alt />
          <p>收藏</p>
        </div>
        <div class="comment">
          <img src="https://img.yzcdn.cn/vant/leaf.jpg" alt />
          <p>评论</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";

export default {
  name: "goodsDetails",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      images: [],
      name: "",
      price: "",
      merchant: {
        merchantImg: "",
        merchantName: "",
        merchantTips: "",
        merchantQQNumber: "",
        merchantWeChatNumber: "",
        merchantWord: ""
      },
      userComment: "",
      loading: true,
      animate: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    collect() {
      if (!window.localStorage.data) {
        this.$router.push("/login");
      } else {
        axios({
          url: "http://39.106.65.18:8080/goods/collectGoods", // 后端的接口地址
          method: "post",
          data: {
            id: window.sessionStorage.goodsId,
            u_id: window.localStorage.data
          },
          transformRequest: [
            function(data) {
              data = Qs.stringify(data);
              console.log(data);
              return data;
            }
          ],
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          dataType: "json"
        })
          .then(res => {
            // console.log(res);
            if (res.data.msg == "collect succeed") {
              this.$notify({
                message: "收藏成功！",
                color: "155,147,128",
                background: "rgb(237,232,104)"
              });
            } else {
              this.$notify({
                message: "未知错误，收藏失败！",
                color: "155,147,128",
                background: "rgb(237,232,104)"
              });
            }
          })
          .catch(function(error) {
            console.log(error); // 如果连接失败，会抛出错误信息。
          });
      }
    }
  },
  created: function() {
    axios({
      url: "http://39.106.65.18:8080/goods/getGoodsById", // 后端的接口地址
      method: "post",
      data: {
        id: window.sessionStorage.goodsId
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
        for (var i = 0; i < res.data.length; i++) {
          this.images[i] = res.data[i].imgUrl;
        }
        this.price = res.data[0].price;
        this.name = res.data[0].name;
        this.merchant.merchantWord = res.data[0].description;
        this.merchant.merchantImg = res.data[0].avatarUrl;
        this.merchant.merchantName = res.data[0].seller;
        this.merchant.merchantQQNumber = res.data[0].contact;
        // this.merchant.merchantWeChatNumber = res.data[0].WeChatNumber;
      })
      .catch(function(error) {
        console.log(error); // 如果连接失败，会抛出错误信息。
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goodsDetails {
  background-color: rgb(251, 251, 251);
}
.goodsDetailsHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7.5vh;
  background-color: rgb(174, 227, 145);
  padding: 0 3vw 0 3vw;
  position: fixed;
  top: 0;
  z-index: 100;
}

p {
  margin: 0;
}

.goback {
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
}

.goodsDetailsContent {
  min-height: 100vh;
  margin: 10.5vh 0 0 0;
  padding: 0 3vw 12vh 3vw;
}

.goodsDetailsContent img {
  width: 100%;
  height: 25vh;
}

.goodsMessage {
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.goodsDetailsContent .name {
  display: flex;
  align-content: center;
  text-align: left;
}
.goodsDetailsContent .price {
  text-align: left;
  display: flex;
  align-content: center;
  text-align: left;
}
.goodsDetailsContent .name h1 {
  padding: 0 5vw 0 5vw;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  text-align: left;
}
.goodsDetailsContent .price h1 {
  padding: 0 5vw 0 5vw;
  color: red;
}

.van-skeleton__content h2,
h3 {
  margin: 0;
  padding: 0 5vw 0 5vw;
  text-align: left;
}

.van-skeleton__content h3 {
  margin: 5px 0 0 0;
  font-weight: 300;
}

.van-skeleton__avatar img {
  border-radius: 50%;
}

.describe {
  margin: 2vh 0 0 0;
}

.comment-title {
  padding: 10px 16px;
  font-size: 1.1rem;
  font-weight: 700;
}

.commentBox {
  margin: 0 0 15vh 0;
}

.details-footer {
  /* height: 8vh; */
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: white;
  z-index: 100;
}

.footer-wrap {
  margin: 0 8vw 0 8vw;
  padding: 1vh;
  display: flex;
}

.collection {
  width: 2.5rem;
  margin: 0 1vw 0 1vw;
  /* height: 9vh; */
  /* background-color: aquamarine; */
}

.comment {
  width: 2.5rem;
  margin: 0 1vw 0 1vw;
  /* height: 9vh; */
  /* background-color: rgb(0, 177, 118); */
}

.details-footer .footer-wrap img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

.details-footer .footer-wrap p {
  margin: 0;
  text-align: center;
}
</style>