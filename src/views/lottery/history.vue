<template>
  <div class="content">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a href="#"><img src="/img/11/return.png"></a>
      <strong>历史号码</strong>
    </div>

    <!-- 历史号码 -->
    <table class="el_history_box"  width="100%" border="0" cellpadding="0"  cellspacing="0">
      <tr>
        <th width="30%">期数</th>
        <th colspan="5">号码</th>
      </tr>
      <tr align="center">
        <td>16082602</td>
        <td>02</td>
        <td>03</td>
        <td>04</td>
        <td>05</td>
        <td>06</td>
      </tr>
    </table>
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
.el_history_box{
  background-color: white;
}
.el_history_box tr th,.el_history_box tr td{
  border: 0.05rem solid #f0f0f0;
  height: 2.5rem;
  font-size: 0.7rem;
}

</style>
