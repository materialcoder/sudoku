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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//工具集

/**
 * [matrixToolkit 矩阵和数组相关的工具]
 * @type {Object}
 */
var matrixToolkit = {
	makeRow: function makeRow() {
		var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var array = new Array(9);
		array.fill(v);
		return array;
	},
	makeMatrix: function makeMatrix() {
		var _this = this;

		var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		return Array.from({ length: 9 }, function () {
			return _this.makeRow(v);
		});
	},


	/**
  * Fisher-Yates 洗牌算法：指针从数组的第一项开始，
  * 与从该项起到最后一项中的任意一个数交换位置，
  * 剩余的数保持不变，同时指针后移一位，
  * 直到指针指向数组的最后一项
  * @param  {array} array
  * @return {array} array
  */
	shuffle: function shuffle(array) {
		var endIndex = array.length - 2;
		for (var i = 0; i <= endIndex; i++) {
			var j = i + Math.floor(Math.random() * (array.length - i));
			var _ref = [array[j], array[i]];
			array[i] = _ref[0];
			array[j] = _ref[1];
		}
		return array;
	},


	/**
  * 检查指定位置可以填写数字 n
  */
	checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
		var row = matrix[rowIndex];
		var column = this.makeRow().map(function (v, i) {
			return matrix[i][colIndex];
		});

		var _boxTookit$convertToB = boxTookit.convertToBoxIndex(rowIndex, colIndex),
		    boxIndex = _boxTookit$convertToB.boxIndex; //宫的位置


		var box = boxTookit.getBoxCells(matrix, boxIndex);
		for (var i = 0; i < 9; i++) {
			if (row[i] === n || column[i] === n || box[i] === n) {
				return false;
			}
		}
		return true;
	}
};

/**
 * 宫坐标系工具
 */
var boxTookit = {

	/**
  * 得到每个宫中的数字
  * @param  {array} matrix   矩阵
  * @param  {number} boxIndex 宫号
  */
	getBoxCells: function getBoxCells(matrix, boxIndex) {
		var startRowIndex = Math.floor(boxIndex / 3) * 3;
		var startColIndex = boxIndex % 3 * 3;
		var result = [];
		for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
			var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
			var colIndex = startColIndex + cellIndex % 3;
			result.push(matrix[rowIndex][colIndex]);
		}
		return result;
	},


	/**
  * 将行列号转换为宫号和格号
  * @param  {number} rowIndex 行号
  * @param  {number} colIndex 列号
  */
	convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
		return {
			boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3), //宫的序号
			cellIndex: rowIndex % 3 * 3 + colIndex % 3 //宫中格的序号
		};
	},


	/**
  * 将宫号和格号转换为行列号
  * @param  {number} boxIndex  宫号
  * @param  {number} cellIndex 格号
  */
	convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
		return {
			rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3), //行号
			colIndex: boxIndex % 3 * 3 + cellIndex % 3 //列号
		};
	}
};

//工具集

