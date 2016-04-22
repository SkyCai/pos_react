/**
 * 产品列表
 */
import React, { Component } from 'react';

export class Product extends Component {
  render() {
    var xharry = this.props.arry;
    if(xharry && xharry != 0){
      var list = xharry.map(function(item,i){
        return (
          <li key={i}>
            <a href={'./detail.html?pid='+item.goodsId}>
             <span className="li_shop_img"><img src={item.pic_m} /></span>
             <div className="li_shop_info">
                 <div className="li_shop_title">
                     {item.goodsName}
                 </div>
                 <div className="Li_shop_price">
                     <div className="price"><span>¥</span><span>{item.goodsMarketPrice}</span></div>
                     <span className="xl">{item.goodsBuyCount}人付款</span>
                 </div>
             </div>
            </a>
          </li> 
        )
      })
    }
    return (
      <div className="shoplist">
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}

//搜索产品列表
export class ProductSearch extends Component {
  constructor(){  //设置默认值
      super();
      this.state={
        data:[],
        locadata:[],
        showtype:"list",
        page:1,
        orderBy:encodeURI('buy_count desc'),
        scontent:this.getUrlParam('seachtext')?encodeURI("n,"+this.getUrlParam('seachtext')+""):"",
        cat_id:this.getUrlParam('cat_id')?this.getUrlParam('cat_id'):"",
      }
  }
  getUrlParam(name){
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = decodeURI(window.location.search).substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
  }
  lodelist(){
      this.state.page = 1;
      this.state.locadata = [];
      var prame="showtype="+this.state.showtype+"&page="+this.state.page+"&orderBy="+this.state.orderBy+"&limit=12";
      if(this.state.scontent)prame+="&scontent="+this.state.scontent;
      if(this.state.cat_id)prame+="&cat_id="+this.state.cat_id;
      $(".loadding2").removeAttr("isload");
      $(".loadding2").toggle();
      $(".loadding2").attr("isload","1");//开始进行加载
      this.ajax(prame,0);
  }
  loaddinglist(){
      if($(".loadding2").attr("isload")=="0"){
        return;
      }
      this.state.page++;
      $(".loadding2").attr("isload","1");//开始进行加载
      $(".loadding2").toggle();
      var prame="showtype="+this.state.showtype+"&page="+this.state.page+"&orderBy="+this.state.orderBy+"&limit=12";
      if(this.state.scontent)prame+="&scontent="+this.state.scontent;
      if(this.state.cat_id)prame+="&cat_id="+this.state.cat_id;
      this.ajax(prame,1);
  }
  //headers: { "Content-Type": "application/x-www-form-urlencoded" },
  ajax(data,stuta){
    var that =this;
    fetch(this.props.url,{method:"POST",headers: { "Content-Type": "application/x-www-form-urlencoded" },body:data}).then(function(response){
        return response.json();
    }).then(function(data){
        $(".loadding2").toggle();
          if(data != 0){
            $("#pd-id").hide();
            that.setState({
              data: data
            });
            //$(".shop_tab").show();
            $(".loadding2").attr("isload","2");//加载完成
         }else{
            if(stuta == 1){
              that.state.page--
              $("#pd-id").show();
              $("#pd-id").html("没有更多的商品了");
            }else{
              $("#pd-id").show();
              $("#pd-id").html("没有找到相关商品哦~");
            }
            $("#pd-id").css({textAlign:'center',padding:'10px 0'})
            $(".loadding2").attr("isload","0");//已经加载完全部
            //$(".shop_tab").hide();
         }
    });
  }
  componentWillMount(){ //组件之前调用  
     
  }
  componentDidMount(){ //组件之后调用
    this.lodelist();
    $(".mainhearder input").val(this.state.scontent?this.getUrlParam('seachtext'):"");
    var that = this;
    $(".shop_tab ul li").on("click",function(){
        if($(".loadding2").attr("isload")=="1"){
            return;
          }
         $(".shop_tab ul li").removeClass('li_cat');
         $(this).addClass('li_cat');
         var index= $(".shop_tab ul li").index(this);
         if(index==0)that.state.orderBy="buy_count desc";//销量优先
         if(index==1)that.state.orderBy="goods_id desc";//新品优先
         var d=$(this).find('div');
         if( d.length>0&&index==2){
            if(d.hasClass('price_bottom')){
                d.removeClass('price_bottom').addClass('price_top');
                that.state.orderBy="price asc";//价格从低到高
            }
            else if(d.hasClass('price_top')){
                  d.removeClass('price_top').addClass('price_bottom');
                that.state.orderBy="price desc";//价格从高到底

            }
            else{
                d.addClass('price_top');
                that.state.orderBy="price asc";//价格从低到高
            }
         }else{
                  $(".shop_tab ul li").find('div').removeClass('price_top').removeClass('price_bottom')
            }
            that.lodelist();
    });
    $(window).scroll(function () {
       var  totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());  
       if($(document).height() <= totalheight){
         if($(".loadding2").attr("isload")=="1"){
                return;
              }
        that.loaddinglist();
       }
     });
  }
  render() {
    var xharry = this.state.data;
    if(this.state.locadata == 0){
      this.state.locadata = xharry
    }else{
      for(var i=0; i<xharry.length; i++){
        this.state.locadata.push(xharry[i])
      }
    }
    if(xharry && xharry != 0){
      var list = this.state.locadata.map(function(item,i){
        return (
          <li key={i}>
            <a href={'./detail.html?pid='+item.goods_id}>
             <span className="li_shop_img"><img src={item.image_url_m} /></span>
             <div className="li_shop_info">
                 <div className="li_shop_title">
                     {item.name}
                 </div>
                 <div className="Li_shop_price">
                     <div className="price"><span>¥</span><span>{item.price}</span></div>
                     <span className="xl">{item.buy_count}人付款</span>
                 </div>
             </div>
            </a>
          </li> 
        )
      })
    }
    return (
      <div className="shoplist">
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}
