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
			{'top':225,'left':0,'width':100,'height':150},
			{'top':75,'left':400,'width':100,'height':150}];

		init();

		function init() {
			createContainer();

			var imgs = $('#napster').find('img');

			for(var i=0, len=imgs.length; i<len ; i++) {
				imgs.eq(i).animate(opsCoordinate[i],1000);
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
			// $('#napster').find('img[index=0]').animate(opsCoordinate[1]).attr('index',1);
			// $('#napster').find('img[index=1]').animate(opsCoordinate[2]).attr('index',2);
			// $('#napster').find('img[index=2]').animate(opsCoordinate[3]).attr('index',3);
			// $('#napster').find('img[index=3]').animate(opsCoordinate[0]).attr('index',0);

			for(var i=0,j=0; i<4; j++,i++) {
				if(j == 3) j=-1;
				$('#napster').find('img').eq(i).animate(opsCoordinate[j+1]).attr('index',i);
			}
		});

		$('button[name=down]').click(function() {
			
		});
	};

})(jQuery);