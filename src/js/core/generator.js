//生成数组解决方案脚本
const Toolkit = require("./toolkit");
const { matrix } = require("./toolkit");

module.exports = class Generator {

    generate() {
        while (!this.internalgenerate()) {
            console.warn("try again!");
        }
    }

    internalgenerate() {
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => Toolkit.matrix.shuffle(row));

        for (let n = 1; n <= 9; n++) {
            if (!this.fillNumber(n)) {
                return false;
            }
        }
        return true;
    }

    fillNumber(n) {
        return this.fillRow(n, 0);
    }

    fillRow(n, rowIndex) {
        if (rowIndex > 8) {
            return true;
        }

        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];
        for (let i = 0; i < 9; i++) {
            const colIndex = orders[i];
            //已经填写值
            if (row[colIndex]) {
                continue;
            }
            //检查这个位置是否可以填写 n
            if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue;
            }
            row[colIndex] = n;
            //在下一行填写 n ，如果没有填写进去，就继续当前行的下一个位置
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }

            return true;
        }
        return false;
    }
};