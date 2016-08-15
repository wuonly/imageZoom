/**
 * @author Michael Ma
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

		$('img[' + config.imageSelector + ']').each(function() {

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
	function zoomImage(src) {
		zoomimg.attr("src", src);
		overlayDiv.toggle();
	}
};
