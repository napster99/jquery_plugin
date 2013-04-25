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


		init();

		function init() {
			getOpsCoordinate()
			createContainer();
			panelInit();
			
		};

		//布局初始化
		function panelInit() {
			var imgs = $('#napster').find('img');

			for(var i=0, len=imgs.length; i<len ; i++) {
				imgs.eq(i).animate(opts.opsCoordinate[i],1000).attr('css',opts.opsCoordinate[i]);
			}
		}

		//计算坐标点位置
		function getOpsCoordinate() {
			opts.opsCoordinate = [{'top':300,'left':350,'width':200,'height':300},
			{'top':225,'left':750,'width':100,'height':150},
			{'top':75,'left':400,'width':100,'height':150},
			{'top':225,'left':0,'width':100,'height':150}];

		}
		//创建容器
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

		//前一张
		function backRun() {
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
			}

		//后一张
		function forwardRun() {

		}

		$('button[name=up]').click(function() {
			
			backRun();
		});

		
	};

})(jQuery);



