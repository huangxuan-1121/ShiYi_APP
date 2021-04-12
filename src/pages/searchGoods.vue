<template>
  <div class="searchGoods">
    <header>
      <div class="indexHeader">
        <div class="logoWord">
          <router-link to="/index">拾易</router-link>
        </div>
        <div class="searchBox">
          <form data-v-4bc9d7de action="/">
            <div
              data-v-6e3b5cba
              class="van-search van-search--show-action"
              @search="onSearch(searchKeyWords)"
            >
              <div data-v-6e3b5cba class="van-search__content van-search__content--round">
                <div data-v-6e3b5cba class="van-cell van-cell--borderless van-field">
                  <div class="van-field__left-icon">
                    <i class="van-icon van-icon-search">
                      <!---->
                    </i>
                  </div>
                  <div class="van-cell__value van-cell__value--alone">
                    <div class="van-field__body">
                      <input
                        type="search"
                        placeholder="请输入搜索关键词"
                        class="van-field__control"
                        v-model="searchKeyWords"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div data-v-6e3b5cba role="button" tabindex="0" class="searchBtn">
                <div data-v-6e3b5cba @click="onSearch(searchKeyWords)">搜索</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
    <div class="indexContainer">
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
            <router-link to="/goodsdetails">
              <img class="goods-img" :src="item.imgUrl" alt />
            </router-link>

            <div class="goods-message">
              <p class="goods-brief-intro" v-text="item.name">林靓仔专用洗面奶</p>
              <div class="wrap">
                <div class="merchant">
                  <img class="merchant-img" :src="item.avatarUrl" alt />
                  <p class="merchant-name" v-text="item.seller">林靓仔</p>
                </div>
                <h1>￥{{item.price}}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Tabber></Tabber>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";

import Tabber from "@/components/Tabber";
export default {
  name: "Index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      activeName: "a",
      searchKeyWords: window.sessionStorage.searchKeyWords,
      goodsList: [],
      goods: []
    };
  },
  components: {
    Tabber
  },
  methods: {
    getGoodsDetails(item) {
      // console.log("nihao");
      // console.log(item);
      var ses = window.sessionStorage; //sessionStorage关闭窗口，存储的数据清空
      var id = JSON.stringify(item);
      ses.setItem("goodsId", id);
    },
    onSearch(searchKeyWords) {
      axios({
        url: "http://39.106.65.18:8080/goods/searchGoods", // 后端的接口地址
        method: "post",
        params: {},
        data: {
          isRequest: true,
          category: "indexContent",
          name: this.searchKeyWords
        },
        transformRequest: [
          function(data) {
            // console.log(data.name);
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
  },
  mounted() {
    axios({
      url: "http://39.106.65.18:8080/goods/searchGoods", // 后端的接口地址
      method: "post",
      params: {},
      data: {
        isRequest: true,
        category: "indexContent",
        name: window.sessionStorage.searchKeyWords
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
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  /* color: #42b983; */
  list-style: none;
  text-decoration: none;
  color: black;
}
a:hover,
a:visited,
a:link,
a:active {
  list-style: none;
  text-decoration: none;
}

.indexHeader {
  display: flex;

  align-items: center;
  height: 7.5vh;
  background-color: rgb(174, 227, 145);
  padding: 0 3vw 0 3vw;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 100;
}

.indexHeader .logoWord {
  width: 20%;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  /* margin: 0 3vw 0 3vw; */
}

.indexHeader .searchBox {
  width: 70%;
}

.searchBtn {
  font-size: 1rem;
  padding: 0 8px;
  color: #323233;

  line-height: 34px;
}

.indexContainer {
  /* height: 89.5vh; */
  margin: 0 0 5vh 0;
  padding: 0 3vw 0 3vw;
}

.goodsDisplay {
  display: grid;
  width: 100%;
  grid-template-columns: 45% 45%;
  grid-gap: 5vh 10%;
  margin: 10vh 0 10vh 0;
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
