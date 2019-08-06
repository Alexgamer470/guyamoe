// alg_lib.0.3

/* Array Augmentation. Sorry! */
Array.prototype.clear = function() {
	this.splice(0, this.length);
	return this;
}
Array.prototype.next = function(anchor) {
var index;
	if(typeof anchor === 'number' && anchor > -1 && anchor < this.length)
		index = anchor;
	else
		index = this.indexOf(anchor);
	if(index > -1 && index+1 < this.length)
		return this[index+1];
	else
		return null;
}
Array.prototype.prev = function(anchor) {
var index;
	if(typeof anchor === 'number' && anchor > -1 && anchor < this.length)
		index = anchor;
	else
		index = this.indexOf(anchor);
	if(index-1 > -1)
		return this[index-1];
	else
		return null;
}
Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

DOMTokenList.prototype.cycle = function(array) {
var classesArray = Array.prototype.slice.call(this);
	for(var i=0; i<array.length; i++) {
	var index = classesArray.indexOf(array[i]);
	var classIndex = i;  
		if(index > -1) {
			break;
		}
	}
	if(index > -1) {
		this.remove(classesArray[index]);
	var classToAdd = (i >= array.length - 1)?array[0]:array[i+1];
		this.add(classToAdd);
		return classToAdd;
	}
};





/* ------------------------------------------------- */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
		if("document"in self&&!("classList"in document.createElement("_"))){(function(e){"use strict";if(!("Element"in e))return;var t="classList",n="prototype",r=e.Element[n],i=Object,s=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},o=Array[n].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++){if(t in this&&this[t]===e){return t}}return-1},u=function(e,t){this.name=e;this.code=DOMException[e];this.message=t},a=function(e,t){if(t===""){throw new u("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(t)){throw new u("INVALID_CHARACTER_ERR","String contains an invalid character")}return o.call(e,t)},f=function(e){var t=s.call(e.getAttribute("class")||""),n=t?t.split(/\s+/):[],r=0,i=n.length;for(;r<i;r++){this.push(n[r])}this._updateClassName=function(){e.setAttribute("class",this.toString())}},l=f[n]=[],c=function(){return new f(this)};u[n]=Error[n];l.item=function(e){return this[e]||null};l.contains=function(e){e+="";return a(this,e)!==-1};l.add=function(){var e=arguments,t=0,n=e.length,r,i=false;do{r=e[t]+"";if(a(this,r)===-1){this.push(r);i=true}}while(++t<n);if(i){this._updateClassName()}};l.remove=function(){var e=arguments,t=0,n=e.length,r,i=false;do{r=e[t]+"";var s=a(this,r);if(s!==-1){this.splice(s,1);i=true}}while(++t<n);if(i){this._updateClassName()}};l.toggle=function(e,t){e+="";var n=this.contains(e),r=n?t!==true&&"remove":t!==false&&"add";if(r){this[r](e)}return!n};l.toString=function(){return this.join(" ")};if(i.defineProperty){var h={get:c,enumerable:true,configurable:true};try{i.defineProperty(r,t,h)}catch(p){if(p.number===-2146823252){h.enumerable=false;i.defineProperty(r,t,h)}}}else if(i[n].__defineGetter__){r.__defineGetter__(t,c)}})(self)}
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
		if (!Object.keys) {  Object.keys = (function() {'use strict';var hasOwnProperty = Object.prototype.hasOwnProperty,hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),dontEnums = [  'toString',  'toLocaleString',  'valueOf',  'hasOwnProperty',  'isPrototypeOf',  'propertyIsEnumerable',  'constructor'],dontEnumsLength = dontEnums.length;return function(obj) {  if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {throw new TypeError('Object.keys called on non-object');  }  var result = [], prop, i;  for (prop in obj) {if (hasOwnProperty.call(obj, prop)) {  result.push(prop);}  }  if (hasDontEnumBug) {for (i = 0; i < dontEnumsLength; i++) {  if (hasOwnProperty.call(obj, dontEnums[i])) {result.push(dontEnums[i]);  }}  }  return result;};  }());}
/* ------------------------------------------------------------------------------*/
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
	// If the exp is undefined or zero...
	if (typeof exp === 'undefined' || +exp === 0) {
	  return Math[type](value);
	}
	value = +value;
	exp = +exp;
	// If the value is not a number or the exp is not an integer...
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
	  return NaN;
	}
	// Shift
	value = value.toString().split('e');
	value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
	// Shift back
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
	Math.round10 = function(value, exp) {
	  return decimalAdjust('round', value, exp);
	};
  }
  // Decimal floor
  if (!Math.floor10) {
	Math.floor10 = function(value, exp) {
	  return decimalAdjust('floor', value, exp);
	};
  }
  // Decimal ceil
  if (!Math.ceil10) {
	Math.ceil10 = function(value, exp) {
	  return decimalAdjust('ceil', value, exp);
	};
  }
})();

