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
};


//工具集，用来输出
module.exports = class Toolkit{
    // 矩阵和数组相关的工具
    static get matrix(){
        return matrixToolkit;
    }
    
    
};