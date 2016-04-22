import React, { Component } from 'react';

export class Div extends Component {
  render() {
    return (
      <div id={this.props.id} className={this.props.Class}>{this.props.text}</div>
    );
  }
}

export class Span extends Component {
  render() {
    return (
      <span className={this.props.Class}>{this.props.text}</span>
    );
  }
}

export class A extends Component {
  render() {
    return (
      <a href={this.props.href}>{this.props.text}</a>
    );
  }
}

export class Input extends Component {
  constructor(){  //设置默认值
      super();
      this.state={
        value:''
      }
  }
  handleChange(e) {
    this.setState({
      value:e.target.value
    });
  }
  render() {
    var value= this.state.value;
    return (
      <input placeholder="搜索您想要的商品" type="text" id="input_id" value={value} onChange={this.handleChange.bind(this)} />
    );
  }
}

export class Top extends Component {
  componentDidMount(){
    $(window).scroll(function () {
       if($(document).scrollTop()>100){
        $(".run_top").show();
       } else{
        $(".run_top").hide();

       }
     });
  }
  handleClick(e) {
    document.body.scrollTop = 0;
  }
  render() {
    return (
      <div className="run_top" onClick={this.handleClick} ></div>
    );
  }
}

//hot
export class Hot extends Component {
  render() {
    var xharry = this.props.arry;
    var list = xharry.map(function(item,i){
      return (
          <li key={i}>
            {item.linkinfo}
          </li>
      )
      //console.log(item)
    })
    if(this.props.arry.length != 0){
      return (
        <div className="hot">
          <div className="hot_title">

          </div>
          <div className="hot_text">
              <ul>
                  {list}
              </ul>    
          </div>
        </div>
      );
    }else{
      return (
        <div></div>
        )
    }
  }
}

//Bargen
export class Bargen extends Component {
  render() {
    return (
      <div className={this.props.classname} style={{clear:'both'}}>
          <div className="bargen_title">
              <span>{this.props.title}</span>
          </div>
          <div className="nav_right">
          </div>
      </div>
    );
  }
}

//图片详情
export class Deitlsinfo extends Component {
  render() {
    var xharry = this.props.arry;
    var list = xharry.map(function(item,i){
      return (
        <li key={i}>
           <img src={item.img} title="" />
        </li> 
      )
    })
    return (
      <div className="deitlsimgs">
          <div className="deitlsimgs_title">图片详情</div>
          <div className="imgbox">
            <ul>
               {list}
            </ul>
          </div>
      </div>
    );
  }
}

//TAB
export class Shoptab extends Component {
  render() {
    return (
      <div className="shop_tab">
          <div>
               <ul>
                   <li className="li_cat">销量优先</li>
                   <li>新品优先</li>
                   <li>
                       <div>
                           <span>价格</span>
                           <span></span>
                       </div>
                   </li>
               </ul>
           </div>
      </div>
    );
  }
}

//局部加载
export class Loaddingt extends Component {
  render() {
    return (
      <div className="loadding2">
          <div className="ball-spin-fade-loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
      </div>
    );
  }
}

//Seachview
export class Seachview extends Component {
  constructor(){  //设置默认值
      super();
      this.state={
        name:[]
      }
  }
  componentDidMount(){
    var that =this;
    $(".loadding2").toggle();
    fetch("/index.php/wap/menu-get_keyword.html",{
      method:"GET"
    }).then(function(res){
      return res.json();
    }).then(function(data){
      $(".loadding2").toggle();
        if(data != 0){
          that.setState({
            name: data
          });
          //$(".loadding2").toggle();
          $(".loadding2").attr("isload","2");//加载完成
        }
    })
  }
  render() {
    var xharry = this.state.name;
    var list = xharry.map(function(item,i){
      return (
        <li key={i}>
          <a href={'./greay.html?seachtext=' + item}>{item}</a>
        </li> 
      )
    })
    return (
      <div className="seachview_content">
          <div className="seach_hot">
              <div className="seach_hot_title">
                <span></span>
                <span>热门搜索</span>
              </div>
              <ul>
                  {list}
              </ul>
          </div>
      </div>
    );
  }
}


export const a = (a,b) => {

  alert(1);
}




