$(function() {

	// Scroll Effect ------------------------------------------------
	// Usage: <foo data[scrollEffectPrefix]="[class added when outside screen]" (data[scrollEffectPrefix]-repeat="['true'|'false'|max count]" data[scrollEffectPrefix]-offset="[offset in px]")></foo>
	var scrollEffectPrefix = "-se";
	$(window).on('scroll', function(){
		$('[data' + scrollEffectPrefix + ']').each(function() {
			var obj = $(this),
				scrollClass = obj.attr('data' + scrollEffectPrefix),
				scrollRepeat = obj.attr('data' + scrollEffectPrefix + '-repeat'),
				scrollOffset = parseInt(obj.attr('data' + scrollEffectPrefix + '-offset')),
				scrollCount = parseInt(obj.attr('data' + scrollEffectPrefix + '-count')),
				thisTop = obj.offset().top,
				thisOuterHeight = obj.outerHeight(),
				windowScrollTop = $(window).scrollTop(),
				windowInnerHeight = $(window).innerHeight(),
				scrollInfiniteRepeat = false;

			scrollCount = isNaN(scrollCount) ? 0 : scrollCount;
			scrollOffset = isNaN(scrollOffset) ? 0 : scrollOffset;

			if (scrollRepeat === 'true') {
				scrollInfiniteRepeat = true;
			} else {
				scrollRepeat = isNaN(parseInt(scrollRepeat)) ? 1 : parseInt(scrollRepeat);
			}

			// if ( has the class AND window bottom >= top of object + offset AND window top <= bottom of object - offset )
			if (obj.hasClass(scrollClass) && (windowScrollTop + windowInnerHeight) >= (thisTop + scrollOffset) && windowScrollTop <= (thisTop + thisOuterHeight - scrollOffset)) {
				obj.removeClass(scrollClass);
			}

			// if ( first scroll OR ( ( infinite OR less that max ) AND ( has not the class AND ouside the frame ) ) )
			if ((!obj.hasClass(scrollClass) && scrollCount == 0) || ((scrollInfiniteRepeat || scrollCount < scrollRepeat) && (!obj.hasClass(scrollClass) && ((windowScrollTop + windowInnerHeight) < thisTop || windowScrollTop > (thisTop + thisOuterHeight))))) {
				obj.addClass(scrollClass).attr('data' + scrollEffectPrefix + '-count', ++scrollCount);
			}
		});
	}).scroll().scroll(); // Trigger first and second scrolls to animate objects already on screen on document ready

	// Scroll animation ---------------------------------------------
	jQuery.extend( jQuery.easing,{ // Extract from jQuery Easing v1.3
		easeInOutQuint: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	});

	$("a[href^='#']").click(function(e){
		e.preventDefault();
		var anchor = this.hash;
		if(anchor === ""){ return false; }
		// Add exceptions here
		$('html,body').stop().animate({'scrollTop':Math.ceil($(anchor).offset().top)},1000,'easeInOutQuint',function(){anchor=="#top"?window.location.hash='':window.location.hash=anchor;});
	});

	// Form ajax submit ---------------------------------------------
	$('#form').on('submit', function(event) {
		event.preventDefault();
		$('#form').append("<div class='ans-frame'><div class='ans-bloc'><div class='ans-inner'><svg><use xlink:href='/assets/img/layout/symbol-defs.svg#icon-refresh' /></svg></div></div></div>").find(".ans-frame").fadeIn('fast');
		$.ajax({
			url     : 'php/send-form.php',
			type    : 'POST',
			data    : $('form').serializeArray(),
			success : function(data) {
				var ans;
				switch(data){
					case "error_name"	:	ans = "Votre nom est incorrect"; break;
					case "error_email"	:	ans = "Votre adresse mail est vide ou incorrect"; break;
					case "error_bot"	:	ans = "Erreur bot"; break;
					case "error_msg"	:	ans = "Veuillez renseigner votre message"; break;
					case "error_send"	:	ans = "Erreur lors de l'envoi. Veuillez réessayer"; break;
					case "ok"			:	ans = "Message envoyé. <br>Vous en recevrez une copie."; $("#form")[0].reset(); break;
					default 			:	ans = "Oups !"; break;
				}
				$('#form .ans-inner').html(ans);
			},
			error   : function(data) {
				$('#form .ans-inner').html("Ajax fail: "+data);
			}
		});
		setTimeout(function(){ $("#form .ans-frame").fadeOut('fast',function(){ $(this).remove(); }); },5000);
	});

	// Konami code --------------------------------------------------
	function konami(fn) {
		var input = "";
		var pattern = "3838404037393739666513";
		$(document).keydown(function(e) {
			//console.log(e.keyCode);
			if(pattern.indexOf(e.keyCode) !== -1){
				input += e.keyCode;
				if(input.indexOf(pattern) !== -1){
					fn();
					input = "";
				}
			}else{
				input = "";
			}
		});
	}
	konami(function() {
		$('head').append("<link rel='stylesheet' href='assets/css/konami.css?160719'>");
		$('body').attr("contenteditable", "true");
	});

	// Oh! ----------------------------------------------------------
	console.log("            MMMMMM                              MMMMMM\n            MMMMMM                              MMMMMM\n            MMMMMM                              MMMMMM\nMMMMMM            MMMMMM                  MMMMMM            MMMMMM\nMMMMMM            MMMMMM                  MMMMMM            MMMMMM\nMMMMMM            MMMMMM                  MMMMMM            MMMMMM\nMMMMMM      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      MMMMMM\nMMMMMM      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      MMMMMM\nMMMMMM      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      MMMMMM\nMMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n            MMMMMM                              MMMMMM\n            MMMMMM                              MMMMMM\n            MMMMMM                              MMMMMM\n      MMMMMM                  MMMMMM                  MMMMMM\n      MMMMMM                  MMMMMM                  MMMMMM\n      MMMMMM                  MMMMMM                  MMMMMM\n                        MMMMMM\n                        MMMMMM\n                        MMMMMM\n                              MMMMMM\n                              MMMMMM\n                              MMMMMM\n                                    MMMMMM\n                                    MMMMMM\n                                    MMMMMM\n                              MMMMMM\n                              MMMMMM\n                              MMMMMM");

});
