const Toolkit = require("../core/toolkit");
const Sudoku = require('../core/sudoku');
const Generator = require("../core/generator");
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

}

const generator = new Generator();
generator.generate();
// 		console.log(generator.matrix);

const matrix = generator.matrix;
console.log("matrix\n", matrix);


//new Grid($("#container")).build();

module.exports = Grid;
