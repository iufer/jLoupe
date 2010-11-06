/*
 jQuery Loupe v1.3
 Copyright (C) 2010 Chris Iufer (chris@iufer.com)

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>

*/

jQuery.fn.jloupe = function(o){
	var version = '1.3';
	var options = {		
		width:200,
		height:200,
		margin:6,
		cursorOffsetX:10,
		cursorOffsetY:10,
		radiusLT:0,
		radiusLB:100,
		radiusRT:100,
		radiusRB:100,
		color: '#999999',
		image: false,
		repeat: false
	};
	
	if(o) jQuery.extend(options, o);
		
	var loupe = $('<div />').addClass('thejloupe')
		.css('position','absolute')
		.css('width',options.width +'px')
		.css('height',options.height +'px')
		.hide()
		.appendTo('body');
		
	if(options.color) loupe.css('backgroundColor', options.color)
	
	
	if(options.repeat) loupe.css('backgroundRepeat', 'repeat');	
	else loupe.css('backgroundRepeat', 'no-repeat');	
			
	var view = $('<div />').addClass('thejloupeview')
		.css('width',options.width-options.margin*2 +'px')
		.css('height',options.height-options.margin*2 +'px')
		.css('backgroundRepeat','no-repeat')
		.css('marginLeft', options.margin +'px')
		.css('marginTop', options.margin +'px')
		.appendTo(loupe);

	if($.support.cssProperty('borderRadius')){
		if(options.image) loupe.css('backgroundImage', 'url('+ options.image +')');
		
		$(view)
			.css('border-top-left-radius', options.radiusLT)
			.css('border-bottom-left-radius', options.radiusLB)
			.css('border-bottom-right-radius', options.radiusRB)
			.css('border-top-right-radius', options.radiusRT)
			.css('-moz-border-radius-topleft', options.radiusLT)
			.css('-moz-border-radius-bottomright', options.radiusRB)
			.css('-moz-border-radius-bottomleft', options.radiusLB)
			.css('-moz-border-radius-topright', options.radiusRT);
		if(!options.image || options.repeat) {
			$(loupe)
				.css('border-top-left-radius', options.radiusLT)
				.css('border-bottom-left-radius', options.radiusLB)
				.css('border-bottom-right-radius', options.radiusRB)
				.css('border-top-right-radius', options.radiusRT)
				.css('-moz-border-radius-topleft', options.radiusLT)
				.css('-moz-border-radius-bottomright', options.radiusRB)
				.css('-moz-border-radius-bottomleft', options.radiusLB)
				.css('-moz-border-radius-topright', options.radiusRT);
		}
	}		
		
	$(this).each(function(){
		var h = $(this).parent('a').attr('href');
		var s = $(this).attr('src');
		s = (h) ? h : s;
		var i = $('<img />').attr('src', s);	
		$(this).data('zoom',i);		
	})
	.bind('mousemove', function(e){ 
		var o = $(this).offset();
		var i = $(this).data('zoom');
		var posx = 0, posy = 0;
		if(e.pageX || e.pageY){
			posx = e.pageX;
			posy = e.pageY;
		}
		else if(e.clientX || e.clientY){
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		$(loupe).offset({top:posy+options.cursorOffsetY, left:posx+options.cursorOffsetX});
		
		zlo = (((posx - o.left) / this.width) * $(i).attr('width') *-1) + (options.width/2.5);
		zto = (((posy - o.top) / this.height) * $(i).attr('height') *-1) + (options.height/2.5);

		$(view).css('backgroundImage', 'url('+ $(i).attr('src') +')').css('backgroundPosition', zlo+'px ' + zto+'px');
	})
	.bind('mouseleave', function(){
		$(loupe).stop(true, true).fadeOut(100);
	})
	.bind('mouseenter', function(){
		$(loupe).stop(true, true).fadeIn();
	});
	
	return this;
};
	

$.support.cssProperty = (function() {
  function cssProperty(p, rp) {
    var b = document.body || document.documentElement;
    var s = b.style;
    if(typeof s == 'undefined') { return false; }
    if(typeof s[p] == 'string') { return rp ? p : true; }
    var v = ['Moz', 'Webkit', 'Khtml', 'O', 'Ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);
    for(var i=0; i<v.length; i++) {if(typeof s[v[i] + p] == 'string') { return rp ? (v[i] + p) : true; }}
  }
  return cssProperty;
})();


$(function(){ $('.jLoupe, .jloupe').jloupe(); });