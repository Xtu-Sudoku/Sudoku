//生成数独解决方案

const Toolkit = require("./toolkit");

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