module.exports = function () {
	function Toolkit() {
		_classCallCheck(this, Toolkit);
	}

	_createClass(Toolkit, null, [{
		key: "matrix",


		/**
   * 矩阵和数组相关的工具
   */
		get: function get() {
			return matrixToolkit;
		}

		/**
   * 宫坐标系相关的工具
   */

	}, {
		key: "box",
		get: function get() {
			return boxTookit;
		}
	}]);

	return Toolkit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独解决方案
var Toolkit = __webpack_require__(0);

module.exports = function () {
	function Generator() {
		_classCallCheck(this, Generator);
	}

	_createClass(Generator, [{
		key: "generate",
		value: function generate() {
			while (!this.internalGenerate()) {
				console.warn("try again");
			}
		}
	}, {
		key: "internalGenerate",
		value: function internalGenerate() {
			// 入口方法
			this.matrix = Toolkit.matrix.makeMatrix(); //全是0的矩阵
			this.orders = Toolkit.matrix.makeMatrix().map(function (row) {
				return row.map(function (v, i) {
					return i;
				});
			}).map(function (row) {
				return Toolkit.matrix.shuffle(row);
			}); //得到每一行为0-8的矩阵，再把每一行随机打乱
			for (var n = 1; n <= 9; n++) {
				if (!this.fillNumber(n)) {
					return false;
				}
			}
			return true;
		}
	}, {
		key: "fillNumber",
		value: function fillNumber(n) {
			return this.fillRow(n, 0);
		}
	}, {
		key: "fillRow",
		value: function fillRow(n, rowIndex) {
			if (rowIndex > 8) {
				return true;
			}

			var row = this.matrix[rowIndex];

			var orders = this.orders[rowIndex];

			for (var i = 0; i < 9; i++) {
				var colIndex = orders[i]; //随机选择列

				//如果这个位置已经有值，跳过
				if (row[colIndex]) {
					continue;
				}

				//检查这个位置是否可以填  n
				if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
					continue;
				}

				row[colIndex] = n;

				//当前行填写n成功，递归调用fillRow()来在下一行中填写n,如果失败，继续寻找当前行下一个位置
				if (!this.fillRow(n, rowIndex + 1)) {
					row[colIndex] = 0;
					continue;
				}

				return true;
			}

			return false;
		}
	}]);

	return Generator;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(3);
var PopupNumbers = __webpack_require__(6);

var grid = new Grid($("#container"));

grid.build();

grid.layout();

var popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

$("#check").on("click", function (e) {
	if (grid.check()) {
		alert("true");
	}
});

$("#reset").on("click", function (e) {
	grid.reset();
});

$("#clear").on("click", function (e) {
	grid.clear();
});

$("#rebuild").on("click", function (e) {
	grid.rebuild();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成九宫格
var Toolkit = __webpack_require__(0);
var Generator = __webpack_require__(1);
var Sudoku = __webpack_require__(4);
var Checker = __webpack_require__(5);

var Grid = function () {
	function Grid(container) {
		_classCallCheck(this, Grid);

		this._$container = container;
	}

	_createClass(Grid, [{
		key: "build",
		value: function build() {
			// const generator = new Generator();
			// generator.generate();
			// const matrix = generator.matrix;

			var sudoku = new Sudoku();
			sudoku.make();
			var matrix = sudoku.puzzleMatrix;

			var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
			var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

			var $cells = matrix.map(function (rowValues) {
				return rowValues.map(function (cellValue, colIndex) {
					return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty").text(cellValue);
				});
			});

			var $divArray = $cells.map(function ($spanArray, rowIndex) {
				return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
			});

			this._$container.append($divArray);
		}
	}, {
		key: "layout",
		value: function layout() {
			var width = $("span:first", this._$container).width();
			$("span", this._$container).height(width).css({
				"line-height": width + "px",
				"font-size": width < 32 ? width / 2 + "px" : ""
			});
		}
	}, {
		key: "bindPopup",
		value: function bindPopup(popupNumbers) {
			this._$container.on("click", "span", function (e) {
				var $cell = $(e.target);
				if ($cell.is(".fixed")) {
					return;
				}
				popupNumbers.popup($cell);
			});
		}

		//重建新的迷盘，开始新的一局

	}, {
		key: "rebuild",
		value: function rebuild() {
			this._$container.empty();
			this.build();
			this.layout();
		}

		/**
   * 检查用户解密的结果，成功则进行提示，失败西安市错误位置的标记
   */

	}, {
		key: "check",
		value: function check() {
			//获取需要检查的数据
			var $rows = this._$container.children();
			var data = $rows.map(function (rowIndex, div) {
				return $(div).children().map(function (colIndex, span) {
					return parseInt($(span).text()) || 0;
				});
			}).toArray().map(function ($data) {
				return $data.toArray();
			});

			var checker = new Checker(data);
			if (checker.check()) {
				return true;
			}

			//检查不成功，进行标记
			var marks = checker.matrixMarks;
			this._$container.children().each(function (rowIndex, div) {
				$(div).children().each(function (colIndex, span) {
					var $span = $(span);
					if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
						$span.removeClass("error");
					} else {
						$span.addClass("error");
					}
				});
			});
		}

		/**
   * 重置当前迷盘到初始状态
   */

	}, {
		key: "reset",
		value: function reset() {
			this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass("empty").text(0);
		}

		/**
   * 清除错误标记
   */

	}, {
		key: "clear",
		value: function clear() {
			this._$container.find("span.error").removeClass("error");
		}
	}]);

	return Grid;
}();

module.exports = Grid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独游戏

//1. 生成完成的解决方案 Generator
//2. 随机去除部分数据：按比例

var Generator = __webpack_require__(1);

module.exports = function () {
	function Sudoku() {
		_classCallCheck(this, Sudoku);

		//生成解决方案
		var generator = new Generator();
		generator.generate();
		this.solutionMatrix = generator.matrix;
	}

	_createClass(Sudoku, [{
		key: "make",
		value: function make() {
			var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

			// const shouldRid = Math.random() * 9 < level 4/9的概率为空
			// 生成迷盘
			this.puzzleMatrix = this.solutionMatrix.map(function (row) {
				return row.map(function (cell) {
					return Math.random() * 9 < level ? 0 : cell;
				});
			});
		}
	}]);

	return Sudoku;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//检查数独的解决方案

function checkArray(array) {
	var length = array.length;
	var marks = new Array(length);
	marks.fill(true);
	for (var i = 0; i < length - 1; i++) {
		if (!marks[i]) {
			continue;
		}

		var v = array[i];
		//是否有效 0 是无效 1-9是有效
		if (!v) {
			marks[i] = false;
			continue;
		}

		//是否有重复 i+1-9，是否和i位置的数据重复
		for (var j = i + 1; j < length; j++) {
			if (v === array[j]) {
				marks[i] = marks[j] = false;
			}
		}
	}
	return marks;
}

var Toolkit = __webpack_require__(0);

//输入：matrix， 用户完成的数独数据，9x9
//处理：对matrix行、列、宫进行检查，并填写matrix
//输出：检查是否成功、marks
module.exports = function () {
	function Checker(matrix) {
		_classCallCheck(this, Checker);

		this._matrix = matrix;
		this._matrixMarks = Toolkit.matrix.makeMatrix(true);
	}

	_createClass(Checker, [{
		key: "check",
		value: function check() {
			this.checkRows();
			this.checkCols();
			this.checkBoxes();
			//检查是否成功
			this._success = this._matrixMarks.every(function (row) {
				return row.every(function (mark) {
					return mark;
				});
			});
			return this._success;
		}

		//检查行

	}, {
		key: "checkRows",
		value: function checkRows() {
			for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
				var row = this._matrix[rowIndex];
				var marks = checkArray(row);

				for (var colIndex = 0; colIndex < 9; colIndex++) {
					if (!marks[colIndex]) {
						this._matrixMarks[rowIndex][colIndex] = false;
					}
				}
			}
		}

		//检查列

	}, {
		key: "checkCols",
		value: function checkCols() {
			for (var colIndex = 0; colIndex < 9; colIndex++) {
				var cols = [];
				for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
					cols[rowIndex] = this._matrix[rowIndex][colIndex];
				}
				var marks = checkArray(cols);
				for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
					if (!marks[_rowIndex]) {
						this._matrixMarks[_rowIndex][colIndex] = false;
					}
				}
			}
		}

		//检查宫

	}, {
		key: "checkBoxes",
		value: function checkBoxes() {
			for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
				var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
				var marks = checkArray(boxes);

				for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
					if (!marks[cellIndex]) {
						var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex),
						    rowIndex = _Toolkit$box$convertF.rowIndex,
						    colIndex = _Toolkit$box$convertF.colIndex;

						this._matrixMarks[rowIndex][colIndex] = false;
					}
				}
			}
		}
	}, {
		key: "matrixMarks",
		get: function get() {
			return this._matrixMarks;
		}
	}, {
		key: "isSuccess",
		get: function get() {
			return this._success;
		}
	}]);

	return Checker;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//处理弹出的操作面板
