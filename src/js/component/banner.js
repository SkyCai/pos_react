/**
 * banner轮播图
 */
import React, { Component } from 'react';
//require('../images/poster1.jpg');
export class Banner extends Component {
  render() {
    var xharry = this.props.arry;
    var list = xharry.map(function(item,i){
      return (
        <li key={i}>
           <img src={item.url} title="" />
        </li> 
      )
    })
    var lists = xharry.map(function(item,i){
      return (
        <li key={i}></li> 
      )
    })
    return (
      <div className="swup" style={{width:this.props.width+'%'}}>
        <div id="focus" className="focus">
              <div className="hd">
                  <ul>
                      {lists}
                  </ul>
              </div>
              <div className="bd">
                <div className="tempWrap" style={{display:'none'}}>
                  <ul>
                    {list}
                  </ul>
                </div>  
              </div>
          </div>
      </div>
    );
  }
}
