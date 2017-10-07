/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ReactDOM = __webpack_require__(4);
const Main_1 = __webpack_require__(5);
ReactDOM.render(React.createElement(Main_1.Main, null), document.getElementById("main"));


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const Header_1 = __webpack_require__(6);
const Collection_1 = __webpack_require__(10);
const Chart_1 = __webpack_require__(13);
const StyledBox_1 = __webpack_require__(16);
var styles = __webpack_require__(17);
let headerData = {
    name: "matthew whitt",
    title: "full-stack engineer",
    city: "los angeles, ca",
    email: "mwhitt.w@gmail.com",
};
let charts = [
    {
        src: "https://wakatime.com/share/@562d69da-44c4-46a6-9a44-56beb1b0a8e1/a95498c7-84c2-4705-8c74-9fa9144f153a.svg",
        isBig: true,
    },
    {
        src: "https://wakatime.com/share/@562d69da-44c4-46a6-9a44-56beb1b0a8e1/84aa02c1-c080-400d-ba4b-bd685b5ba721.svg",
        isBig: true,
    },
    {
        src: "https://wakatime.com/share/@562d69da-44c4-46a6-9a44-56beb1b0a8e1/6aefd448-5e3b-4e93-a9fd-e694049921c5.svg",
        isSmall: true,
    },
    {
        src: "https://wakatime.com/share/@562d69da-44c4-46a6-9a44-56beb1b0a8e1/1a6b567b-c9f4-4340-814c-a14013c5d655.svg",
        isSmall: true,
    },
];
let collections = [
    {
        headerValue: "About Me",
        items: [
            {
                value: "I solve difficult problems at scale, and implement robust microservices architectures",
                isLink: false
            },
            {
                value: "I integrate 3rd party APIs through robust defensive programming techniques",
                isLink: false
            },
            {
                value: "I always automate development and tests, instrument monitoring, and engage in continuous deployment.",
                isLink: false
            },
            {
                value: "I excel at constructing smart and sane object oriented abstraction.",
                isLink: false
            },
            {
                value: "I am always a champion of code quality, I engage in frequent peer reviews, and strive to never compromise",
                isLink: false
            },
            {
                value: "I follow modern web standards (RESTful APIS, OAuth, SPA, progressive web, and JWT)",
                isLink: false
            },
        ]
    },
    {
        headerValue: "Work Projects",
        items: [
            {
                value: "Disney Projects (NDA)",
                isLink: false,
                isDisabled: true,
            },
            {
                value: "Apploi",
                isLink: true,
                linkHref: "https://jobs.apploi.com/search"
            },
            {
                value: "Beginning with Children",
                isLink: true,
                linkHref: "http://www.beginningwithchildren.org/"
            }
        ]
    },
    {
        headerValue: "Fun Projects",
        items: [
            {
                value: "Battle Drafter",
                isLink: true,
                linkHref: "https://github.com/mattrwh/battledrafter"
            },
            {
                value: "Python Injectables",
                isLink: true,
                linkHref: "https://github.com/mattrwh/injectables"
            },
            {
                value: "Krull (Python Rest Framework)",
                isLink: true,
                linkHref: "https://github.com/mattrwh/krull"
            }
        ]
    },
];
exports.Main = () => {
    let collectionComponents = collections.map((props, i) => {
        return React.createElement(Collection_1.Collection, Object.assign({ key: props.headerValue + i }, props));
    });
    let bigChartComponents = charts.filter(chart => chart.isBig).map((props, i) => {
        return React.createElement(Chart_1.Chart, Object.assign({ key: i }, props));
    });
    let smallChartComponents = charts.filter(chart => chart.isSmall).map((props, i) => {
        return React.createElement(Chart_1.Chart, Object.assign({ key: i }, props));
    });
    return (React.createElement("section", { className: styles.c_Main },
        React.createElement(Header_1.Header, Object.assign({}, headerData)),
        React.createElement(StyledBox_1.StyledBox, { padding: '5px', margin: '5px' },
            React.createElement("section", { className: styles.c_Main__Container },
                React.createElement("section", { className: styles.c_Main__Column },
                    collectionComponents,
                    React.createElement("section", { className: styles.c_Main__Row }, smallChartComponents)),
                React.createElement("section", { className: styles.c_Main__Column },
                    " ",
                    bigChartComponents,
                    " ")))));
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
var styles = __webpack_require__(7);
exports.Header = (props) => (React.createElement("section", null,
    React.createElement("div", { className: `${styles.c_Header} ${styles.c_Header_Main} ${styles.c_Header__Darker}` },
        React.createElement("span", { className: styles.c_Header_Main__Text }, props.name)),
    React.createElement("div", { className: `${styles.c_Header} ${styles.c_Header_Sub} ${styles.c_Header__Lighter}` },
        React.createElement("span", { className: styles.c_Header_Sub__Text }, props.title),
        React.createElement("span", { className: styles.c_Header_Sub__Text },
            "- ",
            props.city,
            " -"),
        React.createElement("span", { className: styles.c_Header_Sub__Text }, props.email))));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1!./Header.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1!./Header.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "@keyframes Header__pulse___2NWJZ {\n  0%,\n  5% {\n    transform: scale(.99);\n  }\n  10% {\n    transform: scale(.991);\n  }\n  15% {\n    transform: scale(.992);\n  }\n  20% {\n    transform: scale(.993);\n  }\n  25% {\n    transform: scale(.994);\n  }\n  30% {\n    transform: scale(.995);\n  }\n  35% {\n    transform: scale(.996);\n  }\n  40% {\n    transform: scale(.997);\n  }\n  45% {\n    transform: scale(.998);\n  }\n  50% {\n    transform: scale(.999);\n  }\n  60% {\n    transform: scale(1.02);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n\n.Header__c_Header___2KKIm {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n\n.Header__c_Header_Main___kYqGK {\n  top: 0px;\n  position: absolute;\n  left: 0;\n  right: 0;\n  font-size: 50px;\n  height: 100px;\n}\n\n.Header__c_Header_Sub___3oa4l {\n  top: 100px;\n  position: absolute;\n  left: 0;\n  right: 0;\n  z-index: -1;\n  height: 50px;\n  font-size: 25px;\n  font-weight: light;\n  border-bottom: 5px solid whitesmoke;\n}\n\n.Header__c_Header_Main__Text___3W9Xu {\n  color: #2f2f2f;\n  animation: Header__pulse___2NWJZ 1s infinite alternate ease-in-out;\n}\n\n.Header__c_Header_Sub__Text___2_xZz {\n  color: #b7b7b7;\n  padding-right: 5px;\n  padding-left: 5px;\n}\n\n.Header__c_Header__Darker___2nycz {\n  background-color: #e2e2e2;\n}\n\n.Header__c_Header__Lighter___36B9o {\n  background-color: #FFFFFF;\n}\n", ""]);

