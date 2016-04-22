import React, { Component } from 'react';
import {Header} from './component/header.js';
import {Menu} from './component/menu.js';
import {Banner} from './component/banner.js';
import {Product} from './component/product.js';
import {Div,Span,A,Input,Top,Hot,Bargen} from './component/template.js';
 

var ReactDOM  = require('react-dom');

var pos1 = require('../images/poster1.jpg');
var pos2 = require('../images/poster2.jpg');
var pos3 = require('../images/poster3.jpg');
var pos4 = require('../images/poster4.jpg');
var pos5 = require('../images/poster5.jpg');
// 应用入口
export class App extends Component {
  constructor(){  //设置默认值
      super();
      this.state={
        main_slide:[],//轮播
        list_slide:[],//乡邻头条
        goods:[],//商品集合
      }
  }
  componentWillMount(){
    var that =this;

    fetch("/index.php/wap/widgets-getAllWidgets.html",{method:"GET"}).then(function(response){
        return response.json();
    }).then(function(data){
        if(data){
            for(var i=0;i<data.length;i++){
                if(data[i].type=="main_slide"){
                    that.setState({
                      main_slide: data[i].datas
                    });
                    //model.main_slide=data[i].datas;
                }
                if(data[i].type=="list_slide"){
                    if( that.state.list_slide.length==0)
                    //model.list_slide=data[i].datas;
                    that.setState({
                      list_slide: data[i].datas
                    });
                }
                if(data[i].type=="goods"){
                    if( that.state.goods.length==0){
                    //model.goods=data[i].datas;
                    that.setState({
                      goods: data[i].datas
                    });
                    }else{
                        //model.goods.concat(data[i].datas);
                        that.state.goods.concat(data[i].datas);
                    }
                }
            }
         }
    });

  }
  render() {
    var brArry = [
    {
      url:'../build/assets/' + pos1
    },
    {
      url:'../build/assets/' + pos2
    },
    {
      url:'../build/assets/' + pos3
    },
    {
      url:'../build/assets/' + pos4
    },
    {
      url:'../build/assets/' + pos5
    }
    ]
    return (
      <div className="app">
        <Header classname={"mainhearder"} staut={1} />
        <div className="mainview">
          <Menu classname={"tree"}/>
          <div className="content">
            <Banner width={100} arry={brArry} />
            <Hot arry={ this.state.list_slide } />

            <Product arry={ this.state.goods } />

          </div>
        </div>
        <Top />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('content')
);