module.exports = function () {
	function PopupNumbers($panel) {
		var _this = this;

		_classCallCheck(this, PopupNumbers);

		this._$panel = $panel.hide().removeClass("hidden");

		this._$panel.on("click", "span", function (e) {
			var $cell = _this._$targetCell;
			var $span = $(e.target);

			//mark1，mark2 回填样式
			if ($span.hasClass("mark1")) {
				//回填样式
				if ($cell.hasClass("mark1")) {
					$cell.removeClass("mark1");
				} else {
					$cell.removeClass("mark2").addClass("mark1");
				}
			} else if ($span.hasClass("mark2")) {
				//回填样式
				if ($cell.hasClass("mark2")) {
					$cell.removeClass("mark2");
				} else {
					$cell.removeClass("mark1").addClass("mark2");
				}
			} else if ($span.hasClass("empty")) {
				//取消数字和mark
				$cell.text(0).addClass("empty").removeClass("mark1 mark2");
			} else {
				//1-9回填数字
				$cell.removeClass("empty").text($span.text());
			}
			_this.hide();
		});
	}

	_createClass(PopupNumbers, [{
		key: "popup",
		value: function popup($cell) {
			this._$targetCell = $cell;

			var _$cell$position = $cell.position(),
			    left = _$cell$position.left,
			    top = _$cell$position.top,
			    right = _$cell$position.right;

			var _$body = $("body").width();
			var _$width = this._$panel.width();
			if (left + _$width > _$body) {
				this._$panel.css({
					left: left - _$width + this._$targetCell.width() + "px",
					top: top + "px"
				}).show();
			} else {
				this._$panel.css({
					left: left + "px",
					top: top + "px"
				}).show();
			}
		}
	}, {
		key: "hide",
		value: function hide() {
			this._$panel.hide();
		}
	}]);

	return PopupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map