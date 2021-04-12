<template>
  <div class="about">
    <div class="header">
      <router-link to="/my" tag="div">
        <van-icon name="arrow-left" size="3rem" color="grey" />
      </router-link>
      <div>关于我们</div>
    </div>
   <div class="main">
<div class="img">
  <img src="../assets/logo.png" alt="">
</div>
  <div class="text">
  <p>拾易 Easy Campus</p>
  <p>Version 2.0.1</p>
</div>

<van-collapse v-model="activeNames">
  <van-collapse-item title="功能介绍" name="1">以校园独特的交易平台为背景，以学生生活相近，其所感兴趣及所拥有的物品具有较大重叠性为立足点，将有闲置物品交易需求的大学生作为主要用户群体，旨在帮助大学生解决购物需求旺盛、闲置物品无法处理、网络交易风险大等问题，为大学校园打造出一个安全便利的二手线下交易平台。产品具有较好的应用创新，在“网购”热潮的影响下，其商业价值也不言而喻。</van-collapse-item>
  <van-collapse-item title="团队介绍" name="2">我们是一群有创业想法的大学生，对目标用户群体（大学生）我们有着更加准确的定位，能够更好地了解用户的具体需求并展开可行性研究。团队成员致力于Web开发，在科创方面具有一定优势。团队有规范的组织和统一管理，团队内部分工明确、相处融洽，成员相互信任，优势互补。在老师和学院的大力支持下，我们的创业之路也将潜力无穷。<div class="homyit"><img src="../assets/homyit.png" alt=""></div></van-collapse-item>
  <van-collapse-item title="版本更新" name="3">暂无</van-collapse-item>
</van-collapse>
<div class="foot">
<!-- <div class="img">
<img src="../assets/homyit.png" alt="">
</div> -->
<div>
<p>宏奕工作室 版权所有</p>
<p>Copyright © 2019 Homyit Studio.All Right Reserved.</p></div>
</div>
   </div>
  </div>

</template>

<script>
// import { Row, Col, Icon, Cell, CellGroup } from 'vant';
import axios from "axios";
import Qs from "qs";

export default {
  name: "AboutUs",
  data() {
   return {
      activeNames: ['0']
    };
  },
  methods: {
  }
}
</script>

<style scoped>
.about {
  margin: 0;
  padding: 0;
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
.main
{
  width: 100%;
}
.main .homyit img
{
  width: 100%;
}
.main .img{
  width: 5rem;
  height: 5rem;
  margin: 0 auto;

}
.main .img img
{
  width: 100%;
}
.main .text
{
  padding: 1.5rem 0;
  text-align: center;
  color: black;
}
.main .text p
{
    margin: 0;
    line-height: 2rem;
}
.main .text p:first-child
{
  font-size: 1.3rem;
  font-weight: 600;
}
.foot{
  margin: 0 auto;
  width: 100%;
}
.foot div:last-child
{
  margin-top: 2rem;
}
.foot div:last-child p
{
  color: rgb(193, 200, 206);
  margin: 0 auto;
  text-align: center;
}
</style>

