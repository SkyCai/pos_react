/**
 * 头部组件
 */
import React, { Component } from 'react';
import {Div,Span,A,Input} from './template.js';

export class Header extends Component {
	componentDidMount(){
		$(".seachview header .search_btn").on("click",function(){
	         var text=  $(".seachview .inputbox input").val();
	         window.location.href="./greay.html?seachtext="+text;
	     })
	    $(".mainhearder .inputbox").on("click",function(){
	         window.location.href="search.html?";
	    });
	    $("header .search_black").on("click", function() {
	        window.location.href = "search.html?"
	    });
		$(".run_left").on("click",function(){
			history.go(-1);
		});
	}
	render() {
		var staut = this.props.staut;
	  	var data = '';
	  	var lsa,lsb,lsc,lsd = '';
	  	switch(staut)
		{
		case 1:
		  data = <HeaderiLta lsa={'category'} lsb={'logo'} lsc={'inputbox'} />
		  break;
		case 2:
		  data = <HeaderiLtb lsa={'run_left'} lsb={'title'} lsc={'search_black'} lsd={'li_main'} />
		  break;
		case 3:
		  data = <HeaderiLtc lsa={'category'} lsb={'inputbox'} lsc={'li_main'} />
		  break;
		case 4:
		  data = <HeaderiLtd lsa={'run_left'} lsb={'inputbox'} lsc={'search_btn'} />
		  break;    
		default:
		  return false;
		}
	    return (
	      <header className={this.props.classname}>
	        {data}
	      </header>
	    );
	}
}

export const HeaderiLta = React.createClass({
	render() {
		return (
			<ul>
		        <li className={this.props.lsa}><Span text={''} /><Span text={'分类'} /></li>
	            <li className={this.props.lsb}><Span text={''} /></li>
	            <li className={this.props.lsc}>
	                <Div Class={'icon_seach'} text={''} />
	                <Input />
	            </li>
	        </ul>
		);
	}
});

export const HeaderiLtb = React.createClass({
	render() {
		return (
			<ul>
		        <li className={this.props.lsa}><Span text={''} /></li>
                <li className={this.props.lsb}>
                	<Span text={'商品详情'} />
                </li>
                <li className={this.props.lsc}>
                    <Span text={''} />
                </li>
                <li className={this.props.lsd}><A href={'index.html'} /></li>
	        </ul>
		);
	}
});

export const HeaderiLtc = React.createClass({
	render() {
		return (
			<ul>
		        <li className={this.props.lsa}><Span text={''} /><Span text={'分类'} /></li>        
	            <li className={this.props.lsb}>
	                <Div Class={'icon_seach'} text={''} />
	                <Input />
	            </li>
	            <li className={this.props.lsc}>
	                <A href={'index.html'} />
	            </li>  
	        </ul>
		);
	}
});

export const HeaderiLtd = React.createClass({
	render() {
		return (
			<ul>
		        <li className={this.props.lsa}><Span text={''} /></li>        
	            <li className={this.props.lsb}>
	                <Div Class={'icon_seach'} text={''} />
	                <Input />
	                <Div Class={'icon_close'} text={''} />
	            </li>
	            <li className={this.props.lsc}>
	                搜索
	            </li>  
	        </ul>
		);
	}
});

