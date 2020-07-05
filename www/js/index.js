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
	const PopupNumbers = __webpack_require__(5);
	
	//九宫格的显示
	const grid = new Grid($("#container"));
	grid.build();
	grid.layout();
	
	//创建一个popupNumbers对象，绑定弹出窗口
	const popupNumbers = new PopupNumbers($("#popupNumbers"));
	grid.bindPopup(popupNumbers);
	
	$("#check").on("click", e => {
	    popupNumbers.hide();
	    if (grid.check()) {
	        alert("Congruations!");
	    }
	});
	
	$("#reset").on("click", e => {
	    popupNumbers.hide();
	    grid.reset();
	});
	
	$("#clear").on("click", e => {
	    popupNumbers.hide();
	    grid.clear();
	});
	
	$("#rebuild").on("click", e => {
	    popupNumbers.hide();
	    grid.rebuild();
	});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const Toolkit = __webpack_require__(2);
	const Sudoku = __webpack_require__(3);
	const Generator = __webpack_require__(4);
	//九宫格生成在container中
	//生成九宫格
	class Grid {
	    constructor(container) {
	        this._$container = container;
	    }
	    build() {
	        const sudoku = new Sudoku();
	        sudoku.make();
	        const matrix = sudoku.puzzleMatrix;
	
	        //  	const matrix = Toolkit.matrix.makeMatrix();
	
	        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
	        const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];
	
	        //每一行创建一个div将每一行的值new成一个span
	        const $cells = matrix.map(rowValues => rowValues
	            .map((cellValue, colIndex) => {
	                return $("<span>")
	                    .addClass(colGroupClasses[colIndex % 3])
	                    .addClass(cellValue ? "fixed" : "empty")//迷盘添加颜色
	                    .text(cellValue);
	            }));
	        //从cells中得到div数组
	        const $divArray = $cells.map(($spanArray, rowIndex) => {
	            return $("<div>")
	                .addClass("row")
	                .addClass(rowGroupClasses[rowIndex % 3])
	                .append($spanArray);
	        });
	        //添加到container中
	        this._$container.append($divArray);
	    }
	    layout() {
	        const width = $("span:first", this._$container).width();
	        $("span", this._$container)
	            .height(width)
	            .css({
	                "line-height": `${width}px`,
	                "font-size": width < 32 ? `${width / 2}` : ""
	            });
	    }
	
	    //绑定事件
	    bindPopup(popupNumbers) {
	        //因为九宫格是动态生成的，所以使用事件代理方式来实现，this是个grid对象
	        this._$container.on("click", "span", e => {
	            const $cell = $(e.target);
	            popupNumbers.popup($cell);
	        });
	    }
	
	    //检查用户的结果，错误则进行标记
	    check() {
	        //获取需要检查的数据
	        const $rows = this._$container.children();
	        const data = $rows
	            .map((rowIndex, div) => {
	                return $(div).children()
	                    .map((colIndex, span) => parseInt($(span).text()) || 0);
	            })
	            .toArray()
	            .map($data => $data.toArray());
	
	        console.log(data);
	
	        const checker = new Checker(data);
	        //检查成功
	        if (checker.check()) {
	            return true;
	        }
	
	        //检查不成功
	        const marks = checker.matrixMarks;
	        this._$container.children()
	            .each((rowIndex, div) => {
	                $(div).children().each((colIndex, span) => {
	                    const $span = $(span);
	                    if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
	                        $span.removeClass("error");
	                    } else {
	                        $(span).addClass("error");
	                    }
	                })
	            })
	    }
	
	    //重置键盘到初始状态
	    reset() {
	        this._$container.find("span:not(.fixed)")
	            .removeClass("error mark1 mark2")
	            .addClass("empty")
	            .text(0);
	    }
	
	    //清理错误表示
	    clear() {
	        this._$container.find("span.error")
	            .removeClass("error");
	        this._$container.find("span.mark1")
	            .removeClass("mark1");
	        this._$container.find("span.mark2")
	            .removeClass("mark2");
	        
	    }
	
	    //重新建立新的迷盘
	    rebuild() {
	        this._$container.empty();
	        this.build();
	        this.layout();
	    }
	
	}
	
	const generator = new Generator();
	generator.generate();
	// 		console.log(generator.matrix);
	
	const matrix = generator.matrix;
	console.log("matrix\n", matrix);
	
	
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
	    
	    //测试
	    // const a=makeMatrix();
	    // a[0][1]=2;
	    // console.log(a);
	    
	    // Fisher-Yates 洗牌算法
	    shuffle(array) { 
	        const length = array.length;
	        const endIndex = length -1;
	        for(let i=0;i<endIndex;i++){
	            const j = i + Math.floor(Math.random() * (length - i));
	            [array[i],array[j]] = [array[j],array[i]];
	        }
	        return array;
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
	    getBoxCells(matrix,boxIndex){//格子的位置
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
	    convertToBoxIndex(rowIndex,colIndex){//宫格的位置
	        return{
	            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
	            cellIndex: rowIndex % 3 * 3 + colIndex % 3
	        };
	    },
	
	    convertFromBoxIndex(boxIndex,cellIndex){//宫格内格子的位置
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	//生成数独游戏
	
	//1.生成完成的解决方案：generator
	//2.随机去除部分数据，按比例
	
	const Generator = __webpack_require__(4);
	
	module.exports = class Sudoku {
	
	    constructor() {
	        const generator = new Generator();
	        generator.generate();
	        this.solutionMatrix = generator.matrix;
	    }
	
	    make(level = 5) {
	        //const shuldRid = Math.random() * 9 < level;
	        //生成迷盘
	        this.puzzleMatrix = this.solutionMatrix.map(row => {
	            return row.map(cell => Math.random() * 9 < level ? 0 : cell);
	        });
	    }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	//生成数独解决方案
	
	const Toolkit = __webpack_require__(2);
	
	module.exports = class Generator{//要导出
	//class Generator{
	    generate(){
	        while(!this.internalGenerate()){
	            console.warn("try again");
	        }
	    }
	    internalGenerate(){
	        // 入口方法
	        this.matrix = Toolkit.matrix.makeMatrix();
	        this.orders = Toolkit.matrix.makeMatrix()
	            .map(row => row.map((v,i)=> i))//每一行，0-8，随机序列
	            .map(row => Toolkit.matrix.shuffle(row));//洗牌方法，打乱，随机选择
	            
	            for (let n=1;n<=9;n++){
	            	if(!this.fillNumber(n)){
	               		return false;
	            	}
	        	}
	        return true;
	    }
	
	    fillNumber(n){//填充行
	        return this.fillRow(n,0);
	    }
	    //递归
	    fillRow(n,rowIndex){
	        if(rowIndex > 8){//结束
	            return true;
	        }
	        //行数据
	        const row = this.matrix[rowIndex];
	        //选择填写位置
	        const orders = this.orders[rowIndex];
	        for(let i = 0 ;i<9; i++){ 
		        const colIndex =orders[i];//固定
	            //判断数据 如果此位置已有值，跳过
	            if(row[colIndex]){
	                continue;
	            }
	            //检查此位置是否能填
	            if(!Toolkit.matrix.checkFillable(this.matrix,n,rowIndex,colIndex)){
	                continue;
	            }
	            row[colIndex] = n;
	            //去下一行填写n 如果填写失败则继续寻找当前行下一个位置
	            if(!this.fillRow(n,rowIndex + 1)){
	                row[colIndex] = 0;
	                continue;
	            }
	            return true;
	        }
	        return false;
	    }
	}
	
	// const generator = new Generator();
	// generator.generate();
	// console.log(generator.matrix);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	//处理弹出操作面板
	module.exports = class PopupNumbers {
	    constructor($panel) {
	        this._$panel = $panel.hide().removeClass("hidden");
	
	        $(".title").on("click", e => {
	            this.hide();
	        });
	
	        this._$panel.on("click", "span", e => {
	            //$cell是弹出面板中的小格子
	            const $cell = this._$targetCell;
	            const $span = $(e.target);
	
	            if ($span.hasClass("mark1")) {
	                //mark1回填样式
	                if ($cell.hasClass("mark1")) {
	                    $cell.removeClass("mark1");
	                } else {
	                    $cell.removeClass("mark2")
	                        .addClass("mark1");
	                }
	            } else if ($span.hasClass("mark2")) {
	                if ($cell.hasClass("mark2")) {
	                    $cell.removeClass("mark2");
	                } else {
	                    $cell.removeClass("mark1")
	                        .addClass("mark2");
	                }
	            } else if ($span.hasClass("empty")) {
	                //empty，取消数字填写，取消mark
	                $cell.text(0)
	                    .addClass("empty");
	            } else {
	                //1-9回填数字
	                $cell.removeClass("empty")
	                    .text($span.text());
	            }
	            this.hide();
	        });
	    }
	
	    popup($cell) {
	        //通过成员变量获取cell
	        this._$targetCell = $cell;
	        const { left, top } = $cell.position();
	        this._$panel
	            .css({
	                left: `${left}px`,
	                top: `${top}px`
	            })
	            .show();
	    }
	
	    hide() {
	        this._$panel.hide();
	    }
	
	};

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map