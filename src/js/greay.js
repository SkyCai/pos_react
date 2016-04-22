import React, { Component } from 'react';
import {Header} from './component/header.js';
import {Menu} from './component/menu.js';
import {ProductSearch} from './component/product.js'; //产品列表
import {Shoptab,Top,Loaddingt,Div} from './component/template.js';
 

var ReactDOM  = require('react-dom');
//var Json = require('./json.js'); //数据

// 应用入口
export class App extends Component {
  render() {
    return (
      <div className="app">
        <Header classname={"mainhearder"} staut={3} />
        <div className="mainview">
          <Menu classname={"tree tree_float"} />
          <div className="content">
            <Shoptab />
            <ProductSearch url={'/index.php/wap/gallery-ajax_get_goods.html'} />
            <Div id={'pd-id'} Class={''} style={{display:'none'}} />
            <Loaddingt />
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