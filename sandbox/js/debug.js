/*  
	@Version 1.0	
	Debugging javascript file to be included at build time when render type is = to debug.
	These functions can be called from Awesomium and values can be returned.
*/

var JsInterface;

(function () {

	var obj = {
		
		isIde: false,
		isFlash: false,	
		logScroll: false,
		hasStyleSheet: false,
		sheet: {},
			
		setIsIde: function () {
		
			obj.isIde = true;
			trace('Rapidity IDE is loaded.');
		
		},
		
		setIsFlash: function () {
		
			obj.isFlash = true;
		
		},	
		
		getRules: function (){
	
			var r, rules = new Array(), i;
									
			try
				{					
							
						r = obj.hasStyleSheet ? obj.sheet.cssRules : undefined;											
						
						if(r){
						
							trace('Rules: ' + r.length + ' in main style sheet.');											
						
							for(i = 0; i < r.length; i++){
									
								rules.push({selector : r[i].selectorText, ruleIndex : i});			
										
							}																					
							
						}							
								
					return rules;
					
				}
			catch(err)
				{		
					trace(err.message);
					return false;
				}
	
		},		
				
		setRuleCSS: function (index, text, append) {
			
			// Set css text for style.
		
			var r = obj.sheet.cssRules[index];	
			
			if(r) {
			
				if(append) {
					r.style.cssText += ';' + text;
				}else {
					r.style.cssText = text;
				}
				
			
			}						
		
			trace(text);
		
		},
		
		setScrollLogging:  function (e) {
	
			obj.logScroll = e;
	
			if(e) {
				trace("Scroll logging ON.");
			}else{
				trace("Scroll logging OFF.");
			}
			
		},
		
		setTitle: function(text) {
		
			document.title = text;
		
		},
		
		setInnerText: function(id, text) {
		
			var el = $(id), key;
			
			if(!_undefined(el)){
				
				key = ('innerText' in el)? 'innerText' : 'textContent';
				el[key] = text;				
				trace(id + ' innerText changed to ' + text + '.');
				
			}else{
				trace('Id not found: ' + id);
			}
		
		},	

		setInnerHTML: function(id, html) {
		
			var el = $(id);
			
			if(!_undefined(el)){
				
				el.innerHTML = html;				
				trace(id + ' innerHTML changed to ' + html + '.');
				
			}else{
				trace('Id not found: ' + id);
			}
		
		},
		
		setAttribute: function(id, attr, value) {
		
			setProperty(id, attr, value);
		
		},
 		
		test: function() {
		
			alert('JsInterface is live.');
		
		},
	
		appendElement: function(html, parentId, refId) {

			// Create a temp element to host the new html.
			var div = document.createElement('div');
			div.innerHTML = html;    

			// Get the node to append to.
			var targetNode = $(parentId);
			
			if(targetNode == undefined) {	
				trace('Target node with the id of <' + parentId + '> could not be found.');
				trace('Refresh the page to see new elements.');
				JsCallbacks.refreshNeeded();		
				return;
			}
			
			try
			  {
				var newNode = div.childNodes[0];
				if(refId == '') {
					targetNode.appendChild(newNode);
					trace('Appended ' + newNode.id + ' to ' + targetNode.id + '.');			
				} else {
					var refNode = $(refId);
					targetNode.insertBefore(newNode, refNode);
					trace('Added ' + newNode.id + ' to ' + targetNode.id + ' before ' + refNode.id + '.');
				}		
			  }
			catch(err)
			  {
				trace('Could not append node. Refresh the page to see new elements.');
				trace(err.message);	 
				JsCallbacks.refreshNeeded();				
			  }
			
		},
	
		moveElement: function(parentId, srcId, targetId) {

			var src = $(srcId);
			var parent = $(parentId);	
			
			if(src == undefined){
				trace('Source node with the id of <' + srcId + '> could not be found.');
				JsCallbacks.refreshNeeded();			
				return;	
			}
			
			if(parent == undefined){
				trace('Source node with the id of <' + parentId + '> could not be found.');
				JsCallbacks.refreshNeeded();		
				return;	
			}
			
			try
			  {
				if(targetId == '') {
					parent.appendChild(src);
					trace('Appended ' + src.id + ' to ' + parent.id + '.');			
				} else {
					var target = $(targetId);	
					if(target != undefined) {
						parent.insertBefore(src, target);
						trace('Moved ' + src.id + ' to ' + parent.id + ' before ' + target.id + '.');			
					}else{
						trace('Could not get target node <' + targetId + '>. Refresh the page to see current layout.');
						JsCallbacks.refreshNeeded();		
					}
				}		
			  }
			catch(err)
			  {
				trace('Could not move node. Refresh the page to see new elements.');
				trace(err.message);
				JsCallbacks.refreshNeeded();		
			  }	
		
	},
		
		removeElement: function(id) {

			var el = $(id);
			
			if(el != undefined){
				el.parentNode.removeChild(el);
				trace(id + ' removed from DOM.');
			}else{
				trace('Id not found: ' + id);
				JsCallbacks.refreshNeeded();		
			}
			
		},	
	
		toggleScroll: function(h, v) {

			var body = $("DEBUG_Body"), y;
	
			trace('toggleScroll: ' + h + ' ' + v);
			
			// Hide if true.
			if(h==true){
			
				document.body.style.overflowX = "hidden";

			}else{
				document.body.style.overflowX = "auto";
				
			}
			
			if(v==true){
			
				document.body.style.overflowY = "hidden";
			
			}else{
			
				document.body.style.overflowY = "auto";
			
			}	

			y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
			window.scrollTo(0,1);
			window.scrollTo(0,-1);
		
		},

		addClass: function(id, className) {
		
			var el = $(id);
			
			if(el != undefined) {

				el.className = el.className + ' ' + className;
				
			}

		},
		
		setClassList: function(id, classString) {
		
			var el = $(id);
			
			if(el != undefined) {

				el.className = classString;
				
			}

		},		
		
		removeClass: function(id, className) {
		
			var el = $(id);
			
			if(el != undefined) {
				
				// https://developer.mozilla.org/en-US/docs/Web/API/Element.classList
				// May not work in all browsers. < IE10
				// el.classList.remove(className);
								
				el.className = el.className.replace(new RegExp('(?:^|\\s)' + className + '(?!\\S)') ,'');		
				
			}
		
		},
		
		toggleClass: function(className, id) {
		
			var elem, newClass;
			
			elem = $(id);
			
			if(_undefined(elem)) {
			
				trace(id + ' not found.');
				return;
				
			}
			
			newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ' ) + ' ';
			
			if (hasClass(elem, className)) {
			
				while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
					newClass = newClass.replace( ' ' + className + ' ' , ' ' );
				}
				
				elem.className = newClass.replace(/^\s+|\s+$/g, '');
				
			} else {
			
				elem.className += ' ' + className;
				
			}					
		
			// trace(elem.className);
		
		},
		
		toggleBackground: function(id) {
		
			obj.toggleClass('debug-background', id)
			// trace('toggleBackground');
		
		},
		
		updateStyles: function(rules) {
			
			var i = 0, r, rs = obj.sheet.cssRules;						
			
			for(i = 0; i < rules.length; i++) {
			
				r = rules[i];				
				rs[r.index].style[r.name] = r.value;
				
			}	
		
		},
				
		appendStyle: function(selector){
				
			var sheet = obj.sheet;	
				
			try
			  {
			  							
					if(sheet.addRule) {
					
						sheet.addRule(selector, ''); // IE
						
					} else if(sheet.insertRule) {
						
						sheet.insertRule(selector, sheet.cssRules.length); // !IE
						
					}
					
					trace('Appended Rule: ' + selector);
					return sheet.cssRules.length - 1;

			  }
			catch(err)
			  {
					return -1;
			  }			
		
		},	
		
		getElementBounds: function(id) {
		
			var el = $(id), r;
			
			if(el) {								
				
				if (el.offsetParent) {
									
					r = el.getBoundingClientRect();					
					JsCallbacks.elementBoundsCallback(r.left, r.top, r.right, r.bottom, el.clientWidth, el.clientHeight);			
					
				}	
					
			}									
		
		}		
		
	};	
		
	function setProperty(id, key, value) {

		var el = $(id), key;
			
		if(el != undefined){
			
			if(key == "readonly") {
				el.readOnly = (value == "readonly") ? true : false;
				value = el.readOnly;
				
			}else if(key == "maxlength") {
				el.maxLength = value;
				
			}else if(key == "contenteditable") {
				el.contentEditable = (value == 'true') ? true : false;				
				value = el.contentEditable;
				
			}else if(key == "draggable") {
				// May need to modify. Does not work in Awesonium but may work in browser.
				el.draggable = (value == 'true') ? true : false;
				value = el.draggable;
				
			}else if(key == "spellcheck") {	
				el.spellcheck = (value == 'true') ? true : false;				
				value = el.spellcheck;
								
			}else if(key == "style") {
				el.style.cssText = value;			
			
			}else {
				el[key] = value;
				
			}
			
			trace(id + "'s " + key + " changed to '" + value + "'.");
				
		}else{
			trace('Id not found: ' + id);
		}
		
	}
	
	function trace(msg) {
	
		if(obj.isIde) {
			console.log(msg);
		}	
	
	}		

	function $(id) {
	
		return document.getElementById(id);
	
	}
	
	function _undefined(o) {
	
		var u = (typeof o === 'undefined')
	
		return u;
		
	}
	
	function hasObject(o) {
		
		if(!_undefined(o)) {return true;}	
		
		return (o != null);
		
	}
	
	function bindEvents() {
		
		var id = '', body = document.getElementsByTagName('body')[0] || '';
			
		window.onresize = function() {
						
			if(JsInterface.logScroll) {
				
				trace(window.innerWidth + ', ' + window.innerHeight);
					
			}
				
		}				
			
		if(body != '') {
			
			body.onclick = function(e) {
				
				JsCallbacks.elementClicked(e.target.id, e.target.tagName);
				
			}

			body.onkeydown = function(e) {			
			
				JsCallbacks.bodyKeyDown(e.keyCode);								
				
				if(e.keyCode == 113 && id != '') {
				
					JsCallbacks.activateElement(id);
					
				}
				
			}
			
			body.onkeyup = function(e) {	
			
				JsCallbacks.bodyKeyUp(e.keyCode);
				
			}		

			document.onmouseover = function(e) {			
				
				id = e.target.id;
				JsCallbacks.bodyMouseOver(e.target.tagName.toLowerCase(), id);
				
			}

			document.onmousemove = function(e) {									
			
				JsCallbacks.bodyMouseMove(e.x, e.y);
				
			}			
			
		}		
				
		// Let IDE know we are loaded.
		if(!_undefined(JsCallbacks)){JsCallbacks.loaded();}
	
	}
	
	function bindInBrowserEvents() {
		
		/*
		
			These events will only get used when not in IDE.
			
		*/
		
		var id = '', body = document.getElementsByTagName('body')[0] || '';
					
			
		if(body != '') {
			
			body.addEventListener("keydown", function(e) {
			
				processKeyDown(e.keyCode);	
			
			}, false);			
			
		}						
	
	}
	
	function processKeyDown(c) {
	
		// Process keys when not in IDE.
		if(!window.RapidityIDE.loaded) {
		
			if(c == 49) {
			
				reloadStyleSheet();
			
			}			
		
		} 
			
	}
	
	function reloadStyleSheet() {
	
		console.log('Reload style sheet.');		
		obj.sheet.href = obj.sheet.oref + "?v=" + Math.random(0,100000);			
	
	}
	
	function addStyle() {
	
		var index = -1;
	
		index = obj.appendStyle(".debug-background");
	
		obj.sheet.cssRules[index].style["backgroundColor"] = 'rgba(0, 0, 255, 0.25)';
		
		// trace(obj.sheet.cssRules[index].style.cssText);
		
	}
	
	function hasClass(elem, className) {
	
		var result = false;
	
		result = new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	
		return result;
		
	}
	
	JsInterface = obj;
	
	if(_undefined(window.RapidityIDE)){
	
		obj.isIde = false;
		obj.sheet = $("DEBUG_STYLESHEET");
		obj.sheet.oref = obj.sheet ? obj.sheet.href : "";
		window.RapidityIDE = {};
		window.RapidityIDE.loaded = false;
		bindInBrowserEvents();
		
	}else{	
	
		obj.isIde = true;
		obj.sheet = $("DEBUG_STYLESHEET");
		// If there are no styles there will be no style sheet. Check that here.
		obj.sheet = (obj.sheet == null) ? null : obj.sheet.sheet;
		obj.hasStyleSheet = (obj.sheet != null);
		window.RapidityIDE.loaded = true;
		window.RapidityIDE.ready(!(_undefined(JsInterface)) && !(JsInterface === null));
		bindEvents();
		addStyle();
		trace('Enviroment: Rapidity IDE');
		
	}		
	
})();


