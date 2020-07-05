/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Grid=__webpack_require__(1);
	
	//九宫格的显示
	const grid = new Grid($("#container"));
	grid.build();
	grid.layout();
	
	


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const Toolkit = __webpack_require__(2);
	
	//九宫格生成在container中
	//生成九宫格
	class Grid{
	    constructor(container){
	        this._$container = container;
	    }
	    build(){
	    	const matrix = Toolkit.matrix.makeMatrix();
	    	
	        const rowGroupClasses = ["row_g_top","row_g_middle","row_g_bottom"];
	        const colGroupClasses = ["col_g_left","col_g_center","col_g_right"];
	        
	        //每一行创建一个div将每一行的值new成一个span
	        const $cells = matrix.map(rowValues => rowValues
	            .map((cellValue,colIndex)=> {
	                return $("<span>")
	                .addClass(colGroupClasses[colIndex % 3])
	                .text(cellValue);
	            }));
	        //从cells中得到div数组
	        const $divArray = $cells.map(($spanArray,rowIndex) => {
	            return $("<div>")
	            .addClass("row")
	            .addClass(rowGroupClasses[rowIndex % 3])
	            .append($spanArray);
	        });
	        //添加到container中
	        this._$container.append($divArray);
	    }
	    layout(){
	        const width = $("span:first",this._$container).width();
	        $("span",this._$container)
	            .height(width)
	            .css({
	                "line-height":`${width}px`,
	                "font-size":width<32 ? `${width / 2 }`:""
	            });
	    }
	
	    
	}
	
	//new Grid($("#container")).build();
	
	module.exports = Grid;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	//矩阵和数组 工具
	
	const matrixToolkit = {
	    makeRow(v=0){
	        const array = new Array(9);
	        array.fill(v);
	        return array;
	    },
	    
	    makeMatrix(v=0) {
	        return Array.from({length:9},() => this.makeRow(v));//在此 是不能和前面一样的
	        
	    },
	    //检查指定位置是否能够填写数字n
	    checkFillable(matrix,n,rowIndex,colIndex){
	        const row = matrix[rowIndex];
	        const column = this.makeRow().map((v,i) =>matrix[i][colIndex]);
	        const {boxIndex} = boxToolkit.convertToBoxIndex(rowIndex,colIndex);
	        //宫
	        const box =boxToolkit.getBoxCells(matrix,boxIndex);
	        for(let i = 0;i < 9; i++){
	            if(row[i] === n || column[i] === n || box[i] === n)
	                return false;
	        }
	        return true;
	    }
	};
	
	//坐标系工具——坐标转换
	const boxToolkit = {
	    getBoxCells(matrix,boxIndex){
	        const startRowIndex = Math.floor(boxIndex / 3) * 3;
	        const startColIndex = boxIndex % 3 * 3;
	        const result = [];
	        for(let cellIndex = 0;cellIndex < 9; cellIndex++){
	            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
	            const colIndex = startColIndex + cellIndex % 3;
	            result.push(matrix[rowIndex][colIndex]);
	        }
	        return result;
	    },
	    convertToBoxIndex(rowIndex,colIndex){
	        return{
	            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
	            cellIndex: rowIndex % 3 * 3 + colIndex % 3
	        };
	    },
	
	    convertFromBoxIndex(boxIndex,cellIndex){
	        return{
	            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
	            colIndex:boxIndex % 3 * 3 + cellIndex % 3
	        };
	    }
	};
	
	
	//工具集，用来输出
	module.exports = class Toolkit{
	    // 矩阵和数组相关的工具
	    static get matrix(){
	        return matrixToolkit;
	    }
	    
	    //坐标系工具
	    static get box(){
	        return boxToolkit;
	    }
	    
	};

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map