import React, { Component } from 'react';
import {Header} from './component/header.js';

import {Shopinfo} from './component/shopinfo.js'; //产品详情
import {Deitlsinfo,Loaddingt,Top} from './component/template.js';

var ReactDOM  = require('react-dom');
require('../sass/detail.scss');

// 应用入口
export class App extends Component {
  render() {
    return (
      <div className="app">
        <Header staut={2} />
            <Shopinfo />
            <Loaddingt />
        <Top />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('content')
);