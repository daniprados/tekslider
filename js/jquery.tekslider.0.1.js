// TekSlider by comunicatek.com  under the mit license.
// Author:  Dani Prados
// http://code.comunicatek.com
(function($) {
    
  //
  // private function 
  //


    var sliderm = function(container){
        var startx,offset;
        var a=0;
        var message = $("div.message");
        var timer;
        var t;
        var lastx,$last;
        var $container,accel;
        var o = $.fn.TekSlider.opts;
        
        if(container.jquery){
            $container = container;
        } else {
            debug(container.id);
            $container = $(container);
        }
        
        function on(ev){
            var e = ev.originalEvent;
            ev.preventDefault();
            startx = e.targetTouches[0].clientX;
            if(accel){
				accel.stop();
			}
            t=0;
            timer = window.setInterval(temps,50);
            offset = parseInt($container.css("left")); 
            $container.bind("touchmove", move );
        }
        
        function move(ev){
                var e = ev;
                ev.preventDefault();
                var desp = offset+e.clientX-startx;
                a = e.clientX-startx;
            //  debug("<div> start "+startx+"  desp "+desp+" x:"+e.targetTouches[0].clientX+" offset"+offset+"</div>");
                if(desp >0 ) { desp = 0; }
                if(desp<-lastx) { desp = -lastx; }
                $container.css("left",desp);
        }
        
        function off(e){
            var factor;
            var accel,desp;
            offset = parseInt($container.css("left")); 
            window.clearInterval(timer);
			
			desp = a;
			
            if(t>0 && o.animation){
                vel = desp/(t);
				debug(" Desp : "+desp+" T: "+t)
                //$container.stop().animate({left:desp},800);
				accel = accelerator($container,vel);
            }
            $container.unbind("touchmove",move);
            debug("<div>"+desp+" "+offset+" "+a+" time:"+t+" accel:"+accel+"</div>");
        }
        
        function temps(){
            t = t + 0.050;
        }
        
        $container.bind("touchstart",on)
                    .bind("touchend",off);
        
        
        lastx = getlastx($container);
        $(window).load(function(){
                lastx= getlastx($container);
        });
        //alert(1);
        
    };
    
    var slider = function(container){
        var startx,offset;
        var a=0;
        var message = $("div.message");
        var timer;
        var t;
        var lastx,$last;
        var $container,accel;
        var o = $.fn.TekSlider.opts;
        
        if(container.jquery){
            $container = container;
        } else {
            $container = $(container);
        }
        
        function on(ev){
            var e = ev;
            ev.preventDefault();
            startx = e.clientX;
            if(accel){
				accel.stop();
			}
            t=0;
            timer = window.setInterval(temps,50);
            offset = parseInt($container.css("left")); 
            $container.bind("mousemove", move );
        }
        
        function move(ev){
                var e = ev;
                ev.preventDefault();
                var desp = offset+e.clientX-startx;
                a = e.clientX-startx;
            //  debug("<div> start "+startx+"  desp "+desp+" x:"+e.targetTouches[0].clientX+" offset"+offset+"</div>");
                if(desp >0 ) { desp = 0; }
                if(desp<-lastx) { desp = -lastx; }
                $container.css("left",desp);
        }
        
        function off(e){
            var factor;
            var desp;
			desp = a;
            offset = parseInt($container.css("left")); 
            window.clearInterval(timer);

            if(t>0 && o.animation){
                vel = desp/(t);
				debug(" Desp : "+desp+" T: "+t)
                //$container.stop().animate({left:desp},800);
				accel = accelerator($container,vel);
            }
            $container.unbind("mousemove",move);
        }
        
        function temps(){
            t = t + 0.050;
        }
		
        
        $container.bind("mousedown",on)
                    .bind("mouseup",off);
        
        lastx = getlastx($container);
        $(window).load(function(){
           lastx= getlastx($container);
        });
    };
	
	accelerator = function(container,vel){
		var t=0, accel=7,vel2,timer,offset,dir;  // accel pixel/s
		var maxvel=80,threshold = 5;
		
		debug(" Start acceleration -----");
		
		function move(){
			temp = t*15/100;
			vel2 = vel- accel * temp;
			t = t + 1;
			if(vel2 < 0){
				stop();	
			} else {	
				desp = offset + (vel*temp - accel*temp*temp/2)*dir;
				debug(" offset: "+offset+" desp :"+desp+" vel: "+vel+" ("+vel2+") temp "+temp);
				$container.css("left",desp);
			}
		}
		
		function stop(){
			window.clearInterval(timer);
			debug(" ------------------------------------------------------------- ");
		}
	
		if(container.jquery){
			$container = container;
		} else {
			$container = $(container);
		}
		
		if(vel<0){
			dir=-1;
			vel = -1 * vel;
		}else{
			dir = 1;
		}
		vel = vel<maxvel ? vel : maxvel;
		
		if(vel >threshold){
			offset = parseInt($container.css("left"));
			timer = window.setInterval(move,15);
		}
		
		return { stop : stop };

	}
	

    function debug(msg) {
        if (window.console && window.console.log){
            window.console.log('tekslider : '+msg);
        }
    }
    
    function getlastx($container){
        $last = $container.children("div").last();
        lastx = $last.position().left; //+$last.outerWidth()
        return lastx;
    }
          
  //
  // plugin definition
  //
    $.fn.TekSlider = function(options) {
        debug(this);
        // build main options before element iteration
        var o = $.fn.TekSlider.opts = $.extend({}, $.fn.TekSlider.defaults, options);
        return this.each(
                        function(i,d){
                            if(o.touch){ 
                                sliderm(d); 
                            } else {
                                slider(d); 
                            }
                        });
     };
 
  //
  // plugin defaults
  //
  $.fn.TekSlider.defaults = {
     animation : false,
     touch : true
  };
  
//
// end of closure
//
})(jQuery);