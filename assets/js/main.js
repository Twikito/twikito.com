$(function() {

	// Scroll Effect --------------------------------------------------------------------
	// Usage: <foo data-(scrollEffectPrefix)="(class added when outside screen)" [ data-(scrollEffectPrefix)-repeat="('true'|'false'|max count)" data-(scrollEffectPrefix)-offset="(offset in px)" ]></foo>
	var scrollEffectPrefix = "se";
	var nodeTab = [].slice.call(document.body.querySelectorAll('[data-' + scrollEffectPrefix + ']'));

	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this,
				args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	function getConfig(node) {
		return {
			className: node.dataset[scrollEffectPrefix],
			repeat: node.dataset[scrollEffectPrefix + 'Repeat'],
			offset: +node.dataset[scrollEffectPrefix + 'Offset'],
			count: +node.dataset[scrollEffectPrefix + 'Count']
		};
	}

	function scrollEffect() {
		var windowScrollTop = window.scrollY,
			windowInnerHeight = window.innerHeight;

		nodeTab.forEach(function(node) {
			var config = getConfig(node),
				scrollClass = config.className,
				scrollRepeat = config.repeat,
				scrollOffset = config.offset,
				scrollCount = config.count,
				thisRect = node.getBoundingClientRect(),
				thisTop = thisRect.top,
				thisBottom = thisRect.bottom,
				scrollInfiniteRepeat = false;

			scrollCount = isNaN(scrollCount) ? 0 : scrollCount;
			scrollOffset = isNaN(scrollOffset) ? 0 : scrollOffset;

			if (scrollRepeat === 'true') {
				scrollInfiniteRepeat = true;
			} else {
				scrollRepeat = isNaN(+scrollRepeat) ? 1 : +scrollRepeat;
			}

			// if ( has the class AND viewport bottom >= top of object + offset AND viewport top <= bottom of object - offset )
			if (node.classList.contains(scrollClass) && (thisTop + scrollOffset) <= windowInnerHeight && (thisBottom - scrollOffset) >= 0 ) {
				node.classList.remove(scrollClass);
			}

			// if ( first scroll OR ( ( infinite OR less that max ) AND ( has not the class AND ouside of viewport ) ) )
			if ((!node.classList.contains(scrollClass) && scrollCount === 0) || ((scrollInfiniteRepeat || scrollCount < scrollRepeat) && (!node.classList.contains(scrollClass) && (thisTop > windowInnerHeight || thisBottom < 0)))) {
				node.classList.add(scrollClass);
				node.setAttribute('data-' + scrollEffectPrefix + '-count', ++scrollCount);
			}
		});
	}

	// Trigger first and second scrolls to animate objects already on screen on document ready
	scrollEffect();
	scrollEffect();

	window.addEventListener('scroll', debounce(scrollEffect, 10), true);

	// Scroll animation -----------------------------------------------------------------
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

	// Form ajax submit -----------------------------------------------------------------
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

	// Konami code ----------------------------------------------------------------------
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

	// Oh! ------------------------------------------------------------------------------
	console.log("            MMMMMM                              MMMMMM\n            MMMMMM                              MMMMMM\n            MMMMMM                              MMMMMM\nMMMMMM            MMMMMM                  MMMMMM            MMMMMM\nMMMMMM            MMMMMM                  MMMMMM            MMMMMM\nMMMMMM            MMMMMM                  MMMMMM            MMMMMM\nMMMMMM      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      MMMMMM\nMMMMMM      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      MMMMMM\nMMMMMM      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      MMMMMM\nMMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n            MMMMMM                              MMMMMM\n            MMMMMM                              MMMMMM\n            MMMMMM                              MMMMMM\n      MMMMMM                  MMMMMM                  MMMMMM\n      MMMMMM                  MMMMMM                  MMMMMM\n      MMMMMM                  MMMMMM                  MMMMMM\n                        MMMMMM\n                        MMMMMM\n                        MMMMMM\n                              MMMMMM\n                              MMMMMM\n                              MMMMMM\n                                    MMMMMM\n                                    MMMMMM\n                                    MMMMMM\n                              MMMMMM\n                              MMMMMM\n                              MMMMMM");

});
