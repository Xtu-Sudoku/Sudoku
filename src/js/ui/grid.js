const Toolkit = require("../core/toolkit");

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
    layout(){//调整方格
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
