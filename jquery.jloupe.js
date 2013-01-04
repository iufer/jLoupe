/*
 jQuery Loupe v1.3.4
 https://github.com/iufer/jLoupe
*/

(function($) { 

$.fn.jloupe = function(o){
	var version = '1.3.4', loupe, view,
	 	options = {		
			width:200,
			height:200,
			margin:6,
			cursorOffsetX:10,
			cursorOffsetY:10,
			radiusLT:0,
			radiusLB:100,
			radiusRT:100,
			radiusRB:100,
			borderColor:'#999',
			backgroundColor:'#ddd',
			image: false,
			repeat: false,
			fade: true,
			fadeIn: 200,
			fadeOut: 100,
	};

	if(o) {
		$.extend(options, o);
		if(o.hasOwnProperty('color')) {
			options.borderColor = options.backgroundColor = o.color;
		}
	}
	
	loupe = $('<div />').addClass('thejloupe')
		.css({
			position: 'absolute',
			width: options.width +'px',
			height: options.height +'px',
			backgroundColor: options.borderColor
		})
		.hide()
		.appendTo('body');

	if(!options.borderColor) {
		loupe.css('backgroundColor', 'none')
	}
	if(options.repeat) {
		loupe.css('backgroundRepeat', 'repeat'); 
	}
	else {
		loupe.css('backgroundRepeat', 'no-repeat');	
	}
			
	view = $('<div />').addClass('thejloupeview')
		.css({
			width: options.width-options.margin*2 +'px',
			height: options.height-options.margin*2 +'px',
			backgroundRepeat: 'no-repeat',
			marginLeft: options.margin +'px',
			marginTop: options.margin +'px'
		})
		.appendTo(loupe);

	if(options.backgroundColor) {view.css('backgroundColor', options.backgroundColor);}

	if(options.image) {loupe.css('backgroundImage', 'url('+ options.image +')');}
	
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

	function move_jLoupe(e) {

		var w, h, zlo, zto,
			o = $(this).offset(),
		    i = $(this).data('zoom'),
		    posx = 0, 
		    posy = 0;

		if(e.pageX || e.pageY){
			posx = e.pageX;
			posy = e.pageY;
		}
		else if(e.clientX || e.clientY){
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		$(loupe).offset({top:posy+options.cursorOffsetY, left:posx+options.cursorOffsetX});
		w = $(i).prop ? $(i).prop('width') : $(i).attr('width');
		h = $(i).prop ? $(i).prop('height') : $(i).attr('height');
		zlo = (((posx - o.left) / this.width) * w *-1) + (options.width/2.5);
		zto = (((posy - o.top) / this.height) * h *-1) + (options.height/2.5);
		$(view).css('backgroundImage', 'url('+ $(i).attr('src') +')').css('backgroundPosition', zlo+'px ' + zto+'px');
	}

	function start_jLoupe() {
		$(loupe).stop(true, true);
		if(options.fade) { $(loupe).fadeOut(options.fadeOut); }
		else { $(loupe).hide(); }
	}

	function stop_jLoupe() {
		$(loupe).stop(true, true);
		if(options.fade) {$(loupe).fadeIn(options.fadeIn);}
		else {$(loupe).show();}
	}
		
	$(this).each(function(){
		var dataOriginal = $(this).data("original"),
		    parentHref = $(this).parent('a').attr('href'),
		    src = $(this).attr('src'),
		    imageSource = dataOriginal || parentHref || src,
		    imageElement = $('<img />').attr('src', imageSource);

		$(this).data('zoom', imageElement);
	})
	.on('mousemove', move_jLoupe)
	.on('mouseleave', start_jLoupe)
	.on('mouseenter', stop_jLoupe);
	
	return this;
};


$(function(){ $('.jLoupe, .jloupe').jloupe(); });

})(jQuery);