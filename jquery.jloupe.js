/*
 jQuery Loupe v1.2
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

$(function(){
	var jLoupe = {
		loupe: {'width':200, 'height':200},
		margin: {x:6, y:6},
		cursorOffset: {x:10, y:10},
		bgColor: '#999999'
	};
	
	jLoupe.radius = jLoupe.loupe.width/2;
	
	$('<div id="thejLoupe" />')
		.css('position','absolute')
		.css('width',jLoupe.loupe.width+'px')
		.css('height',jLoupe.loupe.height+'px')
		.css('backgroundColor', jLoupe.bgColor)		
		.hide()
		.appendTo('body');
	
	$('<div id="zoomWrapper" />')
		.css('width',jLoupe.loupe.width-jLoupe.margin.x*2+'px')
		.css('height',jLoupe.loupe.height-jLoupe.margin.y*2+'px')
		.css('backgroundRepeat','no-repeat')
		.css('marginLeft', jLoupe.margin.x+'px')
		.css('marginTop', jLoupe.margin.y+'px')
		.appendTo('#thejLoupe');

	if($.support.cssProperty('borderRadius')){
		$('#thejLoupe, #zoomWrapper')
			.css('border-bottom-left-radius', jLoupe.radius)
			.css('border-bottom-right-radius', jLoupe.radius)
			.css('border-top-right-radius', jLoupe.radius)
			.css('-moz-border-radius-bottomright', jLoupe.radius)
			.css('-moz-border-radius-bottomleft', jLoupe.radius)
			.css('-moz-border-radius-topright', jLoupe.radius);
	}


	$('.jLoupe').each(function(){
		var h = $(this).parent('a').attr('href');
		var s = $(this).attr('src');
		s = (h) ? h : s;
		var i = $('<img />').attr('src', s);	
		$(this).data('zoom',i);		
	})
	.bind('mousemove', function(e){ 
		var o = $(this).offset();
		var i = $(this).data('zoom');
		$('#zoomWrapper').css('backgroundImage', 'url('+ $(i).attr('src') +')');
					
		if(e.pageX || e.pageY){
			posx = e.pageX;
			posy = e.pageY;
		}
		else if(e.clientX || e.clientY){
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		$('#thejLoupe').offset({top:posy+jLoupe.cursorOffset.y, left:posx+jLoupe.cursorOffset.x});
		
		zlo = (((posx - o.left) / this.width) * $(i).attr('width') *-1) + (jLoupe.loupe.width/2.5);
		zto = (((posy - o.top) / this.height) * $(i).attr('height') *-1) + (jLoupe.loupe.height/2.5);

		$('#zoomWrapper').css('backgroundPosition', zlo+'px ' + zto+'px');
	})
	.bind('mouseout', function(){
		$(this).data('zoom').hide();
		$('#thejLoupe').hide();
	})
	.bind('mouseover', function(){
		$(this).data('zoom').show();
		$('#thejLoupe').show();
	});
	
});	

$.support.cssProperty = (function() {
  function cssProperty(p, rp) {
    var b = document.body || document.documentElement,
    s = b.style;

    // No css support detected
    if(typeof s == 'undefined') { return false; }

    // Tests for standard prop
    if(typeof s[p] == 'string') { return rp ? p : true; }

    // Tests for vendor specific prop
    v = ['Moz', 'Webkit', 'Khtml', 'O', 'Ms'],
    p = p.charAt(0).toUpperCase() + p.substr(1);
    for(var i=0; i<v.length; i++) {
      if(typeof s[v[i] + p] == 'string') { return rp ? (v[i] + p) : true; }
    }
  }

  return cssProperty;
})();