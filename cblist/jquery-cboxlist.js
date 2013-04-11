//@charset 'utf-8';
/**
  * describe: 应用商店动态下拉列表
  * date    : 2013-04-09
  * author  : Napster
  */
$.fn.extend({
	'cbinit' : function(data,callback) {

		$(this).renderArea(data);


		$('.btn').find('a').click(function(){
			var name = $(this).attr('class');
			switch(name){
				case 'sure':	
					callback($(this).getCBData());
					break;
				case 'cancel':
					$('.main-area').hide();
					$('.list-area').find('input').attr('checked',false);
					break;
				default:
					//do nothing
			}
		});

		$('.tMenu').click(function(){
			$('.main-area').show();
		});

	},

	'renderArea' : function(data){
		var htmlStr = '<div style="width:180px; font-family:Microsoft Yahei;">'+
							'<div class="tMenu">'+
								'<span class="text">全部商店</span>'+
								'<span class="icon">▼</span>'+
							'</div>'+
							'<div class="main-area" style="display:none;">'+
								'<ul class="list-area">'+
								'<li class="list-item" style="text-align:center;">暂无商店</li>'+
								'</ul>'+
								'<div class="btn">'+
									'<a class="sure" href="javascript:;">确定</a>'+
									'<a class="cancel" href="javascript:;">取消</a>'+
								'</div>'+
							'</div>'+
						'<div>';
		$(this).html(htmlStr).setCBData(data);
	},

	'getCBData' : function(){
		var objData = [];
		$('.list-area').find('li').each(function(){
			if($(this).children('input').attr('checked')){
				objData.push($(this).attr('storeId'));
			}
		});

		return objData.join(',');

	},
	'setCBData' : function(data){
		if(data && data.constructor === Array){
			var htmlStr = '';
			for(var i=0; i<data.length; i++){
				var storeId = data[i]['storeId']
					,storeName = data[i]['storeName'];
				htmlStr += '<li class="list-item" storeId="'+storeId+'"><input type="checkbox" />'+storeName+'</li>';
			}
			$('.list-area').html(htmlStr);
		}else{
			$('.list-area').html('<li class="list-item">暂无商店</li>');
		}

	}
});