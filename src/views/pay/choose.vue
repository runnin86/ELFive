
<template>
  <div class="content">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a href="#"><img src="/img/11/return.png"></a>
      <strong>跟单</strong>
    </div>

    <!-- 跟单票未购买状态 -->
    <div class="el_bill_box">
      <div class="el_bill_title">
        <span>推荐号码</span>
      </div>
      <ul class="el_bill_number">
        <li>01</li>
        <li>02</li>
        <li>03</li>
        <li>04</li>
        <li>05</li>
        <li>06</li>
      </ul>
      <div class="el_proposal">
          <span>建议追单16082402-16082532期（100期）</span>
      </div>
      <div class="el_state_box">
            <span class="el_state">状态&nbsp<font color="#42c1b1">38</font>&nbsp期</span>
            <span class="el_process">已跟&nbsp<font color="#42c1b1">28</font>&nbsp期</span>
      </div>
      <div class="el_state_box">
            <span class="el_state">冻结金额&nbsp<font color="#42c1b1">640.00</font>&nbsp元</span>
            <span class="el_process">已使用金额&nbsp<font color="#42c1b1">64.00</font>&nbsp元</span>
      </div>
      <div class="el_button">
        <span class="el_see_btn">付费查看</span>
        <a href="" class="el_documentary_btn">跟单</a>
      </div>
      <div class="el_button">
        <span class="el_stop_btn">终止跟单</span>
      </div>
    </div>
  </div>
</template>

<style>
body,ul{
  margin: 0;
  padding: 0;
}
ul,a,p{
  margin: 0;
  padding: 0;
  list-style: none;
}
.el_head{
  width: 100%;
  height: 2.5rem;
  background-color: #282828;
  position: relative;
}
.el_head strong{
  display: block;
  color: #fff;
  width: 100%;
  line-height: 2.5rem;
  text-align: center;
}
.el_head img{
  display: block;
  height: 0.8rem;
  position: absolute;
  left: 0.5rem;
  top: 0.85rem;
}
.el_bill_box{
  width: 95%;
  background-color: #fff;
  overflow: hidden;
  margin-top: 0.5rem;
  margin-left: auto;
  margin-right: auto;
}
.el_bill_title{
  width: 100%;
  height: 1.3rem;
  background-color: #fff;
}
.el_bill_title span{
  width: 100%;
  line-height: 1.3rem;
  display: block;
  text-align: center;
  font-size: 0.6rem;
}
.el_bill_number{
  width: 100%;
  height: 2.2rem;
  background-color: #fff;
}
.el_bill_number li{
  width: 16.6%;
  float: left;
  display: block;
  line-height: 2rem;
  text-align: center
}
.el_proposal{
  height: 1.3rem;
  width: 100%;
  background-color: #fff;
  border-top: 0.05rem solid #f0f0f0;
}
.el_proposal span{
  width: 100%;
  display: block;
  text-align: center;
  line-height: 1.3rem;
  font-size: 0.6rem;
}
.el_state_box{
  width: 100%;
  height: 2.5rem;
  background-color: #fff;
  border-top: 0.05rem solid #f0f0f0;
}
.el_process,.el_state{
  width: 50%;
  text-align: center;
  line-height: 2.5rem;
  display: block;
  float: left;
  font-size: 0.7rem;
}
.el_state{
  border-right: 0.05rem solid #f0f0f0;
}
.el_button{
  width:100%;
  height:2.5rem;
  border-top: 0.05rem solid #f0f0f0;
  background-color: #fff;
}
.el_see_btn,.el_documentary_btn{
  font-size: 0.7rem;
  width: 50%;
  line-height: 2.5rem;
  text-align: center;
  display: block;
  float: left;
}
.el_see_btn{
  border-right: 0.05rem solid #f0f0f0;
}
.el_stop_btn{
  font-size: 0.7rem;
  width: 100%;
  line-height: 2.5rem;
  text-align: center;
  display: block;
}
</style>
