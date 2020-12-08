/* $Id : common.js 4865 2007-01-31 14:04:10Z paulgao $ */
//全局变量


/*************************************************公用函数**************************************/
/**
 *根据ID获取元素
 */
function $(objID){
  return document.getElementById(objID);
}
/**
 *addEvent函数参数obj为对象 type为'click'等 fn为绑定的函数
 */
  function addEvent(obj,type,fn){
    if(obj.attachEvent){
      obj['e'+type+fn]=fn;
	  obj[type+fn]=function(){
	    obj['e'+type+fn](window.event);
	  };
	  obj.attachEvent('on'+type,obj[type+fn]);
    }
    else{
      obj.addEventListener(type,fn,false);
    }
  }
  /**
   *加入window.onload函数,参数func为一个函数

   */
  function addonload(func){
    var oldonload=window.onload;
    if(typeof(window.onload)=="function"){
      window.onload=function(){
	    oldonload();
	    func();
	  };
    }
    else{
      window.onload=func;
    }
  }
  /**
   *加入window.onscroll函数,参数func为一个函数
   */
  function addonscroll(func){
    var oldonscroll=window.onscroll;
    if(typeof(window.onscroll)=="function"){
      window.onscroll=function(){
	    oldonscroll();
	    func();
	  };
    }
    else{
      window.onscroll=func;
    }
  }
  /**
   *遍历函数
   */
   function forEach(array, callback, thisObject){
     if(array.forEach){
       array.forEach(callback, thisObject);
     }
     else{
       for (var i = 0, len = array.length; i < len; i++) {callback.call(thisObject, array[i], i, array);}
     }
   };
   /**
    *打开新窗口

    */
    function openWind(url){
	  var top=(document.body.clientHeight-520)/2;
	  var left=(document.body.clientWidth-520)/2;
	  window.open(url,'kaixinwindow', 'height=420, width=520, toolbar =no, menubar=no, scrollbars=yes, resizable=no,top='+top+',left='+left+', location=no, status=no');
    }
  /*************************************************顶部函数**************************************/
  /* *
   * 顶部显示QQ
   */
   function showQQ(){
     $("QQul").style.display="block";
   }
   function hiddenQQ(){
     $("QQul").style.display="none";
   }
  /**
   *顶部下拉菜单
   */
   function navinit(){
		 /*
     if (document.all&&document.getElementById) {
       navRoot = document.getElementById("navul");
       for (i=0; i<navRoot.childNodes.length; i++) {
         node = navRoot.childNodes[i];
         if (node.nodeName=="LI") {
           node.onmouseover=function(){ this.className+=" over"; }
           node.onmouseout=function(){ this.className=this.className.replace(" over", ""); }
         }
       }
     }
		 */
   }
   //应用
   //if($("navul")) addonload(navinit);
   //ajax刷新顶部用户登录
   function topuser(){
     Ajax.call(WWW_ROOW+'refresh.php?step=user','',refreshuser,'POST','');
   }
   //用户信息函数
   function refreshuser(result){
     $("ECS_MEMBERZONE").innerHTML=result;
   }
	 //应用
   //ajax刷新顶部qq用户登录
   function qqlogin(){
     Ajax.call(WWW_ROOW+'refresh.php?step=qqlogin','',refreshqqlogin,'POST','');
   }
   //用户信息函数
   function refreshqqlogin(result){
		 if($("qqlogin")){
		   $("qqlogin").innerHTML = result;
		 }
   }
   //if($("ECS_MEMBERZONE")) topuser();
  /**
   *购物车淡入淡出类
   */
   var show_hidden=function(target){
	  this.obj=$(target);
	  this.timeout1;
	  this.timeout2;
	  this.showtime=30;
	  this.shownum=5;//把透明度分为5分


	  this.hiddennum=0;
	  this.isie=navigator.appVersion.indexOf("MSIE")!=-1?true:false;
	  if(!show_hidden.childs) show_hidden.childs=[];
	  this.id=show_hidden.childs.push(this)-1;
	};
	show_hidden.prototype={
	  show:function(){//淡出效果
	    this.shownum--;
	    if(this.isie){
		  this.obj.style.filter="alpha(opacity=0)";
		  this.obj.style.filter="alpha(opacity="+(5-this.shownum)*20+")";
		}
		else{
		  this.obj.style.opacity=0;
		  this.obj.style.opacity=(5-this.shownum)*0.2;
		}
		if(this.shownum<=0){
		  this.shownum=5;
		  return;
		}
		else{
		  this.timeout1=setTimeout("show_hidden.childs["+this.id+"].show()",this.showtime);
		}
	  },
	  hidden:function(){//淡入效果
	    this.hiddennum++;
	    if(this.isie){
		  this.obj.style.filter="alpha(opacity=100)";
		  this.obj.style.filter="alpha(opacity="+(5-this.hiddennum)*20+")";
		}
		else{
		  this.obj.style.opacity=0;
		  this.obj.style.opacity=(5-this.hiddennum)*0.2;
		}
		if(this.hiddennum>=5){
		  this.hiddennum=0;
		  this.obj.style.display="none";
		  return;
		}
		else{
		  this.timeout2=setTimeout("show_hidden.childs["+this.id+"].hidden()",this.showtime);
		}
	  }
	};
  /**
   *判断是否在内部mouseover/out
   */
   function isMouseLeaveOrEnter(e, handler) {   
     if (e.type != 'mouseout' && e.type != 'mouseover'){
       return false;
     }
     var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;   
     while (reltg && reltg != handler)   
        reltg = reltg.parentNode;   
     return (reltg != handler);   
   }
   //应用
   var new_car,new_gods;   
   var shoppingcar=function(){
	   var carshow=new show_hidden("ECS_CARTINFO");
     new_car= $("mycart_info");
     new_gods=$("ECS_CARTINFO");
     new_car.onmouseover=function(e){
       e=e||window.event;
	     if(!isMouseLeaveOrEnter(e,new_car)) return;
			 /*刷新cart*/
			 shuanxincart_1();
	     new_gods.style.display="block";
	     carshow.show();
     };
     new_car.onmouseout=function(e){
       e=e||window.event;
	     if(!isMouseLeaveOrEnter(e,new_car)) return;
       carshow.hidden();
     };
   };
   //if($("ECS_CARTINFO")) addonload(shoppingcar);
  /**
   *删除购物车

   */
   function deleshop(id){
     if(confirm("你确实要把该商品移出购物车吗")){
       Ajax.call( WWW_ROOW+'flow.php?step=drop_goods_cart1', 'rec_id=' + id, shuanxincart_1 , 'GET', 'TEXT', true, true );	
     }
   }
  /**
   *删除后回调

   */
   function shuanxincart_1(result){
	   if($("ECS_CARTINFO")) Ajax.call(WWW_ROOW+'refresh.php?step=refreshcart','',writeintocart1,'POST','');
   }
	/**
   *加载刷新购物车
   */
   function shuanxincart(result){
	   if($("ECS_CARTINFO")) Ajax.call(WWW_ROOW+'refresh.php?step=refreshcart_onload','',writeintocart_onload,'POST','');
   }
  /**
   *ajax动态调用购物车
   */
   function writeintocart(result){
     $("ECS_CARTINFO").innerHTML=result;
     if($("shopnumspan")){
       $("shopnum").innerHTML=$("shopnumspan").innerHTML;
     }
     else $("shopnum").innerHTML=0;
   }
   function writeintocart1(result){
     $("ECS_CARTINFO").innerHTML=result;
     if($("shopnumspan")){
       $("shopnum").innerHTML=$("shopnumspan").innerHTML;
     }
     else $("shopnum").innerHTML=0;
   }
	 function writeintocart_onload(result){
     $("ECS_CARTINFO").innerHTML="内容正在努力加载中...";
     if($("shopnum")){
       $("shopnum").innerHTML=result;
     }
   }
   //addonload(shuanxincart);//ajax刷新购物车应用

   if($("shopnumspan")){
     $("shopnum").innerHTML=$("shopnumspan").innerHTML;
   }
   else{
     if($("shopnum")) $("shopnum").innerHTML=0;
   }
   /*************************************************底部函数**************************************/
   /**
    *订阅邮件函数
    */
	function add_email_list(){
	  if (check_email()){
	    Ajax.call(WWW_ROOW+'user.php?act=email_list&job=add&email=' + email.value, '', rep_add_email_list, 'GET', 'TEXT');
			 var tipsbox1 = document.createElement("div");
			 tipsbox1.id = "tipsbox1";
			 tipsbox1.style.width = "250"+"px";
			 tipsbox1.style.height = "32"+"px";
			 tipsbox1.style.background = "#a64dc3";
			 tipsbox1.style.color = "#fff";
			 tipsbox1.style.position="absolute";
			 tipsbox1.style.bottom = 20-(document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop)+"px";
			 tipsbox1.style.left = 0+"px";
			 tipsbox1.style.lineHeight = "32px";
			 tipsbox1.style.zIndex = 1001;
			 tipsbox1.innerHTML = "<img alt='' src='"+WWW_ROOW+"themes/newpf/images/ajax-loader.gif' />我们正在努力的处理您的请求...";
			 document.body.appendChild(tipsbox1);
	  }
	}
	function rep_add_email_list(text){
		if($("tipsbox1")) document.body.removeChild($("tipsbox1"));
	  alert(text);
	}
	function cancel_email_list(){
	  if (check_email()){
	    Ajax.call(WWW_ROOW+'user.php?act=email_list&job=del&email=' + email.value, '', rep_cancel_email_list, 'GET', 'TEXT');
	  }
	}
	function rep_cancel_email_list(text){
	  alert(text);
	}
	function check_email(){
	  if (Utils.isEmail(email.value)){
	    return true;
	  }
	  else{
	    alert('邮件地址非法！');
	    return false;
	  }
	}
    /**
     *回到顶部函数和客户滚动函数

     */
     var tips,old, timeout=null,theTop;/*这是默认高度,越大越往下*/; 
     //滚动函数
     function moveTips() {
       var tt=50;
       if (window.innerHeight) {
         pos = window.pageYOffset;
       }
       else if (document.documentElement && document.documentElement.scrollTop) {
         pos = document.documentElement.scrollTop
       }
       else if (document.body) {
         pos = document.body.scrollTop;
       }
       pos=pos-tips.offsetTop+theTop;
       pos=tips.offsetTop+pos/10;
       if (pos < theTop){
         pos = theTop;
       }
       if (pos != old) {
         tips.style.top = pos+"px";
         tt=100;
       }
       else{
         if(timeout){
           clearTimeout(timeout);
           return;
         }
       }
       old = pos;
       timeout=setTimeout(moveTips,tt);
     }
     //TOP按钮函数
     function gotop(){
       if(document.documentElement.scrollTop){
         document.documentElement.scrollTop=0;
       }
       else{
         document.body.scrollTop=0;
       }
     }
     //应用
     //tips=$("top-kefu");
     //old=theTop=tips.offsetTop;
     //绑定到滚动条事件
     window.onscroll=function(){
       // moveTips();
       if(document.documentElement.scrollTop>0||document.body.scrollTop>0){
         if($("float_toolbar_r")) $("float_toolbar_r").style.display="block";
       }
       else{
         if($("float_toolbar_r")) $("float_toolbar_r").style.display="none";
       }
     };

   /*************************************************历史记录函数**************************************/
   /**
    *清楚历史记录
    */
    function clear_history(){
      Ajax.call(WWW_ROOW+'user.php', 'act=clear_history',clear_history_Response, 'GET', 'TEXT',1,1);
    }
    function clear_history_Response(res){
      if($('hositorylist')) $('hositorylist').innerHTML = res?res:"您已清空最近浏览过的商品";
    }
   /**
    *ajax历史记录
    */
    function rehostory(result){
      $("hositorylist").innerHTML=result;
      if ($('hositorylist').innerHTML.replace(/\s/g,'').length<1){
        $('hositorylist').innerHTML="您已清空最近浏览过的商品";
      }
    }
   /*************************************************一些工具函数**************************************/
  /**
   *左分类切换函数

   */
    function addfavorite(url,title) {
        if (document.all){
             window.external.AddFavorite(url, title);
        } else if (window.sidebar){
            window.sidebar.addPanel(title, url, "")
        }else if(window.opera && window.print ) {
            var addbm = document.getElementById('addBookmark');
            addbm.setAttribute('rel','sidebar');
            addbm.setAttribute('href',url);
            addbm.setAttribute('title',title);
            addbm.click();
        }else{
            alert("加入收藏失败，请按CTRL+D来手工添加!");
        }
    }
  /**
   *左分类切换函数

   */
	function revents(strid,total,n)
	{
	   for(var i=1;i<=total;i++)
	   {
		$(strid+i).style.display='none';
		$(strid+"_"+i).style.background='url('+WWW_ROOW+'themes/newpf/images/new_fn_btbj.gif)';
        $(strid+"_"+i).style.color="#666";
	   }
	   $(strid+n).style.display='block';
	   $(strid+"_"+n).style.background='#ffffff';
       $(strid+"_"+n).style.color="black";
	}
   /**
    *TOP排行公用
	*/
	function expandmenu(strs,total,n)
	{
		for(var i=0;i<total;i++)
		{
		   document.getElementById(strs+i).style.display='none';
		   document.getElementById(strs+"_"+i).style.background='#ffffff';
		}
		document.getElementById(strs+n).style.display='block';
		document.getElementById(strs+"_"+n).style.background='#F7F7F7';
	}
   /**
    *产品选项卡切换函数

    */
   function proqiehuan(idstr,total,num){
     for(var i=1; i<=total; i++){
       if(i==num){
         //$(idstr+"_"+i).style.background="url("+WWW_ROOW+"themes/newpf/images/new_ss_05.jpg) no-repeat";
         //$(idstr+"_"+i).style.color="#fff";
         //if(num<=2) $(idstr+i).style.display="block";
       }
       else{
         //$(idstr+"_"+i).style.background="url("+WWW_ROOW+"themes/newpf/images/new_ss_04.jpg) no-repeat";
         //$(idstr+"_"+i).style.color="#800A61";
         //if(num<=2&&i<=2) $(idstr+i).style.display="none";
       }
     }
   }
   /* *
   * 添加商品到购物车
   */
  function addToCart(goodsId, parentId)
  {
    var goods        = new Object();
    var spec_arr     = new Array();
    var fittings_arr = new Array();
    var number       = 1;
    var formBuy      = document.forms['ECS_FORMBUY'];
    var quick		   = 0;

    // 检查是否有商品规格
    if (formBuy)
    {
      spec_arr = getSelectedAttributes(formBuy);

      if (formBuy.elements['number'])
      {
        number = formBuy.elements['number'].value;
      }

      quick = 1;
    }

    goods.quick    = quick;
    goods.spec     = spec_arr;
    goods.goods_id = goodsId;
    goods.number   = number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
    var isie= navigator.appVersion.indexOf("MSIE")!=-1?true:false;
    var newdiv=document.createElement("div");
    newdiv.id="yinying";
    newdiv.style.position="absolute";
    newdiv.style.width="100%";
    newdiv.style.height=document.body.clientHeight+"px";
    newdiv.style.background="black";
    if(!isie) newdiv.style.opacity=0.5;
    else newdiv.style.filter="alpha(opacity=50)";
    newdiv.style.left=0+"px";
    newdiv.style.top=0+"px";
    newdiv.style.zIndex=999;
    if($("pro")) document.body.appendChild(newdiv);
    if($("ajaxload")) $("ajaxload").style.display="block";
    Ajax.call(WWW_ROOW+'flow.php?step=add_to_cart_qk', 'goods=' + goods.toJSONString(), addToCartResponse, 'POST', 'JSON');
  }
  
  function addToCart_coqu(goodsId, parentId)
  {
    var goods        = new Object();
    var spec_arr     = new Array();
    var fittings_arr = new Array();
    var number       = 1;
    var formBuy      = document.forms['ECS_FORMBUY'];
    var quick		   = 0;

    // 检查是否有商品规格
    if (formBuy)
    {
      spec_arr = getSelectedAttributes(formBuy);

      if (formBuy.elements['number'])
      {
        number = formBuy.elements['number'].value;
      }

      quick = 1;
    }

    goods.quick    = quick;
    goods.spec     = spec_arr;
    goods.goods_id = goodsId;
    goods.number   = number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
    var isie= navigator.appVersion.indexOf("MSIE")!=-1?true:false;
    var newdiv=document.createElement("div");
    newdiv.id="yinying";
    newdiv.style.position="absolute";
    newdiv.style.width="100%";
    newdiv.style.height=document.body.clientHeight+"px";
    newdiv.style.background="black";
    if(!isie) newdiv.style.opacity=0.5;
    else newdiv.style.filter="alpha(opacity=50)";
    newdiv.style.left=0+"px";
    newdiv.style.top=0+"px";
    newdiv.style.zIndex=999;
    if($("pro")) document.body.appendChild(newdiv);
    if($("ajaxload")) $("ajaxload").style.display="block";
    Ajax.call(WWW_ROOW+'flow_coqu.php?step=add_to_cart_qk', 'goods=' + goods.toJSONString(), addToCartResponse_coqu, 'POST', 'JSON');
  }


  /**
   * 获得选定的商品属性

   */
  function getSelectedAttributes(formBuy)
  {
    var spec_arr = new Array();
    var j = 0;

    for (i = 0; i < formBuy.elements.length; i ++ )
    {
      var prefix = formBuy.elements[i].name.substr(0, 5);

      if (prefix == 'spec_' && (
        ((formBuy.elements[i].type == 'radio' || formBuy.elements[i].type == 'checkbox') && formBuy.elements[i].checked) ||
        formBuy.elements[i].tagName == 'SELECT'))
      {
        spec_arr[j] = formBuy.elements[i].value;
        j++ ;
      }
    }

    return spec_arr;
  }
  function addToCartResponse_coqu(result)
  {
	 
    if (result.error > 0)
    {

      // 如果需要缺货登记，跳转
      if($("pro")&&$("yinying")) document.body.appendChild($("yinying"));
      if($("ajaxload")) $("ajaxload").style.display="none";

      if (result.error == 2)
      {
        if (confirm(result.message))
        {
          location.href = WWW_ROOW+'user.php?act=add_booking&id=' + result.goods_id + '&spec=' + result.product_spec;
        }
      }
      // 没选规格，弹出属性选择框

      else if (result.error == 6)
      {
        openSpeDiv(result.message,result.goods_id,result.parent);
        if($("yinying")) document.body.removeChild($("yinying"));
      }
      else
      {
        alert(result.message);
        if($("yinying")) document.body.removeChild($("yinying"));
      }
    }
    else
    {
      if($("ajaxload")) $("ajaxload").style.display="none";
      var cartInfo;
      if($('ECS_CARTINFO')) cartInfo = $('ECS_CARTINFO');
      var cartnum;
      if($("shopnum")) cartnum = $("shopnum");
      var cart_url = WWW_ROOW+'flow_coqu.php?step=cart';
      if (cartInfo)
      {

				cartInfo.innerHTML = result.content;
        if(cartnum) cartnum.innerHTML = result.count;
        if($("mininum")) $("mininum").innerHTML=result.count;
        if($("minitotal")) $("minitotal").innerHTML=result.subtotal;
				if($("paybtnimg")){
					$("paybtnimg").src = $("paybtnimg").src.replace("new_gwc_3.gif","goods_sajiaobtn.jpg");
          $("paybtnimg").parentNode.href = $("paybtnimg").parentNode.href.replace("flow.php","flow_coqu.php");
				}
        if($("minicart")) $("minicart").style.display="block";

      }

      if (result.one_step_buy == '1')
      {
        if(!$("pro")) location.href = cart_url;
      }
      else
      {
        switch(result.confirm_type)
        {
          case '1' :
            if (confirm(result.message)){
              if(!$("pro")) location.href = cart_url;
            }
            break;
          case '2' :
            if (!confirm(result.message)){
              if(!$("pro")) location.href = cart_url;
            }
            break;
          case '3' :
            if(!$("pro")) location.href = cart_url;
            break;
          default :
            break;
        }
      }
    }
  }
  /* *
   * 处理添加商品到购物车的反馈信息

   */
  function addToCartResponse(result)
  {
	 
    if (result.error > 0)
    {

      // 如果需要缺货登记，跳转
      if($("pro")&&$("yinying")) document.body.appendChild($("yinying"));
      if($("ajaxload")) $("ajaxload").style.display="none";

      if (result.error == 2)
      {
        if (confirm(result.message))
        {
          location.href = WWW_ROOW+'user.php?act=add_booking&id=' + result.goods_id + '&spec=' + result.product_spec;
        }
      }
      // 没选规格，弹出属性选择框


      else if (result.error == 6)
      {
        openSpeDiv(result.message,result.goods_id,result.parent);
        if($("yinying")) document.body.removeChild($("yinying"));
      }
      else
      {
        alert(result.message);
        if($("yinying")) document.body.removeChild($("yinying"));
      }
    }
    else
    {
      if($("ajaxload")) $("ajaxload").style.display="none";
      var cartInfo;
      if($('ECS_CARTINFO')) cartInfo = $('ECS_CARTINFO');
      var cartnum;
      if($("shopnum")) cartnum = $("shopnum");
      var cart_url = WWW_ROOW+'flow.php?step=cart';
      if (cartInfo)
      {
        cartInfo.innerHTML = result.content;
        if(cartnum) cartnum.innerHTML = result.count;
        if($("mininum")) $("mininum").innerHTML=result.count;
        if($("minitotal")) $("minitotal").innerHTML=result.subtotal;
				if($("paybtnimg")){
					$("paybtnimg").src=$("paybtnimg").src.replace("goods_sajiaobtn.jpg","new_gwc_3.gif");
					$("paybtnimg").parentNode.href = $("paybtnimg").parentNode.href.replace("flow_coqu.php","flow.php");
			  }
        if($("minicart")) $("minicart").style.display="block";
      }

      if (result.one_step_buy == '1')
      {
        if(!$("pro")) location.href = cart_url;
      }
      else
      {
        switch(result.confirm_type)
        {
          case '1' :
            if (confirm(result.message)){
              if(!$("pro")) location.href = cart_url;
            }
            break;
          case '2' :
            if (!confirm(result.message)){
              if(!$("pro")) location.href = cart_url;
            }
            break;
          case '3' :
            if(!$("pro")) location.href = cart_url;
            break;
          default :
            break;
        }
      }
    }
  }

  /* *
   * 添加商品到收藏夹
   */
  function collect(goodsId,e)
  {
		var x = mousePos(e).x;
    var y = mousePos(e).y;
		if($("newtipsbox")) return;
		var newdiv = document.createElement("div");
		newdiv.id = "newtipsbox";
		newdiv.className = "newtipsbox";
		newdiv.style.left = x-223+"px";
		newdiv.style.top = y-143+"px";
		newdiv.innerHTML = "<div class='ajax'></div><div title='关闭' class='close' onclick='this.parentNode.parentNode.removeChild(this.parentNode)'></div>";
		if($("pro")) $("pro").appendChild(newdiv);
    Ajax.call(WWW_ROOW+'user.php?act=collect', 'id=' + goodsId, collectResponse, 'GET', 'JSON');
  }

  /* *
   * 处理收藏商品的反馈信息

   */
  function collectResponse(result)
  {
		if($("newtipsbox")){
			var obj = $("newtipsbox").firstChild;
			obj.style.background = "none";
			obj.style.width = "auto";
			obj.style.height = "auto";
			obj.style.padding = "25px 0 10px 45px";
			if(result.message.indexOf("登录")!=-1){
        $("newtipsbox").className += " error";
        result.message=result.message.replace("登录","<a href='"+WWW_ROOW+"user.php?act=login'>登录</a>");
			}
			if(result.message.indexOf("收藏夹")!=-1){
        result.message=result.message.replace("收藏夹","<a href='"+WWW_ROOW+"user.php?act=collection_list'>收藏夹</a>");
			}
			obj.innerHTML = result.message;
		}
		else alert(result.message);
  }

  /* *
   * 处理会员登录的反馈信息

   */
  function signInResponse(result)
  {
    toggleLoader(false);

    var done    = result.substr(0, 1);
    var content = result.substr(2);

    if (done == 1)
    {
      document.getElementById('member-zone').innerHTML = content;
    }
    else
    {
      alert(content);
    }
  }
  /* *
   * 评论的翻页函数

   */
  function gotoPage(page, id, type)
  {
    Ajax.call(WWW_ROOW+'comment.php?act=gotopage', 'page=' + page + '&id=' + id + '&type=' + type, gotoPageResponse, 'GET', 'JSON');
  }
  function gotoPage1(page, id, type)
  {
    Ajax.call(WWW_ROOW+'comment1.php?act=gotopage', 'page=' + page + '&id=' + id + '&type=' + type, gotoPageResponse, 'GET', 'JSON');
  }
  function gotoPageResponse(result)
  {
    document.getElementById("ECS_COMMENT").innerHTML = result.content;
  }
  /* *
   * 获取url参数
   */
  function request(paras){ 
    var url = location.href;  
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");  
    var paraObj = {};
    for (i=0; j=paraString[i]; i++){  
      paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);  
    }  
    var returnValue = paraObj[paras.toLowerCase()];  
    if(typeof(returnValue)=="undefined"){  
      return "";  
    }else{  
      return returnValue; 
    }
  }
  //应用
  var p_uid = request("p_uid");
  var u = request("u");
  if(!p_uid&&!u){
    //如果2个参数都不存在，则什么也不执行

  }
  else {
    //Ajax.call(WWW_ROOW+'comment1.php?act=gotopage', 'p_uid=' + p_uid + '&u=' + u, , 'GET', 'JSON');
	
	 Ajax.call(WWW_ROOW+ 'args.php?act=getuid', 'p_uid='+ p_uid +'&u='+u, get_uid_back , 'GET', 'TEXT', true, true );
  }
  //发送来源地址
	var refer = document.referrer;
	if(document.referrer){
	  Ajax.call(WWW_ROOW+ 'args.php?act=referrer', 'url='+document.referrer, get_uid_back , 'GET', 'TEXT', true, true );
	}
	else {
    Ajax.call(WWW_ROOW+ 'args.php?act=referrer', 'url='+document.location.href, get_uid_back , 'GET', 'TEXT', true, true );
	}

  function get_uid_back(result){

  }


