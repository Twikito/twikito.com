// scrollReveal.js v0.1.2 (c) 2014 Julian Lloyd | MIT license
!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t(require,exports,module):e.scrollReveal=t()}(this,function(){return window.scrollReveal=function(e){"use strict";function t(t){o=this,o.data={},o.elems=[],o.serial=1,o.config=o.extend(o.defaults,t),o.docElem=e.document.documentElement,(!o.checkMobile()||o.config.mobile)&&1==o.config.run&&o.run()}var i,r,o;return t.prototype={defaults:{after:"0s",enter:"top",move:"0",over:"0.5s",easing:"ease-out",opacity:0,mobile:!1,viewportFactor:.33,reset:!1,run:!0},run:function(){var t;o.elems=Array.prototype.slice.call(o.docElem.querySelectorAll("[data-scroll-reveal]")),o.elems.forEach(function(i,n){n++,t=i.getAttribute("data-sr-id"),t||(t=o.serial++,o.data[n]={},o.data[n].id=t,i.setAttribute("data-sr-id",t)),o.data[n].style||(o.data[n].style=i.getAttribute("style"),o.data[n].style?o.data[n].style+=";":o.data[n].style=""),e.addEventListener("scroll",r,!1),e.addEventListener("resize",r,!1)}),o.eventBlocked=!1,o.animate(o.elems)},animate:function(e){e.forEach(function(e){var t,i;if(t=e.getAttribute("data-sr-id")){if(i=o.data[t],i.css||(i.css=o.createStyles(e,i)),e.getAttribute("data-sr-initialized")||(e.setAttribute("style",i.style+i.css.initial),e.setAttribute("data-sr-initialized",!0)),!o.isElementInViewport(e,o.config.viewportFactor))return void(i.reset&&e.setAttribute("style",i.style+i.css.initial+i.css.reset));if(e.getAttribute("data-sr-complete"))return;if(o.isElementInViewport(e,o.config.viewportFactor))return e.setAttribute("style",i.style+i.css.target+i.css.transition),void(i.reset||setTimeout(function(){""!==i.style?e.setAttribute("style",i.style):e.removeAttribute("style"),e.setAttribute("data-sr-complete",!0)},i.css.totalDuration))}}),o.eventBlocked=!1},parse:function(e){var t=e.getAttribute("data-scroll-reveal").split(/[, ]+/),i={};return t=o.filter(t),t.forEach(function(e,r){switch(e){case"enter":return void(i.enter=t[r+1]);case"after":return void(i.after=t[r+1]);case"wait":return void(i.after=t[r+1]);case"move":return void(i.move=t[r+1]);case"ease":return i.move=t[r+1],void(i.ease="ease");case"ease-in":return i.move=t[r+1],void(i.easing="ease-in");case"ease-in-out":return i.move=t[r+1],void(i.easing="ease-in-out");case"ease-out":return i.move=t[r+1],void(i.easing="ease-out");case"over":return void(i.over=t[r+1]);case"reset":return void(i.reset="no"==t[r-1]?!1:!0);default:return}}),"undefined"==typeof i.reset&&(i.reset=o.config.reset),i},createStyles:function(e,t){var i,r,n,a,s,c,l,m,f,u,d,p;return i=o.parse(e),t.reset=i.reset,i.enter?(("top"==i.enter||"bottom"==i.enter)&&(r=i.enter,n="y"),("left"==i.enter||"right"==i.enter)&&(r=i.enter,n="x")):(("top"==o.config.enter||"bottom"==o.config.enter)&&(r=o.config.enter,n="y"),("left"==o.config.enter||"right"==o.config.enter)&&(r=o.config.enter,n="x")),("top"==r||"left"==r)&&(i.move=i.move?"-"+i.move:"-"+o.config.move),a=i.move||o.config.move,s=i.over||o.config.over,c=i.after||o.config.after,l=i.easing||o.config.easing,m=i.opacity||o.config.opacity,f="-webkit-transition: -webkit-transform "+s+" "+l+" "+c+",  opacity "+s+" "+l+" "+c+";transition: transform "+s+" "+l+" "+c+", opacity "+s+" "+l+" "+c+";-webkit-perspective: 1000;-webkit-backface-visibility: hidden;",u="-webkit-transition: -webkit-transform "+s+" "+l+" 0s,  opacity "+s+" "+l+" "+c+";transition: transform "+s+" "+l+" 0s,  opacity "+s+" "+l+" "+c+";-webkit-perspective: 1000;-webkit-backface-visibility: hidden;",d="-webkit-transform: translate"+n+"("+a+");transform: translate"+n+"("+a+");opacity: "+m+";",p="-webkit-transform: translate"+n+"(0);transform: translate"+n+"(0);opacity: 1;",{transition:f,initial:d,target:p,reset:u,totalDuration:1e3*(parseFloat(s)+parseFloat(c))}},filter:function(e){var t=[],i=[];return i=["a","and","but","from","the","then","with"],e.forEach(function(e){i.indexOf(e)>-1||t.push(e)}),t},getViewportH:function(){var t=o.docElem.clientHeight,i=e.innerHeight;return i>t?i:t},getOffset:function(e){var t=0,i=0;do isNaN(e.offsetTop)||(t+=e.offsetTop),isNaN(e.offsetLeft)||(i+=e.offsetLeft);while(e=e.offsetParent);return{top:t,left:i}},isElementInViewport:function(t,i){var r=e.pageYOffset,n=t.offsetHeight,a=o.getOffset(t).top,s=a+n,c=r+o.getViewportH(),i=i||0;return c>=a+n*i&&s>=r||"fixed"==(t.currentStyle?t.currentStyle:e.getComputedStyle(t,null)).position},checkMobile:function(){var t=!1;return function(e){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0)}(navigator.userAgent||navigator.vendor||e.opera),t},extend:function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return e}},i=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||function(t){e.setTimeout(t,1e3/60)}}(),r=function(){o.eventBlocked||(o.eventBlocked=!0,i(function(){o.animate(o.elems)}))},t}(window),scrollReveal});

// Main
$(function() {

	window.scrollReveal = new scrollReveal({
		easing: 'ease-out',
		mobile: false
	});

	// Extract from jQuery Easing v1.3
	jQuery.extend( jQuery.easing,{
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
					case "error_name"	:	ans = "Votre nom est incorrect !"; break;
					case "error_email"	:	ans = "Votre adresse mail est vide ou incorrect !"; break;
					case "error_bot"	:	ans = "Erreur bot !"; break;
					case "error_msg"	:	ans = "Veuillez renseigner votre message !"; break;
					case "error_send"	:	ans = "Erreur lors de l'envoi. Veuillez réessayer !"; break;
					case "ok"			:	ans = "Message envoyé !"; $("#form")[0].reset(); break;
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

	// Konami code
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
	$(document).ready(function() {
		konami(function() {
			$('head').append("<link rel='stylesheet' href='assets/css/konami.css?160719'>");
			$('body').attr("contenteditable", "true");
		});
	});

});
