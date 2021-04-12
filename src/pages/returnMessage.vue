<template>
  <div class="return">
    <div class="header">
          <router-link to="/my" tag="div">
      <van-icon name="arrow-left" size="3rem" color="grey" /> 
    </router-link>
      <div>反馈</div>
    </div>
    <div class="main">
      <p>问题和意见（必填）</p>
      <textarea
        name
        id
        cols="50"
        rows="10"
        placeholder="请描述您在使用过程中遇到的问题和意见，感谢您的支持~"
        v-model="message"
      ></textarea>
      <p>添加图片（选填最多3张）</p>
      <van-uploader v-model="fileList" multiple :max-count="3" 
      :after-read="afterRead" 
      />
      <p>联系方式（选填）</p>
      <input type="text" placeholder="留下您的联系方式，更可能解决问题哦！" v-model="tel" />
    </div>
    <div class="footer">
      <p @click="submit">确认提交</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  name: "returnMessage",
  data() {
    return {
      fileList: [],
      message: "",
      tel: ""
    };
  },
  methods: {
    afterRead(file) {
      //将图片上传到服务器！
      let data = this.fileList.map((item,index)=>{
        return item.content
      })
      console.log(data)
      axios({
        url: "http://39.106.65.18:8080/feedback/base64Upload",
        method: "post",
        data: {
          base64Data: data
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
          //console.log(this.fileList)
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);

        });
    },
    submit() {
      axios({
        url: "http://39.106.65.18:8080/feedback/addFeedBack",
        method: "post",
        data: {
          message: this.message,
          id: this.tel,
        },
        transformRequest: [
          function(data) {
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
          console.log(res);
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
.return {
  width: 100%;
}
.header
{
  margin-bottom: 1rem;
  box-sizing: border-box;
  padding: .5rem;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 4rem;
  background-color: rgb(175, 228, 146);
}
.header div:first-child
{
  width:0%;
}

.header div:last-child
{
  width: 100%;
  margin: 0;
  line-height: 3rem;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
}
.main {
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
.return p {
  margin: 0;
  line-height: 3rem;
  font-size: 1rem;
  font-weight: 600;
}
textarea {
  margin: 0;
  font-size: 1rem;
  width: 99%;
  border-top: 0.01rem solid rgb(83, 81, 81);
}
input {
  width: 99%;
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
