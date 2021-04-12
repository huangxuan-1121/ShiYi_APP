<template>
  <div class="issue">
    <header>
      <div class="issueHeader">
        <div class="issueBtn" id="issueCancel">
          <router-link to="/index">取消</router-link>
        </div>
        <div class="issueBtn" id="issueWord">发布</div>
        <div class="issueBtn" id="issueConfirm">
          <van-button type="primary" round size="small" @click="submit(),submitImg()">发布</van-button>
        </div>
      </div>
    </header>
    <div class="issueContent">
      <div id="goodsMessage">
        <van-field v-model="goodsTitle" placeholder="请输入商品标题" />
        <van-cell-group>
          <van-field
            v-model="message"
            rows="6"
            autosize
            type="textarea"
            maxlength="100"
            placeholder="请输入商品描述"
            show-word-limit
          />
        </van-cell-group>
      </div>
      <div id="goodsImg">
        <van-uploader v-model="fileList" multiple :max-count="6" preview-size="100px" />
      </div>
      <div id="price">
        <van-field v-model="price" clearable left-icon="gold-coin-o" placeholder="价格" />
      </div>
      <div id="classify">
        <!-- <div id="classifyWord">
              分类
        </div>-->
        <van-dropdown-menu>
          <van-dropdown-item v-model="optionValue" :options="option" />
        </van-dropdown-menu>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";

export default {
  name: "Issue",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      goodsTitle: "",
      message: "",
      fileList: [],
      price: "",
      optionValue: "classification",
      uuid: "",

      option: [
        { text: "分类", value: "classification" },
        { text: "学习用品", value: "schoolSupply" },
        { text: "服饰", value: "clothing" },
        { text: "零食", value: "snack" },
        { text: "其他", value: "otherGoods" }
      ]
    };
  },
  methods: {
    submitImg(file) {
      //将图片上传到服务器！
      let data = this.fileList.map((item, index) => {
        return item.content;
      });
      console.log(data);
      axios({
        url: "http://39.106.65.18:8080/goods/base64Upload",
        method: "post",
        data: {
          base64Data: data,
          sign: this.uuid
        },
        transformRequest: [
          function(data) {
            console.log("aaa");
            console.log(data.sign);
            console.log("bbb");
            data = Qs.stringify(data);
            return data;
          }
        ],
        dataType: "json"
      })
        .then(res => {
          //console.log(this.fileList)
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submit() {
      axios({
        url: "http://39.106.65.18:8080/goods/addGoods", // 后端的接口地址
        method: "post",
        params: {},
        data: {
          name: this.goodsTitle,
          description: this.message,
          price: this.price,
          category: this.optionValue,
          sign: this.uuid,
          id: window.localStorage.data
        },
        transformRequest: [
          function(data) {
            // console.log(data);
            data = Qs.stringify(data);
            // console.log(data);
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
          this.$notify({
            message: "发布成功！",
            color: "155,147,128",
            background: "rgb(237,232,104)"
          });
          setTimeout(() => {
            this.$router.push("/index");
          }, 1000);
        })
        .catch(function(error) {
          console.log("连接失败"); // 作用同上
          console.log(error); // 如果连接失败，会抛出错误信息。
        });
    },
    createUuid() {
      var lastUuid = 0;
      this.uuid = new Date().getTime() * 1000 + (lastUuid++ % 1000);
      console.log("aaa");
      console.log(this.uuid);
      console.log("bbb");
    }
  },
  mounted() {
    this.createUuid();
  },
  created: function() {
    if (!window.localStorage.data) {
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.issueHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7.5vh;
  background-color: rgb(174, 227, 145);
}
.issueBtn {
  width: 15%;
  height: 50%;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

#issueCancel {
  font-size: 15px;
  margin-left: 5%;
}

#issueWord {
  font-size: 20px;
  font-weight: 600;
}

#issueConfirm {
  font-size: 18px;
  margin-right: 5%;
}

.issueContent {
  height: 89.5vh;
  margin: 3vh 0 0 0;
  padding: 0 3vw 0 3vw;
}

#goodsMessage {
  border: 1px solid rgb(200, 200, 200);
}

#goodsImg {
  margin: 3vh 0 3vh 0;
  text-align: left;
}

#classify {
  display: flex;
  padding: 0px 16px 0px 16px;
}

/* #classifyWord{
    font-size: 1rem;
    font-weight: 400;
    width: 90px;
    line-height: 50px;
} */
</style>
