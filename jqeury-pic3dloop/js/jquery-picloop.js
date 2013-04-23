(function($){

	$.fn.picloop = function(options) {

		var defaults = {
			'picWidth' : '200',
			'picHeight': '300',
			'picSrc'   : [],
			'angle'    : 0,
			'container':$('body')
		};

		var opts = $.extend(defaults, options);

		// console.log(opts)

		var len = opts['picSrc'].length===0? 1:opts['picSrc'].length;
		opts['angle'] = 360/len;
		// console.log(opts);

		var opsCoordinate = 
			[{'top':300,'left':350,'width':200,'height':300},
			{'top':225,'left':750,'width':100,'height':150},
			{'top':75,'left':400,'width':100,'height':150},
			{'top':225,'left':0,'width':100,'height':150}];

		init();

		function init() {
			createContainer();

			var imgs = $('#napster').find('img');

			for(var i=0, len=imgs.length; i<len ; i++) {
				imgs.eq(i).animate(opsCoordinate[i],1000).attr('css',opsCoordinate[i]);
			}
		};

		function createContainer() {
			var $div = $('<div  id="napster"></div>');
			$div.css({
				width : opts['picHeight']*3,
				height : opts['picHeight']*2,
				position:'relative',
				border : '1px solid red'
			});

			var imgs = '';
			for(var i=0,len=opts['picSrc'].length; i<len; i++) {
				// imgs += '<img class="initPic" style="margin-top:-'+opts['picHeight']/2+'px; margin-left:-'+opts['picWidth']/2+'px;" src="'+opts['picSrc'][i]+'"  index="'+i+'" />'; 
				imgs += '<img class="initPic" src="'+opts['picSrc'][i]+'"  index="'+i+'" />'; 
			}

			$div.html(imgs);

			opts['container'].append($div);
		};

		$('button[name=up]').click(function() {
			
			var imgs = $('#napster').find('img');
			for(var i=0,j=0; i<4; j++,i++) {
				var left = imgs.eq(i+1).css('left'),
					top = imgs.eq(i+1).css('top'),
					width = imgs.eq(i+1).css('width'),
					height = imgs.eq(i+1).css('height');
				var ops = {
					left : left,
					top : top,
					width : width,
					height : height
				}	

				if(i == 3){
					ops = {
						left : imgs.eq(0).css('left'),
						top : imgs.eq(0).css('top'),
						width : imgs.eq(0).css('width'),
						height : imgs.eq(0).css('height')
					}	
					imgs.eq(i).animate(ops);
					continue;
				}
				

				imgs.eq(i).animate(ops);
			}
		});

		$('button[name=down]').click(function() {
			
		});
	};

})(jQuery);

// var arrs = [a,b,c,d];

// <img index=0 f=a />
// <img index=1 f=b />
// <img index=2 f=c />
// <img index=3 f=d />

// for(var i=0; i<imgs.length; i++) {
// 	if(i == imgs.length -1){
// 		imgs.eq(i).css('f',imgs.eq(0).attr('f')).attr('f',eq(0).attr('f'));
// 	}

// 	imgs.eq(i).css('f',imgs.eq(i+1).attr('f')).attr('f',eq(i+1).attr('f'));
// }


