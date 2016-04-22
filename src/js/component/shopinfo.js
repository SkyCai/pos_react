/**
 * Shopinfo
 */
import React, { Component } from 'react';
import {Banner} from './banner.js';

export class Shopinfo extends Component {
	constructor(){  //设置默认值
	      super();
	      this.state={
	        data:{
	        	data:{
	        		product_info:{
	        			title:'',
	        			price:'',
	        			market_price:'',
	        			sale_num:'',
	        			qr_code:'',
	        			intro:[],
	        			images:[]
	        		},
	        		supplier_info:{
	        			supplier_sname:'',
	        			area:'',
	        			support_express:''
	        		}
	        	}
	        },
	        pid:this.getUrlParam('pid')?this.getUrlParam('pid'):"",
	      }
    }
    getUrlParam(name){
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = decodeURI(window.location.search).substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
  	}
  	componentWillMount(){
  		//$(".loadding2").toggle();
  	}
    componentDidMount(){
	    var that =this;
	     $(".loadding2").toggle();
	    fetch("/index.php/wap/details-ajaxIndexForPos-"+ this.state.pid +".html",{method:"GET"}).then(function(response){
	        return response.json();
	    }).then(function(data){
	    	$(".loadding2").toggle();
	        if(data != 0){
	            that.setState({
	              data: data
	            });
	            $(".deitlsview").show();
	            $(".loadding2").attr("isload","2");//加载完成
	         }
	    });

    }
	render() {
		return (
			<div className="deitlsview" style={{display:'none'}}>
				<div className="deitlsview_content">
					<Banner width={43} arry={this.state.data.data.product_info.images} />
					<div className="shop_info">
			         <div className="shop_title">{this.state.data.data.product_info.title}</div>
			         <div className="shop_content">
			            <div className="shop_content_left">
			                <div className="left_price">
			                    <span>¥</span><span>{this.state.data.data.product_info.price}</span>
			                </div>
			                <div className="left_num">
			                    <span>市场价</span>
			                    <span><span>¥</span><span className="text-linet">{this.state.data.data.product_info.market_price}</span></span>
			                    <span>销量</span>
			                    <span>{this.state.data.data.product_info.sale_num}</span>
			                </div>
			                <div className="left_bored">
			                    扫描右侧二维码进行购买
			                </div>
			            </div>
			            <div className="shop_content_code">
			                <img src={this.state.data.data.product_info.qr_code} />
			            </div>
			        </div>
			        <Shopinfocll dt='商家信息' gs={this.state.data.data.supplier_info ? this.state.data.data.supplier_info.supplier_sname?this.state.data.data.supplier_info.supplier_sname : "" :""} />
			        <Shopinfocll dt='所在地' gs={this.state.data.data.supplier_info?this.state.data.data.supplier_info.area?this.state.data.data.supplier_info.area:"":""} />
			        <Shopinfocll dt='支持快递' gs={this.state.data.data.supplier_info?this.state.data.data.supplier_info.support_express?this.state.data.data.supplier_info.support_express:"":""} />
			      </div>
		      </div>
		      <Deitlsinfo arry={this.state.data.data.product_info.intro?this.state.data.data.product_info.intro:"暂无信息"} />
	      </div>
		);
	}
}

export const Shopinfocll = React.createClass({
	render() {
		return (
			<div className="shop_info_cll">
	          <span>{this.props.dt}</span>
	          <span>{this.props.gs}</span>
	        </div>
		);
	}
});

export class Deitlsinfo extends Component {
  createMarkup() { return {__html: this.props.arry} }
  render() {
    
    return (
      <div className="deitlsimgs">
          <div className="deitlsimgs_title">图片详情</div>
          <div className="imgbox">
            <ul dangerouslySetInnerHTML={this.createMarkup()}>
             
            </ul>
          </div>
      </div>
    );
  }
}
