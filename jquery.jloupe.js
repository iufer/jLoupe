/*
 jQuery Loupe v1.1
 Copyright (C) 2008 Chris Iufer (chris@iufer.com)

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
	
	var loupe = {'width' : 200, 'height': 151};
	
	$('<div id="thejLoupe"/>').addClass('thejLoupe').css('position','absolute').css('width',loupe.width+'px').css('height',loupe.height+'px').css('backgroundColor','rgba(0,0,0,0.25)').hide().appendTo('body');	
	$('<div id="zoomWrapper" />').css('width',loupe.width-10+'px').css('height',loupe.height-10+'px').css('overflow','hidden').css('marginTop','5px').css('marginLeft','5px').appendTo('#thejLoupe');

	$('.jLoupe').each(function(){
		var s = ($(this).attr('longdesc') != undefined) ? $(this).attr('longdesc') : $(this).attr('src');
		var i = $('<img />').bind('load',function(){
				$(this).data('size',{'width':this.width, 'height':this.height});
			}).attr('src', s).hide().appendTo('#zoomWrapper');	
		$(this).data('zoom',i);		
	})
	.bind('mousemove', function(e){ 
		var o = $(this).offset();
		var i = $(this).data('zoom');
		$('#thejLoupe').css('left',e.pageX+10).css('top',e.pageY+10);
		var zlo = ((e.pageX - o.left) / this.width) * $(i).data('size').width - (loupe.width/2) - 14;
		var zto = ((e.pageY - o.top) / this.height) * $(i).data('size').height - (loupe.height/2) - 14;
		$(i).css('marginLeft', zlo * -1 + 'px').css('marginTop', zto * -1 + 'px').show();
	})
	.bind('mouseout', function(e){
		$(this).data('zoom').hide();
		$('#thejLoupe').hide();
	})
	.bind('mouseover', function(e){
		$(this).data('zoom').show();
		$('#thejLoupe').show();
	});
	
	
});