// exports
exports.locals = {
	"c_Header": "Header__c_Header___2KKIm",
	"c_Header_Main": "Header__c_Header_Main___kYqGK",
	"c_Header_Sub": "Header__c_Header_Sub___3oa4l",
	"c_Header_Main__Text": "Header__c_Header_Main__Text___3W9Xu",
	"pulse": "Header__pulse___2NWJZ",
	"c_Header_Sub__Text": "Header__c_Header_Sub__Text___2_xZz",
	"c_Header__Darker": "Header__c_Header__Darker___2nycz",
	"c_Header__Lighter": "Header__c_Header__Lighter___36B9o"
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
var styles = __webpack_require__(11);
;
exports.CollectionHeader = (headerProps) => {
    return (React.createElement("h3", { className: styles.c_Collection_Header__Box }, headerProps.headerValue));
};
exports.CollectionItem = (itemProps) => {
    if (itemProps.isLink) {
        return React.createElement("a", { href: itemProps.linkHref },
            React.createElement("span", null, itemProps.value));
    }
    else {
        return React.createElement("span", { className: itemProps.isDisabled ? styles.c_Collection_Item__Box___Disabled : null }, itemProps.value);
    }
};
exports.CollectionItemBox = (itemProps) => {
    return (React.createElement("div", { className: itemProps.isLink ? styles.c_Collection_Item__Link : styles.c_Collection_Item__Box },
        React.createElement(exports.CollectionItem, Object.assign({}, itemProps))));
};
exports.Collection = (props) => {
    let items = props.items.map((itemProps, index) => {
        return React.createElement("div", { key: index },
            React.createElement(exports.CollectionItemBox, Object.assign({}, itemProps)));
    });
    return (React.createElement("section", { className: styles.c_Collection },
        React.createElement(exports.CollectionHeader, { headerValue: props.headerValue }),
        React.createElement("div", null, items)));
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1!./Collection.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1!./Collection.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".Collection__c_Collection___2oMea {\n  border: 4px solid white;\n  background-color: white;\n  margin: 2.5px;\n}\n\n.Collection__c_Collection_Header__Box___16bDk {\n  padding: 15px;\n  border-bottom: 2px solid white;\n  margin: 0;\n}\n\n.Collection__c_Collection_Item__Box___7xaAg,\n.Collection__c_Collection_Item__Link___3xWB9 {\n  padding: 5px 15px;\n  border-top: 1px solid whitesmoke;\n}\n\n.Collection__c_Collection_Item__Link___3xWB9:hover {\n  background-color: whitesmoke;\n}\n\n.Collection__c_Collection_Item__Box___Disabled___2Ytti {\n  color: darkgray;\n  cursor: not-allowed;\n}\n\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n}\n", ""]);

