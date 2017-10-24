(function() {

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

	// Load script ----------------------------------------------------------------------
	function loadScript(url, callback) {
		var script = document.createElement('script'),
			loaded = false;

		script.setAttribute('src', url);
		script.onreadystatechange = script.onload = function () {
			if (!loaded && callback) {
				callback();
				loaded = true;
			}
		};

		document.head.appendChild(script);
	}

	// Lazyloading ----------------------------------------------------------------------
	function initLazyLoad() {
		loadScript(
			'https://cdn.rawgit.com/verlok/lazyload/master/dist/lazyload.min.js',
			function () {
				var lazy = new LazyLoad();
			}
		);
	}

	document.addEventListener('DOMContentLoaded', initLazyLoad);

	// Scroll animation -----------------------------------------------------------------
	function initSmoothScroll() {
		loadScript(
			'https://cdn.rawgit.com/cferdinandi/smooth-scroll/master/dist/js/smooth-scroll.min.js',
			function(){
				var scroll = new SmoothScroll("a[href^='#']:not([role='button'])",{
					speed: 1000,
					easing: 'easeInOutQuint'
				});
			}
		);
	}

	document.addEventListener('DOMContentLoaded', initSmoothScroll);

	// Form ajax submit -----------------------------------------------------------------
	$('#form').on('submit', function(event) {
		event.preventDefault();
		$('#form').append("<div class='ans-frame'><div class='ans-bloc'><div class='ans-inner'><svg><use xlink:href='assets/img/layout/symbol-defs.svg#icon-refresh' /></svg></div></div></div>").find(".ans-frame").fadeIn('fast');
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
	function konami(callback) {
		var keys = [];
		var konami = '38,38,40,40,37,39,37,39,66,65';

		document.addEventListener('keydown', function(e) {
			keys.push(e.keyCode);
			if (keys.toString().indexOf(konami) >= 0) {
				keys = [];
				callback && callback();
			}
		});
	}
	konami(function() {
		var stylesheet = document.createElement('link');
    	stylesheet.setAttribute('rel', 'stylesheet');
    	stylesheet.setAttribute('href', 'assets/css/konami.css?160803');
		document.head.appendChild(stylesheet);
		document.body.setAttribute("contenteditable", "true");
	});

	// Oh! ------------------------------------------------------------------------------
	console.log("            MMMMMM                              MMMMMM\n            MMMMMM                              MMMMMM\n            MMMMMM                              MMMMMM\nMMMMMM            MMMMMM                  MMMMMM            MMMMMM\nMMMMMM            MMMMMM                  MMMMMM            MMMMMM\nMMMMMM            MMMMMM                  MMMMMM            MMMMMM\nMMMMMM      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      MMMMMM\nMMMMMM      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      MMMMMM\nMMMMMM      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      MMMMMM\nMMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM      MMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n            MMMMMM                              MMMMMM\n            MMMMMM                              MMMMMM\n            MMMMMM                              MMMMMM\n      MMMMMM                  MMMMMM                  MMMMMM\n      MMMMMM                  MMMMMM                  MMMMMM\n      MMMMMM                  MMMMMM                  MMMMMM\n                        MMMMMM\n                        MMMMMM\n                        MMMMMM\n                              MMMMMM\n                              MMMMMM\n                              MMMMMM\n                                    MMMMMM\n                                    MMMMMM\n                                    MMMMMM\n                              MMMMMM\n                              MMMMMM\n                              MMMMMM");

})();
