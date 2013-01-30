// TekSlider by comunicatek.com  under the mit license.
// Author:  Dani Prados
// http://code.comunicatek.com
// versio no operativa

/*jslint devel: true, browser: true, unparam: true, sloppy: true, white: true, maxerr: 50, indent: 4 */
(function ($) {
    'use strict';   
    var message = $("body"), accelerator, slider;
  
	function debug(m) {
		if ($.fn.TekSlider.opts.touch) {
			message.append(m + "<br />");
		} else {
			if (window.console && window.console.log) {
				window.console.log('tekslider : ' + m);
			}
		}
	}
    
	function getlastx($container) {
		var lastx, $last;
        $last = $container.children("div").last();
        lastx = $last.position().left; //+$last.outerWidth()
        return lastx;
	}

	accelerator = function (options) {
		var t = 0, vel, vel2, timer, offset, dir, lastx, $container,  
			opts = {
				accel : 190,
				maxvel : 250,
				threshold : 10,
				stopthreshold : 3,
				timer : 15
			},
			o = $.extend({}, opts, options);

		
		debug(" Start acceleration ");
		
		function config(options) {
			o = $.extend({}, opts, options);
		}

		function stop() {
			window.clearInterval(timer);
			//return this;
		}		

		function move() {
			var temp, desp;
			
			temp = t * o.timer / 1000;
			vel2 = vel - o.accel * temp;
			t = t + 1;
			if (vel2 < o.stopthreshold) {
				stop();	
			} else {	
				desp = offset + (vel * temp - o.accel * temp * temp / 2) * dir;
				//debug(" offset: "+offset+" desp :"+desp+" vel: "+vel+" ("+vel2+") temp "+temp);
				if (desp > 0) { desp = 0;  stop(); }
                if (desp < -lastx) { desp = -lastx; stop(); }
				$container.css("left", desp);
			}
		}
		
		function start(container, vel_ini, last) {
			t = 0;	
			lastx = last;
			if (container.jquery) {
				$container = container;
			} else {
				$container = $(container);
			}
			
			if (vel_ini < 0) {
				dir = -1;
				vel = -1 * vel_ini;
			} else {
				dir = 1;
				vel = vel_ini;
			}
			vel = vel < o.maxvel ? vel : o.maxvel;
			
			if (vel > o.threshold) {
				offset = parseInt($container.css("left"), 10);
				timer = window.setInterval(move, o.timer);
			}
			
			//return this;
		}
		return { stop : stop, start : start, config : config };
	};
    
    slider = function (container, type) {
        var startx, offset, starty, offsety,
			a = 0, t, lastx, $container, accel, 
			o = $.fn.TekSlider.opts,
			starttime, stoptime,
			events = {
				mouse : { on : "mousedown", off : "mouseup", move : "mousemove", out : "mouseout"},
				touch : { on : "touchstart", off : "touchend", move : "touchmove"}
			},
			containerWidth;			
        
        if (container.jquery) {
            $container = container;
        } else {
            $container = $(container);
        }

        function move(ev) {
			var e = ev.originalEvent, x, timer, desp, y, despy;
			stoptime = $.now();
			timer = (stoptime - starttime) / 1000;
			ev.preventDefault();
			x = ev.clientX || e.targetTouches[0].clientX;
			y = ev.clientY || e.targetTouches[0].clientY;
			desp = offset + x - startx;
			despy = offsety + starty - y;
			a = x - startx;
			if (desp > 0) { desp = 0; }
			if (desp < -(lastx)) { desp = -(lastx); }
			$container.css("left", desp);
			//$('body').animate({scrollTop: despy});
			debug(despy +  " y " + y + " ofsset " + offsety  + " starty " + starty);
			
			$('body').trigger(e.type, e);
        }
		
		function off() {
			var vel, desp;
				
			desp = a;
            offset = parseInt($container.css("left"), 10); 
			stoptime = $.now();
			t = (stoptime - starttime) / 1000;
			debug(" Desp : " + desp + " T: " + t);
            if (t > 0.10 && o.animation) {
                vel = desp / (t);
				if (Math.abs(desp) > 20) {
					debug("accel");
					accel.start($container, vel, lastx);
				}
            }
            $container.unbind(events[type].move, move);
			if (events[type].out) { $container.unbind(events[type].out, off); }
        }				
        
        function on(ev) {
            var e = ev.originalEvent;
			startx = ev.clientX || e.targetTouches[0].clientX;
			starty = ev.clientY || e.targetTouches[0].clientY;
			a = 0;
			accel.stop();
            t = 0;
			starttime = $.now();
            offset = parseInt($container.css("left"), 10); 
			offsety = parseInt($container.offset().top, 10); 
            $container.bind(events[type].move, move);
			if (events[type].out) { $container.bind(events[type].out, off); }
        }
		
        accel = accelerator(o.accelerator);
        $container.bind(events[type].on, on)
                    .bind(events[type].off, off);
        
        lastx = getlastx($container);
		containerWidth = $container.parent().outerWidth();
        $(window).load(function () {
			lastx = getlastx($container);
			containerWidth = $container.parent().outerWidth();
			if (containerWidth > lastx) { containerWidth = 0; }
        });
    };
          
    $.fn.TekSlider = function (options) {
        // build main options before element iteration
        var o = $.fn.TekSlider.opts = $.extend({}, $.fn.TekSlider.defaults, options);
        debug("mobile " + o.touch);
		return this.each(
                        function (i, d) {
                            if (o.touch) { 
                                slider(d, "touch"); 
                            } else {
                                slider(d, "mouse"); 
                            }
                        });
    };
	 
	$.fn.TekSlider.config = function (options) {
		$.fn.TekSlider.opts = $.extend({}, $.fn.TekSlider.defaults, options);
	};
 
  //
  // plugin defaults
  //
	$.fn.TekSlider.defaults = {
		animation : false,
		touch : true,
		accelerator : {}
	};
  
}(jQuery));