// exports
exports.locals = {
	"c_Collection": "Collection__c_Collection___2oMea",
	"c_Collection_Header__Box": "Collection__c_Collection_Header__Box___16bDk",
	"c_Collection_Item__Box": "Collection__c_Collection_Item__Box___7xaAg",
	"c_Collection_Item__Link": "Collection__c_Collection_Item__Link___3xWB9",
	"c_Collection_Item__Box___Disabled": "Collection__c_Collection_Item__Box___Disabled___2Ytti"
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
var styles = __webpack_require__(14);
exports.Chart = (props) => (React.createElement("section", { className: props.isBig ? styles.c_Chart__Box : styles.c_Chart__Box___Row },
    React.createElement("figure", null,
        React.createElement("embed", { src: props.src }))));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1!./Chart.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1!./Chart.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".Chart__c_Chart__Box___Row___3HjIS > figure,\n.Chart__c_Chart__Box___2Pe-I > figure {\n  margin: 2.5px;\n}\n\n.Chart__c_Chart__Box___Row___3HjIS {\n  width: 50%;\n}\n", ""]);

// exports
exports.locals = {
	"c_Chart__Box___Row": "Chart__c_Chart__Box___Row___3HjIS",
	"c_Chart__Box": "Chart__c_Chart__Box___2Pe-I"
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
exports.StyledBox = (props) => {
    let styles = {};
    props.padding ? styles.padding = props.padding : undefined;
    props.margin ? styles.margin = props.margin : undefined;
    return React.createElement("section", { style: styles }, props.children);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1!./Main.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1!./Main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".Main__c_Main___1qsLQ {\n  font-family: 'Poiret One', cursive;\n}\n\n.Main__c_Main__Container___DznOH {\n  position: absolute;\n  top: 150px;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  overflow: auto;\n  background-color: #f5f5f5;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n\n.Main__c_Main__Column___QMvW9 {\n  margin: 2.5px;\n  min-width: 500px;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n.Main__c_Main__Row___13K42 {\n  display: flex;\n  flex-direction: row;\n}\n\n* {\n  box-sizing: border-box;\n}\n\na {\n  text-decoration: none;\n}\n\na,\na:visited {\n  color: black;\n}\n", ""]);

// exports
exports.locals = {
	"c_Main": "Main__c_Main___1qsLQ",
	"c_Main__Container": "Main__c_Main__Container___DznOH",
	"c_Main__Column": "Main__c_Main__Column___QMvW9",
	"c_Main__Row": "Main__c_Main__Row___13K42"
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map