/* ------------------------ */

(function() {

	Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	Date.longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	Date.shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	Date.longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	// defining patterns
	var replaceChars = {
		// Day
		d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); },
		D: function() { return Date.shortDays[this.getDay()]; },
		j: function() { return this.getDate(); },
		l: function() { return Date.longDays[this.getDay()]; },
		N: function() { return (this.getDay() == 0 ? 7 : this.getDay()); },
		S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); },
		w: function() { return this.getDay(); },
		z: function() { var d = new Date(this.getFullYear(),0,1); return Math.ceil((this - d) / 86400000); }, // Fixed now
		// Week
		W: function() {
			var target = new Date(this.valueOf());
			var dayNr = (this.getDay() + 6) % 7;
			target.setDate(target.getDate() - dayNr + 3);
			var firstThursday = target.valueOf();
			target.setMonth(0, 1);
			if (target.getDay() !== 4) {
				target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
			}
			return 1 + Math.ceil((firstThursday - target) / 604800000);
		},
		// Month
		F: function() { return Date.longMonths[this.getMonth()]; },
		m: function() { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); },
		M: function() { return Date.shortMonths[this.getMonth()]; },
		n: function() { return this.getMonth() + 1; },
		t: function() {
			var year = this.getFullYear(), nextMonth = this.getMonth() + 1;
			if (nextMonth === 12) {
				year = year++;
				nextMonth = 0;
			}
			return new Date(year, nextMonth, 0).getDate();
		},
		// Year
		L: function() { var year = this.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); },   // Fixed now
		o: function() { var d  = new Date(this.valueOf());  d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3); return d.getFullYear();}, //Fixed now
		Y: function() { return this.getFullYear(); },
		y: function() { return ('' + this.getFullYear()).substr(2); },
		// Time
		a: function() { return this.getHours() < 12 ? 'am' : 'pm'; },
		A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; },
		B: function() { return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24); }, // Fixed now
		g: function() { return this.getHours() % 12 || 12; },
		G: function() { return this.getHours(); },
		h: function() { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); },
		H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); },
		i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); },
		s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
		u: function() { var m = this.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ?
	'0' : '')) + m; },
		// Timezone
		e: function() { return /\((.*)\)/.exec(new Date().toString())[1]; },
		I: function() {
			var DST = null;
				for (var i = 0; i < 12; ++i) {
						var d = new Date(this.getFullYear(), i, 1);
						var offset = d.getTimezoneOffset();

						if (DST === null) DST = offset;
						else if (offset < DST) { DST = offset; break; }					 else if (offset > DST) break;
				}
				return (this.getTimezoneOffset() == DST) | 0;
			},
		O: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; },
		P: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00'; }, // Fixed now
		T: function() { return this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); },
		Z: function() { return -this.getTimezoneOffset() * 60; },
		// Full Date/Time
		c: function() { return this.format("Y-m-d\\TH:i:sP"); }, // Fixed now
		r: function() { return this.toString(); },
		U: function() { return this.getTime() / 1000; }
	};

	// Simulates PHP's date function
	Date.prototype.format = function(format) {
		var date = this;
		return format.replace(/(\\?)(.)/g, function(_, esc, chr) {
			return (esc === '' && replaceChars[chr]) ? replaceChars[chr].call(date) : chr;
		});
	};

}).call(this);

