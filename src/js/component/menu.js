/**
 * 右边菜单
 */
import React, { Component } from 'react';

export class Menu extends Component {
  constructor(){  //设置默认值
      super();
      this.state={
        name:[]
      }
  }

  componentWillMount(){
    var that =this;
    fetch("/index.php/wap/menu-category_list_pos.html",{method:"GET"}).then(function(response){
        return response.json();
    }).then(function(data){
        if(data){
            that.setState({
              name: data
            });
         }
    });
  }
  componentDidMount(){
    var cheight=$(window).height()-$(".mainhearder").height()-1;
       $(".tree").attr("style","max-height:"+cheight+"px");
       $(".content").attr("style","max-height:"+cheight+"px");
       $(".mainview").attr("style","min-height:"+cheight+"px");
    $(".tree").on("click",'.tree_ul_li',function(){
         if($(this).hasClass('li-cat')){
              $(this).removeClass("li-cat");
         }else{
              $(".tree .tree_ul_li").removeClass("li-cat");
              $(this).addClass("li-cat");
         }
    });
    $(".category").on("click",function(){
            $(".tree_float").toggle();
    });

  }
  render() {
    var xharry = this.state.name;
    var cls = ['tree_species','tree_shoes','tree_clothes','tree_food','tree_makeup','tree_baby','tree_children','tree_digital','tree_vehicle'];
    var list = xharry.map(function(item,i){
       if(i <= 8){
          return (
            <li className="tree_ul_li" key={i}>
               <p>
                  <span cid={item.cat_id} className={cls[i]}></span>
                  <span>{item.title}</span>
               </p>
               <Menusl marry={ item.items } />
            </li>
          )
       } 
    })
    return (
      <div className={this.props.classname}>
        <ul className="tree_ul">
          {list}
        </ul>
      </div>
    );
  }
}

export const Menusl = React.createClass({
  render() {
    var xharry = this.props.marry;
    if(xharry){
      var list = xharry.map(function(item,i){
        return (
          <li className="tree_ul2_li" key={i}>
             <a href={'./greay.html?cat_id='+item.cat_id}>{item.title}</a>
          </li>
        )
      })
    }
    return (
      <ul className="tree_ul2">
        {list}
      </ul>
    );
  }
});
