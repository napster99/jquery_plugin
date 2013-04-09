/**
 * @author zxj (zhangxiaojian@myhexin.com) 2012-7-6
 * @result 不同样式封装后的表单组件 
 * @Object { text textArea radio checkBox button}
 */
var FormElement = function(container, callback){
	
	this.container = container;   //组件放置容器
	
	this.type = this.container.attr('type');     //组件类型
	
	this.width = this.container.width() - 8;    //组件宽度
	
	this.inputWidth = this.container.width() - 6;
	
	this.height = this.container.height() - 8;   //组件高度
	
	this.inputHeight = this.container.height() - 8;
	
	this.flag = this.container.attr('id');
	
	this.name = this.container.attr('name');  
	
	this.callback = callback; 
	
	this.isCheck = false;
	
	this.isDisabled = false;    //为不可编辑状态
	
	this.isLock = false;
	/**
	 * @result 组件初始化函数
	 */
	this.init = function(){
		this.createComp(this.type);
		this.addEventListener();
		
		return this;
	};
	
	/**
	 * @result 组件的创建及渲染对应的样式
	 */
	this.createComp = function(type){
		
		switch(type){
			case 'text':
				this.createText();
				break;
			case 'textArea':
				this.createTextArea();
				break;
			case 'checkBox':
				this.createCheckBox();
				break;
			case 'radio':
				this.createRadio();
				break;
			case 'button':
				this.createButton(this.name);
				break;
			default:
//				alert('未找到匹配组件！');
				break;
			
		}
		
		
	};
	/**
	 * @result 文本框与文本域公用模块
	 */
	this.sameModule = function(){
		var flag = this.flag;
		var divs = '<div class="topLeft" id="topLeft_'+flag+'"></div>';
		divs += '<div class="topMiddle" id="top_'+flag+'"></div>';
		divs += '<div class="topRight" id="topRight_'+flag+'"></div>';
		
		divs += '<div class="leftMiddle" id="left_'+flag+'"></div>';
		divs += '<div class="rightMiddle" id="right_'+flag+'"></div>';
		
		divs += '<div class="bottomLeft" id="bottomLeft_'+flag+'"></div>';
		divs += '<div class="bottomMiddle" id="bottom_'+flag+'"></div>';
		divs += '<div class="bottomRight" id="bottomRight_'+flag+'"></div>';
		
		this.container.append(divs);
				//调整大小 宽
		$('#top_'+flag).width(this.width);
		$('#bottom_'+flag).width(this.width);
		//调整大小 高
		$('#left_'+flag).height(this.height);
		$('#right_'+flag).height(this.height);
	};
	
	/**
	 * @result 创建文本框
	 */
	this.createText =  function(){
		var flag = this.flag;
		this.sameModule();
		var inputText = '<input type="text" class="inputText" id="input_'+this.flag+'" /> ';
		this.container.append(inputText);
		
		//调整文本框 宽 高
		$('#input_'+flag).width(this.inputWidth);
		$('#input_'+flag).height(this.inputHeight);
		
		document.getElementById('input_'+this.flag).onselectstart = function(){
            return true;
        }
		
	};
	
	/**
	 * @result 创建文本域
	 */	
	this.createTextArea = function(){
		this.sameModule();
		var textArea = '<textarea class="inputText" id="textarea_'+this.flag+'"'+"></textarea>";
		this.container.append(textArea);
		$('#textarea_'+this.flag).addClass('inputText');
		$('#textarea_'+this.flag).css({'border':'none','overflow-y':'auto','width':this.inputWidth,'height':this.inputHeight});
	};
	
	/**
	 * @result 创建多选框
	 */
	this.createCheckBox = function(){
		var html = '<div class="checkBox" id="checkBox_'+this.flag+'" ></div> ';
		this.container.html(html);
		
	};
	
	/**
	 * @result 创建单选框
	 */
	this.createRadio = function(){
		var html = '<div class="radio" id="radio_'+this.flag+'"></div> ';
		this.container.html(html);
	};
	/**
	*@result 创建按钮
	*/
	this.createButton = function(name){
		var html = '<div class="leftBtn" id="leftBtn_'+this.flag+'"></div>';
			if(name.length == 2){
				html += '<div class="middleBtn" id="middleBtn_'+this.flag+'">&nbsp;&nbsp;'+name+'</div>';
			}else{
				html += '<div class="middleBtn" id="middleBtn_'+this.flag+'">&nbsp;'+name+'</div>';
			}
			
			html += '<div class="rightBtn" id="rightBtn_'+this.flag+'"></div>';
		this.container.append(html);
		
		var width = this.container.width() - 10;
		$('#middleBtn_'+this.flag).width(width);
		$('#middleBtn_'+this.flag).css('font-size','13px');
	};
	
	/**
	 * @result 组件添加对应事件
	 */
	this.addEventListener = function(){
		var self = this;
		this.container.mouseover(function(){
			if(self.type == 'button'){
				if(self.isDisabled){
					return;
				}
				$('#leftBtn_'+self.flag).css('background-position','0px -25px');
				$('#middleBtn_'+self.flag).css('background-position','0px -100px');
				$('#rightBtn_'+self.flag).css('background-position','-10px -25px');
			}else if(self.type == 'checkBox'){
				if(!self.isCheck){
					$('#checkBox_'+self.flag).css('background-position','-85px -25px');	
				}
			}else if(self.type == 'radio'){
				if(!self.isCheck){
					$('#radio_'+self.flag).css('background-position','-46px -25px');	
				}
			}else if(self.type == 'text' || self.type == 'textArea'){
				if(self.isDisabled || self.isLock){
					return;
				}
				
				$('#topLeft_'+self.flag).css('background-position','-145px -11px');
				$('#top_'+self.flag).css('background-position','0px -150px');
				$('#topRight_'+self.flag).css('background-position','-150px -11px');
				
				$('#left_'+self.flag).css('background-position','-50px 0px');
				$('#right_'+self.flag).css('background-position','-55px 0px');
				
				$('#bottomLeft_'+self.flag).css('background-position','-145px -16px');
				$('#bottom_'+self.flag).css('background-position','0px -155px');
				$('#bottomRight_'+self.flag).css('background-position','-150px -16px');
			}
			
		});
		
		this.container.mouseout(function(){
			if(self.type == 'button'){
				if(self.isDisabled){
					return;
				}
				$('#leftBtn_'+self.flag).css('background-position','0px 0px');
				$('#middleBtn_'+self.flag).css('background-position','0px -75px');
				$('#rightBtn_'+self.flag).css('background-position','-10px 0px');
			}else if(self.type == 'checkBox'){
				if(!self.isCheck){
					$('#checkBox_'+self.flag).css('background-position','-85px 0px');
				}
			}else if(self.type == 'radio'){
				if(self.isDisabled){
					return;
				}
				if(!self.isCheck){
					$('#radio_'+self.flag).css('background-position','-46px 0px');
				}
			}else if(self.type == 'text' || self.type == 'textArea'){
				if(self.isDisabled || self.isLock){
					return;
				}
				$('#topLeft_'+self.flag).css('background-position','-130px 0px');
				$('#top_'+self.flag).css('background-position','0px -130px');
				$('#topRight_'+self.flag).css('background-position','-135px 0px');
				
				$('#left_'+self.flag).css('background-position','-10px 0px');
				$('#right_'+self.flag).css('background-position','-16px 0px');
				
				$('#bottomLeft_'+self.flag).css('background-position','-130px -5px');
				$('#bottom_'+self.flag).css('background-position','0px -136px');
				$('#bottomRight_'+self.flag).css('background-position','-135px -5px');
			}
			
		});
		
		this.container.mousedown(function(){
			if(self.type == 'button'){
				if(self.isDisabled){
					return;
				}
				$('#leftBtn_'+self.flag).css('background-position','0px -50px');
				$('#middleBtn_'+self.flag).css('background-position','-160px -100px');
				$('#rightBtn_'+self.flag).css('background-position','-10px -50px');
			}
		});
		
		this.container.mouseup(function(){
			if(self.type == 'button'){
				if(self.isDisabled){
					return;
				}
				$('#leftBtn_'+self.flag).css('background-position','0px -25px');
				$('#middleBtn_'+self.flag).css('background-position','0px -100px');
				$('#rightBtn_'+self.flag).css('background-position','-10px -25px');
			}else if(self.type == 'checkBox'){
				if(self.isCheck){
					$('#checkBox_'+self.flag).css('background-position','-85px -25px');
					self.isCheck = false;
				}else{
					$('#checkBox_'+self.flag).css('background-position','-85px -50px');
					self.isCheck = true;
				}
			}else if(self.type == 'radio'){
				if(self.isCheck){
					return;
				}
				if(self.isCheck){
					$('#radio_'+self.flag).css('background-position','-46px -25px');
					self.isCheck = false;
				}else{
					$('#radio_'+self.flag).css('background-position','-46px -50px');
					self.isCheck = true;
				}
			}
		});
		
		this.container.click(function(event){
			if(event.target.napster){
				$(this).trigger('mouseup');
				$(this).trigger('mouseout');
			}
			if(self.callback){
				self.callback(self);
			}
			
			
		});
	};
	/**
	 * @result 触发click事件
	 */
	this.triggerClick = function(){
		this.container.trigger('click');
	}
	
	
	/**
	 * @result 获取组件勾选状态
	 */
	this.getCompStatus = function(){
		return this.isCheck;
	};
	/**
	 * @result 设置组件为勾选状态
	 */	
	this.setCheckNO = function(){
		if(this.isCheck){
			if(this.type == 'checkBox'){
				$('#checkBox_'+this.flag).css('background-position','-85px 0px');
			}else if(this.type == 'radio'){
				$('#radio_'+this.flag).css('background-position','-46px 0px');
			}
			this.isCheck = false;
		}
	}
	/**
	 * @result 设置组件为非勾选状态
	 */
	this.setCheckYES = function(){
		if(!this.isCheck){
			if(this.type == 'checkBox'){
				$('#checkBox_'+this.flag).css('background-position','-85px -50px');
			}else if(this.type == 'radio'){
				$('#radio_'+this.flag).css('background-position','-46px -50px');
			}
			this.isCheck = true;
		}
	}
	/**
	 * @result 获取文本框或域的值
	 */
	this.getTextValue = function(){
		if(this.type == 'text'){
			return $('#input_'+this.flag).val();			
		}else if(this.type == 'textArea'){
			return $('#textarea_'+this.flag).val();
		}
		return '';
	};
	/**
	 * @result 设置文本框或文本域的值
	 */
	this.setTextValue = function(val){
		if(this.type == 'text'){
			 $('#input_'+this.flag).val(val);			
		}else if(this.type == 'textArea'){
			 $('#textarea_'+this.flag).val(val);
		}
	};
	/**
	 * @result 锁定焦点
	 */
	this.focusText = function(){
		if(this.type == 'text'){
			 $('#input_'+this.flag).focus();
		}else if(this.type == 'textArea'){
			 $('#textarea_'+this.flag).focus();
		}
	};
	/**
	 * @result 设置文本或文本域是否可编辑
	 */
	this.disabeldText = function(flag){
		if(this.type == 'text'){
			if(flag){
				$('#topLeft_'+this.flag).css('background-position','-130px -11px');
				$('#top_'+this.flag).css('background-position','0px -140px');
				$('#topRight_'+this.flag).css('background-position','-135px -11px');
				
				$('#left_'+this.flag).css('background-position','-20px 0px');
				$('#right_'+this.flag).css('background-position','-25px 0px');
				
				$('#bottomLeft_'+this.flag).css('background-position','-130px -16px');
				$('#bottom_'+this.flag).css('background-position','0px -146px');
				$('#bottomRight_'+this.flag).css('background-position','-135px -16px');
				
				$('#input_'+this.flag).attr('disabled',true);
				$('#input_'+this.flag).removeClass('inputText').addClass('inputTextDisabled');
				$('#input_'+this.flag).height(18);
				this.isDisabled = true;
			}else{
				$('#topLeft_'+this.flag).css('background-position','-130px 0px');
				$('#top_'+this.flag).css('background-position','0px -130px');
				$('#topRight_'+this.flag).css('background-position','-135px 0px');
				
				$('#left_'+this.flag).css('background-position','-10px 0px');
				$('#right_'+this.flag).css('background-position','-16px 0px');
				
				$('#bottomLeft_'+this.flag).css('background-position','-130px -5px');
				$('#bottom_'+this.flag).css('background-position','0px -136px');
				$('#bottomRight_'+this.flag).css('background-position','-135px -5px');
				
				$('#input_'+this.flag).attr('disabled',false);
				$('#input_'+this.flag).removeClass('inputTextDisabled').addClass('inputText');
				this.isDisabled = false;
			}
		}else if(this.type == 'textArea'){
			if (flag) {
				$('#textarea_'+this.flag).attr('disabled',true);
				this.isDisabled = true;
			}else{
				$('#textarea_'+this.flag).attr('disabled',false);
				this.isDisabled = false;
			}
		}else if(this.type == 'button'){
			if (flag) {
				$('#leftBtn_'+this.flag).css('background-position','-180px 0px');	
				$('#middleBtn_'+this.flag).css('background-position','-170px -75px');
				$('#rightBtn_'+this.flag).css('background-position','-190px 0px');
				this.isDisabled = true;
			}else{
				$('#leftBtn_'+this.flag).css('background-position','0px 0px');	
				$('#middleBtn_'+this.flag).css('background-position','0px -75px');
				$('#rightBtn_'+this.flag).css('background-position','-10px 0px');
				
				this.isDisabled = false;
			}
		}
	};
	/**
	 * @result 获取节点ID
	 */
	this.getDomId = function(){
		return this.flag;
	};
	/**
	 * @result 设置文本框锁定状态样式
	 */	
	this.addLockText = function(){
		$('#topLeft_'+this.flag).css('background-position','-145px -0px');
		$('#top_'+this.flag).css('background-position','0px -163px');
		$('#topRight_'+this.flag).css('background-position','-150px -0px');
		
		$('#left_'+this.flag).css('background-position','-60px 0px');
		$('#right_'+this.flag).css('background-position','-65px 0px');
		
		$('#bottomLeft_'+this.flag).css('background-position','-145px -5px');
		$('#bottom_'+this.flag).css('background-position','0px -168px');
		$('#bottomRight_'+this.flag).css('background-position','-150px -5px');		
		
		$('#input_'+this.flag).addClass('inputTextLock');
		this.isLock = true;
	};
	/**
	 * @result 移除文本框锁定状态样式
	 */	
	this.removeLockText = function(){
		$('#topLeft_'+this.flag).css('background-position','-130px 0px');
		$('#top_'+this.flag).css('background-position','0px -130px');
		$('#topRight_'+this.flag).css('background-position','-135px 0px');
		
		$('#left_'+this.flag).css('background-position','-10px 0px');
		$('#right_'+this.flag).css('background-position','-16px 0px');
		
		$('#bottomLeft_'+this.flag).css('background-position','-130px -5px');
		$('#bottom_'+this.flag).css('background-position','0px -136px');
		$('#bottomRight_'+this.flag).css('background-position','-135px -5px');
		
		$('#input_'+this.flag).removeClass('inputTextLock');
		this.isLock = false;
	};	 	
	
}
