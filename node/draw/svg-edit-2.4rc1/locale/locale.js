/*
 * Localizing script for SVG-edit UI
 *
 * Licensed under the Apache License, Version 2
 *
 * Copyright(c) 2009 Narendra Sisodya
 *
 */
var put_locale = function(svgCanvas, given_param){
	var lang_param;
	var good_langs = ['cs','de','en','es','fr','nl','ro','sk'];
	if(given_param) {
		lang_param = given_param;
	} else {
		lang_param = $.pref('lang');
		if(!lang_param) {
			if (navigator.userLanguage) // Explorer
				lang_param = navigator.userLanguage;
			else if (navigator.language) // FF, Opera, ...
				lang_param = navigator.language;
			if (lang_param == "")
				return;
		}
		lang_param = String(lang_param);
		
		// Set to English if language is not in list of good langs
		if($.inArray(lang_param, good_langs) == -1) {
			lang_param = "en";
		}
		
		// don't bother on first run if language is English		
		if(lang_param.indexOf("en") == 0) return;
	}
	
	var url = "locale/lang." + lang_param + ".js";
	$.get(url, function(data){
		var LangData = eval(data), js_strings;
		$.each(LangData, function(i, data) {
			if(data.id) {
				var elem = $('#'+data.id)[0];
				if(elem) {
					if(data.title) 
						elem.title = data.title;
					if(data.textContent) {
						// Only replace text nodes, not elements
						$.each(elem.childNodes, function(j, node) {
							if(node.nodeType == 3) {
								node.textContent = data.textContent;
							}
						});
					}
				}
			} else if(data.js_strings) {
				js_strings = data.js_strings;
			}
		});
		svgCanvas.setLang(lang_param, js_strings);
	},"json");
};

//used to notify scriptloader that this script has finished loading
//if(typeof eventManager != 'undefined'){
	//eventManager.fire('scriptLoaded', 'vle/node/draw/svg-edit-2.4rc1/locale/locale.js');
//};