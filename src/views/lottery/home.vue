
<template>
  <div class="content">
    <!-- 防止ios自动获取电话号码 -->
    <meta name = "format-detection" content = "telephone=no">

    <!-- 顶部操作栏 -->
    <div class="el_head">
      <img src="/img/11/title.png" class="el_title">
      <a href=""><img src="/img/11/user_icon.png" class="el_user_btn"></a>
    </div>

    <!-- 推荐号码 -->
    <div class="el_recommend">
        <span>推荐号码</span>
    </div>
    <div class="recommendation_number_box">
        <strong >01</strong>
        <strong >01</strong>
        <strong >01</strong>
        <strong >01</strong>
        <strong >01</strong>
        <strong >01</strong>
    </div>

    <!-- 推荐号码即时状态 -->
    <table class="el_info" width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td style="border-left:#fff;">
          <p>推荐期数</p>
          <p>100</p>
        </td>
        <td>
          <p>已进行</p>
          <p>26</p>
        </td>
        <td>
          <p>本期利润</p>
          <p>73%</p>
        </td>
        <td>
          <p>状态</p>
          <p>进行中</p>
        </td>
      </tr>
    </table>

    <!-- 跟单按钮 -->
    <div class="el_documentary_btn">
      <span>跟单</span>
    </div>

    <!-- 推荐记录/历史号码 -->
    <ul class="el_history_record_box">
        <li class="el_recommended_record">
            <a href="#"><img src="/img/11/recommended_record.png"></a>
            <span>推荐记录</span>
        </li>
        <li class="el_history_record">
            <a href="#"><img src="/img/11/history_record.png"></a>
            <span>历史号码</span>
        </li>
    </ul>

    <!-- 最新开奖号码 -->
    <div class="el_news">
      <img src="/img/11/horn.png" class="el_horn">
      <span>第28687期中奖号码&nbsp&nbsp01&nbsp&nbsp02&nbsp&nbsp08&nbsp&nbsp09&nbsp&nbsp10&nbsp&nbsp11</span>
    </div>

    <!-- 自主选号区 -->
    <div class="el_pick">
      <span>选号区</span>
    </div>

    <!-- 选号区数字按钮 -->
    <table class="el_number_btn" width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td><span>01</span></td>
        <td><span>02</span></td>
        <td><span>03</span></td>
        <td><span>04</span></td>
        <td><span>05</span></td>
        <td><span>06</span></td>
      </tr>
      <tr>
        <td><span>07</span></td>
        <td><span>08</span></td>
        <td><span>09</span></td>
        <td><span>10</span></td>
        <td><span>11</span></td>
        <td>&nbsp</td>
      </tr>
    </table>

    <!-- 购买按钮 -->
    <div class="el_documentary_btn">
      <span>购买</span>
    </div>
  </div>
</template>

<style>
body,ul{
  margin:0;
  padding:0;
  background-color: #f0f0f0
}
.el_head {
  width:100%;
  height:50px;
  background-color: #282828;
  overflow:hidden;
  position: relative;
}
.el_title{
  display: block;
  color:#fff;
  line-height:2.5rem;
  text-align:center;
  margin:0.8rem auto;
  width:4rem;
}
.el_user_btn{
  position: absolute;
  right:0.5rem;
  top:0.7rem;
  width:1.1rem;
  height:1.1rem;
}
.el_recommend{
  width:100%;
  height:1rem;
  background-color: #282828;
}
.el_recommend span{
  font-size:0.6rem;
  color: #fff;
  display: block;
  width:100%;
  line-height: 1rem;
  text-align: center;
}
.recommendation_number_box{
  width:100%;
  height:3rem;
  background-color: #282828;
}
.recommendation_number_box strong{
  color: #fff;
  line-height: 3rem;
  display: block;
  float: left;
  text-align: center;
  font-size: 1.4rem;
  width: 16.6%;
}
.el_info{
  margin: 0;
  padding: 0;
  width:100%;
  background-color: #fff;
  height:2.5rem;
}
.el_info tr{
  height:2.5rem;
}

.el_info tr td{
    width:25%;
    border-left:1px solid #f0f0f0;
}

.el_info tr td p{
  font-size: 0.6rem;
  line-height:0.4rem;
  width:100%;
  text-align: center;
}
.el_documentary_btn{
  width:100%;
  height:2.5rem;
  background-color: #fff;
  border-top:solid 0.05rem #f0f0f0;
}
.el_documentary_btn span{
  display: block;
  font-size: 0.7rem;
  width:100%;
  text-align: center;
  line-height: 2.5rem;
  color: #42c1b1;
}
.el_history_record_box{
  width:100%;
  background-color: #fff;
  margin-top:0.5rem;
  height:3.7rem;
}
.el_recommended_record,.el_history_record{
  width:50%;
  height:100%;
  float: left;
  list-style: none;
}
.el_recommended_record{
  border-right:0.05rem solid #f0f0f0;
}
.el_recommended_record span,.el_history_record span{
  width: 100%;
  display: block;
  text-align: center;
  font-size: 0.6rem;
  line-height: 1.5rem;
}
.el_recommended_record img,.el_history_record img{
  height:1.2rem;
  display: block;
  margin:0 auto;
  margin-top:0.8rem;
}
.el_news{
  width:100%;
  height:2.5rem;
  background-color: #fff;
  margin-top:0.5rem;
  position: relative;
}
.el_news span{
  display: block;
  line-height: 2.5rem;
  font-size: 0.7rem;
  margin-left: 1.7rem;
}
.el_horn{
  display: block;
  width:0.8rem;
  top:0.8rem;
  left: 0.5rem;
  position: absolute;
}
.el_pick{
  width:100%;
  height:2.5rem;
  background-color: #fff;
  overflow: hidden;
  margin-top: 0.5rem;
}
.el_pick{
  width:100%;
  display: block;
  font-size: 0.7rem;
  text-align: center;
  line-height: 2.5rem;
}
.el_number_btn{
  background-color: #fff;
}
.el_number_btn tr{
  width: 100%;
  height: 2.5rem;
  border-top:0.05rem solid #f0f0f0;
}
.el_number_btn tr td{
  border-left:0.05rem solid #f0f0f0;
}
.el_number_btn tr td span{
  display: block;
  border:0.05rem solid #f0f0f0;
  width:1.6rem;
  height:1.6rem;
  line-height: 1.6rem;
  border-radius: 2rem;
  text-align: center;
  margin: 0 auto;
  font-size: 0.7rem;
}

</style>
