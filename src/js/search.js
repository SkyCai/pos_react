import React, { Component } from 'react';
import {Header} from './component/header.js';
import {Seachview,Loaddingt,Top} from './component/template.js';

var ReactDOM  = require('react-dom');
require('../sass/search.scss');
//var Json = require('./json.js'); //数据

// 应用入口
export class App extends Component {
  componentDidMount(){
    var id = document.getElementById("input_id");
    id.focus();
  }
  render() {
    return (
      <div className="app">
        <div className="seachview">
          <Header staut={4} />
          <Seachview />
          <Loaddingt />
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