var qb,QuickBanner=function(i){for(var t=i.refreshRate,n=i.indicator.backgroundColor,o=i.indicator.color,e=i.indicator.style,r=i.close.style,a=i.id,s=i.id+"_dots",d=i.id+"_close",c=a+"_image_item_",l=s+"_dot_item_",p=$("#"+a),f=i.banners,h=f.length,u=1,g=null,v=1;v<=h;v++){var y,_=f[v-1],b=_.imageUrl,m=$('<img id="'+(c+v)+'" onclick="'+_.onClick+'" style="position:absolute; top:0; left:0; cursor:pointer; transition-duration: 0.5s;" src="'+b+'">');p.append(m)}var x=$('<div id="'+s+'" style="position:absolute; bottom:0; left:50%; cursor:pointer; z-index:10;"></div>');if(p.append(x),h>1)for(var w=1;w<=h;w++){var k=$('<i id="'+(l+w)+'" class="fa '+e+'" style="color:white; padding-bottom:1px; padding-left:2px; padding-right:2px; padding-bottom:2px; font-size:50%; transition-duration: 0.5s;"></i>');x.append(k)}setTimeout(function(){$("[id^="+l+"]").on("click",function(){clearTimeout(g),u=parseInt($(this).attr("id").replace(l,"")),B(u),g=setTimeout(C,t)})},0);var z=$('<div id="'+d+'" style="position:absolute; top:0; right:0; cursor:pointer; z-index:10;"><i class="fa '+r+'" style="color:white; padding:2px; padding-right:4px;"></i></div>');z.on("click",function(){p.fadeOut()}),p.append(z);var B=function(i){var t=$("[id^="+c+"]"),e=$("#"+c+i);t.css("opacity",0),t.css("zIndex",0),e.css("opacity",1),e.css("zIndex",1),p.width(t[i-1].width),p.height(t[i-1].height);var r=$("[id^="+l+"]"),a=$("#"+l+i);r.css("color",n),a.css("color",o)};B(1),p.show();var C=function(){++u>h&&(u=1),B(u),g=setTimeout(C,t)};h>1&&(g=setTimeout(C,t))};function createBanner(i,t){var n=0,o=0;if(i.length>0){i.forEach(function(i){parseInt(i.w)>n&&(n=parseInt(i.w)),parseInt(i.h)>o&&(o=parseInt(i.h))});var e=document.getElementById(t);e.style.display="none",e.style.width=i[0].w+"px",e.style.height=i[0].h+"px",e.style.position="relative",e.style.margin="0 auto"}qb=new QuickBanner({id:t,banners:i,indicator:{style:"fa-minus",backgroundColor:"white",color:"#002844"},close:{style:"fa-times"},refreshRate:i[0].refrshRt})}var Banner_OnClick=function(i){window.open(i,"_blank")};