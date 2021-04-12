<template>
  <div class="myUpdata">
    <div class="header">
      <router-link to="/my" tag="div">
        <van-icon name="arrow-left" size="3rem" color="grey" />
      </router-link>
      <div>我发布的</div>
    </div>

    <div class="goods" v-for="(item,index) in img" :key="index">
      <van-card 
      :title="name[index]" 
      :thumb="img[index]"
      >
        <div slot="footer" class="btn">
          <van-button size="small" color="rgb(246,179,127)" @click="dele(id[index])">下架</van-button>
        </div>
      </van-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  name: "myUpdata",
  data() {
    return {
      id:[],
      name: [],
      img:[]
    };
  },
  methods:{
    dele(index)
    {
      console.log(index)
      axios({
      url: "http://39.106.65.18:8080/goods/deleteGoodsById",
      method: "post",
      data: {
          id:index
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
          window.location.reload();

      })
      .catch(function(error) {
        console.log(error);
      });
    }
  },
  mounted: function() //mounted钩子函数(用来向后端发起请求拿到数据以后做一些业务处理)
  {
    axios({
      url: "http://39.106.65.18:8080/goods/getGoodsBySeller",
      method: "post",
      params: {
        id: window.localStorage.data
      }
    })
      .then(res => {
        let img = [];
        let name = [];
        let id = [];
        for (var i = 0; i < res.data.length; i++) {
          name[i] = res.data[i].name;
          img[i] = res.data[i].imgUrl;
          id[i] = res.data[i].id;
        }
        this.id = id;
        this.img = img;
        this.name = name;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myUpdata {
  width: 100%;
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
</style>