//兑换流程js
function islogin(){
  Ajax.call(WWW_ROOW+'flow_change.php?step=get_has_input', '', Reislogin , 'GET', 'TEXT', true, true );
  var tipsbox1 = document.createElement("div");
  tipsbox1.id = "tipsbox1";
  tipsbox1.style.width = "210"+"px";
  tipsbox1.style.height = "24"+"px";
  tipsbox1.style.background = "#a64dc3";
  tipsbox1.style.color = "#fff";
  tipsbox1.style.position="absolute";
  tipsbox1.style.bottom = 20-(document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop)+"px";
  tipsbox1.style.left = 0+"px";
  tipsbox1.style.lineHeight = "24px";
  tipsbox1.style.zIndex = 1001;
  tipsbox1.innerHTML = "我们正在努力的处理您的请求...";
  document.body.appendChild(tipsbox1);
}
function Reislogin(id){
  if($("tipsbox1")) document.body.removeChild($("tipsbox1"));
  if(parseInt(id)){
	location.href=WWW_ROOW+"flow_change.php?step=change_cart";
  }
  else {
	var DHgoodsid = $("DHgoodsid").value;
    addDH(DHgoodsid);
  }
}
function addDH(id){
    var isie= navigator.appVersion.indexOf("MSIE")!=-1?true:false;
    var newdiv=document.createElement("div");
    newdiv.id="yinying";
    newdiv.style.position="absolute";
    newdiv.style.width="100%";
    newdiv.style.height=document.body.clientHeight+"px";
    newdiv.style.background="black";
    if(!isie) newdiv.style.opacity=0.5;
    else newdiv.style.filter="alpha(opacity=50)";
    newdiv.style.left=0+"px";
    newdiv.style.top=0+"px";
    newdiv.style.zIndex=999;
    if($("pro")) document.body.appendChild(newdiv);
	/*弹出兑换框*/
	var boxdiv = document.createElement("div");
	boxdiv.id = "dhbox";
	boxdiv.style.width = "3"+"px";
	boxdiv.style.height = "2"+"px";
	boxdiv.style.overflow = "hidden";
	boxdiv.style.background = "#fff";
	boxdiv.style.position="absolute";
	boxdiv.style.border = "5px solid #aaa";
	boxdiv.style.paddingBottom = "30px";
	boxdiv.style.top = (document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop)+245+"px";
	boxdiv.style.left = 500+"px";
	boxdiv.style.zIndex=1000;
	var dhstring ="<form action='' method='post' id='kahaoform'><div id='moveDH' title='可拖动' onmousedown='moveDHbox(event,this)' style='margin: 0px 5px 0; padding: 10px 0 0; overflow:hidden;cursor:move; height:24px;background:url("+WWW_ROOW+"themes/newpf/images/userloginDH.gif) 0px 10px no-repeat;'></div><table style='width:100%;height:140px;margin-top:10px;text-align:left;'><tr><td style='text-align:right;'>兑奖卡号：</td><td><input style='width:140px;height:18px;line-height:18px;border:1px solid #ccc;' type='text' name='kahao' /></td></tr><tr><td style='text-align:right;'>密&nbsp;&nbsp;&nbsp;&nbsp;码：</td><td><input style='width:140px;height:18px;line-height:18px;border:1px solid #ccc;' type='password' name='password' /></td></tr><tr><td></td><td><input type='button' value='提交' onclick='ajaxDH()' /> &nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='关闭' onclick='closeDH()' /><input type='hidden' name='id' value='"+id+"' /></td></tr></table></form><p style='font-size:12px;text-align:left;margin:0 10px;line-height:18px;color:red;'>如有部分密码错误，请联系朴芳网客服处理</p>";
	document.body.appendChild(boxdiv);
	boxdiv.innerHTML = dhstring;
	/*应用渐变效果*/
	changeDH(boxdiv);
}
/*弹出框渐变效果*/
function changeDH(obj){
  if(!document.obj) document.obj = obj;
  var h = document.obj.style.height;
  var w = document.obj.style.width;
  h = parseInt(h);
  w = parseInt(w);
  if(!document.p) document.p = h/w;//长宽比率
  document.obj.style.width = (w+10)+"px";
  document.obj.style.height = (w+10)*document.p+"px";
  if(document.obj.offsetWidth<=300) setTimeout(changeDH,10);
}
/*获取鼠标坐标*/
function mousePos(e){
        var x,y;
        e = e || window.event;
        return {
        x:e.pageX||(e.clientX?e.clientX+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft):0),
        y:e.pageY||(e.clientY?e.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop):0)
        };
}
/*移动弹出框事件*/
function moveDHbox(e,obj){
  var w,h,line_w,line_h;
  var x = mousePos(e).x;
  var y = mousePos(e).y;
  if($("dhbox")){
	document.dhbox = $("dhbox");
	w = document.dhbox.offsetLeft;
	h = document.dhbox.offsetTop;
	line_w = x-w;
	line_h = y-h;
  }
  //alert(x+":"+y+"/"+w+":"+h);
  document.onmousemove = function(e){
    x = mousePos(e).x;
	y = mousePos(e).y;
    document.dhbox.style.left = x-(line_w)+"px";
	document.dhbox.style.top = y-(line_h)+"px";
  };
  document.onmouseup = function(){
    var left = document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft;
    var top = document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
	document.offsetLeft = $("dhbox").offsetLeft-left;
	document.offsetTop = $("dhbox").offsetTop-top;
    document.onmousemove = null;
  }
}
/*滚动的时候弹出框一起滚动*/
function scrollDH(){
  var left = document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft;
  var top = document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
  if($("dhbox")){
	document.offsetLeft = document.offsetLeft?document.offsetLeft:$("dhbox").offsetLeft;
	document.offsetTop = document.offsetTop?document.offsetTop:$("dhbox").offsetTop;
	$("dhbox").style.left = document.offsetLeft+left+"px";
    $("dhbox").style.top = document.offsetTop+top+"px";
  }
}
addonscroll(scrollDH);
/*关闭兑换框*/
function closeDH(){
  if($("yinying")) document.body.removeChild($("yinying"));
  if($("dhbox")) document.body.removeChild($("dhbox"));
  if($("tipsbox")) document.body.removeChild($("tipsbox"));
  if(document.obj) document.obj = null;
  if(document.p) document.p = null;
}
/*ajax验证卡号和密码*/
function ajaxDH(){
  if($("kahaoform")){
    var theform = $("kahaoform");
		var kahao = theform.elements["kahao"].value;
		var password = theform.elements["password"].value;
		var goodsid = theform.elements["id"].value;
		if(!kahao||!password){
				alert("卡号或者密码不能为空");
		}
		else{
				 Ajax.call(WWW_ROOW+'flow_change.php?step=yanzheng', 'bonus_sn='+ kahao +'&bonus_password='+password+'&goods_id='+goodsid, kahao_back ,  'GET', 'JSON' );

				 var tipsbox = document.createElement("div");
				 tipsbox.id = "tipsbox";
				 tipsbox.style.width = "210"+"px";
				 tipsbox.style.height = "24"+"px";
				 tipsbox.style.background = "#fff";
				 tipsbox.style.position="absolute";
				 tipsbox.style.bottom = 20-(document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop)+"px";
				 tipsbox.style.left = 0+"px";
				 tipsbox.style.lineHeight = "24px";
				 tipsbox.style.zIndex = 1001;
         tipsbox.innerHTML = "我们正在努力的处理您的请求...";
				 document.body.appendChild(tipsbox);
				 document.time = setTimeout(function(){ alert("处理超时,点击确定之后页面将会刷新"); if($("tipsbox")) document.body.removeChild($("tipsbox")); window.location.href=window.location.href; },15000);
		}
  }
}
/*验证卡号返回*/
function kahao_back(result){
  
  if(result.error){
		 clearTimeout(document.time);
		 if($("tipsbox")) document.body.removeChild($("tipsbox"));
     alert(result.message);
  }
  else{
    location.href=WWW_ROOW+"flow_change.php?step=change_cart";
  }
}

