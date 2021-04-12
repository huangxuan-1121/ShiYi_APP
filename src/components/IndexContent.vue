<template>
  <div class="indexContent">
    <div class="Carousel">
      <el-carousel :interval="4000" type="card" height="120px">
        <el-carousel-item >
          <img src="../assets/banner1.jpg" alt />
        </el-carousel-item>
        <el-carousel-item >
          <img src="../assets/banner2.jpg" alt />
        </el-carousel-item>
        <el-carousel-item >
          <img src="../assets/banner3.jpg" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <h3 class="greatGoods">GREAT GOODS</h3>

    <div
      data-v-324e7052
      role="separator"
      class="van-divider van-divider--hairline van-divider--content-center van-divider-box"
      style="border-color: rgb(25, 137, 250); color: rgb(25, 137, 250); padding: 0px 16px;"
    >
      <h2 data-v-324e7052>好货推荐</h2>
    </div>
    <div class="goodsDisplay">
      <div
        class="goodsitem"
        v-for="(item,index) in goodsList"
        @click="getGoodsDetails(goods[index])"
        :key="index"
        icon="photo-o"
        text="文字"
      >
        <div class="goodsPreview">
          
            <img class="goods-img" :src="item.imgUrl" alt />
          

          <div class="goods-message">
            <p class="goods-brief-intro" v-text="item.name">林靓仔专用洗面奶</p>
            <div class="wrap">
              <div class="merchant">
                <img class="merchant-img" :src="item.avatarUrl" alt />
                <p class="merchant-name" v-text="item.seller">林靓仔</p>
              </div>
              <h1 v-text="item.price"></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Qs from "qs";

export default {
  name: "IndexContent",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      goodsList: [],
      goods: [],
      images: [
        "https://img.yzcdn.cn/vant/logo.png",
        "https://img.yzcdn.cn/vant/logo.png",
        "../assets/banner3.jpg",
        "../assets/banner4.jpg"
      ]
    };
  },
  methods: {
    getGoodsDetails(item) {
      // console.log("nihao");
      // console.log(item);
      var ses = window.sessionStorage; //sessionStorage关闭窗口，存储的数据清空
      var id = JSON.stringify(item);
      ses.setItem("goodsId", id);
      this.$router.push("/goodsdetails");
    }
  },
  mounted() {
    axios({
      url: "http://39.106.65.18:8080/goods/getAllGoods", // 后端的接口地址
      method: "get",
      params: {},
      data: {
        isRequest: true,
        category: "indexContent"
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
        this.goodsList = res.data;
        for (var i = 0; i < res.data.length; i++) {
          this.goods[i] = res.data[i].id;
        }
        // console.log(this.goodsList);
      })
      .catch(function(error) {
        console.log("连接失败"); // 作用同上
        console.log(error); // 如果连接失败，会抛出错误信息。
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.indexContent {
  padding: 5vh 0 5vh 0;
}

.Carousel {
  margin: 0 0 5vh 0;
}

.Carousel img{
  width: 100%;
  height: 100%;
}
h3.greatGoods {
  margin-bottom: 0;
  text-align: center;
  font-size: 0.9rem;
}
.van-divider-box {
  margin: 0 0 0 0;
}

.goodsDisplay {
  display: grid;
  width: 100%;
  grid-template-columns: 45% 45%;
  grid-gap: 5vh 10%;
}
.goodsPreview {
  display: block;
  width: 100%;
  box-sizing: border-box;

  /* padding: 1rem; */
}
.goods-img {
  box-sizing: border-box;
  width: 100%;
  height: 7.5rem;
}

p.goods-brief-intro {
  margin: 0.5rem 0 0.5rem 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goods-message {
  padding: 0 0.5rem 0 0.5rem;
}
.goodsPreview .wrap {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.goodsPreview .wrap .merchant {
  display: flex;
  align-items: center;
}

.goodsPreview .wrap .merchant img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}

.goodsPreview .wrap .merchant p {
  margin: 0 0 0 0.5rem;
}

.goodsPreview .wrap h1 {
  margin: 0 0 0 0;
  font-size: 1.2rem;
}
</style>