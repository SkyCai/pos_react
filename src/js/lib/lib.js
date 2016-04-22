$(function(){
    
    var setval = setInterval(function(){
        var oLi = $('.tempWrap ul').find("li");
        if(oLi.length != 0){
            $('.tempWrap').show();
            TouchSlide({
                slideCell: "#focus",
                titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                mainCell: ".bd ul",
                delayTime: 600,
                interTime: 4000,
                effect: "leftLoop",
                autoPlay: true,//自动播放
                autoPage: true, //自动分页
                switchLoad: "_src" //切换加载，真实图片路径为"_src" 
            });
            clearInterval(setval);
        }
    },50)

    var setvalHot = setInterval(function(){
        var oLia = $(".hot_text").find("li");
        if(oLia.length != 0){
            $(".hot_text").find("li").eq(0).addClass("li-cat");
              $(".hot_text").each(function(index,even){
                  var index=1;
                  var num=$(even).find('li').length;
                  var h=$(even).find('li').outerHeight();
                   var trimr=setInterval(function(){
                      if (index < num) {
                      $(even).find(" li").removeClass("li-cat");
                      $(even).find(" li").eq(index).addClass("li-cat");
                      index += 1;
                  } else {
                      $(even).find("li").removeClass("li-cat");
                      $(even).find("li").eq(0).addClass("li-cat");
                      index = 1;
                  }
              },3000);
              });
            clearInterval(setvalHot);
        }
    },50)

})