/* ------------------------------------------------------------------------------*/
// doT.js
// 2011, Laura Doktorova, https://github.com/olado/doT
// Licensed under the MIT license.
(function() {"use strict";var doT = {version: '1.0.1',templateSettings: {evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate: /\{\{=([\s\S]+?)\}\}/g,encode:  /\{\{!([\s\S]+?)\}\}/g,use: /\{\{#([\s\S]+?)\}\}/g,useParams:   /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:  /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,forin: /\{\{@(@)?\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:'it',strip:true,append:true,selfcontained: false},template: undefined, compile:  undefined  }, global;if (typeof module !== 'undefined' && module.exports) {module.exports = doT;} else if (typeof define === 'function' && define.amd) {define(function(){return doT;});} else {global = (function(){ return this || (0,eval)('this'); }());global.doT = doT;}function encodeHTMLSource() {var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;' },matchHTML = /&(?!#?\w+;)|<|>|"|'|\//g;return function() {return this ? this.replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : this;};}String.prototype.encodeHTML = encodeHTMLSource();var startend = {append: { start: "'+(",  end: ")+'",  endencode: "||'').toString().encodeHTML()+'" },split:  { start: "';out+=(", end: ");out+='", endencode: "||'').toString().encodeHTML();out+='"}}, skip = /$^/;function resolveDefs(c, block, def) {return ((typeof block === 'string') ? block : block.toString()).replace(c.define || skip, function(m, code, assign, value) {if (code.indexOf('def.') === 0) {code = code.substring(4);}if (!(code in def)) {if (assign === ':') {if (c.defineParams) value.replace(c.defineParams, function(m, param, v) {def[code] = {arg: param, text: v};});if (!(code in def)) def[code]= value;} else {new Function("def", "def['"+code+"']=" + value)(def);}}return '';}).replace(c.use || skip, function(m, code) {if (c.useParams) code = code.replace(c.useParams, function(m, s, d, param) {if (def[d] && def[d].arg && param) {var rw = (d+":"+param).replace(/'|\\/g, '_');def.__exp = def.__exp || {};def.__exp[rw] = def[d].text.replace(new RegExp("(^|[^\\w$])" + def[d].arg + "([^\\w$])", "g"), "$1" + param + "$2");return s + "def.__exp['"+rw+"']";}});var v = new Function("def", "return " + code)(def);return v ? resolveDefs(c, v, def) : v;});}function unescape(code) {return code.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, ' ');}doT.template = function(tmpl, c, def) {c = c || doT.templateSettings;var cse = c.append ? startend.append : startend.split, needhtmlencode, sid = 0, indv,str  = (c.use || c.define) ? resolveDefs(c, tmpl, def || {}) : tmpl;str = ("var out='" + (c.strip ? str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g,' ').replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,''): str).replace(/'|\\/g, '\\$&').replace(c.interpolate || skip, function(m, code) {return cse.start + unescape(code) + cse.end;}).replace(c.encode || skip, function(m, code) {needhtmlencode = true;return cse.start + unescape(code) + cse.endencode;}).replace(c.conditional || skip, function(m, elsecase, code) {return elsecase ?(code ? "';}else if(" + unescape(code) + "){out+='" : "';}else{out+='") :(code ? "';if(" + unescape(code) + "){out+='" : "';}out+='");}).replace(c.iterate || skip, function(m, iterate, vname, iname) {if (!iterate) return "';} } out+='";sid+=1; indv=iname || "i"+sid; iterate=unescape(iterate);return "';var arr"+sid+"="+iterate+";if(arr"+sid+"){var "+vname+","+indv+"=-1,l"+sid+"=arr"+sid+".length-1;while("+indv+"<l"+sid+"){"+vname+"=arr"+sid+"["+indv+"+=1];out+='";}).replace(c.forin || skip, function (m, own, iterate, vname, kname) {if (!iterate) return "';} } " + (own ? "} " : "") + "out+='";sid += 1; iterate = unescape(iterate);return "';var obj" + sid + "=" + iterate + ";if(obj" + sid + "){var " + kname + "," + vname + ";for(" + kname + " in obj" + sid + "){"+ (own ? "if(obj" + sid + ".hasOwnProperty(" + kname + ")){ " : "")+ vname + "=obj" + sid + "[" + kname + "];out+='";}).replace(c.evaluate || skip, function(m, code) {return "';" + unescape(code) + "out+='";})+ "';return out;").replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '\\r').replace(/(\s|;|\}|^|\{)out\+='';/g, '$1').replace(/\+''/g, '').replace(/(\s|;|\}|^|\{)out\+=''\+/g,'$1out+=');if (needhtmlencode && c.selfcontained) {str = "String.prototype.encodeHTML=(" + encodeHTMLSource.toString() + "());" + str;}try {return new Function(c.varname, str);} catch (e) {if (typeof console !== 'undefined') console.log("Could not create a template function: " + str);throw e;}};doT.compile = function(tmpl, def) {return doT.template(tmpl, null, def);};}());
/* ------------------------------------------------------------------------------*/
var get = document.getElementById.bind(document);
var crelm = function(name) {
	if(!name) name = 'div';
	return document.createElement.call(document,name);
}
var qs = document.querySelector.bind(document); 
var qsa = document.querySelectorAll.bind(document); 

function utfBtoa(str) {
	return window.btoa(unescape(encodeURIComponent(str)));
}

function utfAtob(str) {
	return decodeURIComponent(escape(window.atob(str)));
}

/* -------------- FOREACH for NodeArrays -------------- */

['forEach', 'map', 'filter', 'reduce', 'reduceRight', 'every', 'some', 'indexOf', 'slice'].forEach(
	function(p) {
	NodeList.prototype[p] = HTMLCollection.prototype[p] = Array.prototype[p];
});

HTMLElement.prototype.reverseChildren = function reverseChildren() {
var elements = this.children.slice();
	for(var i = elements.length-1; i >= 0; i--) {
		this.appendChild(elements[i]);
	}
}

NodeList.prototype.getStructs = HTMLCollection.prototype.getStructs = function getStructs(){
	return this.reduce((keep, item) => item._struct?keep.concat(item._struct):keep, []);
}

/* -------------- -------------------- -------------- */


var alg = {};

alg._deboogs = [];

alg.deboog = function(type){

var elem;
var html = '';
	for(var i=1;i<arguments.length;i++) {
		if(typeof arguments[i] != 'undefined') {
			if(arguments[i].constructor === Object) {
				for(var key in arguments[i]) {
					html += '<div>' + key + ': ' + arguments[i][key] + '</div>';
				}
			}else{
				html += '<div>' + arguments[i].toString() + '</div>';
			}
		}else{
			html += '<div>undefined</div>';
		}
	}
	elem = document.createElement('div');
	elem.innerHTML = html;
	elem.className = type+' deboog-unit';
var dboog = document.getElementById('deboog');
	dboog.insertBefore(elem,dboog.firstElementChild);
	alg._deboogs.push(setTimeout(function(){
	var elm = elem;
		elm.classList.add('fade');
		setTimeout(function(){
			discardElement(elm);
		},600)
	},7000));
var deboogid = alg._deboogs.length-1;
	elem.onmousedown = function(event){
	var dbgid = deboogid;
	var elm = elem;
		if(elm.classList.contains('pin') == false) {
			clearTimeout(alg._deboogs[dbgid]);
			elm.classList.add('pin');
		}else{
			elm.classList.add('fade');
			elm.classList.remove('pin');
			setTimeout(function(){
				discardElement(elm);
			},600)
		}
	}
}

alg.sizeToText = function(fileSizeInBytes) {
	if(isNaN(fileSizeInBytes)) return '<...>'
	if(fileSizeInBytes < 1024) return fileSizeInBytes + ' bytes';
	var i = -1;
	var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
	do {
		fileSizeInBytes = fileSizeInBytes / 1024;
		i++;
	} while (fileSizeInBytes > 1024);

	return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}
	
alg.createBin = function() {
	if (typeof(alg._garbageBin) === 'undefined'){
		alg._garbageBin = document.createElement('div');
		alg._garbageBin.style.display = 'none';
		document.body.appendChild(alg._garbageBin);
	}
}

alg.discardElement = function(element) {
	alg._garbageBin.appendChild(element);
	alg._garbageBin.innerHTML = "";
}

alg.locompare = function(a, b) {
	return a['name'].localeCompare(b['name']);
}

alg.contentSort = function(property, sortOrder, sub) {
	return function (a,b) {
		if(sub){
			a = a[sub];
			b = b[sub];
		}
		if(typeof a[property] == 'string' && typeof b[property] == 'string') {
		var result = a[property].localeCompare(b[property]);
			return result * sortOrder;
		}else{
			if(!isNaN(a[property]) && !isNaN(b[property])) {
			var result = (a[property] > b[property])? 1 : (a[property] == b[property])? 0 : -1 ;
				return result * sortOrder;
			}
		}
	}
}

alg.selectAll = function(element) {
	var text = element, range, selection;	
	if (document.body.createTextRange) {
		range = document.body.createTextRange();
		range.moveToElementText(text);
		range.select();
	} else if (window.getSelection) {
		selection = window.getSelection();		
		range = document.createRange();
		range.selectNodeContents(text);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}

/* ------------------------------------------------------------------------------*/
alg.traverseUp = function(elem,classname,max,exclude){
var i;
	if(typeof max == 'undefined') max = 10;
	exclude === undefined?'lelell':exclude;
	if(typeof elem === 'string') {
		elem = document.getElementById(elem);
	}
	for(i=0;i<max;i++){
		if(elem.classList.contains(exclude) || elem.tagName == 'HTML') return null;
		if(elem.classList.contains(classname)){
			return elem;
		}else{
			try{
				elem = elem.parentNode;
				if(typeof elem === undefined || elem == null) return null;
			}catch(e){
				return null;
			}
		}
	}
	return null;
}

alg.textToElement = function(string) {
var elem = document.createElement('div');
	elem.innerHTML = string;
	elem = elem.firstElementChild;
	return elem;
}


/* ------------------------------------------------------------------------------*/
Object.deepExtend = function(dst, src) {
  for (var prop in src) {
	if (src[prop] && src[prop].constructor && src[prop].constructor === Object) {
	  dst[prop] = dst[prop] || {};
	  arguments.callee(dst[prop], src[prop]);
	} else {
		if(src[prop] == null) {
			delete dst[prop];
		}else{
			dst[prop] = src[prop];
		}
	}
  }
  return dst;
/*  	var key;
	//for(key in src) if(src.hasOwnProperty(key)) dst[key] = src[key];
	for(key in src) if(src.hasOwnProperty(key)){
		if(typeof src[key] === 'object') dst[key] = arguments.callee({}, src[key]);
		else dst[key] = src[key];
	}
	return dst;*/
};
/* ------------------------------------------------------------------------------*/

function Sorter(searchbox,datapairs,template,selected){
	this.searchbox = searchbox;
	this.datapairs = datapairs;
	this.template = template;
	this.selected = selected;
	this.searchbox.oninput = this.sort.bind(this);
	this.searchbox.onkeyup = this.clearHandler.bind(this);
var i;
	for(i=0;i<this.datapairs.length;i++){
		this.datapairs[i].data = CP.dat.sort(this.datapairs[i].data);
		this.datapairs[i].elem = (typeof(this.datapairs[i].elem) == 'string')?$(this.datapairs[i].elem):this.datapairs[i].elem;
	}
}

Sorter.prototype.sort = function(){
var i, j, key;
var outlist = [];
var html = '';
var value = this.searchbox.value.toLowerCase();
	for(i=0;i<this.datapairs.length;i++){
		outlist = [];
		for(j=0;j<this.datapairs[i].data.length;j++){
			if(this.datapairs[i].data[j].name.toLowerCase().indexOf(value) > -1) {
				outlist.push(this.datapairs[i].data[j]);
			}
		}
		html = this.template({data:outlist,selected:this.selected});
		this.datapairs[i].elem.innerHTML = html;
	}
}

Sorter.prototype.clearHandler = function(event){
	if(event.keyCode == 27 && event.target.value.length > 0) {
		this.clear();
		this.sort();
	}
}

Sorter.prototype.clear = function(){
	this.searchbox.value = '';
	this.sort();
}

function Loader(){
var elem = document.createElement('div');
	elem.className = 'loader';
	this.elem = elem;
}

Loader.prototype.destroy = function(){
	discardElement(this.elem);
}

Loader.prototype.responded = function(){
	this.elem.classList.add('loader-back');
var self = this;
	setTimeout(function(){
		self.destroy();
	},1000)
}

Loader.prototype.insert = function(elem,type){
	if(type){
		$(elem).appendChild(this.elem);
	}else{
		$(elem).insertBefore(this.elem,$(elem).firstElementChild);
	}
}

alg.tabSwitch = function(elems,idx,classname,inverted){
		inverted = inverted === undefined?false:inverted;
		for(var i=0;i<elems.length;i++) {
			if(inverted) {
				elems[i].classList.add(classname);
			}else{
				elems[i].classList.remove(classname);
			}
		}
		if(idx == -1) {
			return;
		}else{
			if(inverted){
				if(isNaN(idx)) {
					idx.classList.remove(classname); //consider idx is a node
				}else{
					if(idx > elems.length - 1) return false;
					elems[idx].classList.remove(classname); 
				}
			}else{
				if(isNaN(idx)) {
					idx.classList.add(classname); //consider idx is a node
				}else{
					if(idx > elems.length - 1) return false;
					elems[idx].classList.add(classname); 
				}
			}
		}
}

var ajax = {
	createRequest: function(){
		var request = false;
		if (window.XMLHttpRequest){
			request = new XMLHttpRequest();
		}else
		if (window.ActiveXObject){
			try{
				 request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (CatchException){
				 request = new ActiveXObject("Msxml2.XMLHTTP");
			}
		}
		if (!request) alert("Ошибка соединения. Возможно, сервер не отвечает или соединение с Интернетом прервано.");
		return request;
	},
	send: function(endpoint, args, callbacks){
		var r_method = 'post';
		var r_path = endpoint;
		/*var r_args = '?';
		for (var key in args) {
			r_args += '&'+key+'='+(typeof args[key] == 'object')?JSON.stringify(args[key]):args[key];
		}*/
		var r_args = JSON.stringify(args);
		var Request = ajax.createRequest();
		if (!Request) return;
		

		Request.onreadystatechange = function(){
			if (Request.readyState == 4){
				if (Request.status == 200){
					var parsed;
					if(parsed = isJSON(Request.response))
						var result = parsed;
					else
						result = {
							errno: -1,
							message: Request.response
						}
					if(isList(callbacks)) {
						for(var i=0; i < callbacks.length; i++) {
							callbacks[i](result);
						}
					}else{
						callbacks(result);	
					}
				}
			}
		}
		
		if (r_method.toLowerCase() == "get" && r_args.length > 0) r_path += r_args;
		
		Request.open(r_method, r_path, true);
		
		if (r_method.toLowerCase() == "post"){
			Request.setRequestHeader("Content-Type","application/json; charset=utf-8");
			Request.send(r_args);
			/*alg.deboog('out','rS:', args);
			Request.loader = new Loader();
			Request.loader.insert('loader-cont');*/
		}
		else{
			Request.send(null);
		}
	}
}

/* AJAX 2.0. WITH PROMEEZEZ */

function Request(opts) {
  return new Promise(function (resolve, reject) {
					opts.method = 'POST';
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
	  if (this.status >= 200 && this.status < 300) {
		if(opts.method == 'POST') {
			resolve(JSON.parse(xhr.response));
		} else {
			resolve(xhr.response);
		}
		reject(xhr.response);
	  }else{
		if(xhr.response.indexOf('nginx') > -1)
			reject({code:0});
		else 
			reject(JSON.parse(xhr.response));
	  }
	};
	xhr.onerror = function () {
	  reject(xhr.response);
	};
	xhr.open(opts.method, opts.url);
	if (opts.headers) {
	  Object.keys(opts.headers).forEach(function (key) {
		xhr.setRequestHeader(key, opts.headers[key]);
	  });
	}
	var data = opts.data;
	// We'll need to stringify if we've been given an object
	// If we have a string, this is skipped.
	if(opts.method == 'POST'){
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		xhr.send(JSON.stringify(data));
		return;
	} 
	if (data && typeof data === 'object') {
	  data = Object.keys(data).map(function (key) {
		return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
	  }).join('&');
	}
	xhr.send(data);
  });
}



function inherit(Child, Parent) {
	Child.prototype = Object.create(Parent.prototype);
	Child.prototype.constructor = Parent;
}
function extend(Child, Parent) {
	for(var prop in Parent.prototype) {
		Child.prototype[prop] = Parent.prototype[prop];
	}
	Child.prototype.constructor = Parent;
}
function proto(Child, newProto) {
	for(var prop in newProto) {
		if(newProto.hasOwnProperty(prop)) {
			Child.prototype[prop] = newProto[prop];
		}
	}
}

function inheprot(Child, Parent, newProto) {
	inherit(Child, Parent);
	proto(Child, newProto);
}

function exteprot(Child, Parent, newProto) {
	extend(Child, Parent);
	proto(Child, newProto);
}

function is(what) {
	return !(what === undefined || what === null || what === false);
}
function be(who, what) {
	return is(who)?who:(what)?what:{};
}

function insertAfter(newNode, referenceNode) {
    return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function isList(what) {
	return (what instanceof Array || what instanceof NodeList || what instanceof HTMLCollection);
}

function isJSON(str) {
	try {
	var parsed = JSON.parse(str);
	} catch (e) {
		return false;
	}
	return parsed;
}

var Path = {
	join(base, item) {
		return base + '/' + item;
	},
	extname(str) {
		if(!is(str)) return '';
		if(str.indexOf('.') > 0)
			return str.split('.').pop().toLowerCase();
		else
			return '';
	},
	basename(path) {
		return path.split('/').pop();
	},
	dirname(path) {
		path = path.split('/');
		path.pop();
		return path.join("/");
	}
}

function getCaret(element) {
	var caretOffset = 0;
	var doc = element.ownerDocument || element.document;
	var win = doc.defaultView || doc.parentWindow;
	var sel;
	if (typeof win.getSelection != "undefined") {
		sel = win.getSelection();
		if (sel.rangeCount > 0) {
			var range = win.getSelection().getRangeAt(0);
			var preCaretRange = range.cloneRange();
			preCaretRange.selectNodeContents(element);
			preCaretRange.setEnd(range.endContainer, range.endOffset);
			caretOffset = preCaretRange.toString().length;
		}
	} else if ( (sel = doc.selection) && sel.type != "Control") {
		var textRange = sel.createRange();
		var preCaretTextRange = doc.body.createTextRange();
		preCaretTextRange.moveToElementText(element);
		preCaretTextRange.setEndPoint("EndToEnd", textRange);
		caretOffset = preCaretTextRange.text.length;
	}
	return caretOffset;
}

function setCaret(el, pos) {
	var range = document.createRange();
	var sel = window.getSelection();
	range.setStart(el.childNodes[0], pos);
	range.collapse(true);
	sel.removeAllRanges();
	sel.addRange(range);
}

var cumulativeOffset = function(element) {
	var top = 0, left = 0;
	do {
		top += element.offsetTop  || 0;
		left += element.offsetLeft || 0;
		element = element.offsetParent;
	} while(element);

	return {
		top: top,
		left: left
	};
};

// first add raf shim
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// main function
function scrollToY(element, scrollTargetY, time, easing) {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    var scrollY = element.scrollTop || window.scrollY || document.documentElement.scrollTop,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;

    // min time .1, max time .8 seconds

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    var easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);

            element.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            console.log('scroll done');
            element.scrollTo(0, scrollTargetY);
        }
    }

    // call it once to get started
    tick();
}

// scroll it!
