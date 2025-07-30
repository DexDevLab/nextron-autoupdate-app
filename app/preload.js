(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./main/preload.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);


// Exposes IPC API commands to Renderer using an alias
const handler = {
  // Send message TO logger
  log(message) {
    return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke("logger", message);
  },
  // Send data TO Main
  send(channel, value) {
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(channel, value);
  },
  // Send data TO Main async
  invoke(channel, value) {
    return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke(channel, value);
  },
  // Creates a listener to a specific channel. After receiving the reply, the listener is removed gracefully
  on(channel, callback) {
    const subscription = (_event, ...args) => callback(...args);
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on(channel, subscription);
    return () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeListener(channel, subscription);
    };
  },
  // Watch a specific channel, returning all the replies
  watch(channel, callback) {
    const subscription = (_event, ...args) => callback(...args);
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on(channel, subscription);
  },
  // Unsubscribe watched channel
  unsubscribe(channel) {
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeAllListeners(channel);
  }
};
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld("ipc", handler);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZBLHFDOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ05zRDs7QUFFdEQ7QUFDQSxNQUFNRSxPQUFPLEdBQUc7RUFDZDtFQUNBQyxHQUFHQSxDQUFDQyxPQUFPLEVBQUU7SUFDWCxPQUFPSCxpREFBVyxDQUFDSSxNQUFNLENBQUMsUUFBUSxFQUFFRCxPQUFPLENBQUM7RUFDOUMsQ0FBQztFQUNEO0VBQ0FFLElBQUlBLENBQUNDLE9BQU8sRUFBRUMsS0FBSyxFQUFFO0lBQ25CUCxpREFBVyxDQUFDSyxJQUFJLENBQUNDLE9BQU8sRUFBRUMsS0FBSyxDQUFDO0VBQ2xDLENBQUM7RUFDRDtFQUNBSCxNQUFNQSxDQUFDRSxPQUFPLEVBQUVDLEtBQUssRUFBRTtJQUNyQixPQUFPUCxpREFBVyxDQUFDSSxNQUFNLENBQUNFLE9BQU8sRUFBRUMsS0FBSyxDQUFDO0VBQzNDLENBQUM7RUFDRDtFQUNBQyxFQUFFQSxDQUFDRixPQUFPLEVBQUVHLFFBQVEsRUFBRTtJQUNwQixNQUFNQyxZQUFZLEdBQUdBLENBQUNDLE1BQU0sRUFBRSxHQUFHQyxJQUFJLEtBQUtILFFBQVEsQ0FBQyxHQUFHRyxJQUFJLENBQUM7SUFDM0RaLGlEQUFXLENBQUNRLEVBQUUsQ0FBQ0YsT0FBTyxFQUFFSSxZQUFZLENBQUM7SUFDckMsT0FBTyxNQUFNO01BQ1hWLGlEQUFXLENBQUNhLGNBQWMsQ0FBQ1AsT0FBTyxFQUFFSSxZQUFZLENBQUM7SUFDbkQsQ0FBQztFQUNILENBQUM7RUFDRDtFQUNBSSxLQUFLQSxDQUFDUixPQUFPLEVBQUVHLFFBQVEsRUFBRTtJQUN2QixNQUFNQyxZQUFZLEdBQUdBLENBQUNDLE1BQU0sRUFBRSxHQUFHQyxJQUFJLEtBQUtILFFBQVEsQ0FBQyxHQUFHRyxJQUFJLENBQUM7SUFDM0RaLGlEQUFXLENBQUNRLEVBQUUsQ0FBQ0YsT0FBTyxFQUFFSSxZQUFZLENBQUM7RUFDdkMsQ0FBQztFQUNEO0VBQ0FLLFdBQVdBLENBQUNULE9BQU8sRUFBRTtJQUNuQk4saURBQVcsQ0FBQ2dCLGtCQUFrQixDQUFDVixPQUFPLENBQUM7RUFDekM7QUFDRixDQUFDO0FBRURQLG1EQUFhLENBQUNrQixpQkFBaUIsQ0FBQyxLQUFLLEVBQUVoQixPQUFPLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRyb24tYXV0b3VwZGF0ZS1hcHAvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25leHRyb24tYXV0b3VwZGF0ZS1hcHAvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vbmV4dHJvbi1hdXRvdXBkYXRlLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXh0cm9uLWF1dG91cGRhdGUtYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25leHRyb24tYXV0b3VwZGF0ZS1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25leHRyb24tYXV0b3VwZGF0ZS1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXh0cm9uLWF1dG91cGRhdGUtYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV4dHJvbi1hdXRvdXBkYXRlLWFwcC8uL21haW4vcHJlbG9hZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbnRleHRCcmlkZ2UsIGlwY1JlbmRlcmVyIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5cbi8vIEV4cG9zZXMgSVBDIEFQSSBjb21tYW5kcyB0byBSZW5kZXJlciB1c2luZyBhbiBhbGlhc1xuY29uc3QgaGFuZGxlciA9IHtcbiAgLy8gU2VuZCBtZXNzYWdlIFRPIGxvZ2dlclxuICBsb2cobWVzc2FnZSkge1xuICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoXCJsb2dnZXJcIiwgbWVzc2FnZSk7XG4gIH0sXG4gIC8vIFNlbmQgZGF0YSBUTyBNYWluXG4gIHNlbmQoY2hhbm5lbCwgdmFsdWUpIHtcbiAgICBpcGNSZW5kZXJlci5zZW5kKGNoYW5uZWwsIHZhbHVlKTtcbiAgfSxcbiAgLy8gU2VuZCBkYXRhIFRPIE1haW4gYXN5bmNcbiAgaW52b2tlKGNoYW5uZWwsIHZhbHVlKSB7XG4gICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZShjaGFubmVsLCB2YWx1ZSk7XG4gIH0sXG4gIC8vIENyZWF0ZXMgYSBsaXN0ZW5lciB0byBhIHNwZWNpZmljIGNoYW5uZWwuIEFmdGVyIHJlY2VpdmluZyB0aGUgcmVwbHksIHRoZSBsaXN0ZW5lciBpcyByZW1vdmVkIGdyYWNlZnVsbHlcbiAgb24oY2hhbm5lbCwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSAoX2V2ZW50LCAuLi5hcmdzKSA9PiBjYWxsYmFjayguLi5hcmdzKTtcbiAgICBpcGNSZW5kZXJlci5vbihjaGFubmVsLCBzdWJzY3JpcHRpb24pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5yZW1vdmVMaXN0ZW5lcihjaGFubmVsLCBzdWJzY3JpcHRpb24pO1xuICAgIH07XG4gIH0sXG4gIC8vIFdhdGNoIGEgc3BlY2lmaWMgY2hhbm5lbCwgcmV0dXJuaW5nIGFsbCB0aGUgcmVwbGllc1xuICB3YXRjaChjaGFubmVsLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IChfZXZlbnQsIC4uLmFyZ3MpID0+IGNhbGxiYWNrKC4uLmFyZ3MpO1xuICAgIGlwY1JlbmRlcmVyLm9uKGNoYW5uZWwsIHN1YnNjcmlwdGlvbik7XG4gIH0sXG4gIC8vIFVuc3Vic2NyaWJlIHdhdGNoZWQgY2hhbm5lbFxuICB1bnN1YnNjcmliZShjaGFubmVsKSB7XG4gICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKGNoYW5uZWwpO1xuICB9LFxufTtcblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZChcImlwY1wiLCBoYW5kbGVyKTtcbiJdLCJuYW1lcyI6WyJjb250ZXh0QnJpZGdlIiwiaXBjUmVuZGVyZXIiLCJoYW5kbGVyIiwibG9nIiwibWVzc2FnZSIsImludm9rZSIsInNlbmQiLCJjaGFubmVsIiwidmFsdWUiLCJvbiIsImNhbGxiYWNrIiwic3Vic2NyaXB0aW9uIiwiX2V2ZW50IiwiYXJncyIsInJlbW92ZUxpc3RlbmVyIiwid2F0Y2giLCJ1bnN1YnNjcmliZSIsInJlbW92ZUFsbExpc3RlbmVycyIsImV4cG9zZUluTWFpbldvcmxkIl0sInNvdXJjZVJvb3QiOiIifQ==