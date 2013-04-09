(function($) {
   var menu, childMenu, shadow, childShadow, trigger, content, hash, currentTarget;
   var defaults = {
     menuStyle: {
       listStyle: 'none',
       //padding: '1px',
       margin: '0px',
       backgroundColor: '#FCFCFC',
       border: '1px solid #999',
	   width:'100px'
     },
     itemStyle: {
       margin: '0px',
       color: '#000',
       display: 'block',
       cursor: 'default',
       padding: '3px',
	   fontFamily : 'Microsoft Yahei',
       backgroundColor: 'transparent',
	   borderLeft:'20px solid #4A4E53'
	   
     },
     itemHoverStyle: {
       backgroundColor: '#4A4E53',
	   color : '#fff'
     },
     eventPosX: 'pageX',
     eventPosY: 'pageY',
     shadow : true,
	 childShadow : true,
     onContextMenu: null,
     onShowMenu: null
      };
  $.fn.contextMenu = function(callFun,id, options) {
     if (!menu) {                      
       menu = $('<div></div>')
                .hide()
                .css({position:'absolute', zIndex:'500'})
                .appendTo('body')
                .bind('click', function(e) {
                  e.stopPropagation();
                });
     }
	 
	 if(!childMenu){
		childMenu = $('<div></div>')
					.hide()
					.css({position:'absolute', zIndex:'501'})
					.appendTo('body')
					.bind('click', function(e) {
					  e.stopPropagation();
					});
	 }
	 
	 
     if (!shadow) {
       shadow = $('<div></div>')
                  .css({backgroundColor:'#000',position:'absolute',opacity:0.1,zIndex:409})
                  .appendTo('body')
                  .hide();
     }
	 
	 if (!childShadow) {
       childShadow = $('<div></div>')
                  .css({backgroundColor:'#000',position:'absolute',opacity:0.1,zIndex:409})
                  .appendTo('body')
                  .hide();
     }
	 
     hash = hash || [];
     hash.push({
       id : id,
       menuStyle: $.extend({}, defaults.menuStyle, options.menuStyle || {}),
       itemStyle: $.extend({}, defaults.itemStyle, options.itemStyle || {}),
       itemHoverStyle: $.extend({}, defaults.itemHoverStyle, options.itemHoverStyle || {}),
       bindings: options.bindings || {},
       shadow: options.shadow || options.shadow === false ? options.shadow : defaults.shadow,
	   childShadow : options.childShadow || options.childShadow === false ? options.childShadow : defaults.childShadow,
       onContextMenu: options.onContextMenu || defaults.onContextMenu,
       onShowMenu: options.onShowMenu || defaults.onShowMenu,
       eventPosX: options.eventPosX || defaults.eventPosX,
       eventPosY: options.eventPosY || defaults.eventPosY
     });
	
    var index = hash.length - 1;
     $(this).bind('contextmenu', function(e) {
	 	
	   var which = $(this);
	   currentTarget =  $(this).attr('id');
       var bShowContext = (!!hash[index].onContextMenu) ? hash[index].onContextMenu(e) : true;
       if (bShowContext) display(callFun, which, index, this, e, options);
       return false;
     });
     return this;
   };
	
  function display(callFun, which, index, trigger, e, options) {
  
	callFun(which);
  
     var cur = hash[index];
	 
     content = $('#'+cur.id).find('ul:first').clone(true);
	 
	 content.find('li[parent=true]').css('position','relative');
	 
     content.css(cur.menuStyle).find('>li').css(cur.itemStyle).hover(
       function() {
		if($(this).attr('disabled')){
			return;
		}
		
	   	 childMenu.hide();
		 childShadow.hide();
	    $(this).css(cur.itemHoverStyle);
		
		if($(this).find('em').length > 0){
			var childContent =  $(this).find('em').next().find('ul').clone(true);
			childMenu.html(childContent).show();
			
			childContent.css({'margin':0,'padding':0});
//			e[cur.eventPosX] = e[cur.eventPosX]>440?440:e[cur.eventPosX];
			childMenu.css({'left':e[cur.eventPosX] - 102,'top':e[cur.eventPosY]+82}).css(cur.menuStyle).show();
						
			childMenu.find('li').css(cur.itemStyle).hover(
				function(){
					if($(this).attr('disabled')){
						return;
					}
					 $(this).css(cur.itemHoverStyle);
				},
				function(){
					$(this).css(cur.itemStyle);
				}
			);
		childContent.find('li[hide=true]').css('display','none');		
		if (cur.childShadow) childShadow.css({width:childMenu.width()+6,height:childMenu.height()+6,left:e.pageX-2 - 102,top:e.pageY+80}).show();
			
		}
		
		
       },
       function(){
         $(this).css(cur.itemStyle);
			
       }
     );
 	
	
     menu.html(content);
	 content.find('li[hide=true]').css('display','none');
		
     if (!!cur.onShowMenu) menu = cur.onShowMenu(e, menu);
	
    $.each(cur.bindings, function(id, func) {
       $('#'+id, menu).bind('click', function(e) {
         hide();
		 if($(this).attr('disabled')){
			return;
		 }
         func(trigger, currentTarget);
		  
       });
     });
//	e[cur.eventPosX] = e[cur.eventPosX]>440?440:e[cur.eventPosX];
	e[cur.eventPosX] = e[cur.eventPosX]>($(window).width() - 110)?($(window).width() - 110):e[cur.eventPosX];
    menu.css({'left':e[cur.eventPosX],'top':e[cur.eventPosY]}).show();
     if (cur.shadow) shadow.css({width:menu.width()+4,height:menu.height()+4,left:e.pageX-2,top:e.pageY-2}).show();
	 
     $(document).one('click', function(){
	 	 menu.hide();
	     shadow.hide();
		 childMenu.hide();
		 childShadow.hide();
		which.addClass('napzhang');
		which.css('background','');
	 });
   }
  
  function hide() {
     menu.hide();
     shadow.hide();
	 childMenu.hide();
	 childShadow.hide();
   }
	
   $.contextMenu = {
     defaults : function(userDefaults) {
       $.each(userDefaults, function(i, val) {
         if (typeof val == 'object' && defaults[i]) {
           $.extend(defaults[i], val);
         }
         else defaults[i] = val;
       });
     }
   };
 
})(jQuery);
 
$(function() {
   $('div.contextMenu').hide();
 });