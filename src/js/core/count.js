
var ctimer = null;
var num = 0;

module.exports = class Count {

    onload() {
        if (ctimer) {
            clearInterval(ctimer);
            ctimer = null;
            num = 0;
        }
        ctimer = setInterval(() => {
            num++;
            console.log(num);
            // $("#id")是jQuery对象，没有innerHTML属性,innerHTML是原生属性，加上$("#id")[0]转换成原生属性
            $("#count_s")[0].innerHTML = this.show_num(num % 60);
            $("#count_m")[0].innerHTML = this.show_num(parseInt(Math.floor(num / 60) % 60));
            $("#count_h")[0].innerHTML = this.show_num(parseInt(Math.floor(num / 60) / 60));
        }, 1000)
    }

    stop() {
        console.log("Innerstopnum", ctimer);
        clearInterval(ctimer);
        ctimer = null;
        num = 0;
        $("#count_s")[0].innerHTML = "00";
        $("#count_m")[0].innerHTML = "00";
        $("#count_h")[0].innerHTML = "00";
    }

    timer_cease() {
        console.log("Innerstopnum", ctimer);
        clearInterval(ctimer);
        ctimer = null;
        $("#count_s")[0].innerHTML = this.show_num(num % 60);;
        $("#count_m")[0].innerHTML = this.show_num(parseInt(Math.floor(num / 60) % 60));;
        $("#count_h")[0].innerHTML = this.show_num(parseInt(Math.floor(num / 60) / 60));
        num = 0;
    }

    show_num(n) {
        if (n < 10) {
            return '0' + n;
        }
        return n;
    }
};