/*
 * 下拉框（select）模拟 @Napster 
 */


(function ($, undefined) {
  "use strict";

  if(window.okSelect !== undefined) {
    return;
  }

  var KEY, AbstractSelect, SingleSelect, nextUid, $document;

  $document = $(document);
  nextUid = (function() { var counter = 1; return function() { return counter++; };}());


  function clazz(SuperClass, methods) {
      var constructor = function () {};
      constructor.prototype = new SuperClass;
      constructor.prototype.constructor = constructor;
      constructor.prototype.parent = SuperClass.prototype;
      constructor.prototype = $.extend(constructor.prototype, methods);
      return constructor;
  }

  function killEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function killEventImmediately(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function cleanupJQueryElements() {
    var self = this;

    $.each(arguments,function (i, element) {
      self[element].remove();
      self[element] = null;
    });
  }

  function ajax() {

  }

  AbstractSelect = clazz(Object, {

    //抽象绑定
    bind : function(func) {
      var self = this;
      return function() {
        func.apply(self, arguments);
      };
    },

    //抽象初始化
    init : function(opts) {
      var results, search, resultsSelector = ".okselect-results", self = this;
      this.opts = opts = this.prepareOpts(opts);
      this.curSelectNode = null;

      //释放已存在的组件
      if(opts.element.data('okSelect') !== undefined && 
         opts.element.data('okSelect') !== null) {
        opts.element.data('okSelect').destory();
      }


      //创建DOM元素
      this.containerId = 'osid_' + (opts.element.attr('id') || 'autogen' + nextUid());
      this.container = this.createContainer();
      this.selectDom = this.container.find('.select');
      
      this.initContainer();   //初始化select框
      this.resetOptions();    //设置option值
      this.initOptions();     //初始化option面板

      if(!$.isEmptyObject(this.opts.ajax)) {
        this.installAjaxEvent();
      }
      this.opts.element
        .data('okSelect', this)
        .attr('tabindex', '-1')
        .on('click.okSelect',killEvent);
      this.container.data('okSelect', this);
      this.dropdown = this.container.find(".yuezhan-short-select");
      this.dropdown.data("okSelect", this);
      this.dropdown.on("click", killEvent);
      
      this.dropdown.on('click', this.bind(function (event) {
        if( $('div[okSelect]:not(.hidden)')[0] && $('div[okSelect]:not(.hidden)').attr('id') !== this.containerId + '-options') {
          $('div[okSelect]:not(.hidden)').addClass('hidden');
        }
        this.outerDiv.toggleClass('hidden');
      }));

      $document.on('click',this.bind(function() {
        this.outerDiv.addClass('hidden');
      }));

      this.container.on('mousedown','li',function() {
        if(!self.curSelectNode || (self.curSelectNode && $(this).attr('option-value') != self.curSelectNode.attr('option-value')) ) {
          self.renderSelectOption($(this)).outerDiv.addClass('hidden');
          self.curSelectNode = $(this);
        }
      });
    },

    prepareOpts  : function(opts) {
      var element, select, idKey, ajaxUrl, self = this;
      element = opts.element;
      if (element.get(0).tagName.toLowerCase() === "select") {
        this.select = select = opts.element;
      }

      opts = $.extend({},{
        populateResults : function(results, query) {
          var populate, id = this.opts.id, liveRegion = this.liveRegion;
          populate = this.bind(function(results) {
            var i, l, node, innerContainer;
            var aHtml = ['<ul class="option-ul">'];
            if(this.opts.allowNull) {
              aHtml.push('<li><a href="javascript:;">' + (this.opts.placeHolder || '请选择') + '</a></li>');
            }
            for(i = 0, l = results.length; i < l; i++) {
              aHtml.push('<li option-value="' + results[i]['id'] +'"><a href="javascript:;">' + results[i]['text'] + '</a></li>');
            }
            aHtml.push('</ul>');
            if(this.outerDiv) {
              this.outerDiv.html(aHtml.join(''));
            }else{
              this.outerDiv = $(document.createElement('div')).attr({
                'id' : this.containerId + '-options',
                'okSelect': 'yes',
                'class' : 'select-option-pop yuezhan-option hidden'
              }).html(aHtml.join('')).css({
                'width' : this.container.find('.yuezhan-short-select').innerWidth()
              });
            }
          });
          
          populate(results);
        }
      },opts);
      
      return opts;
    },

    destory : function() {
      var element=this.opts.element, okSelect = element.data("okSelect");

      this.close();

      if (element.length && element[0].detachEvent) {
        element.each(function () {
          this.detachEvent("onpropertychange", this._sync);
        });
      }
      if (this.propertyObserver) {
        this.propertyObserver.disconnect();
        this.propertyObserver = null;
      }
      this._sync = null;

      if (okSelect !== undefined) {
        okSelect.container.remove();
        okSelect.liveRegion.remove();
        okSelect.dropdown.remove();
        element
          .removeClass("hidden")
          .removeData("okSelect")
          .off(".okSelect")
          .prop("autofocus", this.autofocus || false);
        if (this.elementTabIndex) {
          element.attr({tabindex: this.elementTabIndex});
        } else {
          element.removeAttr("tabindex");
        }
        element.show();
      }

      cleanupJQueryElements.call(this,
          "container",
          "liveRegion",
          "dropdown",
          "results",
          "search"
      );
    },

    optionToData : function(element) {
      if(element.is('option')) {
        return {
            id:element.prop("value"),
            text:element.text()
            // element: element.get(),
            // css: element.attr("class"),
            // disabled: element.prop("disabled")
        };
      }
    }

  });

  SingleSelect = clazz(AbstractSelect,{

      createContainer : function() {
        var container = $(document.createElement('div')).attr({
            'class': 'form-row-right','okSelectId' : this.containerId
        }).html([
            '<div class="yuezhan-short-select">',
            '<div class="select"></div>',
            '<a href="javascript:;" class="select-btn"></a></div>'
            ].join(''));
        
        return container;
      },

      prepareOpts : function(opts) {
        return this.parent.prepareOpts.apply(this, arguments);
      },

      initContainer : function() {
        this.container.insertBefore($(this.opts.element).addClass('hidden'));
      },

      initOptions : function() {
        this.outerDiv.insertAfter(this.container.find('.yuezhan-short-select'));
      },

      updateResults : function(options) {
        var self = this;
        if(options instanceof Array && 
          options.length) {
          return this.opts.options = options;
        }
        this.opts.options = [];
        
        $('option',$(this.opts.element)).each(function(key, val) {
          self.opts.options.push(self.optionToData($(this)));
        });
      },

      renderSelectOption : function(el) {
        this.selectDom.text(el.text());
        this.opts.element
          .find('option[value='+el.attr('option-value')+']')
          .attr('selected',true).end().triggerHandler('change');

        return this;
      },

      resetOptions : function(options) {
        // debugger;
        var options = options || this.opts.options;
        this.selectDom.text(this.opts.placeHolder || '请选择');
        this.updateResults(options);
        this.opts.populateResults.call(this, this.opts.options);

      },

      installAjaxEvent : function() {
        var ajaxOpts = this.opts.ajax,  defaultAjaxOpts = $.fn.okSelect.ajaxDefaults;
        // if(!ajaxOpts.autoload) return;
        if(ajaxOpts.url == undefined || ajaxOpts.url === '') {
          throw 'url 不能为空！';
          return;
        }
        $.ajax(ajaxOpts.url, {
          'type' : ajaxOpts.type || defaultAjaxOpts.type,
          'data' : ajaxOpts.data || null,
          'dataType' : ajaxOpts.dataType || defaultAjaxOpts.dataType
        }).done(this.bind(function(data) {
          if(typeof(ajaxOpts.callback) === 'function') {
            this.opts.ajax.callback.call(null, data, this);
          }else {
            throw 'callback 需是一个方法！';
          }
        }));
      }

  });

  $.fn.okSelect = function() {

      var args = Array.prototype.slice.call(arguments,0),
          opts,
          okSelect,
          method, value, multiple,
          allowedMethods = ['val',  'destory',  'opened', 'close',  'focus',  'isFocused',  'container',  'dropdown', 'onSortStart',  'onSortEnd',  'enable', 'disabled', 'readonly', 'positionDropdown', 'data', 'search'],
          valueMethods = ['opened', 'isFocused',  'container',  'dropdown'],
          propertyMethods = ['val', 'data'],
          methodsMap = { search : 'externalSearch'};

      this.each(function() {
        
        if(args.length === 0 ||　typeof(args[0]) === 'object') {
          opts = args.length === 0 ? {} : $.extend({}, args[0]);
          opts.element = $(this);

          okSelect = new window.okSelect['class'].single();
          okSelect.init(opts);
        } else if (typeof(args[0]) === "string") {
          //调用公共方法

        } else {
            throw "未知参数: " + args;
        }
      });

      return (value === undefined) ? this : value;
  }

  $.fn.okSelect.ajaxDefaults = {
      type: 'GET',
      cache: false,
      dataType: 'json'
  };


  // exports
  window.okSelect = {
      "class": {
          "abstract": AbstractSelect,
          "single": SingleSelect
      }
  };

}(jQuery));




