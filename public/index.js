const html = `
<div id="append_parent"></div><div id="ajaxwaitid"></div>
<div id="toptb" class="cl">

<script type="text/javascript">
var simulateSelect = function(selectId, widthvalue){
var fastloginfieldHtml =  $("ls_fastloginfield").innerHTML;
fastloginfieldHtml = fastloginfieldHtml+'<option value="mobile">手机号</option>';
$("ls_fastloginfield").innerHTML = fastloginfieldHtml;
var selectObj = $(selectId);
if(!selectObj) return;
if(BROWSER.other) {
if(selectObj.getAttribute('change')) {
selectObj.onchange = function () {eval(selectObj.getAttribute('change'));}
}
return;
}
var widthvalue = widthvalue ? widthvalue : 70;
var defaultopt = selectObj.options[0] ? selectObj.options[0].innerHTML : '';
var defaultv = '';
var menuObj = document.createElement('div');
var ul = document.createElement('ul');
var handleKeyDown = function(e) {
e = BROWSER.ie ? event : e;
if(e.keyCode == 40 || e.keyCode == 38) doane(e);
};
var selectwidth = (selectObj.getAttribute('width', i) ? selectObj.getAttribute('width', i) : widthvalue) + 'px';
var tabindex = selectObj.getAttribute('tabindex', i) ? selectObj.getAttribute('tabindex', i) : 1;

for(var i = 0; i < selectObj.options.length; i++) {
var li = document.createElement('li');
li.innerHTML = selectObj.options[i].innerHTML;
li.k_id = i;
li.k_value = selectObj.options[i].value;
if(selectObj.options[i].selected) {
defaultopt = selectObj.options[i].innerHTML;
defaultv = selectObj.options[i].value;
li.className = 'current';
selectObj.setAttribute('selecti', i);
}
li.onclick = function() {
if($(selectId + '_ctrl').innerHTML != this.innerHTML) {
var lis = menuObj.getElementsByTagName('li');
lis[$(selectId).getAttribute('selecti')].className = '';
this.className = 'current';
$(selectId + '_ctrl').innerHTML = this.innerHTML;
$(selectId).setAttribute('selecti', this.k_id);
$(selectId).options.length = 0;
$(selectId).options[0] = new Option('', this.k_value);
eval(selectObj.getAttribute('change'));
}
hideMenu(menuObj.id);
return false;
};
ul.appendChild(li);
}

selectObj.options.length = 0;
selectObj.options[0]= new Option('', defaultv);
selectObj.style.display = 'none';
selectObj.outerHTML += '<a href="javascript:;" id="' + selectId + '_ctrl" style="width:' + selectwidth + '" tabindex="' + tabindex + '">' + defaultopt + '</a>';

menuObj.id = selectId + '_ctrl_menu';
menuObj.className = 'sltm';
menuObj.style.display = 'none';
menuObj.style.width = selectwidth;
menuObj.appendChild(ul);
$('append_parent').appendChild(menuObj);

$(selectId + '_ctrl').onclick = function(e) {
$(selectId + '_ctrl_menu').style.width = selectwidth;
showMenu({'ctrlid':(selectId == 'loginfield' ? 'account' : selectId + '_ctrl'),'menuid':selectId + '_ctrl_menu','evt':'click','pos':'43'});
doane(e);
};
$(selectId + '_ctrl').onfocus = menuObj.onfocus = function() {
_attachEvent(document.body, 'keydown', handleKeyDown);
};
$(selectId + '_ctrl').onblur = menuObj.onblur = function() {
_detachEvent(document.body, 'keydown', handleKeyDown);
};
$(selectId + '_ctrl').onkeyup = function(e) {
e = e ? e : window.event;
value = e.keyCode;
if(value == 40 || value == 38) {
if(menuObj.style.display == 'none') {
$(selectId + '_ctrl').onclick();
} else {
lis = menuObj.getElementsByTagName('li');
selecti = selectObj.getAttribute('selecti');
lis[selecti].className = '';
if(value == 40) {
selecti = parseInt(selecti) + 1;
} else if(value == 38) {
selecti = parseInt(selecti) - 1;
}
if(selecti < 0) {
selecti = lis.length - 1
} else if(selecti > lis.length - 1) {
selecti = 0;
}
lis[selecti].className = 'current';
selectObj.setAttribute('selecti', selecti);
lis[selecti].parentNode.scrollTop = lis[selecti].offsetTop;
}
} else if(value == 13) {
var lis = menuObj.getElementsByTagName('li');
lis[selectObj.getAttribute('selecti')].onclick();
} else if(value == 27) {
hideMenu(menuObj.id);
}
};
}

function succeedhandle_ls(url){
window.location.href = url;
}


</script>
<div class="wp">
<div class="z"><a href="javascript:;" onclick="setHomepage('https://bbs.bbicn.com/');">设为首页</a><a href="https://bbs.bbicn.com/" onclick="addFavorite(this.href, '兵人在线BBICN');return false;">收藏本站</a></div>
<div class="y">
<a id="switchblind" href="javascript:;" onclick="toggleBlind(this)" title="开启辅助访问" class="switchblind">开启辅助访问</a>
<a href="javascript:;" id="switchwidth" onclick="widthauto(this)" title="切换到窄版" class="switchwidth">切换到窄版</a>
</div>
</div>
</div>

<div id="qmenu_menu" class="p_pop blk" style="display: none;">
<div class="ptm pbw hm">
请 <a href="javascript:;" class="xi2" onclick="lsSubmit()"><strong>登录</strong></a> 后使用快捷导航<br>没有帐号？<a href="member.php?mod=register" class="xi2 xw1">注册</a>
</div>
<div id="fjump_menu" class="btda"></div></div><div id="hd">
<div class="wp">
<div class="hdc cl"><h2><a href="./" title="兵人在线BBICN"><img src="data/attachment/study_diylogo/20200316055737.gif" alt="兵人在线BBICN" style="height:81px;" border="0"></a></h2><script src="data/cache/logging.js?cvD" type="text/javascript"></script>
<form method="post" autocomplete="off" id="lsform" action="member.php?mod=logging&amp;action=login&amp;loginsubmit=yes&amp;infloat=yes&amp;lssubmit=yes" onsubmit="pwmd5('ls_password');return lsSubmit();">
<div class="fastlg cl">
<span id="return_ls" style="display:none"></span>
<div class="y pns">
<table cellspacing="0" cellpadding="0">
<tbody><tr>
<td><label for="ls_username">帐号</label></td>
<td><input type="text" name="username" id="ls_username" class="px vm xg1" value="用户名/Email" onfocus="if(this.value == '用户名/Email'){this.value = '';this.className = 'px vm';}" onblur="if(this.value == ''){this.value = '用户名/Email';this.className = 'px vm xg1';}" tabindex="901"></td>
<td class="fastlg_l"><label for="ls_cookietime"><input type="checkbox" name="cookietime" id="ls_cookietime" class="pc" value="2592000" tabindex="903">自动登录</label></td>
<td>&nbsp;<a href="javascript:;" onclick="showWindow('login', 'member.php?mod=logging&amp;action=login&amp;viewlostpw=1')">找回密码</a></td>
</tr>
<tr>
<td><label for="ls_password">密码</label></td>
<td><input type="password" name="password" id="ls_password" class="px vm" autocomplete="off" tabindex="902"></td>
<td class="fastlg_l"><button type="submit" class="pn vm" tabindex="904" style="width: 75px;"><em>登录</em></button></td>
<td>&nbsp;<a href="member.php?mod=register" class="xi2 xw1">注册</a></td>
</tr>
</tbody></table>
<input type="hidden" name="quickforward" value="yes">
<input type="hidden" name="handlekey" value="ls">
</div>
</div>
</form>

<script src="data/cache/md5.js?cvD" type="text/javascript" reload="1"></script>
</div>

<div id="nv">
<a href="javascript:;" id="qmenu" onmouseover="delayShow(this, function () {showMenu({'ctrlid':'qmenu','pos':'34!','ctrlclass':'a','duration':2});showForummenu(2);})">快捷导航</a>
<ul><li id="mn_forum"><a href="forum.php" hidefocus="true" title="BBS">论坛<span>BBS</span></a></li><li id="mn_home"><a href="home.php" hidefocus="true" title="Space">家园<span>Space</span></a></li><li id="mn_forum_10"><a href="forum.php?mod=guide" hidefocus="true" title="Guide">最新最热贴-导读<span>Guide</span></a></li></ul>
<ul><li id="freeaddon_randomthread"><a href="plugin.php?id=freeaddon_randomthread:freeaddon_randomthread" rel="nofollow"><b>试试手气</b></a></li></ul></div>
<div class="p_pop h_pop" id="mn_userapp_menu" style="display: none"></div><div id="mu" class="cl">
<ul class="cl " id="snav_mn_userapp" style="display:none">
</ul>
</div><div class="a_mu"><a href="https://s.taobao.com/search?q=DAMTOYS" _blank"=""><img src="https://bbs.bbicn.com/data/attachment/forum/202105/12/231454bl5hv5bblbbu1hgu.gif"></a>
<a href="http://search.taobao.com/search?source=wangwang&amp;q=SOLDIERSTORY" target="_blank"><img src="https://bbs.bbicn.com/data/attachment/forum/202105/07/192507bw4amwstp4a93t3p.gif"></a></div><div id="scbar" class="cl">
<form id="scbar_form" method="post" autocomplete="off" onsubmit="searchFocus($('scbar_txt'))" action="search.php?searchsubmit=yes" target="_blank">
<input type="hidden" name="mod" id="scbar_mod" value="search">
<input type="hidden" name="formhash" value="b3eefe6f">
<input type="hidden" name="srchtype" value="title">
<input type="hidden" name="srhfid" value="2">
<input type="hidden" name="srhlocality" value="forum::index">
<table cellspacing="0" cellpadding="0">
<tbody><tr>
<td class="scbar_icon_td"></td>
<td class="scbar_txt_td"><input type="text" name="srchtxt" id="scbar_txt" value="请输入搜索内容" autocomplete="off" x-webkit-speech="" speech=""></td>
<td class="scbar_type_td"><a href="javascript:;" id="scbar_type" class="xg1" onclick="showMenu(this.id)" hidefocus="true">搜索</a></td>
<td class="scbar_btn_td"><button type="submit" name="searchsubmit" id="scbar_btn" sc="1" class="pn pnc" value="true"><strong class="xi2">搜索</strong></button></td>
<td class="scbar_hot_td">
<div id="scbar_hot">
</div>
</td>
</tr>
</tbody></table>
</form>
</div>
<ul id="scbar_type_menu" class="p_pop" style="display: none;"><li><a href="javascript:;" rel="curforum" fid="2">本版</a></li><li><a href="javascript:;" rel="forum" class="curtype">帖子</a></li><li><a href="javascript:;" rel="user">用户</a></li></ul>
<script type="text/javascript">
initSearchmenu('scbar', '');
</script>
</div>
</div>

<link rel="stylesheet" type="text/css" href="template/comiis_app/comiis/comiis_flxx/comiis_pcflxx.css">
<style>		
.forumdev {width:100%;margin-top:10px;margin-left:-155px;background: url('source/plugin/nimba_forumdev/listnum.gif') no-repeat;}
.forumdev ul {padding:0 2px 0 22px;list-style-type:none;line-height: 25px; }
.forumdev ul li{height:25px;line-height:25px;width:130%;overflow:hidden;background:url('source/plugin/nimba_forumdev/dotline.gif');}
.forumdev ul li span{float:right;margin: 0 0 0 5px}
</style>
<div id="wp" class="wp">
<div id="pt" class="bm cl">
<div class="z">
<a href="./" class="nvhm" title="首页">兵人在线BBICN</a><em>»</em><a href="forum.php">论坛</a><em>›</em> 玩家交流</div>
<div class="z"></div>
</div>



<style id="diy_style" type="text/css">#frameOD2H12 {  border:#ffffff !important;}#frameDr4tB4 {  border:#ffffff !important;}#framemb7m3j {  margin-bottom:-10px !important;border:#ffffff !important;}#tabbu6RxV {  margin-bottom:2px !important;margin-top:2px !important;}#tabVj7rW6 {  margin-left:2px !important;}#tabo6yE63 {  margin-right:3px !important;}</style>


<div id="ct" class="wp cl">
<!--[diy=diy_chart]--><div id="diy_chart" class="area"></div><!--[/diy]-->
<div class="mn">


<div class="fl bm">
<div class="bm bmw  flg cl">
<div class="bm_h cl">
<span class="o">
<img id="category_2_img" src="static/image/common/collapsed_no.gif" title="收起/展开" alt="收起/展开" onclick="toggle_collapse('category_2');">
</span>
<span class="y">分区版主: <a href="home.php?mod=space&amp;username=%CE%E5%CE%B6%BE%DE%B6%A6" class="notabs" c="1">五味巨鼎</a>, <a href="home.php?mod=space&amp;username=johnz007" class="notabs" c="1">johnz007</a>, <a href="home.php?mod=space&amp;username=satanzero" class="notabs" c="1">satanzero</a>, <a href="home.php?mod=space&amp;username=%B0%A2%C2%B3%C2%B3" class="notabs" c="1">阿鲁鲁</a>, <a href="home.php?mod=space&amp;username=skyover" class="notabs" c="1">skyover</a>, <a href="home.php?mod=space&amp;username=%BD%CC%B9%D9" class="notabs" c="1">教官</a>, <a href="home.php?mod=space&amp;username=rains1994" class="notabs" c="1">rains1994</a></span><h2><a href="forum.php?gid=2" style="">玩家交流</a></h2>
</div>
<div id="category_2" class="bm_c" style="">
<table cellspacing="0" cellpadding="0" class="fl_tb">
<tbody><tr><td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 134px;">
<a href="forum.php?mod=forumdisplay&amp;fid=100"><img src="data/attachment/common/f8/common_100_icon.gif" align="left" alt=""></a></div>
<dl style="margin-left: 134px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=100">〓 1/6 新品资讯 〓</a><em class="xw0 xi1" title="今日"> (1)</em></dt>
<dd><em>主题: <span title="13333">1万</span></em>, <em>帖数: <span title="732827">73万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=375002&amp;goto=lastpost#lastpost" class="xi2">303TOYS【视频预告】：1/6 汉寿 ...</a> <cite>2021-7-9 00:06 <a href="home.php?mod=space&amp;username=%D0%A1%C2%ED%B6%FB%B5%D9%C4%E1">小马尔蒂尼</a></cite>
</dd>


<div class="forumdev" id="forumdev_100">
  <ul><li><span>07-08/23:05</span><a href="forum.php?mod=viewthread&amp;tid=375098" title="oneshottoys新品：漫画题材：幽白-妖狐转生头雕妖狐转生头雕升级" target="_blank">oneshottoys新品：漫画题材：幽白-妖狐转生头雕妖狐转生头雕升级</a></li>
<li><span>07-08/19:01</span><a href="forum.php?mod=viewthread&amp;tid=375081" style="font-weight: bold;" title="APEXTIME 新品：“CHAOS”博物馆级收藏展示盒【遥控灯光，可展示多比例人偶】" target="_blank">APEXTIME 新品：“CHAOS”博物馆级收藏展示盒【遥控灯光，可展示多比例人偶】</a></li>
<li><span>07-08/21:38</span><a href="forum.php?mod=viewthread&amp;tid=375076" style="font-weight: bold;color: #2B65B7;" title="GA新品：1/6 HK433 武器吊卡 四款可选 ＃GA0006" target="_blank">GA新品：1/6 HK433 武器吊卡 四款可选 ＃GA0006</a></li>
<li><span>07-08/15:50</span><a href="forum.php?mod=viewthread&amp;tid=375074" style="font-weight: bold;color: #2897C5;" title="threezero 将参展 香港动漫电玩节 2021" target="_blank">threezero 将参展 香港动漫电玩节 2021</a></li>
<li><span>07-08/14:50</span><a href="forum.php?mod=viewthread&amp;tid=375049" style="font-weight: bold;color: #3C9D40;" title="POPTOYS新品：1/12 大头兵第五弹《偶像啊偶像》- 凯尔/维克托【单人版/双人套装】" target="_blank">POPTOYS新品：1/12 大头兵第五弹《偶像啊偶像》- 凯尔/维克托【单人版/双人套装】</a></li>
     
  </ul>
</div>

</dl>
</td>
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 133px;">
<a href="forum.php?mod=forumdisplay&amp;fid=115"><img src="data/attachment/common/2b/common_115_icon.jpg" align="left" alt=""></a></div>
<dl style="margin-left: 133px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=115">〓1/6开箱评测〓Reviews〓</a><em class="xw0 xi1" title="今日"> (6)</em></dt>
<dd><em>主题: 8276</em>, <em>帖数: <span title="264425">26万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=375034&amp;goto=lastpost#lastpost" class="xi2">threezero冰与火之歌 詹姆兰尼斯 ...</a> <cite>2021-7-9 00:06 <a href="home.php?mod=space&amp;username=%D0%A1%C2%ED%B6%FB%B5%D9%C4%E1">小马尔蒂尼</a></cite>
</dd>


<div class="forumdev" id="forumdev_115">
  <ul><li><span>07-08/23:04</span><a href="forum.php?mod=viewthread&amp;tid=375092" title="【多人开箱】HOTTOYS 毒液树人宝宝格鲁特 （TMS027 ）" target="_blank">【多人开箱】HOTTOYS 毒液树人宝宝格鲁特 （TMS027 ）</a></li>
<li><span>07-08/22:18</span><a href="forum.php?mod=viewthread&amp;tid=375077" title="= TRICKYMAN12 PART7 夏日色仙人 = 夏日清凉开箱篇" target="_blank">= TRICKYMAN12 PART7 夏日色仙人 = 夏日清凉开箱篇</a></li>
<li><span>07-09/00:01</span><a href="forum.php?mod=viewthread&amp;tid=375065" style="font-weight: bold;" title="渣拍：UD 少女素体" target="_blank">渣拍：UD 少女素体</a></li>
<li><span>07-08/13:26</span><a href="forum.php?mod=viewthread&amp;tid=375058" style="font-weight: bold;color: #EE5023;" title="AJ开箱：KingArts ×永井豪《钢铁JEEP》战损金刚飞天钻" target="_blank">AJ开箱：KingArts ×永井豪《钢铁JEEP》战损金刚飞天钻</a></li>
<li><span>07-08/17:34</span><a href="forum.php?mod=viewthread&amp;tid=375056" style="font-weight: bold;color: #3C9D40;" title="AJ开箱：POPTOYS 1/12 大头兵第三弹《秩序与疯狂 》-大魔王&amp;amp;列兵" target="_blank">AJ开箱：POPTOYS 1/12 大头兵第三弹《秩序与疯狂 》-大魔王&amp;amp;列兵</a></li>
     
  </ul>
</div>

</dl>
</td>
</tr>
<tr class="fl_row">
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 134px;">
<a href="forum.php?mod=forumdisplay&amp;fid=108"><img src="https://bbs.bbicn.com/data/attachment/forum/201208/28/194855ri2pi2g4t2nxpff2.jpg" align="left" alt=""></a></div>
<dl style="margin-left: 134px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=108">〓雕像版〓Statue〓</a><em class="xw0 xi1" title="今日"> (2)</em></dt>
<dd><em>主题: 6118</em>, <em>帖数: <span title="96111">9万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=375097&amp;goto=lastpost#lastpost" class="xi2">1/3  小丑女 哈莉·奎茵 全身雕 ...</a> <cite>2021-7-9 00:06 <a href="home.php?mod=space&amp;username=Sir.Shawn">Sir.Shawn</a></cite>
</dd>


<div class="forumdev" id="forumdev_108">
  <ul><li><span>07-09/00:06</span><a href="forum.php?mod=viewthread&amp;tid=375097" title="1/3  小丑女 哈莉·奎茵 全身雕像 逼真的假牙" target="_blank">1/3  小丑女 哈莉·奎茵 全身雕像 逼真的假牙</a></li>
<li><span>07-08/21:05</span><a href="forum.php?mod=viewthread&amp;tid=375093" style="font-weight: bold;color: #8F2A90;" title="洛丹伦大孝子重涂作业" target="_blank">洛丹伦大孝子重涂作业</a></li>
<li><span>07-09/00:04</span><a href="forum.php?mod=viewthread&amp;tid=375090" title="Queen Studio 新品预告：1/6《黑暗骑士崛起》猫女 雕像 即将上线" target="_blank">Queen Studio 新品预告：1/6《黑暗骑士崛起》猫女 雕像 即将上线</a></li>
<li><span>07-08/17:55</span><a href="forum.php?mod=viewthread&amp;tid=375088" title="Prime 1 Studio × Cutie1： 4.5寸 Harley Quinn 小丑女 哈莉·奎恩（CT1-21025）" target="_blank">Prime 1 Studio × Cutie1： 4.5寸 Harley Quinn 小丑女 哈莉·奎恩（CT1-21025）</a></li>
<li><span>07-08/12:37</span><a href="forum.php?mod=viewthread&amp;tid=375073" title="Iron Studios：1/10《黑寡妇》- Yelena Belova 叶莲娜·贝洛娃 雕像" target="_blank">Iron Studios：1/10《黑寡妇》- Yelena Belova 叶莲娜·贝洛娃 雕像</a></li>
     
  </ul>
</div>

</dl>
</td>
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 133px;">
<a href="forum.php?mod=forumdisplay&amp;fid=102"><img src="https://bbs.bbicn.com/data/attachment/forum/month_1007/20100709_3380750cc81cd09b86fdoBibuJvXJRmm.jpg" align="left" alt=""></a></div>
<dl style="margin-left: 133px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=102">〓3A Toys专版〓THREE A TOYS〓</a></dt>
<dd><em>主题: 6129</em>, <em>帖数: <span title="132475">13万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=172684&amp;goto=lastpost#lastpost" class="xi2">很多很多很多“点”</a> <cite>2021-7-1 16:40 <a href="home.php?mod=space&amp;username=zen">zen</a></cite>
</dd>


<div class="forumdev" id="forumdev_102">
  <ul><li><span>06-26/15:17</span><a href="forum.php?mod=viewthread&amp;tid=374029" title="Threezero×孩之宝×泰国玩具世博会 新品：2021吉祥物版 Nong Toy擎天柱、大黄蜂 两款" target="_blank">Threezero×孩之宝×泰国玩具世博会 新品：2021吉祥物版 Nong Toy擎天柱、大黄蜂 两款</a></li>
<li><span>06-26/15:17</span><a href="forum.php?mod=viewthread&amp;tid=372946" style="font-weight: bold;color: #3C9D40;" title="3A风格 捉鬼敢死队 蚂蚁人 MEZCO Ghostbusters Gomez" target="_blank">3A风格 捉鬼敢死队 蚂蚁人 MEZCO Ghostbusters Gomez</a></li>
<li><span>06-13/10:00</span><a href="forum.php?mod=viewthread&amp;tid=372451" title="threezero 北京店即将开业！" target="_blank">threezero 北京店即将开业！</a></li>
<li><span>06-26/15:16</span><a href="forum.php?mod=viewthread&amp;tid=372258" style="font-weight: bold;color: #3C9D40;" title="回答乐队 &amp;amp; 超能查派 Die Antwoord &amp;amp; Chappie" target="_blank">回答乐队 &amp;amp; 超能查派 Die Antwoord &amp;amp; Chappie</a></li>
<li><span>06-26/15:17</span><a href="forum.php?mod=viewthread&amp;tid=372128" style="font-weight: bold;color: #3C9D40;" title="Thugcore(暴徒) Cowboy(牛仔)" target="_blank">Thugcore(暴徒) Cowboy(牛仔)</a></li>
     
  </ul>
</div>

</dl>
</td>
</tr>
<tr class="fl_row">
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 133px;">
<a href="forum.php?mod=forumdisplay&amp;fid=112"><img src="data/attachment/common/7f/common_112_icon.jpg" align="left" alt=""></a></div>
<dl style="margin-left: 133px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=112">〓1/6古代历史〓</a><em class="xw0 xi1" title="今日"> (1)</em></dt>
<dd><em>主题: 4477</em>, <em>帖数: <span title="107703">10万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=375096&amp;goto=lastpost#lastpost" class="xi2">POPTOYS 最后的武士 森胜元</a> <cite>2021-7-9 00:06 <a href="home.php?mod=space&amp;username=Sir.Shawn">Sir.Shawn</a></cite>
</dd>


<div class="forumdev" id="forumdev_112">
  <ul><li><span>07-09/00:06</span><a href="forum.php?mod=viewthread&amp;tid=375096" title="POPTOYS 最后的武士 森胜元" target="_blank">POPTOYS 最后的武士 森胜元</a></li>
<li><span>07-08/16:57</span><a href="forum.php?mod=viewthread&amp;tid=375080" title="锦衣卫" target="_blank">锦衣卫</a></li>
<li><span>07-07/12:33</span><a href="forum.php?mod=viewthread&amp;tid=375022" title="空灵阁青时" target="_blank">空灵阁青时</a></li>
<li><span>07-05/23:39</span><a href="forum.php?mod=viewthread&amp;tid=374983" title="鼎圣孙传庭的新衣" target="_blank">鼎圣孙传庭的新衣</a></li>
<li><span>07-07/13:39</span><a href="forum.php?mod=viewthread&amp;tid=374948" title="Manfred von Stein作品：弓箭手 公元1048年 \ Bogenschütze 1048 A.D" target="_blank">Manfred von Stein作品：弓箭手 公元1048年 \ Bogenschütze 1048 A.D</a></li>
     
  </ul>
</div>

</dl>
</td>
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 134px;">
<a href="forum.php?mod=forumdisplay&amp;fid=11"><img src="https://bbs.bbicn.com/data/attachment/forum/month_1002/20100202_adb1a9fa80c0ef0e624bPhynFKRocjM9.jpg" align="left" alt=""></a></div>
<dl style="margin-left: 134px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=11">〓1/6近代&amp;二战〓WW2〓</a><em class="xw0 xi1" title="今日"> (1)</em></dt>
<dd><em>主题: <span title="44525">4万</span></em>, <em>帖数: <span title="1271147">127万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=375091&amp;goto=lastpost#lastpost" class="xi2">“垂死挣扎”-诺曼底战役党卫军 ...</a> <cite>2021-7-9 00:05 <a href="home.php?mod=space&amp;username=Sir.Shawn">Sir.Shawn</a></cite>
</dd>


<div class="forumdev" id="forumdev_11">
  <ul><li><span>07-09/00:05</span><a href="forum.php?mod=viewthread&amp;tid=375091" style="font-weight: bold;color: #3C9D40;" title="“垂死挣扎”-诺曼底战役党卫军帝国师士兵" target="_blank">“垂死挣扎”-诺曼底战役党卫军帝国师士兵</a></li>
<li><span>07-08/22:20</span><a href="forum.php?mod=viewthread&amp;tid=375075" title="这一款真的爱了，无限可玩性" target="_blank">这一款真的爱了，无限可玩性</a></li>
<li><span>07-08/07:25</span><a href="forum.php?mod=viewthread&amp;tid=375060" title="glenning作品：‘向东部前进’ 巴伐利亚士兵 1915年秋天 / Bavarian soldier" target="_blank">glenning作品：‘向东部前进’ 巴伐利亚士兵 1915年秋天 / Bavarian soldier</a></li>
<li><span>07-07/21:17</span><a href="forum.php?mod=viewthread&amp;tid=375054" title="求发一张威龙75053说明书" target="_blank">求发一张威龙75053说明书</a></li>
<li><span>07-07/21:08</span><a href="forum.php?mod=viewthread&amp;tid=375043" title="苏军钢盔" target="_blank">苏军钢盔</a></li>
     
  </ul>
</div>

</dl>
</td>
</tr>
<tr class="fl_row">
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 133px;">
<a href="forum.php?mod=forumdisplay&amp;fid=34"><img src="data/attachment/common/e3/common_34_icon.gif" align="left" alt=""></a></div>
<dl style="margin-left: 133px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=34">〓1/6潮流影视〓Fashion&amp;Movies〓</a></dt>
<dd><em>主题: <span title="35640">3万</span></em>, <em>帖数: <span title="906581">90万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=375087&amp;goto=lastpost#lastpost" class="xi2">三次元与二次元风格女兵人分享</a> <cite>2021-7-8 23:57 <a href="home.php?mod=space&amp;username=huang670819">huang670819</a></cite>
</dd>


<div class="forumdev" id="forumdev_34">
  <ul><li><span>07-08/23:23</span><a href="forum.php?mod=viewthread&amp;tid=375087" title="三次元与二次元风格女兵人分享" target="_blank">三次元与二次元风格女兵人分享</a></li>
<li><span>07-08/22:46</span><a href="forum.php?mod=viewthread&amp;tid=375069" title="灶门祢豆子《鬼灭之刃》" target="_blank">灶门祢豆子《鬼灭之刃》</a></li>
<li><span>07-08/15:49</span><a href="forum.php?mod=viewthread&amp;tid=375066" title="纯国产自研反重力“摩托or车”？" target="_blank">纯国产自研反重力“摩托or车”？</a></li>
<li><span>07-08/09:24</span><a href="forum.php?mod=viewthread&amp;tid=375064" title="美国漂亮女歌手！" target="_blank">美国漂亮女歌手！</a></li>
<li><span>07-08/16:30</span><a href="forum.php?mod=viewthread&amp;tid=375063" title="国产山寨纯手工打造盔甲“曼达洛人”" target="_blank">国产山寨纯手工打造盔甲“曼达洛人”</a></li>
     
  </ul>
</div>

</dl>
</td>
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 133px;">
<a href="forum.php?mod=forumdisplay&amp;fid=12"><img src="data/attachment/common/c2/common_12_icon.gif" align="left" alt=""></a></div>
<dl style="margin-left: 133px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=12">〓1/6现代军事〓MODERN〓</a><em class="xw0 xi1" title="今日"> (1)</em></dt>
<dd><em>主题: <span title="31211">3万</span></em>, <em>帖数: <span title="798009">79万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=375099&amp;goto=lastpost#lastpost" class="xi2">oso2013作品：海豹突击队3A - 黑 ...</a> <cite>2021-7-9 00:07 <a href="home.php?mod=space&amp;username=Sir.Shawn">Sir.Shawn</a></cite>
</dd>


<div class="forumdev" id="forumdev_12">
  <ul><li><span>07-09/00:07</span><a href="forum.php?mod=viewthread&amp;tid=375099" title="oso2013作品：海豹突击队3A - 黑暗天使在阿富汗 / Dark Angels in Afghanistan" target="_blank">oso2013作品：海豹突击队3A - 黑暗天使在阿富汗 / Dark Angels in Afghanistan</a></li>
<li><span>07-08/22:56</span><a href="forum.php?mod=viewthread&amp;tid=375094" title="武器" target="_blank">武器</a></li>
<li><span>07-08/21:25</span><a href="forum.php?mod=viewthread&amp;tid=375089" title="虚构的USMC特种部队" target="_blank">虚构的USMC特种部队</a></li>
<li><span>07-08/22:21</span><a href="forum.php?mod=viewthread&amp;tid=375086" title="渣拍潜水员" target="_blank">渣拍潜水员</a></li>
<li><span>07-08/23:13</span><a href="forum.php?mod=viewthread&amp;tid=375085" style="font-weight: bold;color: #2B65B7;" title="塞博朋克FBI和作战机器人" target="_blank">塞博朋克FBI和作战机器人</a></li>
     
  </ul>
</div>

</dl>
</td>
</tr>
<tr class="fl_row">
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 133px;">
<a href="forum.php?mod=forumdisplay&amp;fid=60"><img src="data/attachment/common/07/common_60_icon.jpg" align="left" alt=""></a></div>
<dl style="margin-left: 133px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=60">〓DIY教程&amp;摄影技巧版〓Training Center〓</a></dt>
<dd><em>主题: 4082</em>, <em>帖数: <span title="120479">12万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=374708&amp;goto=lastpost#lastpost" class="xi2">很久以前買了一款加熱後具彈性的 ...</a> <cite>2021-7-8 21:22 <a href="home.php?mod=space&amp;username=lxced">lxced</a></cite>
</dd>


<div class="forumdev" id="forumdev_60">
  <ul><li><span>07-05/18:05</span><a href="forum.php?mod=viewthread&amp;tid=374961" title="DIY素体 -欧美纹身" target="_blank">DIY素体 -欧美纹身</a></li>
<li><span>07-05/13:03</span><a href="forum.php?mod=viewthread&amp;tid=374952" style="font-weight: bold;color: #8F2A90;" title="改造脖子磁铁吸附之后方便多了" target="_blank">改造脖子磁铁吸附之后方便多了</a></li>
<li><span>07-08/21:22</span><a href="forum.php?mod=viewthread&amp;tid=374708" title="很久以前買了一款加熱後具彈性的塑形土(單劑型" target="_blank">很久以前買了一款加熱後具彈性的塑形土(單劑型</a></li>
<li><span>06-22/23:00</span><a href="forum.php?mod=viewthread&amp;tid=374552" title="暴力熊diy" target="_blank">暴力熊diy</a></li>
<li><span>06-22/21:34</span><a href="forum.php?mod=viewthread&amp;tid=374539" title="二战金刚狼&amp;amp;剑齿虎" target="_blank">二战金刚狼&amp;amp;剑齿虎</a></li>
     
  </ul>
</div>

</dl>
</td>
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 133px;">
<a href="forum.php?mod=forumdisplay&amp;fid=93"><img src="https://bbs.bbicn.com/data/attachment/forum/month_0812/20081204_4566df4be8d8f44560c1TJJ8nAwVuzXC.gif" align="left" alt=""></a></div>
<dl style="margin-left: 133px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=93">〓静态模型&amp;其他玩具〓Model&amp;Toys〓</a></dt>
<dd><em>主题: 5580</em>, <em>帖数: <span title="102588">10万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=374648&amp;goto=lastpost#lastpost" class="xi2">电影《上甘岭》卫生员歌唱《我的 ...</a> <cite>2021-7-7 23:33 <a href="home.php?mod=space&amp;username=%B4%F3%B4%F3%B3%F6%D1%AA">大大出血</a></cite>
</dd>


<div class="forumdev" id="forumdev_93">
  <ul><li><span>07-07/19:25</span><a href="forum.php?mod=viewthread&amp;tid=375048" style="font-weight: bold;color: #2B65B7;" title="1/35树脂兵人" target="_blank">1/35树脂兵人</a></li>
<li><span>07-07/17:14</span><a href="forum.php?mod=viewthread&amp;tid=375042" title="1/18-Double Sniper" target="_blank">1/18-Double Sniper</a></li>
<li><span>07-07/18:08</span><a href="forum.php?mod=viewthread&amp;tid=375041" title="1/18-西部题材-visit Lagras" target="_blank">1/18-西部题材-visit Lagras</a></li>
<li><span>07-07/16:52</span><a href="forum.php?mod=viewthread&amp;tid=375040" title="1/18 (10.5CM高)可动兵人-暗源-特种侦察连-印尼造小屋" target="_blank">1/18 (10.5CM高)可动兵人-暗源-特种侦察连-印尼造小屋</a></li>
<li><span>07-07/13:20</span><a href="forum.php?mod=viewthread&amp;tid=375001" title="奥地利格洛克17式9mm手鎗 钥匙链 / GLOCK17" target="_blank">奥地利格洛克17式9mm手鎗 钥匙链 / GLOCK17</a></li>
     
  </ul>
</div>

</dl>
</td>
</tr>
<tr class="fl_row">
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 135px;">
<a href="forum.php?mod=forumdisplay&amp;fid=110"><img src="https://bbs.bbicn.com/data/attachment/forum/201211/08/223200p6zp56ttn6fa500t.jpg" align="left" alt=""></a></div>
<dl style="margin-left: 135px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=110">〓动漫玩具区〓Game &amp; Comic Toy〓</a></dt>
<dd><em>主题: 2592</em>, <em>帖数: <span title="33477">3万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=374877&amp;goto=lastpost#lastpost" class="xi2">周末福利：恶魔啦啦队 手办广告 ...</a> <cite>2021-7-8 21:59 <a href="home.php?mod=space&amp;username=%BE%DE%C5%A3%CE%DE%B1%C8">巨牛无比</a></cite>
</dd>


<div class="forumdev" id="forumdev_110">
  <ul><li><span>07-07/19:34</span><a href="forum.php?mod=viewthread&amp;tid=375051" title="杰刻动漫 新品预告：动物保护法 阿象 手办潮玩" target="_blank">杰刻动漫 新品预告：动物保护法 阿象 手办潮玩</a></li>
<li><span>07-07/17:53</span><a href="forum.php?mod=viewthread&amp;tid=375046" title="HEROCROSS 新品：6寸 小熊维尼 软胶玩具 限定版" target="_blank">HEROCROSS 新品：6寸 小熊维尼 软胶玩具 限定版</a></li>
<li><span>07-07/14:26</span><a href="forum.php?mod=viewthread&amp;tid=375037" title="Pop Race 新品：1/18 模型车 Singer DLS Oak Green Metallic (PR18-DLS-GR)" target="_blank">Pop Race 新品：1/18 模型车 Singer DLS Oak Green Metallic (PR18-DLS-GR)</a></li>
<li><span>07-07/12:01</span><a href="forum.php?mod=viewthread&amp;tid=375026" title="JOY TOYS 新品：1/18 诺斯 - 火锤冲锋机甲 &amp;amp; 蛇鲨突击作战机甲【共2款】" target="_blank">JOY TOYS 新品：1/18 诺斯 - 火锤冲锋机甲 &amp;amp; 蛇鲨突击作战机甲【共2款】</a></li>
<li><span>07-07/12:03</span><a href="forum.php?mod=viewthread&amp;tid=375024" title="JOY TOYS 新品：1/18 机库场景 - 瞭望塔" target="_blank">JOY TOYS 新品：1/18 机库场景 - 瞭望塔</a></li>
     
  </ul>
</div>

</dl>
</td>
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 133px;">
<a href="forum.php?mod=forumdisplay&amp;fid=59"><img src="data/attachment/common/09/common_59_icon.jpg" align="left" alt=""></a></div>
<dl style="margin-left: 133px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=59">〓新兵训练营〓Basic of Action figure〓</a></dt>
<dd><em>主题: 9968</em>, <em>帖数: <span title="120876">12万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=374147&amp;goto=lastpost#lastpost" class="xi2">想找手臂是鎗的角色参考，有什么 ...</a> <cite>2021-7-5 20:43 <a href="home.php?mod=space&amp;username=%CE%F7%BB%AA%B0%A2%C4%B7%C2%DE">西华阿姆罗</a></cite>
</dd>


<div class="forumdev" id="forumdev_59">
  <ul><li><span>06-24/14:47</span><a href="forum.php?mod=viewthread&amp;tid=374602" title="求教大佬们知道咋的把MK17的拉机柄拆下来换到另一边吗！" target="_blank">求教大佬们知道咋的把MK17的拉机柄拆下来换到另一边吗！</a></li>
<li><span>07-03/17:28</span><a href="forum.php?mod=viewthread&amp;tid=374352" title="求推荐北京值得逛的实体店" target="_blank">求推荐北京值得逛的实体店</a></li>
<li><span>06-25/18:09</span><a href="forum.php?mod=viewthread&amp;tid=374213" title="大家了解EKUAZ STUDIO这个厂家吗" target="_blank">大家了解EKUAZ STUDIO这个厂家吗</a></li>
<li><span>07-05/20:43</span><a href="forum.php?mod=viewthread&amp;tid=374147" title="想找手臂是鎗的角色参考，有什么角色？" target="_blank">想找手臂是鎗的角色参考，有什么角色？</a></li>
<li><span>06-01/17:34</span><a href="forum.php?mod=viewthread&amp;tid=373729" title="萌新求助！我这脖子安的有问题吧？" target="_blank">萌新求助！我这脖子安的有问题吧？</a></li>
     
  </ul>
</div>

</dl>
</td>
</tr>
<tr class="fl_row">
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 133px;">
<a href="forum.php?mod=forumdisplay&amp;fid=13"><img src="data/attachment/common/c5/common_13_icon.gif" align="left" alt=""></a></div>
<dl style="margin-left: 133px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=13">〓军事资料区〓Military news〓</a></dt>
<dd><em>主题: <span title="13437">1万</span></em>, <em>帖数: <span title="248944">24万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=369577&amp;goto=lastpost#lastpost" class="xi2">鱼鹰社 Osprey1800本旧书的种子</a> <cite>2021-7-8 23:48 <a href="home.php?mod=space&amp;username=edc2">edc2</a></cite>
</dd>


<div class="forumdev" id="forumdev_13">
  <ul><li><span>07-08/02:04</span><a href="forum.php?mod=viewthread&amp;tid=375059" title="非洲的女战俘" target="_blank">非洲的女战俘</a></li>
<li><span>07-08/14:19</span><a href="forum.php?mod=viewthread&amp;tid=375057" title="003 和 美国福特级 对比图" target="_blank">003 和 美国福特级 对比图</a></li>
<li><span>07-07/20:41</span><a href="forum.php?mod=viewthread&amp;tid=375052" title="北约诸国武装（18P）" target="_blank">北约诸国武装（18P）</a></li>
<li><span>07-08/11:38</span><a href="forum.php?mod=viewthread&amp;tid=375047" title="七七事变 84周年" target="_blank">七七事变 84周年</a></li>
<li><span>07-07/17:09</span><a href="forum.php?mod=viewthread&amp;tid=375032" title="德国海军特种部队 KSM Germany（10P）" target="_blank">德国海军特种部队 KSM Germany（10P）</a></li>
     
  </ul>
</div>

</dl>
</td>
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 133px;">
<a href="forum.php?mod=forumdisplay&amp;fid=104"><img src="https://bbs.bbicn.com/data/attachment/forum/201012/08/1615329h0uk7outu81tttq.jpg" align="left" alt=""></a></div>
<dl style="margin-left: 133px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=104">〓比赛活动版〓DIY CONTEST〓</a></dt>
<dd><em>主题: 24</em>, <em>帖数: 455</em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=366876&amp;goto=lastpost#lastpost" class="xi2">【作品投票】- BBICN “2020●La ...</a> <cite>2021-6-27 18:23 <a href="home.php?mod=space&amp;username=%CB%F7%C8%FB%C5%AB">索塞奴</a></cite>
</dd>


<div class="forumdev" id="forumdev_104">
  <ul><li><span>02-10/10:12</span><a href="forum.php?mod=viewthread&amp;tid=370226" style="font-weight: bold;color: #8F2A90;" title="极恶幼生-不良小鬼2.0" target="_blank">极恶幼生-不良小鬼2.0</a></li>
<li><span>02-25/19:55</span><a href="forum.php?mod=viewthread&amp;tid=369621" style="font-weight: bold;color: #EE1B2E;" title="BBICN “2020●Lakor Baby”1/6全题材小宝贝娃偶设计大赛 - 获奖名单公布！" target="_blank">BBICN “2020●Lakor Baby”1/6全题材小宝贝娃偶设计大赛 - 获奖名单公布！</a></li>
<li><span>06-27/18:23</span><a href="forum.php?mod=viewthread&amp;tid=366876" style="font-weight: bold;text-decoration: underline;color: #2897C5;" title="【作品投票】- BBICN “2020●Lakor Baby”1/6全题材小宝贝娃偶设计大赛" target="_blank">【作品投票】- BBICN “2020●Lakor Baby”1/6全题材小宝贝娃偶设计大赛</a></li>
<li><span>06-27/18:23</span><a href="forum.php?mod=viewthread&amp;tid=366640" style="font-weight: bold;color: #2897C5;" title="2020●Lakor Baby 斑陀螺DIY作品 太阳之子" target="_blank">2020●Lakor Baby 斑陀螺DIY作品 太阳之子</a></li>
<li><span>03-09/20:53</span><a href="forum.php?mod=viewthread&amp;tid=366639" style="font-weight: bold;color: #2897C5;" title="2020.Lakor Baby -熊孩子的真相……" target="_blank">2020.Lakor Baby -熊孩子的真相……</a></li>
     
  </ul>
</div>

</dl>
</td>
</tr>
<tr class="fl_row">
<td class="fl_g" width="49.9%">
<div class="fl_icn_g" style="width: 133px;">
<a href="forum.php?mod=forumdisplay&amp;fid=105"><img src="https://bbs.bbicn.com/data/attachment/forum/201012/08/1615329h0uk7outu81tttq.jpg" align="left" alt=""></a></div>
<dl style="margin-left: 133px;">
<dt><a href="forum.php?mod=forumdisplay&amp;fid=105">历届比赛存档区</a></dt>
<dd><em>主题: 1842</em>, <em>帖数: <span title="55046">5万</span></em></dd><dd>
<a href="forum.php?mod=redirect&amp;tid=338588&amp;goto=lastpost#lastpost" class="xi2">2018-DAMToys杯-DIY-5th.inf div ...</a> <cite>2021-5-30 20:37 <a href="home.php?mod=space&amp;username=%C2%BD%D5%BD%D2%BB%CA%A6">陆战一师</a></cite>
</dd>


<div class="forumdev" id="forumdev_105">
  <ul><li><span>07-14/14:34</span><a href="forum.php?mod=viewthread&amp;tid=362231" style="font-weight: bold;color: #EE1B2E;" title="BBICN 2020特别活动【 战&amp;quot;疫”】主题大赛-【获奖名单】公布！荣耀勋章已颁发完~" target="_blank">BBICN 2020特别活动【 战&amp;quot;疫”】主题大赛-【获奖名单】公布！荣耀勋章已颁发完~</a></li>
<li><span>03-08/19:51</span><a href="forum.php?mod=viewthread&amp;tid=361620" style="font-weight: bold;color: #EE1B2E;" title="【入围作品投票贴】 - BBICN 2020特别活动 -【 战&amp;quot;疫”】主题大赛" target="_blank">【入围作品投票贴】 - BBICN 2020特别活动 -【 战&amp;quot;疫”】主题大赛</a></li>
<li><span>09-19/17:05</span><a href="forum.php?mod=viewthread&amp;tid=361241" style="font-weight: bold;color: #2897C5;" title="2020战疫——面罩系列" target="_blank">2020战疫——面罩系列</a></li>
<li><span>03-08/19:49</span><a href="forum.php?mod=viewthread&amp;tid=361239" style="font-weight: bold;color: #2897C5;" title="2020战疫— 1998年的战疫" target="_blank">2020战疫— 1998年的战疫</a></li>
<li><span>04-11/00:40</span><a href="forum.php?mod=viewthread&amp;tid=361238" style="font-weight: bold;color: #2897C5;" title="2020战疫 - 上班日常" target="_blank">2020战疫 - 上班日常</a></li>
     
  </ul>
</div>

</dl>
</td>
<td>&nbsp;</td></tr>
</tbody></table>
</div>
</div><div class="bm a_c"><a href="https://s.taobao.com/search?q=HAOYUTOYS" target="_blank"><img src="https://bbs.bbicn.com/data/attachment/forum/202107/03/203230s5aqeu7egpty7y7q.gif" border="0"></a></div>
</div>

<div class="wp mtn">
<!--[diy=diy3]--><div id="diy3" class="area"></div><!--[/diy]-->
</div>


</div>

</div>

<script>fixed_top_nv();</script>	</div>
<div class="wp a_f"><a href="https://search.taobao.com/search?source=wangwang&amp;q=TBLEAGUE" target="_blank"><img src="https://bbs.bbicn.com/data/attachment/forum/202107/02/101832wf0zwmav9w90fvwq.gif" border="0"></a></div><script type="text/javascript" src="./plugin.php?id=comiis_app_video:comiis_app_video_up"></script><div id="ft" class="wp cl">
<div id="flk" class="y">
<p>
<a href="https://bbs.bbicn.com/forum.php?forumlist=1&amp;mobile=2">手机版</a><span class="pipe">|</span><a href="forum.php?mod=misc&amp;action=showdarkroom">小黑屋</a><span class="pipe">|</span><a href="archiver/">Archiver</a><span class="pipe">|</span><strong><a href="https://bbs.bbicn.com/" target="_blank">bbs.bbicn.com</a></strong>
( <a href="http://beian.miit.gov.cn/" target="_blank">浙ICP备05022363号</a> )<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?b073e07555f5a464a9bbaf1623dd28fc";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
</p>
<p class="xs0">
GMT+8, 2021-7-9 00:07<span id="debuginfo">
, Processed in 0.129556 second(s), 12 queries
.
</span>
</p>
</div>
<div id="frt">
<p>Powered by <strong><a href="http://www.discuz.net" target="_blank">Discuz!</a></strong> <em>X3.4</em></p>
<p class="xs0">Copyright © 2001-2020, Tencent Cloud.</p>
</div></div>
<script src="home.php?mod=misc&amp;ac=sendmail&amp;rand=1625760434" type="text/javascript"></script>

<div id="scrolltop">
<span hidefocus="true"><a title="返回顶部" onclick="window.scrollTo('0','0')" class="scrolltopa"><b>返回顶部</b></a></span>
<span>
<a href="forum.php" hidefocus="true" class="returnboard" title="返回版块"><b>返回版块</b></a>
</span>
</div>
<script type="text/javascript">_attachEvent(window, 'scroll', function () { showTopLink(); });checkBlind();</script>


`;

const ScriptRender = {
    created () {
        eval(this.$slots.default()[0].children);
    },
    template: '<div></div>',
};

const CompRender = {
    // components: { ScriptRender },
    // template: '<h1>Test ...</h1><script-render>console.log(111);</script-render>',
    directives: {
        connectxml: {
            mounted (el) {
                el.innerHTML = html;
                el.addEventListener('mouseover', ev => {
                    if (ev.target.innerText) {
                        ev.target.style.border = '1px solid red';
                        ev.target.style.backgroundColor = 'rgb(245 108 108 / 32%)';
                    }
                });
            },
        }
    },
    template: '<div v-connectxml></div>',
};

const App = {
    components: { CompRender },
    data () {
        return {
            message: 'Hello Element Plus',
        };
    },
};
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount('#app');