function zhankai(id,obj){
  if($(id).style.height=="auto"){
    $(id).style.height=30+"px";
    obj.innerHTML="更多";
		obj.parentNode.className = "filter_opera";
  }
  else{
    $(id).style.height="auto";
		obj.parentNode.className += " zhankai";
    obj.innerHTML="精简";
		$(id).getElementsByTagName("dt")[0].style.height = $(id).offsetHeight+"px";
  }
}
/*检查搜索表单*/
function checksearchform(theform){
  var keywords = theform.elements["keywords"];
	if(keywords.value==keywords.defaultValue||Utils.isEmpty(keywords.value)){
	  alert("请输入搜索关键字");
		return false;
	}
}
/*隐藏品牌弹出框*/
function hiddenbrand(e,id){
	e=e||window.event;
  if(!isMouseLeaveOrEnter(e,$(id))) return;
	document.brandtime=setTimeout(function(){
	  $(id).style.display = "none";
	},10);
}
/*百科切换*/
function baiketab(obj,id_part,id_index,num){
  var lis = obj.parentNode.getElementsByTagName("li");
  for(var i=0;i<lis.length;i++){
    lis[i].className = "";
	}
	obj.className = "curr";
	for(var j=1;j<=num;j++){
    $(id_part+j).style.display="none";
	}
	$(id_part+id_index).style.display="block";
}

