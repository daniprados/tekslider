// TekMenu by comunicatek.com  under the mit license.
// Author:  Dani Prados  http://code.comunicatek.com
(function($) {
  //
  // plugin definition
  //
	$.fn.TekMenu = function(options) {
		// build main options before element iteration
		var o = $.fn.TekMenu.opts = $.extend({}, $.fn.TekMenu.defaults, options);
		if(o.direction === 'vertical'){
			$.fn.TekMenu.mostra = $.fn.TekMenu.mostrav;
		} else {
			$.fn.TekMenu.mostra = $.fn.TekMenu.mostrah;
		}
		return this.hover($.fn.TekMenu.mostra ,$.fn.TekMenu.oculta);
	 };

	 $.fn.TekMenu.mostrav = function(){
		var menu = $(this).attr("rel");
		var o = $.fn.TekMenu.opts;
		//$(menu).stop(false,true);
		clearTimeout($(menu).data("idtimeout"));
		var position = $(this).position();
		var height = $(this).outerHeight();
		var x = position.left;
		var y = position.top+height+1;
		$(menu).css({left:x,top:y}).slideDown("slow");
		$(menu).data("toca",true);
		$(menu).unbind('mouseenter mouseleave');
		$(menu).hover(function(){ 
				$(this).data("toca",false); 
				clearTimeout($(menu).data("idtimeout"));
				//$(this).stop(false,true).slideDown();
			},
			function(){ 
				$(this).data("toca",true); 
				var id = setTimeout("$.fn.TekMenu.oculta2('"+menu+"')",o.timeout);
				$(this).data("idtimeout",id);
			});
	};
	
	 $.fn.TekMenu.mostrah = function(){
		var menu = $(this).attr("rel");
		var o = $.fn.TekMenu.opts;
		//$(menu).stop(false,true);
		clearTimeout($(menu).data("idtimeout"));
		var position = $(this).position();
		var width = $(this).outerWidth();
		var x = position.left+width+1;
		var y = position.top;
		$(menu).css({left:x,top:y}).fadeIn("slow");
		$(menu).data("toca",true);
		$(menu).unbind('mouseenter mouseleave');
		$(menu).hover(function(){ 
				$(this).data("toca",false); 
				clearTimeout($(menu).data("idtimeout"));
				//$(this).stop(false,true).slideDown();
			},
			function(){ 
				$(this).data("toca",true); 
				var id = setTimeout("$.fn.TekMenu.oculta2('"+menu+"')",o.timeout);
				$(this).data("idtimeout",id);
			});
	};


	 $.fn.TekMenu.oculta = function(){
		var o = $.fn.TekMenu.opts;
		var menu = $(this).attr("rel");
		//var toca =	$(menu).data("toca");
		var id = setTimeout("$.fn.TekMenu.oculta2('"+menu+"')",o.timeout);
		$(menu).data("idtimeout",id);
	};

	 $.fn.TekMenu.oculta2 = function(menu){
		//var o = $.fn.TekMenu.opts;
		var toca =	$(menu).data("toca");
		if(toca){
			$(menu).hide();
		}
	};

  //
  // plugin defaults
  //
  $.fn.TekMenu.defaults = {
    timeout: 250,
    direction: 'vertical'
  };
//
// end of closure
//
})(jQuery);