<template>
  <div class="login">
    <router-link to="/login">
      <van-icon name="arrow-left" size="2rem" color="grey" />
    </router-link>
    <div class="main">
      <h2>注册</h2>
      <form @submit.prevent="submit">
      <div class="text">
        <div>
          <input type="text" class="1"  @mouseenter="focusText" @blur="regUser" v-model="username" placeholder="请输入用户名(4-16个数字、字母)" />
        </div>
        <van-icon name="cross" size="1.5rem" color="grey" v-show="!usernameClose" @click="clearusername" />

      </div>
      <div class="text">
        <div>
          <input type="password" class="2" @mouseenter="focusText" @blur="regpassword" placeholder="请输入密码(6~12个数字、字母)" v-model="password"/>
        </div>
        <van-icon name="cross" size="1.5rem" color="grey" v-show="!passwordClose" @click="clearpassword" />

      </div>
      <div class="text">
        <div>
          <input type="password" class="3" @mouseenter="focusText" @blur="regRepeat" v-model="repeatpassword" placeholder="请输入再次输入密码" />
        </div>
        <van-icon name="cross" size="1.5rem" color="grey" v-show="!repeatClose" @click="clearrepeat" />

      </div>
      <div class="up">
        <input type="submit" value="完成注册">
      </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
import { Decrypt, Encrypt } from "@/utils/Aes.js";

  export default {
    name: 'register',
    data() {
      return {
        username: '',
        password: '',
        repeatpassword:'',
        usernameClose: true,
        passwordClose: true,
        repeatClose:true,
        phoneClose:true
      }
    },
    
    methods: {
      
      clearusername(e) {
        this.username = ''
      },
      clearrepeat(e) {
        this.repeatpassword = ''
      },
      clearpassword(e) {
        this.password = ''
      },
      focusText(e) {
        switch(parseInt(e.currentTarget.className))
        {
            case 1:
              this.usernameClose = false;
              break;
            case 2:
              this.passwordClose = false;
              break;
            case 3:
              this.repeatClose = false;
              break;
            case 4:
              this.phoneClose = false;
              break;
        }
      },
      
      
      regUser()
      {
        var underline=document.getElementsByClassName("text")[0];
        var regUser=/^[a-zA-Z0-9_]{4,16}$/
        if(!regUser.test(this.username))
        {    
            underline.style.borderColor="red"
            return false
        }
        else{
            underline.style.borderColor="rgb(175, 228, 146)"
            return true
        }
      },
      regpassword()
      {
        var underline=document.getElementsByClassName("text")[1]
        var regPassword = /^[\d\w]{6,12}$/
        if(!regPassword.test(this.password))
        {       
          underline.style.borderColor="red"
          return false
        }else{
          underline.style.borderColor="rgb(175, 228, 146)"
          return true
        }
      },
      regRepeat()
      {
        var underline=document.getElementsByClassName("text")[2]
        if(this.password!==this.repeatpassword)
        {
          underline.style.borderColor="red"
          return false
        }else{
          underline.style.borderColor="rgb(175, 228, 146)"
          return true
        }
      },

      submit()
      {
          axios({
            url:'http://39.106.65.18:8080/user/register',
            method:'post',
            data:
            {
                username:this.username,
                password: Encrypt(this.password),
            },
            transformRequest:[function(data){
              data=Qs.stringify(data);
              return data;
            }],
            headers:{
              'Content-Type':'application/x-www-form-urlencoded'
            },
            dataType:"json"
          }).then((res)=>{
            if(res.data.msg=="用户名已存在")
              this.$notify({message: '用户名已存在',
                            color: '155,147,128',
                            background: 'rgb(237,232,104)'});
            else{
                this.$router.push('/login')
              }
          }).catch(function(error){
            console.log(error)
          })
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    width: 100%;
    padding-top: .5rem;
    height: 100vh;
    background-image: url(../assets/BG.jpg);
    background-repeat: no-repeat;
    background-size:cover;
  }

  .main {
    width: 100%;
    padding: 8rem 3rem 0;
    box-sizing: border-box;
  }

  .main h2 {
    font-size: 2rem;
  }

  .main input {
    text-indent: .5rem;
    width: 125%;
    border: none;
    line-height: 1rem;
    font-size: 1rem;
    background-color: transparent;
  }

  .text {
    margin: 2rem 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(128, 128, 128);
    
  }

  .up {
    margin: 3rem auto;
    width: 100%;
    line-height: 3rem;
    color: white;
    background-color: rgb(175, 228, 146);
    border-radius: 5rem;
  }

  .up input {
    width: 100%;
    font-size: 1.5rem;
    line-height: 3rem;
  }

  .next {
    font-size: 1.1rem;
    color: grey;
    text-align: center;
  }

  .next a {
    color: rgb(148, 142, 47);
  }

</style>


