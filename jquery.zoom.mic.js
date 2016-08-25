/**
 * @author Michael
 * @mail wuonly@gmail.com
 */
'use strict';

var miczoom, mz;
var mzDefaultConfig = {
	overlay : 'zoomoverlay',
	imageSelector : 'zoom-image="true"',
	zoomImgclass : 'mcZoomImage',
	overlayClass : 'mcZoomOverlay'
};

miczoom = mz = function() {
	var config = JSON.parse(JSON.stringify(mzDefaultConfig));
	var overlayDiv = null;
	var zoomimg = null;
	if (arguments[0] != undefined)
		config.overlay = arguments[0];
	if (arguments[1] != undefined)
		config.imageSelector = arguments[1];

	init();
	function init() {
		if ($("#" + config.overlay).length > 0) {
			overlayDiv = $("#" + config.overlay);
			zoomimg = $("#mczoomimg");
		} else {
			$("body").append(
					'<div id="' + config.overlay + '" class="'
							+ config.overlayClass + '"><i ></i>'
							+ '<img id="mczoomimg" class="'
							+ config.zoomImgclass + '" src="" />' + '</div>');
			overlayDiv = $("#" + config.overlay);
			zoomimg = $("#mczoomimg");
		}
		$('img[' + config.imageSelector + ']').each(function(index,element) {

			var objEvt = $._data($(this)[0], "events");
			if (objEvt && objEvt["click"]) {
			} else {
				$(this).click(function() {
					zoomImage($(this).attr("src"));
				});
			}
		});

		var objEvt = $._data(zoomimg[0], "events");
		if (objEvt && objEvt["click"]) {

		} else {
			zoomimg.click(function() {
				zoomimg.attr("src", "");
			});
		}

		var objEvt2 = $._data(overlayDiv[0], "events");

		if (objEvt2 && objEvt2["click"]) {

		} else {
			overlayDiv.click(function() {
				overlayDiv.toggle();
			});
		}
	}
	
	var startx = 0;
	var movedx = 0;
	zoomimg.on(
			'touchstart',
			function(ev) {
				console.log("touchstart start");
				startx = 0;
				movedx = 0;
				$(this).css("position","relative");
			});
	zoomimg.on('touchmove', function(event) {
		console.log("touchstart moved");
		if (startx == 0)
			startx = event.originalEvent.changedTouches[0].clientX;
		movedx = event.originalEvent.changedTouches[0].clientX - startx;
	
		$(this).css("left",movedx);
	});
	zoomimg.on('touchend', function(ev) {
		var index=$('img[' + config.imageSelector + ']').index($('img[src="'+zoomimg.attr("src")+'"]'));
		var size=$('img[' + config.imageSelector + ']').size();
		console.log("touchstart end"+size);
		if (movedx >= 50&&index-1>=0) {
			zoomimg.fadeOut("normal","swing",function(){
				zoomimg.attr("src",$('img[' + config.imageSelector + ']').eq(index-1).attr("src"));
				zoomimg.css("left","");
				zoomimg.fadeIn("normal")
			})
		}
		if (movedx <= -50 && index+1<=size) {
			zoomimg.fadeOut("normal","swing",function(){
				zoomimg.css("left","");
				zoomimg.attr("src",$('img[' + config.imageSelector + ']').eq(index+1).attr("src"));
				zoomimg.fadeIn("normal")
			})
		}
		zoomimg.css("left","");
		startx = 0;
		movedx = 0;
	});
	
	
	function zoomImage(src) {
		zoomimg.attr("src", src);
		overlayDiv.toggle();
	}
};
