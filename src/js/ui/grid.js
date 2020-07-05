const Toolkit = require("../core/toolkit");
const Sudoku = require('../core/sudoku');
const Generator = require("../core/generator");
const Checker = require("../core/checker");
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

    bindPopup(popupNumbers) {
        this._$container.on("click", "span", e => {
            const $cell = $(e.target);
            if ($cell.is(".fixed")) {
                return;
            }
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

};

const generator = new Generator();
generator.generate();
// 		console.log(generator.matrix);

const matrix = generator.matrix;
console.log("matrix\n", matrix);


//new Grid($("#container")).build();

module.exports = Grid;