/*qq彩贝*/
function showqqcaibei(id,e){
  if($(id)) {
		var x = mousePos(e).x;
    var y = mousePos(e).y;
		var obj = $(id);
		obj.style.top = y+10+"px";
		obj.style.left = x+10+"px";
    obj.style.display = "block";
	}
}
function hidqqcaibei(id){
  if($(id)) {
    $(id).style.display = "none";
	}
}

/*设置cookie*/
function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
		var hours = 8; //此 cookie 将被保存 30 天
		var exp = new Date();    //new Date("December 31, 9998");
		exp.setTime(exp.getTime() + (hours*60*60*1000));
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
/*读取cookie*/
function getCookie(name)//取cookies函数       
{
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		 if(arr != null) return unescape(arr[2]); return null;

}
function closetest(){
  if($("test")) document.body.removeChild($("test"));
	if($("newdiv")) document.body.removeChild($("newdiv"));
}
function tips2012(){
	if(getCookie("test")){

	}
	else{
		SetCookie("test","123");
		var isie= navigator.appVersion.indexOf("MSIE")!=-1?true:false;
    var newdiv=document.createElement("div");
    newdiv.id="newdiv";
    newdiv.style.position="absolute";
    newdiv.style.width="100%";
    newdiv.style.height=document.body.clientHeight+"px";
    newdiv.style.background="black";
    if(!isie) newdiv.style.opacity=0.5;
    else newdiv.style.filter="alpha(opacity=50)";
    newdiv.style.left=0+"px";
    newdiv.style.top=0+"px";
    newdiv.style.zIndex=999;
    document.body.appendChild(newdiv);

		var test = document.createElement("div");
		test.id = "test";
		test.innerHTML = "<p class='p1' onclick='closetest()'></p><p class='p2' onclick='closetest()'></p>";
		document.body.appendChild(test);
	}
}
//addonload(tips2012);